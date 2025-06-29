'use client';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.back()} className="mx-5 rounded-full bg-neutral-800 hover:bg-neutral-900 duration-75 hover:scale-105 active:scale-125 p-2 cursor-pointer grid">
            <FontAwesomeIcon icon={faArrowLeft} className="aspect-square w-auto"/>
        </button>
    );
}