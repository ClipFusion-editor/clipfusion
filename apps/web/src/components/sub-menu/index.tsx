'use client';
import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import MenuItem from "../menu-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DropdownContainer from "../dropdown-container";
import { createPortal } from "react-dom";
import { useDropdownContext } from "../dropdown";
import useThrottle from "@/hooks/use-throttle";


interface SubMenuProps {
    children?: ReactNode;
    trigger?: ReactNode;
    className?: string;
};

interface SubMenuPosition {
    x: number;
    y: number;
    marginType: string;
    xOrigin: string;
    yOrigin: string;
};

const defaultPosition: SubMenuPosition = {
    x: 0,
    y: 0,
    marginType: "ml",
    xOrigin: "left",
    yOrigin: "top"
};

const threshold = 50;
const margin = 20;

export default function SubMenu(props: SubMenuProps): ReactNode {
    const { dropdownRef, submenuRefs, setSubmenuRefs } = useDropdownContext();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [submenuRef, setSubmenuRef] = useState<HTMLDivElement | undefined>(undefined);
    const submenuCallback = useCallback((node: HTMLDivElement) => {
        setSubmenuRef(node);
    }, []);
    const triggerRef = useRef(null);

    const hideSubmenu = useCallback(() => {
        setVisible(false);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            setPosition(defaultPosition);
        }, 100);
        setSubmenuRefs(submenuRefs.slice(0, -1));
    }, [submenuRefs]);

    const onClick = () => {
        setVisible(!visible);
        if (!visible) hideSubmenu();
    };

    const calculatePosition = useCallback(() => {
        if (animating) return;
        if (!triggerRef.current) return;
        const triggerRect = (triggerRef.current as any).getBoundingClientRect();
        const submenuPosition: SubMenuPosition = {
            ...defaultPosition,
            x: triggerRect.left + triggerRect.width + margin,
            y: triggerRect.top,
        };

        if (submenuRef) {
            const submenuRect = submenuRef.getBoundingClientRect();
            if (submenuPosition.x + submenuRect.width > window.innerWidth) {
                submenuPosition.x = triggerRect.left - submenuRect.width - margin, 0;
                submenuPosition.marginType = "mr";
                submenuPosition.xOrigin = "right";
            }
            if (submenuPosition.y + submenuRect.height > window.innerHeight) {
                submenuPosition.y = triggerRect.top - submenuRect.height + triggerRect.height, 0;
                submenuPosition.yOrigin = "bottom";
            }
        }
        submenuPosition.x = Math.max(submenuPosition.x, 0);
        submenuPosition.y = Math.max(submenuPosition.y, 0);
        setPosition(submenuRef ? submenuPosition : defaultPosition);
    }, [triggerRef, submenuRef, animating]);

    const debouncedCalculatePosition = useThrottle(calculatePosition, 300);

    // Handle resize & scroll events
    useEffect(() => {
        window.addEventListener('resize', debouncedCalculatePosition);
        window.addEventListener('scroll', debouncedCalculatePosition);

        return () => {
            window.removeEventListener('resize', debouncedCalculatePosition);
            window.removeEventListener('scroll', debouncedCalculatePosition);
        };
    }, [triggerRef, submenuRef, debouncedCalculatePosition]);

    // Hide submenu when not hovered
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (!submenuRef || !dropdownRef) return;
            const hoveringNearNode = (node: HTMLDivElement): boolean => {
                const rect = node.getBoundingClientRect();
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                const nearX = mouseX >= (rect.left - threshold) && mouseX <= (rect.right + threshold);
                const nearY = mouseY >= (rect.top - threshold) && mouseY <= (rect.bottom + threshold);

                return nearX && nearY;
            };

            const nearAnySubmenu = submenuRefs.some(hoveringNearNode);

            console.log(nearAnySubmenu, dropdownRef.contains(event.target));
            if (!nearAnySubmenu && !hoveringNearNode(submenuRef) && !dropdownRef.contains(event.target)) {
                hideSubmenu();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [dropdownRef, submenuRef, submenuRefs]);


    // Handle submenu positioning when submenuRef is available
    useEffect(() => {
        if (submenuRef) {
            calculatePosition();
            setSubmenuRefs([...submenuRefs, submenuRef]);
        }
    }, [submenuRef]);

    const submenuNode = (
        <div ref={submenuCallback} style={{position: "fixed", top: position.y, left: position.x}}>
            <DropdownContainer className={`${animating ? "animate-scale-out" : "animate-scale-in"} ${position.marginType}-${margin} origin-${position.yOrigin}-${position.xOrigin}`}>
                {props.children}
            </DropdownContainer>
        </div>
    );

    return (
        <>
            <button type="button" onClick={onClick} onMouseEnter={() => setVisible(true)} suppressHydrationWarning>
                <MenuItem ref={triggerRef} className={props.className}>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-center items-center">
                            {props.trigger}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} className="fa-fw"/>
                        </div>
                    </div>
                </MenuItem>
            </button>
            {visible || animating ? createPortal(submenuNode, document.body) : <></>}
        </>
    );
}