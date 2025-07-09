import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useDropdownContext, DropdownPosition } from "../dropdown-provider/dropdown-provider";

interface DropdownProps {
    children?: ReactNode;
    trigger: ReactNode;
    className?: string;
}

const dropdownStyle =
    `rounded-xl bg-neutral-100 dark:bg-neutral-900 drop-shadow-md drop-shadow-black/50 origin-top-left z-50 flex flex-col gap-1 p-2 overflow-hidden`;

export default function Dropdown(props: DropdownProps): ReactNode {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dropdownRendered, setDropdownRendered] = useState(false);
    const { dropdown, setDropdown, position, setPosition, dropdownRef, setPreviousDropdown, shouldCloseDropdowns, setShouldCloseDropdowns } = useDropdownContext();
    const parentRef = useRef(null);
    const padding = 25;

    const calculateDropdownPosition = () => {
        const parentRect = (parentRef.current as any).getBoundingClientRect();
        let parentX = parentRect.left;
        let parentY = parentRect.top;
        const parentH = parentRect.top - parentRect.bottom;

        if (dropdownRef.current && visible) {
            const { width, height } = (dropdownRef.current as any).getBoundingClientRect();
            const viewportWidth = window.outerWidth;
            const viewportHeight = window.outerHeight;

            if (parentX + width + padding > viewportWidth) {
                parentX = viewportWidth - width - padding;
            }

            if (parentY + height + padding > viewportHeight) {
                parentY = parentY - height - padding * 2;
            }
        }

        setPosition({
            x: parentX,
            y: parentY - parentH
        });
    };

    const hideDropdown = () => {
        setPreviousDropdown(
            <div style={{position: "fixed", top: position.y, left: position.x}}>
                <div className={`animate-scale-out ${formattedStyle}`}>
                    {props.children}
                </div>
            </div>
        );
        setDropdown(<></>);
        setTimeout(() => setPreviousDropdown(<></>), 200);
        setDropdownRendered(false);
    }

    const formattedStyle = 
        `${dropdownStyle} ${props.className}`;

    const onTriggerClick = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setVisible(false);
        setTimeout(() => setShouldCloseDropdowns(false), 50);
    }, [shouldCloseDropdowns]);

    useEffect(() => {
        if (parentRef.current && mounted) {
            if (visible) calculateDropdownPosition();
            else hideDropdown();
        }
        setMounted(true);
    }, [visible, parentRef]);

    useEffect(() => {
        function handleClick(event: any) {
            if (dropdownRef.current && visible && !(dropdownRef.current as any).contains(event.target)) {
                setVisible(false);
            }
        }

        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [dropdownRef, visible]);

    useEffect(() => {
        function handleReposition(event: any) {
            if (parentRef.current && visible) {
                calculateDropdownPosition();
            }
        }

        window.addEventListener('resize', handleReposition);
        window.addEventListener('scroll', handleReposition);

        return () => {
            window.removeEventListener('resize', handleReposition);
            window.removeEventListener('scroll', handleReposition);
        };
    }, [parentRef, visible]);

    useEffect(() => {
        if (visible) {
            setDropdown(
                <div style={{position: "fixed", top: position.y, left: position.x}}>
                    <div ref={dropdownRef} className={`animate-scale-in ${formattedStyle}`}>
                        {props.children}
                    </div>
                </div>
            );
        }
        setDropdownRendered(visible);
    }, [position]);

    useEffect(() => {
        if (visible && dropdownRef.current) {
            calculateDropdownPosition();
        }
    }, [dropdownRendered]);

    return (
        <div className="relative">
            <button ref={parentRef} type="button" onClick={onTriggerClick} className="cursor-pointer">
                {props.trigger}
            </button>
        </div>
    );
}