'use client';
import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import DropdownContainer from "../dropdown-container";
import { createPortal } from "react-dom";
import useThrottle from "@/hooks/use-throttle";

interface DropdownContextData {
    dropdownRef: HTMLDivElement | undefined;
    submenuRefs: HTMLDivElement[];
    setSubmenuRefs: Dispatch<SetStateAction<HTMLDivElement[]>>;
};

const DropdownContext = createContext<DropdownContextData | undefined>(undefined);

export function useDropdownContext(): DropdownContextData {
    const context = useContext(DropdownContext);
    if (context == undefined) throw new Error("DropdownContext is not provided!");
    return context;
}

interface DropdownProps {
    children?: ReactNode;
    trigger: ReactNode;
    className?: string;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

interface DropdownPosition {
    x: number;
    y: number;
    xOrigin: string;
    yOrigin: string;
};

const defaultPosition: DropdownPosition = {
    x: 0,
    y: 0,
    xOrigin: "left",
    yOrigin: "top"
};

export default function Dropdown(props: DropdownProps): ReactNode {
    const [mounted, setMounted] = useState(false);
    const { visible, setVisible } = props;
    const [animating, setAnimating] = useState(false);
    const [position, setPosition] = useState<DropdownPosition>(defaultPosition);
    const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | undefined>(undefined);
    const [submenuRefs, setSubmenuRefs] = useState<HTMLDivElement[]>([]);
    const dropdownCallback = useCallback((node: HTMLDivElement) => {
        setDropdownRef(node);
    }, []);
    const parentRef = useRef(null);

    const calculatePosition = () => {
        if (!parentRef.current) return;
        if (animating) return;
        const parent: HTMLDivElement = parentRef.current;
        const parentRect = (parentRef.current as any).getBoundingClientRect();
        let dropdownPosition: DropdownPosition = {
            ...defaultPosition,
            x: parentRect.left,
            y: parentRect.top + parentRect.height
        };
        if (dropdownRef) {
            const dropdownRect = dropdownRef.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (dropdownPosition.x + dropdownRect.width > viewportWidth) {
                dropdownPosition.x = parentRect.left - dropdownRect.width + parentRect.width;
                dropdownPosition.xOrigin = "right";
            }
            if (dropdownPosition.y + dropdownRect.height > viewportHeight) {
                dropdownPosition.y = parentRect.top - dropdownRect.height;
                dropdownPosition.yOrigin = "bottom";
            }
        }
        dropdownPosition.x = Math.max(dropdownPosition.x, 0);
        dropdownPosition.y = Math.max(dropdownPosition.y, 0);
        setPosition(dropdownRef ? dropdownPosition : defaultPosition);
    };

    const onTriggerClick = () => {
        setVisible(!visible);
    };

    // Handle clicking outside of dropdown area
    useEffect(() => {
        const handleClick = (event: any) => {
            if (!parentRef.current || !dropdownRef) return;
            console.log(submenuRefs);
            if (!(parentRef.current as any).contains(event.target) && !dropdownRef.contains(event.target) && !submenuRefs.some(node => node.contains(event.target))) {
                setVisible(false);
                setSubmenuRefs([]);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [dropdownRef, parentRef, submenuRefs]);

    const throttledCalculatePosition = useThrottle(calculatePosition, 300);

    // Handle scroll & resize events
    useEffect(() => {

        window.addEventListener('resize', throttledCalculatePosition);
        window.addEventListener('scroll', throttledCalculatePosition);

        return () => {
            window.removeEventListener('resize', throttledCalculatePosition);
            window.removeEventListener('scroll', throttledCalculatePosition);
        };
    }, [parentRef, dropdownRef, throttledCalculatePosition]);

    // Handle repositioning when dropdown dimensions are available
    useEffect(() => {
        if (dropdownRef) {
            calculatePosition();
        }
    }, [dropdownRef]);

    useEffect(() => {
        if (mounted) {
            if (!visible) {
                setAnimating(true);
                setTimeout(() => {
                    setAnimating(false);
                    setPosition(defaultPosition);
                }, 100);
            }
        }
        setMounted(true);
    }, [visible]);

    const contextValue: DropdownContextData = {
        dropdownRef: dropdownRef,
        submenuRefs: submenuRefs,
        setSubmenuRefs: setSubmenuRefs
    };

    const dropdownNode = (
        <div ref={dropdownCallback} style={{position: "fixed", top: position.y, left: position.x}}>
            <DropdownContext.Provider value={contextValue}>
                <DropdownContainer className={`${animating ? "animate-scale-out" : "animate-scale-in"} shrink-0 origin-${position.yOrigin}-${position.xOrigin}`}>
                        {props.children}
                </DropdownContainer>
            </DropdownContext.Provider>
        </div>
    );

    return (
        <>
            <button ref={parentRef} type="button" onClick={onTriggerClick} className="cursor-pointer">
                {props.trigger}
            </button>
            {visible || animating ? createPortal(dropdownNode, document.body) : <></>}
        </>
    );
}