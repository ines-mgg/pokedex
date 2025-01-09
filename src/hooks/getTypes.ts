import PokemonType from "@/interfaces/PokemonType";

export default async function getTypes(): Promise<PokemonType[]> {
  try {
    const response = await fetch(
      `https://nestjs-pokedex-api.vercel.app/types/`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types:", error);
    throw error;
  }
}
