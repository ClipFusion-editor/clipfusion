import { ReactNode } from 'react';

interface BubblyContainerProps {
    children?: ReactNode;
    forceDark?: boolean;
};

export default function BubblyContainer(props: BubblyContainerProps): ReactNode {
    const normalStyle = "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-500 dark:hover:bg-neutral-400";
    const forceDarkStyle = "bg-neutral-800 hover:bg-neutral-900";

    return (
        <div className={ `mx-5 rounded-full ${ props.forceDark ? forceDarkStyle : normalStyle } duration-75 hover:scale-105 active:scale-125 p-2 grid items-center aspect-square w-auto` }>
            {props.children}
        </div>
    );
}