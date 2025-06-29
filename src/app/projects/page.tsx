'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
    const router = useRouter();

    return (
        <nav className="bg-neutral-500 px-1 h-15 flex flex-row items-center">
            <button onClick={() => router.back()} className="mx-5">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <ClipFusionLogo width="25" height="25"/>
            <p className="text-2xl font-bold mx-1">ClipFusion</p>
        </nav>
    );
}