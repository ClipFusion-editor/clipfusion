'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import BackButton from '@/components/back-button/back-button';
import SolidSeparator from '@/components/solid-separator/solid-separator';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { faFolder, faHome, faPerson, faPlus } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import BubblyContainer from '@/components/bubbly-container/bubbly-container';
import { getLocalProjectsUUIDS, getProjectByUUID, updateLocalProject, updateLocalProjectsUUIDS } from '@/lib/projects';
import { Project } from '@/lib/project';

interface UUIDSContextProps {
    uuids: Array<string>;
    setUuids: Dispatch<SetStateAction<Array<string>>>;
}

const UUIDSContext = createContext<UUIDSContextProps | null>(null);

interface UUIDSContextProviderProps {
    children?: ReactNode;
}

function UUIDSContextProvider(props: UUIDSContextProviderProps): ReactNode {
    const [uuids, setUuids] = useState(getLocalProjectsUUIDS());

    const value = {
        uuids,
        setUuids
    };

    return (
        <UUIDSContext.Provider value={value}>
            {props.children}
        </UUIDSContext.Provider>
    );
}

function useUuidsContext(): UUIDSContextProps {
    const uuids = useContext(UUIDSContext);
    if (uuids == null) throw new Error("UUIDSContext is not provided (null)");
    return uuids;
}

const projectButtonStyle = 
    "cursor-pointer rounded-xl bg-neutral-100 dark:bg-neutral-900 h-75 hover:scale-95 active:scale-90 duration-75";

function NewProjectButton(): ReactNode {
    const { uuids, setUuids } = useUuidsContext();

    const createNewProject = () => {
        const newProject = new Project();
        updateLocalProject(newProject);
        const newUuids = [...uuids, newProject.uuid];
        updateLocalProjectsUUIDS(newUuids);
        setUuids(newUuids);
    };

    const style = 
        `${projectButtonStyle} flex flex-col justify-center items-center`;

    return (
        <button type="button" onClick={createNewProject} className={style}>
            <BubblyContainer noInteraction>
                <FontAwesomeIcon icon={faPlus} className="fa-fw"/>
            </BubblyContainer>
            <p className="font-bold my-3 select-none">Create new project</p>
        </button>
    );
}

interface ProjectButtonProps {
    uuid: string;
}

function ProjectButton(props: ProjectButtonProps): ReactNode {
    const project = getProjectByUUID(props.uuid);
    if (project == null) return <></>;

    const style = 
        `${projectButtonStyle} flex flex-col`;

    return (
        <div className={style}>
            <div className="flex items-center justify-center basis-4/6">
                <BubblyContainer noInteraction>
                    <FontAwesomeIcon icon={faFolder}/>
                </BubblyContainer>
            </div>
            <div className="flex flex-col basis-2/6 p-2 rounded-b-xl bg-neutral-200 dark:bg-neutral-800">
                <p className="font-bold">{project.name}</p>
            </div>
        </div>
    );
}

function ProjectsPage(): ReactNode {
    const { uuids } = useUuidsContext();

    return (
        <div className="flex flex-col w-full animate-slide-in">
            <h1 className="text-left text-2xl md:text-3xl font-bold">Welcome to ClipFusion!</h1>
            <SolidSeparator className="my-4"/>
            <p className="text-xl font-bold">Recent projects</p>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 my-2 gap-3">
                <NewProjectButton/>
                {
                    uuids.map((uuid: string): ReactNode => {
                        return <ProjectButton key={uuid} uuid={uuid}/>;
                    })
                }
            </div>
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
    if (page == 1) return <AccountPage/>;
    return <ProjectsPage/>;
}

interface SideTabItemProps {
    children: ReactNode;
    number: number | string;
    currentPage: number | string;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

function SideTabItem(props: SideTabItemProps): ReactNode {
    const currentTab = "bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-700";
    const normalTab = "bg-transparent hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700";

    return (
        <button type="button" className={`flex flex-col md:flex-row active:scale-95 duration-100 justify-center items-center font-bold p-1 rounded-xl ${ +props.number == props.currentPage ? currentTab : normalTab } select-none cursor-pointer`} onClick={() => props.setCurrentPage(+props.number)}>
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
            <div className="sticky flex flex-row p-2 md:p-5 lg:p-8 gap-5 mt-16">
                <div className="flex basis-1/6 flex-col gap-2">
                    <SideTabItem number="0" currentPage={currentPage} setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={ faHome } className="mx-1 fa-fw fill-transparent"/> Home
                    </SideTabItem>
                    <SideTabItem number="1" currentPage={currentPage} setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon icon={ faPerson } className="mx-1 fa-fw"/> Account
                    </SideTabItem>
                </div>
                <div key={currentPage} className="flex basis-5/6 w-screen">
                    <UUIDSContextProvider>
                        {GetContentByPageNumber(currentPage)}
                    </UUIDSContextProvider>
                </div>
            </div>
            <nav className="bg-neutral-200 dark:bg-neutral-600 fixed top-0 left-0 right-0 px-1 h-16 flex flex-row items-center justify-between max-w-full">
                <div className="flex flex-row">
                    <BackButton/>
                    <ClipFusionLogo width="25" height="25">
                        <p className="text-2xl font-bold">Home</p>
                    </ClipFusionLogo>
                </div>
                <ThemeSwitcher/>
            </nav>
        </div>
    );
}