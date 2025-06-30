'use client';
import { ReactNode, useState, useEffect } from "react";
import BubblyContainer from "../bubbly-container/bubbly-container";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSpinner, faSun } from "@fortawesome/free-solid-svg-icons";

interface ThemeSwitcherProps {
    width?: string;
    height?: string;
    forceDark?: boolean;
};

export default function ThemeSwitcher(props: ThemeSwitcherProps): ReactNode {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const switchTheme = () => {
        if (theme == 'dark') setTheme('light');
        else setTheme('dark');
        console.log("swithcing theme");
    };

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return (
        <BubblyContainer forceDark={props.forceDark}>
            <FontAwesomeIcon icon={faSpinner} className="aspect-square animate-spin" width={props.width} height={props.height}/>
        </BubblyContainer>
    );

    return (
        <button type="button" onClick={switchTheme} className="cursor-pointer">
            <BubblyContainer forceDark={props.forceDark}>
                <FontAwesomeIcon icon={ (theme == 'dark') ? faMoon : faSun } className="aspect-square" width={props.width} height={props.height}/>
            </BubblyContainer>
        </button>
    );
}