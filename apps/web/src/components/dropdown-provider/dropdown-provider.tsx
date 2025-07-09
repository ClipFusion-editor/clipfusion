import { createContext, Dispatch, ReactNode, Ref, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react";

export interface DropdownPosition {
    x: number;
    y: number;
}

interface DropdownContextProps {
    dropdown: ReactNode;
    setDropdown: Dispatch<SetStateAction<ReactNode>>;
    previousDropdown: ReactNode;
    setPreviousDropdown: Dispatch<SetStateAction<ReactNode>>;
    position: DropdownPosition;
    setPosition: Dispatch<SetStateAction<DropdownPosition>>;
    dropdownRef: RefObject<null>;
    shouldCloseDropdowns: boolean;
    setShouldCloseDropdowns: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export function useDropdownContext(): DropdownContextProps {
    const context = useContext(DropdownContext);
    if (context == undefined) throw new Error("DropdownContext is undefined");
    return context;
}

interface DropdownContextProviderProps {
    children?: ReactNode;
}

function DropdownContextProvider(props: DropdownContextProviderProps): ReactNode {
    const [dropdown, setDropdown] = useState<ReactNode>();
    const [previousDropdown, setPreviousDropdown] = useState<ReactNode>();
    const [position, setPosition] = useState<DropdownPosition>({x: 0, y: 0});
    const [shouldCloseDropdowns, setShouldCloseDropdowns] = useState(false);
    const dropdownRef = useRef(null);

    const value: DropdownContextProps = {
        dropdown,
        setDropdown,
        previousDropdown,
        setPreviousDropdown,
        position,
        setPosition,
        dropdownRef,
        shouldCloseDropdowns, 
        setShouldCloseDropdowns
    };

    return (
        <DropdownContext.Provider value={value}>
            {props.children}
        </DropdownContext.Provider>
    );
}

interface DropdownRendererProps {
    children?: ReactNode;
}

function DropdownRenderer(props: DropdownRendererProps): ReactNode {
    const { dropdown, previousDropdown } = useDropdownContext();

    return (
        <>
            {props.children}
            {previousDropdown}
            {dropdown}
        </>
    );
}

interface DropdownProviderProps {
    children?: ReactNode;
}

export function DropdownProvider(props: DropdownProviderProps): ReactNode {
    return (
        <DropdownContextProvider>
            <DropdownRenderer>
                {props.children}
            </DropdownRenderer>
        </DropdownContextProvider>
    )
}