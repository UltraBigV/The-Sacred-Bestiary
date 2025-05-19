import { getPokemonByType } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PokemonCard } from '@/components/PokemonCard';

// Define types for the Pokemon data structure
interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonTypeGroup {
  type: string;
  pokemon: Pokemon[];
}

export default async function PokemonListPage() {
  const pokemonByType = await getPokemonByType() as PokemonTypeGroup[];

  // Get type-based color
  const getTypeStyling = (type: string) => {
    const lowerType = type.toLowerCase();
    const styles: Record<string, { bg: string; border: string }> = {
      normal: { bg: 'bg-gray-400', border: 'border-gray-400' },
      fire: { bg: 'bg-red-500', border: 'border-red-500' },
      water: { bg: 'bg-blue-500', border: 'border-blue-500' },
      electric: { bg: 'bg-yellow-400', border: 'border-yellow-400' },
      grass: { bg: 'bg-green-500', border: 'border-green-500' },
      ice: { bg: 'bg-blue-300', border: 'border-blue-300' },
      fighting: { bg: 'bg-red-700', border: 'border-red-700' },
      poison: { bg: 'bg-purple-500', border: 'border-purple-500' },
      ground: { bg: 'bg-amber-600', border: 'border-amber-600' },
      flying: { bg: 'bg-indigo-400', border: 'border-indigo-400' },
      psychic: { bg: 'bg-pink-500', border: 'border-pink-500' },
      bug: { bg: 'bg-lime-500', border: 'border-lime-500' },
      rock: { bg: 'bg-yellow-600', border: 'border-yellow-600' },
      ghost: { bg: 'bg-violet-600', border: 'border-violet-600' },
      dragon: { bg: 'bg-violet-700', border: 'border-violet-700' },
      dark: { bg: 'bg-gray-800', border: 'border-gray-800' },
      steel: { bg: 'bg-gray-500', border: 'border-gray-500' },
      fairy: { bg: 'bg-pink-300', border: 'border-pink-300' },
    };
    return styles[lowerType] || { bg: 'bg-gray-400', border: 'border-gray-400' };
  };
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">The Sacred Bestiary</h1>
        <div className="grid gap-8">
        {pokemonByType.map(({ type, pokemon }: PokemonTypeGroup) => {
          const typeStyle = getTypeStyling(type);
          return (
            <Card key={type} className={`overflow-hidden shadow-lg border-t-8 ${typeStyle.border}`}>
              <CardHeader className={`${typeStyle.bg} bg-opacity-20`}>
                <CardTitle className="text-2xl">{type} Type Pokémon</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
                {pokemon.map((p: Pokemon) => (
                  <div key={p.id} className="h-full">
                    <PokemonCard 
                      id={p.id}
                      name={p.name}
                      types={[type]} // Using the current type from parent map
                      image={p.image}
                      contextualType={type} // Pass the current type group as contextualType
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
