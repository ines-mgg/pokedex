'use client'
import { useEffect, useState } from "react";
import Card from "@/components/card";
import getAllPokemons from "@/hooks/getAllPokemons";
import { Pokemon } from "@/interfaces/Pokemon";
import { useContextValue } from "@/hooks/getContext";

export default function Pokedex() {
    const [data, setData] = useState<Pokemon[]>([]);
    const { getName, getLimit, getType, setLimit} = useContextValue();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await getAllPokemons(getName, getLimit, getType);
                setData(results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getName, getLimit, getType]);
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setLimit(getLimit + getLimit);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [getLimit, setLimit]);

    return (
            <main className="bg-white flex flex-col p-2">
                {data ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.map((pokemon) => (
                                <Card
                                    key={pokemon.id}
                                    name={pokemon.name}
                                    pokedexId={pokemon.pokedexId}
                                    image={pokemon.image}
                                    types={pokemon.types}
                                />
                            ))}
                        </div>
                ) : (
                    <p className="self-center uppercase text-red-600 text-3xl font-bold">Loading...</p>
                )}
            </main>
    );
}