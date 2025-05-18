'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PokemonCatch {
  id: number;
  name: string;
  image: string;
  types: string[];
  description: string;
}

interface PokeBallCatchModalProps {
  pokemon: PokemonCatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokeBallCatchModal = ({ pokemon, isOpen, onClose }: PokeBallCatchModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle proper close sequence
  const handleClose = () => {
    console.log("Modal - Starting close sequence");
    setIsClosing(true);
    setShowDetails(false);
    
    // Wait for animations to complete before triggering parent's onClose
    setTimeout(() => {
      onClose();
      // Reset our internal state after parent handles close
      setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 100);
    }, 300);
  };
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Add a small delay before showing the Pokémon details for a dramatic reveal
      const timer = setTimeout(() => {
        if (!isClosing) {
          setShowDetails(true);
        }
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Only handle close if not already in closing state
      if (!isClosing) {
        setShowDetails(false);
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, isClosing]);

  if (!isVisible) return null;
  
  // Handle color mapping for Pokemon types
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
      ground: 'bg-amber-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-500',
      rock: 'bg-yellow-600',
      ghost: 'bg-violet-600',
      dragon: 'bg-violet-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 transition-all duration-300">
      <div 
        className={`relative bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-500 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
            {!showDetails ? "A wild Pokémon appeared!" : "Gotcha!"}
          </h2>
          
          {pokemon && showDetails ? (
            <div className="animate-fadeIn">
              <div className="flex justify-center mb-4">
                <div className="relative h-40 w-40">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold capitalize text-center mb-2">
                {pokemon.name} <span className="text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</span>
              </h3>
              
              <div className="flex justify-center gap-2 mb-4">
                {pokemon.types.map(type => (
                  <Badge key={type} className={`${getTypeColor(type.toLowerCase())} text-white capitalize`}>
                    {type}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-300 text-center text-sm mb-6">
                {pokemon.description}
              </p>
              
              <div className="text-center">                <p className="text-green-400 font-semibold mb-4">
                  {pokemon.name} was added to your Bestiary!
                </p>
                <Button onClick={handleClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-24 h-24 relative">                <Image
                  src="/pokeball.svg"
                  alt="PokéBall"
                  fill
                  className={`object-contain ${showDetails ? 'animate-bounce' : 'animate-pulse'}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
