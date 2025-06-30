import { ReactNode } from "react";

interface SolidSeparatorProps {
    className?: string;
}

export default function SolidSeparator(props: SolidSeparatorProps): ReactNode {
    return (
        <hr className={`border-t-4 border-solid border-neutral-600 dark:border-neutral-800 ${ props.className }`}/>
    );
}