"use client"
import React from 'react';
import Header from '@/components/header';
import './globals.css';
import { ContextProvider, useContextValue } from '@/hooks/getContext';

const ContextHeader = () => {
    const { getName, setName, getType, setType, getLimit, setLimit } = useContextValue();

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const onLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(event.target.value));
    };

    return (
        <Header
            getName={getName}
            getType={getType}
            getLimit={getLimit}
            onNameChange={onNameChange}
            onTypeChange={onTypeChange}
            onLimitChange={onLimitChange}
        />
    );
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ContextProvider>
            <html lang="fr">
                <head>
                    <title>Pokedex</title>
                </head>
                <body className="min-h-screen bg-gray-100">
                    <ContextHeader />
                {children}
                </body>
            </html>
        </ContextProvider>
    );
}