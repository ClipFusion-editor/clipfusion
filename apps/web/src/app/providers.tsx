'use client';
import { ThemeProvider } from "next-themes";
import {  ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface ProvidersProps {
    children: ReactNode;
};

export default function Providers(props: ProvidersProps): ReactNode {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastContainer/>
            {props.children}
        </ThemeProvider>
    );
};
