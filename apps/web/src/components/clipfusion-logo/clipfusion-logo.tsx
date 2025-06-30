import { ReactNode } from 'react';
import Image from 'next/image';
import ClipFusionLogoSvg from '../../../public/clipfusion-logo.svg';

interface ClipFusionLogoProps {
    children?: ReactNode;
    width?: string;
    height?: string;
    href?: string;
};

export default function ClipFusionLogo(props: ClipFusionLogoProps): ReactNode {
    return (
        <a href={props.href ? props.href : "/"} className="hover:scale-105 active:scale-110 duration-75 flex flex-row items-center justify-center">
            <Image src={ClipFusionLogoSvg} alt="ClipFusion logo" 
                width={props.width ? +props.width : undefined} 
                height={props.height ? +props.height : undefined} 
                className="m-1"/>
            {props.children}
        </a>    
    );
}