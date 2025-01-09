"use client"
import React, { JSX } from 'react';
import { useEffect, useState } from "react";
import getTypes from '@/hooks/getTypes';
import PokemonType from '@/interfaces/PokemonType';

interface HeaderProps {
    getName: string;
    getType: string;
    getLimit: number;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Header({
    getName,
    getType,
    getLimit,
    onNameChange,
    onTypeChange,
    onLimitChange,
}: HeaderProps): JSX.Element {
    const [types, setTypes] = useState<PokemonType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTypes();
                setTypes(result);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <header className="bg-red-600 text-black p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Pokedex</h1>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Filtrer par nom"
                    value={getName}
                    onChange={onNameChange}
                    className="border p-2"
                />
                <select value={getType} onChange={onTypeChange} className="border p-2">
                    <option value="">Tous les types</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <select value={getLimit} onChange={onLimitChange} className="border p-2">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </header>
    );
}