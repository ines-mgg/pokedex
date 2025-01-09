import { Pokemon } from "@/interfaces/Pokemon";

export default async function getPokemon(pokedexId: number): Promise<Pokemon> {
  try {
    const response = await fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons/${pokedexId}`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon:", error);
    throw error;
  }
}
