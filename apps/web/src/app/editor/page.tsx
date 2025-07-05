'use client';
import BackButton from "@/components/back-button/back-button";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function Page(): ReactNode {
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid');

    return (
        <div className="flex justify-center items-center h-screen font-bold">
            <BackButton/> {uuid}
        </div>
    );
}