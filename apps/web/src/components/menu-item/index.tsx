import { ReactNode, RefObject } from "react";

interface MenuItemProps {
    children?: ReactNode;
    className?: string;
    ref?: RefObject<any>;
};

const baseStyle = 
    "duration-100 flex flex-row items-center rounded-md bg-transparent hover:bg-neutral-300 active:bg-transparent dark:hover:bg-neutral-800 dark:active:bg-transparent w-auto p-2 cursor-pointer";

export default function MenuItem(props: MenuItemProps): ReactNode {
    return (
        <div ref={props.ref} className={`${baseStyle} ${props.className}`}>
            {props.children}
        </div>
    )
}
