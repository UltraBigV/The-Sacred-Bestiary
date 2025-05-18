import { PokemonResponseSchema, PokemonSpeciesSchema } from './schemas';

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 151) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetails(idOrName: string | number) {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon ${idOrName}`);
  }
  
  const rawData = await response.json();
  
  // Validate with Zod
  const data = PokemonResponseSchema.parse(rawData);
  
  // Get species data for description
  const speciesResponse = await fetch(data.species.url);
  
  if (!speciesResponse.ok) {
    throw new Error(`Failed to fetch species data for pokemon ${idOrName}`);
  }
  
  const rawSpeciesData = await speciesResponse.json();
  const speciesData = PokemonSpeciesSchema.parse(rawSpeciesData);
  
  // Find English description
  const description = speciesData.flavor_text_entries
    .find(entry => entry.language.name === "en")?.flavor_text
    .replace(/\f/g, ' ') || "";
  
  return {
    id: data.id,
    name: data.name,
    types: data.types.map(t => t.type.name),
    image: data.sprites.other["official-artwork"].front_default || '',
    height: data.height / 10, // Convert to meters
    weight: data.weight / 10, // Convert to kg
    abilities: data.abilities.map(a => a.ability.name),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat
    },
    description
  };
}
