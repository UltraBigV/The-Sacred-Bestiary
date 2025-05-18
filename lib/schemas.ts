import { z } from 'zod';

export const PokemonResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  types: z.array(z.object({
    type: z.object({
      name: z.string()
    })
  })),
  sprites: z.object({
    other: z.object({
      'official-artwork': z.object({
        front_default: z.string().nullable()
      })
    })
  }),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(z.object({
    ability: z.object({
      name: z.string()
    })
  })),
  stats: z.array(z.object({
    base_stat: z.number(),
    stat: z.object({
      name: z.string()
    })
  })),
  species: z.object({
    url: z.string()
  })
});

export const PokemonSpeciesSchema = z.object({
  flavor_text_entries: z.array(z.object({
    flavor_text: z.string(),
    language: z.object({
      name: z.string()
    })
  }))
});

export type PokemonResponse = z.infer<typeof PokemonResponseSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
