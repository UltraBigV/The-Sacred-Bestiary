import { getPokemonDetails } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

// This function helps with static generation
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

// Using server component for data fetching
export default async function PokemonDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> // Type params as a Promise
}) {
  try {
    // Await the params Promise to get the resolved parameters
    const resolvedParams = await params;
    
    // Server-side data fetching
    const id = parseInt(resolvedParams.id); // Use resolvedParams.id
    
    if (isNaN(id)) {
      notFound();
    }
    
    const pokemon = await getPokemonDetails(id);
    
    if (!pokemon) {
      notFound();
    }
    
    // Type-based color mapping
    const getTypeStyling = (type: string) => {
      const lowerType = type.toLowerCase();
      const styles: Record<string, { bg: string; border: string; text?: string }> = {
        normal: { bg: 'bg-gray-400', border: 'border-gray-400', text: 'text-black' },
        fire: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-white' },
        water: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-white' },
        electric: { bg: 'bg-yellow-400', border: 'border-yellow-400', text: 'text-black' },
        grass: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-white' },
        ice: { bg: 'bg-blue-300', border: 'border-blue-300', text: 'text-black' },
        fighting: { bg: 'bg-red-700', border: 'border-red-700', text: 'text-white' },
        poison: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-white' },
        ground: { bg: 'bg-amber-600', border: 'border-amber-600', text: 'text-white' },
        flying: { bg: 'bg-indigo-400', border: 'border-indigo-400', text: 'text-white' },
        psychic: { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-white' },
        bug: { bg: 'bg-lime-500', border: 'border-lime-500', text: 'text-black' },
        rock: { bg: 'bg-yellow-600', border: 'border-yellow-600', text: 'text-white' },
        ghost: { bg: 'bg-violet-600', border: 'border-violet-600', text: 'text-white' },
        dragon: { bg: 'bg-violet-700', border: 'border-violet-700', text: 'text-white' },
        dark: { bg: 'bg-gray-800', border: 'border-gray-800', text: 'text-white' },
        steel: { bg: 'bg-gray-500', border: 'border-gray-500', text: 'text-white' },
        fairy: { bg: 'bg-pink-300', border: 'border-pink-300', text: 'text-black' },
      };      
      return styles[lowerType] || { bg: 'bg-gray-400', border: 'border-gray-400', text: 'text-black' };
    };
    
    // Get primary type and its color
    const primaryTypeStyle = getTypeStyling(pokemon.types[0]);
    
    return (
      <div className="container mx-auto py-6">
        <Link href="/pokemon" passHref>
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Bestiary
          </Button>
        </Link>
        
        <Card className={`border-t-8 ${primaryTypeStyle.border} shadow-xl`}>
          <CardHeader className={`${primaryTypeStyle.bg} bg-opacity-20`}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl capitalize">
                {pokemon.name} <span className="text-gray-400 ml-2">#{pokemon.id.toString().padStart(3, '0')}</span>
              </CardTitle>              <div className="flex gap-2">
                {pokemon.types.map((type: string) => {
                  const typeStyle = getTypeStyling(type);
                  return (
                    <Badge key={type} className={`${typeStyle.bg} ${typeStyle.text}`}>
                      {type}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    sizes="256px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p>{pokemon.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Height</h3>
                    <p>{pokemon.height} m</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Weight</h3>
                    <p>{pokemon.weight} kg</p>
                  </div>
                </div>
                  <div>
                  <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability: string) => (
                      <Badge key={ability} variant="outline" className="capitalize">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {pokemon.stats && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">HP</div>
                    <div className="text-lg font-bold">{pokemon.stats.hp}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${(pokemon.stats.hp / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">Attack</div>
                    <div className="text-lg font-bold">{pokemon.stats.attack}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">Defense</div>
                    <div className="text-lg font-bold">{pokemon.stats.defense}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">Special Attack</div>
                    <div className="text-lg font-bold">{pokemon.stats.specialAttack}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${(pokemon.stats.specialAttack / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">Special Defense</div>
                    <div className="text-lg font-bold">{pokemon.stats.specialDefense}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${(pokemon.stats.specialDefense / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="text-sm text-gray-400">Speed</div>
                    <div className="text-lg font-bold">{pokemon.stats.speed}</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: `${(pokemon.stats.speed / 255) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error in PokemonDetailPage:', error);
    notFound();
  }
}
