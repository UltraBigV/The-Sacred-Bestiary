'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldIcon } from 'lucide-react';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export const PokemonCard = ({
  id,
  name,
  types,
  image
}: PokemonCardProps) => {
  const formattedId = String(id).padStart(3, '0');
  
  // Get type-based color
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-600',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
    };
    return typeColors[type.toLowerCase()] || 'bg-gray-500';
  };

  // Get primary type color
  const primaryTypeColor = getTypeColor(types[0].toLowerCase());

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="flex flex-col h-full overflow-hidden rounded-lg border border-indigo-700/30 bg-indigo-950/50 backdrop-blur-sm shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-1 group">
        <div className={`${primaryTypeColor} bg-opacity-30 p-2 flex justify-between items-center border-b border-indigo-700/30`}>
          <span className="text-xs font-semibold text-blue-100">#{formattedId}</span>
          <div className="flex space-x-1">
            {types.map((type) => (
              <span
                key={type}
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${getTypeColor(type.toLowerCase())} text-white`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-2">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 150px"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-indigo-900/20 rounded-lg">
                <ShieldIcon className="w-10 h-10 text-indigo-400/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
          </div>
          <h3 className="text-center font-medium text-lg capitalize group-hover:text-yellow-300 transition-colors">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
