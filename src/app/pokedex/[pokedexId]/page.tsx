'use client'
import { useEffect, useState } from "react";
import { Pokemon } from "@/interfaces/Pokemon";
import Image from 'next/image';
import getPokemon from "@/hooks/getPokemon";
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';

export default function PokedexId({ params }: { params: Promise<{ pokedexId: number }> }) {
    const [data, setData] = useState<Pokemon | null>(null);
    const router = useRouter();
    const { pokedexId } = use(params);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPokemon(pokedexId);
                setData(result);
            } catch (error) {
                console.error("Erreur lors de la récupération du Pokémon:", error);
            }
        };
        fetchData();
    }, [pokedexId]);

    const handleBackClick = () => {
        router.push('/pokedex');
    };

    return (
        <main className="bg-white rounded flex flex-col p-4">
            <button onClick={handleBackClick} className="bg-red-600 rounded p-2 text-white font-bold self-start mb-4">Retour</button>
            {data ? (
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-4xl mb-4">{data.name}</h1>
                    <Image src={data.image} alt={data.name} width={250} height={250} className="mb-4" />
                    <div className="w-full flex justify-around mb-4">
                        <div>
                            <h2 className="font-bold text-2xl mb-2">Types</h2>
                            <ul className="flex space-x-4">
                                {data.types.map((type: { id: number, name: string, image: string }) => (
                                    <li key={type.id} className="flex flex-col items-center">
                                        <Image src={type.image} alt={type.name} width={50} height={50} />
                                        <span>{type.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold text-2xl mb-2">Statistiques</h2>
                            <ul>
                                {Object.entries(data.stats).map(([key, value]) => (
                                    <li key={key} className="text-lg">
                                        {`${key}: ${value}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {data.evolutions && data.evolutions.length > 0 && (
                        <div className="w-full">
                            <h2 className="font-bold text-2xl mb-2">Évolutions</h2>
                            <ul className="flex space-x-4">
                                {data.evolutions.map((evolution: { name: string, pokedexId: number }) => (
                                    <li key={evolution.pokedexId}>
                                        <Link href={`/pokedex/${evolution.pokedexId}`} className="text-red-600 underline">
                                            {evolution.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p className="self-center uppercase text-red-600 text-3xl font-bold">Loading...</p>
            )}
        </main>
    );
}