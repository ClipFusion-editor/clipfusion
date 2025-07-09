'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ClipFusionLogoSVG from '@/../public/clipfusion-logo.svg';
import BackButton from '@/components/back-button/back-button';
import SolidSeparator from '@/components/solid-separator/solid-separator';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { faCircleInfo, faClone, faEllipsisH, faHome, faPerson, faPlus, faSpinner, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import BubblyContainer from '@/components/bubbly-container/bubbly-container';
import { getLocalProjectsUUIDS, getProjectByUUID, updateLocalProject, updateLocalProjectsUUIDS } from '@/lib/projects/projects';
import Project from '@/lib/projects/Project';
import { addThumbnail, thumbnailsDB } from '@/lib/thumbnails/thumbnails';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image';
import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import { sendToast } from '../toasts';
import { useRouter, useSearchParams } from 'next/navigation';
import Dropdown from '@/components/dropdown/dropdown';
import RoundedButton from '@/components/rounded-button/rounded-button';
import MenuItem from '@/components/menu-item/menu-item';
import { useDropdownContext } from '@/components/dropdown-provider/dropdown-provider';

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
    "cursor-pointer rounded-xl dark:bg-neutral-900 bg-neutral-200 w-full aspect-video active:scale-95 duration-75";

function NewProjectButton(): ReactNode {
    const { uuids, setUuids } = useUuidsContext();

    const createNewProject = async () => {
        const newProject = new Project();
        newProject.creationDate = newProject.lastEditDate = Date.now();
        updateLocalProject(newProject);

        const newUuids = [...uuids, newProject.uuid];
        updateLocalProjectsUUIDS(newUuids);
        setUuids(newUuids);

        await fetch("/camera-closeup.jpeg")
            .then(res => res.blob())
            .then(blob => {
                addThumbnail(newProject.uuid, blob);
            })
            .catch(reason => {
                console.log("failed to fetch thumbnail:", reason);
            })
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

interface ProjectThumbnailProps {
    name: string;
    uuid: string;
}

function ProjectThumbnail(props: ProjectThumbnailProps): ReactNode {
    const thumbnailQuery = useLiveQuery(
        async () => thumbnailsDB.thumbnails
                        .where('uuid')
                        .equals(props.uuid)
                        .toArray()
    );

    if (!thumbnailQuery) {
        return (
            <div className="flex flex-col justify-center items-center h-full">
                <BubblyContainer noInteraction>
                    <FontAwesomeIcon icon={faSpinner} className="fa-fw aspect-square"/>
                </BubblyContainer>
            </div>
        );
    }

    if (thumbnailQuery.length == 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <Image src={ClipFusionLogoSVG} alt="ClipFusion logo" 
                    width="100" 
                    height="100"
                    className="m-2"/>
            </div>
        );
    }

    const thumbnailUrl = URL.createObjectURL(thumbnailQuery[0].data);

    return (
        <img src={thumbnailUrl} alt={props.uuid} className="rounded-xl hover:brightness-90 duration-100 object-contain"/>
    );
}

interface ProjectInfoProps {
    uuid: string;
};

function LinearShadow(): ReactNode {
    return (
        <div className="bg-gradient-to-t from-black/60 to-transparent w-full h-20 rounded-xl"/>
    );
}

function ProjectInfo(props: ProjectInfoProps): ReactNode {
    const project = getProjectByUUID(props.uuid);
    if (!project) return <></>;

    const { setShouldCloseDropdowns } = useDropdownContext();

    const onInfoClick = () => {
        console.log("info clicked");
        setShouldCloseDropdowns(true);
    };

    const onDuplicateClick = () => {
        console.log("duplicate clicked");
        setShouldCloseDropdowns(true);
    };

    const onDeleteClick = () => {
        console.log("delete clicked");
        setShouldCloseDropdowns(true);
    };

    return (
        <div className="absolute bottom-0 left-0 w-full">
            <div className="absolute bottom-0 left-0 w-full">
                <LinearShadow/>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-3 text-gray-50">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">{project.name}</p>
                        <p>Last edit date: { project.lastEditDate ? new Date(project.lastEditDate).toLocaleString() : "unknown" }</p>
                    </div>
                    <div>
                        <Dropdown trigger={
                            <div className="p-2 hover:text-neutral-200 active:text-foreground">
                                <FontAwesomeIcon icon={faEllipsisH} className="fa-fw"/>
                            </div>
                        } className="w-40">
                            <button type="button" onClick={onInfoClick}>
                                <MenuItem>
                                    <FontAwesomeIcon icon={faCircleInfo} className="fa-fw m-1"/> Info
                                </MenuItem>
                            </button>
                            <button type="button" onClick={onDuplicateClick}>
                                <MenuItem>
                                    <FontAwesomeIcon icon={faClone} className="fa-fw m-1"/> Duplicate
                                </MenuItem>
                            </button>
                            <SolidSeparator/>
                            <button type="button" onClick={onDeleteClick}>
                                <MenuItem className="text-red-600">
                                    <FontAwesomeIcon icon={faTrashCan} className="fa-fw m-1"/> Delete
                                </MenuItem>
                            </button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ProjectButtonProps {
    uuid: string;
}

function ProjectButton(props: ProjectButtonProps): ReactNode {
    const project = getProjectByUUID(props.uuid);
    if (project == null) return <></>;

    const style = 
        `${projectButtonStyle} flex flex-col grow-0 relative`;

    return (
        <div className={style}>
            <a href={`/editor?uuid=${ project.uuid }`} className="h-full overflow-hidden rounded-xl">
                <ProjectThumbnail name={project.name} uuid={project.uuid}/>
            </a>
            <ProjectInfo uuid={project.uuid}/>
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
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 my-2 gap-5">
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

export default function Home(): ReactNode {
    const [currentPage, setCurrentPage] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        document.title = "ClipFusion - Home";
        if (searchParams.get('error') == 'no-uuid') {
            sendToast('Please select the project you want to edit\n(No UUID was provided to the editor)');
            router.replace('home');
        }
    }, []);

    return (
        <div>
            <main className="sticky flex flex-row p-2 md:p-5 lg:p-8 gap-5 mt-16">
                <div className="flex basis-1/6 flex-col gap-2 relative top-0 left-0">
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
            </main>
            <nav className="bg-neutral-200 dark:bg-neutral-600 fixed top-0 left-0 right-0 overscroll-none px-1 h-16 flex flex-row items-center justify-between w-screen">
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