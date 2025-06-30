'use client';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import BubblyContainer from '../bubbly-container/bubbly-container';

export default function BackButton(): ReactNode {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.back()} className="cursor-pointer select-none">
            <BubblyContainer>
                <FontAwesomeIcon icon={faArrowLeft} className="aspect-square w-auto"/>
            </BubblyContainer>
        </button>
    );

}