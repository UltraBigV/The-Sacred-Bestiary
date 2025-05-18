'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CatchingAnimationProps {
  isLoading: boolean;
  pokemon?: {
    id: number;
    name: string;
    image: string;
    types: string[];
    description: string;
  } | null;
  onAnimationComplete?: () => void;
}

export default function CatchingAnimation({ isLoading, pokemon, onAnimationComplete }: CatchingAnimationProps) {
  // Animation states
  const [animationStage, setAnimationStage] = useState<'idle' | 'bushes' | 'pokeball'>('idle');
  const [shakesCount, setShakesCount] = useState(0);
  const [pokeballPosition, setPokeballPosition] = useState<'left' | 'center' | 'right'>('center');
  const maxShakes = 3;
  
  // Watch for Pokemon data to become available
  useEffect(() => {
    console.log("Animation - Pokemon data:", pokemon);
    // If we have Pokemon data and we're in bushes stage, force transition to pokeball
    if (pokemon && animationStage === 'bushes') {
      console.log("Animation - Pokemon data received, switching to pokeball immediately");
      setAnimationStage('pokeball');
    }
  }, [pokemon, animationStage]);
  // Start initial animation sequence
  useEffect(() => {
    console.log("Animation - isLoading changed:", isLoading, "current stage:", animationStage);
    
    if (!isLoading) {
      // Clean complete animation state when loading is turned off
      console.log("Animation - isLoading turned off, resetting all animation state");
      setAnimationStage('idle');
      setShakesCount(0);
      setPokeballPosition('center');
      return;
    }
    
    if (animationStage === 'idle') {
      // Start with rustling bushes immediately when button is clicked
      console.log("Animation - Starting with bushes");
      setAnimationStage('bushes');
      
      // If we already have Pokemon data, switch to pokeball immediately
      if (pokemon) {
        console.log("Animation - Pokemon data already available, switching to pokeball");
        setAnimationStage('pokeball');
      }
    }
  }, [isLoading, animationStage, pokemon]);
  // PokeBall shaking animation effect
  useEffect(() => {
    // Don't start animation if not in pokeball stage or loading is false
    if (animationStage !== 'pokeball' || !isLoading) return;
    
    console.log("Animation - Starting pokeball shaking animation");
    const shakeDelay = 400;
    let currentShake = 0;
    let sequenceCount = 0; // Track number of complete shake sequences
    const maxSequences = 2; // Max number of complete shake sequences
    
    // Keep track of all timers for proper cleanup
    const allTimers: NodeJS.Timeout[] = [];
    
    // Shake sequence function
    const shakeSequence = () => {
      // Don't continue if loading state changed
      if (!isLoading) {
        console.log("Animation - Loading turned off during shake sequence, stopping");
        return;
      }
      
      // Right tilt
      setPokeballPosition('right');
      
      const timer1 = setTimeout(() => {
        // Check again if still loading
        if (!isLoading) return;
        
        // Back to center
        setPokeballPosition('center');
        
        const timer2 = setTimeout(() => {
          if (!isLoading) return;
          
          // Left tilt
          setPokeballPosition('left');
          
          const timer3 = setTimeout(() => {
            if (!isLoading) return;
            
            // Back to center and count shake
            setPokeballPosition('center');
            currentShake++;
            setShakesCount(currentShake);
            
            // Continue shaking if needed
            if (currentShake < maxShakes) {
              const nextShakeTimer = setTimeout(shakeSequence, shakeDelay);
              allTimers.push(nextShakeTimer);
            } else {
              // Animation complete
              console.log("Animation - Pokeball shaking complete");
              
              // If we completed all shakes, notify parent component
              onAnimationComplete?.();
              
              // If we're still in loading state (API call not complete)
              // Continue the animation with more gentle shaking but limit the number of sequences
              if (isLoading && sequenceCount < maxSequences) {
                sequenceCount++; // Increment the sequence counter
                console.log(`Animation - API call still in progress, continuing shaking (sequence ${sequenceCount}/${maxSequences})`);
                
                const pauseTimer = setTimeout(() => {
                  if (!isLoading) return;
                  
                  // Reset shake count but keep in pokeball stage for extended animation
                  setShakesCount(0);
                  currentShake = 0;
                  
                  const nextSequenceTimer = setTimeout(shakeSequence, 500); // Start a new shake sequence after a pause
                  allTimers.push(nextSequenceTimer);
                }, 1000);
                
                allTimers.push(pauseTimer);
              } else if (isLoading) {
                // We've reached max sequences but still loading - just show the final state
                console.log("Animation - Reached max shake sequences, showing waiting state");
                // Keep current visual state but don't start new sequences
              }
            }
          }, shakeDelay);
          allTimers.push(timer3);
        }, shakeDelay);
        allTimers.push(timer2);
      }, shakeDelay);
      allTimers.push(timer1);
    };
    
    // Start the shake sequence
    const initialTimer = setTimeout(shakeSequence, 100);
    allTimers.push(initialTimer);
    
    // Enhanced cleanup function to prevent memory leaks and stop animation immediately
    return () => {
      // Clear all tracked timers
      allTimers.forEach(timer => clearTimeout(timer));
      console.log(`Animation - Cleaned up ${allTimers.length} timers from PokeBall animation`);
      
      // Reset animation state to prevent visual glitches during cleanup
      setPokeballPosition('center');
    };
  }, [animationStage, isLoading, maxShakes, onAnimationComplete]);
  
  // If not loading, don't render anything
  if (!isLoading) return null;
  
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 min-h-[200px]">
      {animationStage === 'bushes' && (
        <div className="bg-gray-800/40 p-6 rounded-lg border border-lime-500/30">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl animate-bounce" style={{animationDuration: "0.8s", animationDelay: "0s"}}>🌿</span>
            <span className="text-6xl animate-bounce" style={{animationDuration: "0.8s", animationDelay: "0.3s"}}>🌿</span>
            <span className="text-6xl animate-bounce" style={{animationDuration: "0.8s", animationDelay: "0.6s"}}>🌿</span>
          </div>
          <p className="text-xl font-semibold text-lime-400 animate-pulse">
            There's a rustling in the bushes...
          </p>
        </div>
      )}
      
      {animationStage === 'pokeball' && (
        <div className="flex flex-col items-center">
          <div 
            className="transition-transform duration-300 mb-6"
            style={{
              width: 128,
              height: 128,
              transform: 
                pokeballPosition === 'left' ? 'translateX(-20px) rotate(-8deg)' : 
                pokeballPosition === 'right' ? 'translateX(20px) rotate(8deg)' : 
                'translateX(0) rotate(0deg)'
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/pokeball.svg" 
                alt="PokéBall"
                width={128}
                height={128}
                priority
              />
            </div>
          </div>          <div className="text-center text-lg font-semibold">
            {shakesCount < maxShakes ? (
              `Catching... ${shakesCount}/${maxShakes}`
            ) : pokemon ? (
              <span className="text-green-400">Pokémon caught!</span>
            ) : (
              <span className="text-green-400 animate-pulse">Retrieving Pokémon...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
