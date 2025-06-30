'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import RoundedButton from '@/components/rounded-button/rounded-button';
import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import BackButton from '@/components/back-button/back-button';
import SolidSeparator from '@/components/solid-separator/solid-separator';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { faHome, faPerson } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';

function ProjectsPage(): ReactNode {
    return (
        <div className="flex flex-col w-full animate-slide-in">
            <h1 className="text-left text-3xl font-bold">Welcome to ClipFusion!</h1>
            <SolidSeparator className="my-4"/>
            <p className="text-xl font-bold">Recent projects</p>
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
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

function SideTabItem(props: SideTabItemProps): ReactNode {
    const currentTab = "bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-700";
    const normalTab = "bg-transparent hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700";

    return (
        <button type="button" className={`flex flex-row active:scale-95 duration-100 justify-center items-center font-bold p-1 rounded-xl ${ +props.number == props.currentPage ? currentTab : normalTab } select-none cursor-pointer`} onClick={() => props.setCurrentPage(+props.number)}>
            {props.children}
        </button>
    );
}

export default function Page() {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        document.title = "ClipFusion - Home";
    });

    return (
        <div>
            <div className="sticky flex flex-row p-10 sm:p-5 md:p-7 gap-5 mt-16">
                <div className="flex basis-1/6 flex-col gap-2">
                    <SideTabItem number="0" currentPage={currentPage} setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={faHome} className="mx-1 fa-fw"/> Home
                    </SideTabItem>
                    <SideTabItem number="1" currentPage={currentPage} setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={faPerson} className="mx-1 fa-fw"/> Account
                    </SideTabItem>
                </div>
                <div key={currentPage} className="flex basis-5/6 w-screen">
                    {GetContentByPageNumber(currentPage)}
                </div>
            </div>
            <nav className="bg-neutral-200 dark:bg-neutral-600 fixed top-0 left-0 right-0 px-1 h-16 flex flex-row items-center max-w-full">
                <BackButton/>
                <ClipFusionLogo width="25" height="25">
                    <p className="text-2xl font-bold mx-1">Home</p>
                </ClipFusionLogo>
                <ThemeSwitcher/>
            </nav>
        </div>
    );
}