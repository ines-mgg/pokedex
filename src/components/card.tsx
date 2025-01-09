import React, { JSX } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PokemonType from '@/interfaces/PokemonType';

interface CardProps {
    name: string;
    pokedexId: number;
    image: string;
    types: PokemonType[];
}

export default function Card({ name, pokedexId, image, types }: CardProps): JSX.Element {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/pokedex/${pokedexId}`);
    };

    return (
        <div onClick={handleClick} className='border-2 border-red-600 cursor-pointer p-2 flex flex-col items-center'>
            <p className='self-end'>#{pokedexId}</p>
            <h2 className="font-bold text-xl">{name}</h2>
            <Image src={image} alt={name} width={100} height={100} />
            <div className='flex flex-col'>
                <span className="font-bold text-lg self-center">Types</span>
                <ul className="flex space-x-4">
                    {types.map((type) => (
                        <li key={type.id} className="flex flex-col items-center">
                            <Image src={type.image} alt={type.name} width={50} height={50} />
                            <span>{type.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}