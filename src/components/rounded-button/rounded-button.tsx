import { ReactNode } from 'react';

interface RoundedButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export default function RoundedButton(props: RoundedButtonProps): ReactNode {
    const className = 
        "flex items-center justify-center bg-sky-600 font-semibold rounded-4xl py-1 px-2 hover:bg-sky-700 active:bg-sky-800 outline-sky-600 active:outline-2 outline-offset-2 select-none";

    if (props.href) {
        return (
            <a href={props.href} className={className}>
                {props.children}
            </a>
        );
    } else {
        return (
            <button onClick={props.onClick} className={className}>
                {props.children}
            </button>
        );
    }
}