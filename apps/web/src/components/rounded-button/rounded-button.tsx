import Link from 'next/link';
import { ReactNode } from 'react';

interface RoundedButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export default function RoundedButton(props: RoundedButtonProps): ReactNode {
    const className = 
        "inline-flex items-center justify-center bg-sky-600 font-semibold rounded-full py-1.5 px-2.5 hover:bg-sky-700 active:bg-sky-800 outline-sky-600 active:outline-2 outline-offset-2 select-none cursor-pointer";

    if (props.href) {
        return (
            <Link href={props.href} className={className}>
                {props.children}
            </Link>
        );
    } else {
        return (
            <button type="button" onClick={props.onClick} className={className}>
                {props.children}
            </button>
        );
    }
}