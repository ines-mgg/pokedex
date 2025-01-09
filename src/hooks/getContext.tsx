import React, { createContext, useContext, useState, ReactNode } from 'react';

interface contextProps {
    getName: string;
    setName: (value: string) => void;
    getType: string;
    setType: (value: string) => void;
    getLimit: number;
    setLimit: (value: number) => void;
}

const setContext = createContext<contextProps | undefined>(undefined);

export const ContextProvider = ({ children } : { children: ReactNode }) => {
    const [getName, setName] = useState("");
    const [getType, setType] = useState("");
    const [getLimit, setLimit] = useState(50);

    return (
        <setContext.Provider value={{ getName, setName, getType, setType, getLimit, setLimit }}>
            {children}
        </setContext.Provider>
    );
}

export const useContextValue = () => {
    const context = useContext(setContext);
    if (!context) {
        throw new Error("pas de context !");
    }
    return context;
}