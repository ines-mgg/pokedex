import PokemonType from "./PokemonType";

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: {
    HP: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    special_attack: number;
    special_defense: number;
  };
  generation: number;
  evolutions: {
    name: string;
    pokedexId: number;
  }[];
  types: PokemonType[];
}
