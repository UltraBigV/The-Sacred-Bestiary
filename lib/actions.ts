'use server'

import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from './prisma';
import { fetchPokemonDetails, fetchPokemonList } from './api';

// Define types for better compile-time checking
type PokemonCatchResult = {
  success: boolean;
  error?: string;
  pokemon?: {
    id: number;
    name: string;
    image: string;
    types: string[];
    description: string;
  };
};

// Server action to catch a single random Pokémon
export async function catchRandomPokemon(): Promise<PokemonCatchResult> {
  try {
    // Get the total count of possible Pokémon to catch
    const pokemonList = await unstable_cache(
      async () => fetchPokemonList(),
      ['pokemon-list'],
      { revalidate: 3600 } // Cache for 1 hour
    )();
    
    // Get existing Pokemon IDs to avoid duplicates - this needs to be fresh each time
    const existingPokemon = await prisma.pokemon.findMany({
      select: { id: true }
    });
    const existingIds = new Set(existingPokemon.map((p: { id: number }) => p.id));
    
    // Shuffle the pokemonList first to avoid fetching all details
    const shuffledPokemonList = [...pokemonList].sort(() => Math.random() - 0.5);
    
    // Find the first Pokemon that isn't in the database
    let availablePokemonDetails = null;
    for (const basicPokemonInfo of shuffledPokemonList) {
      // Fetch full details only if not already caught
      // Assuming fetchPokemonDetails might return an object with an 'id' property
      const details = await fetchPokemonDetails(basicPokemonInfo.name);
      if (details && !existingIds.has(details.id)) {
        availablePokemonDetails = details;
        break;
      }
    }
    
    if (!availablePokemonDetails) {
      return { 
        success: false, 
        error: "No new Pokémon available to catch. You\'ve caught them all or there was an issue fetching new Pokémon details!" 
      };
    }
    
    // Use the Pokemon we\'ve already found and fetched details for
    const pokemonData = availablePokemonDetails;
    
    // Create the pokemon in the database
    await prisma.pokemon.create({
      data: {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.image,
        height: pokemonData.height,
        weight: pokemonData.weight,
        description: pokemonData.description,
      },
    });
    
    // Handle types
    for (const typeName of pokemonData.types) {
      // Get or create the type
      const type = await prisma.type.upsert({
        where: { name: typeName },
        update: {},
        create: { name: typeName },
      });
      
      // Connect pokemon to type
      await prisma.pokemonType.create({
        data: {
          pokemonId: pokemonData.id,
          typeId: type.id,
        }
      });
    }
    
    // Handle abilities
    for (const abilityName of pokemonData.abilities) {
      // Get or create the ability
      const ability = await prisma.ability.upsert({
        where: { name: abilityName },
        update: {},
        create: { name: abilityName },
      });
      
      // Connect pokemon to ability
      await prisma.pokemonAbility.create({
        data: {
          pokemonId: pokemonData.id,
          abilityId: ability.id,
        }
      });
    }
    
    // Create the stats
    await prisma.pokemonStat.create({
      data: {
        pokemonId: pokemonData.id,
        hp: pokemonData.stats.hp,
        attack: pokemonData.stats.attack,
        defense: pokemonData.stats.defense,
        specialAttack: pokemonData.stats.specialAttack,
        specialDefense: pokemonData.stats.specialDefense,
        speed: pokemonData.stats.speed,
      }
    });
    
    // Revalidate paths
    revalidatePath('/pokemon');
    
    return { 
      success: true,
      pokemon: {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.image,
        types: pokemonData.types,
        description: pokemonData.description
      }
    };
  } catch (error) {
    console.error('Error catching random pokemon:', error);
    return { 
      success: false, 
      error: (error as Error).message
    };
  }
}

interface BasicPokemonInfo {
  id: number;
  name: string;
  image: string | null;
  // Add other fields if they are part of the 'pokemon' object returned by prisma
}

interface PokemonTypeAssociation {
  pokemon: BasicPokemonInfo;
  // pokemonId: number; // from PokemonType table if needed
  // typeId: number;    // from PokemonType table if needed
}

interface TypeWithAssociatedPokemon {
  id: number;
  name: string;
  pokemon: PokemonTypeAssociation[];
}

interface PokemonTypeForDetails {
  type: { name: string };
}

interface PokemonAbilityForDetails {
  ability: { name: string };
}

export async function getPokemonByType() {
  try {
    // Get all types with their pokemon
    const types = await prisma.type.findMany({
      include: {
        pokemon: { // This is PokemonType[]
          include: {
            pokemon: true // This is the actual Pokemon record
          }
        }
      }
    });
    
    // Transform data for frontend
    const pokemonByType = (types as TypeWithAssociatedPokemon[]).map((type) => {
      return {
        type: type.name,
        pokemon: type.pokemon.map((p) => p.pokemon)
      };
    });
    
    return pokemonByType;
  } catch (error) {
    console.error('Error fetching pokemon by type:', error);
    throw error;
  }
}

export async function getPokemonDetails(id: number) {
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { id },
      include: {
        types: {
          include: {
            type: true
          }
        },
        abilities: {
          include: {
            ability: true
          }
        },
        stats: true
      }
    });
    
    if (!pokemon) {
      throw new Error(`Pokemon with id ${id} not found`);
    }
    // Assuming 'pokemon' here has 'types' and 'abilities' arrays
    // where each element is an object containing a nested 'type' or 'ability' object.
      return {
      ...pokemon,
      types: pokemon.types.map((t: PokemonTypeForDetails) => t.type.name),
      abilities: pokemon.abilities.map((a: PokemonAbilityForDetails) => a.ability.name),
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    throw error;
  }
}
