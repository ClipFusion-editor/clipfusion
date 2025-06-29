'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import RoundedButton from '@/components/rounded-button/rounded-button';
import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import BackButton from '@/components/back-button/back-button';
import SolidSeparator from '@/components/solid-separator/solid-separator';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { faHome, faPerson } from '@fortawesome/free-solid-svg-icons';

function ProjectsPage(): ReactNode {
    return (
        <div className="flex flex-col w-max animate-slide-in">
            <h1 className="text-center text-3xl font-bold my-4">Welcome to ClipFusion!</h1>
            <SolidSeparator/>
        </div>
    );
}

function AccountPage(): ReactNode {
    return (
        <div className="animate-slide-in">
            <h1>Account Page!</h1>
        </div>
    );
}

function GetContentByPageNumber(page: number): ReactNode {
    if (page == 1) return AccountPage();
    return ProjectsPage();
}

interface SideTabItemProps {
    children: ReactNode;
    number: string;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

function SideTabItem(props: SideTabItemProps): ReactNode {
    return (
        <button type="button" className="flex flex-row justify-center items-center text-bold p-1 rounded-xl bg-transparent hover:bg-neutral-500 active:bg-neutral-700 select-none cursor-pointer" onClick={() => props.setCurrentPage(+props.number)}>
            {props.children}
        </button>
    );
}

export default function Page() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <div className="">
            <div className="sticky flex flex-row p-10 sm:p-5 md:p-7 gap-5 mt-16 animate-slide-in">
                <div className="flex flex-1/12 flex-col">
                    <SideTabItem number="0" setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={faHome} className="mx-1"/> Home
                    </SideTabItem>
                    <SideTabItem number="1" setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={faPerson} className="mx-1"/> Account
                    </SideTabItem>
                </div>
                <div key={currentPage} className="flex flex-1/2 w-screen">
                    {GetContentByPageNumber(currentPage)}
                </div>
            </div>
            <nav className="bg-neutral-600 fixed top-0 left-0 right-0 px-1 h-16 flex flex-row items-center max-w-full max-h-full">
                <BackButton/>
                <ClipFusionLogo width="25" height="25">
                    <p className="text-2xl font-bold mx-1">Home</p>
                </ClipFusionLogo>
            </nav>
        </div>
    );
}