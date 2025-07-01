'use client';
import { ThemeProvider } from "next-themes";
import {  ReactNode, useEffect, useState } from "react";

interface ProvidersProps {
    children: ReactNode;
};

export default function Providers(props: ProvidersProps): ReactNode {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        (mounted) 
        ? <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {props.children}
        </ThemeProvider>
        : <></>
    );
};
