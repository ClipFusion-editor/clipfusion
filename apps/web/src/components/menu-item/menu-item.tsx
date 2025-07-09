import { ReactNode } from "react";

interface MenuItemProps {
    children?: ReactNode;
    className?: string;
};

export default function MenuItem(props: MenuItemProps): ReactNode {
    return (
        <div className={`duration-100 flex flex-row items-center rounded-md bg-transparent min-w-30 hover:bg-neutral-300 active:bg-transparent dark:hover:bg-neutral-800 dark:active:bg-transparent w-full p-2 cursor-pointer ${props.className}`}>
            {props.children}
        </div>
    )
}
