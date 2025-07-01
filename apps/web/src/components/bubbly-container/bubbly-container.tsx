import { ReactNode } from 'react';

interface BubblyContainerProps {
    children?: ReactNode;
    forceDark?: boolean;
    className?: string;
    square?: boolean;
};

const defaultProps: BubblyContainerProps = {
    square: true
};

export default function BubblyContainer(passedProps: BubblyContainerProps): ReactNode {
    const props = { ...defaultProps, ...passedProps };

    const normalStyle = "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-500 dark:hover:bg-neutral-400";
    const forceDarkStyle = "bg-neutral-800 hover:bg-neutral-900";
    const squareStyle = "grid items-center aspect-square w-auto";

    return (
        <div className={ `mx-5 rounded-full ${ props.forceDark ? forceDarkStyle : normalStyle } duration-75 hover:scale-105 active:scale-125 p-2 ${ props.square ? squareStyle : "" }` }>
            {props.children}
        </div>
    );
}