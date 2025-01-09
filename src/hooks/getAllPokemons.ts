import { Pokemon } from "@/interfaces/Pokemon";

export default async function getAllPokemons(
  getName: string,
  getLimit: number,
  getType: string
): Promise<Pokemon[]> {
  try {
    const response = await fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?name=${getName}&limit=${getLimit}&type=${getType}`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémons :", error);
    throw error;
  }
}
