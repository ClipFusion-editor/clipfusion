import { ReactNode } from 'react';
import Image from 'next/image';
import ClipFusionLogoSvg from '../../../public/clipfusion-logo.svg';

interface ClipFusionLogoProps {
    width?: string;
    height?: string;
};

export default function ClipFusionLogo(props: ClipFusionLogoProps): ReactNode {
    return (
        <a href="/">
            <Image src={ClipFusionLogoSvg} alt="ClipFusion logo" 
                width={props.width ? +props.width : undefined} 
                height={props.height ? +props.height : undefined} 
                className="m-1 hover:scale-105 duration-75"/>
        </a>    
    );
}