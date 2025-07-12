import { ReactNode } from "react";

interface SolidSeparatorProps {
    className?: string;
    height?: string | number;
}

const defaultProps: SolidSeparatorProps = {
    className: "border-neutral-600 dark:border-neutral-800",
    height: 4
};

export default function SolidSeparator(passedProps: SolidSeparatorProps): ReactNode {
    const props = {...defaultProps, ...passedProps};
    return (
        <hr className={`border-t-${props.height} border-solid ${ props.className }`}/>
    );
}