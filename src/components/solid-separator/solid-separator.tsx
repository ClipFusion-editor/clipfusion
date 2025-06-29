import { ReactNode } from "react";

interface SolidSeparatorProps {
}

export default function SolidSeparator(props: SolidSeparatorProps): ReactNode {
    return (
        <hr className={"border-t-4 border-solid border-neutral-600 dark:border-neutral-800"}/>
    );
}