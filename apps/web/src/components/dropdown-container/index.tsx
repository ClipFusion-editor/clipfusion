import { ReactNode, RefObject } from "react";

interface DropdownContainerProps {
    children?: ReactNode;
    className?: string;
    ref?: RefObject<any>;
}

const containerStyle = 
    `rounded-xl bg-neutral-100 dark:bg-neutral-900 drop-shadow-md drop-shadow-black/50 flex flex-col gap-1 p-2 w-auto h-auto`;

export default function DropdownContainer(props: DropdownContainerProps): ReactNode {
    return (
        <div ref={props.ref} className={`${containerStyle} ${props.className}`}>
            {props.children}
        </div>
    );
}
