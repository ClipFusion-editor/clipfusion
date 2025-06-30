'use client';
import { ThemeProvider } from "next-themes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
