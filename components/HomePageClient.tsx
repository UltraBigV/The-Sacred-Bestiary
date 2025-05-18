// Creating minimal client component to fix encoding issues
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { catchRandomPokemon } from '@/lib/actions';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CatchingAnimation from '@/components/CatchingAnimation';
import { PokeBallCatchModal } from '@/components/PokeBallCatchModal';

export default function HomePageClient() {
  const [catchStatus, setCatchStatus] = useState<{
    loading: boolean;
    success?: boolean;
    error?: string;
    pokemon?: {
      id: number;
      name: string;
      image: string;
      types: string[];
      description: string;
    };
  }>({ loading: false });
  const [showCatchModal, setShowCatchModal] = useState(false);
  
  return (
    <>
      {/* Catch Error Alert */}
      {catchStatus.error && !catchStatus.loading && !showCatchModal && (
        <Alert className="mb-8 max-w-md border-red-500 bg-red-500/10">
          <AlertTitle className="text-red-500">Pokémon Encounter Failed</AlertTitle>
          <AlertDescription>{catchStatus.error}</AlertDescription>
        </Alert>
      )}
      
      {/* PokeBall Animation */}
      {catchStatus.loading && (
        <div className="mb-8 min-h-[200px]">
          <CatchingAnimation 
            isLoading={catchStatus.loading}
            pokemon={catchStatus.pokemon}
            onAnimationComplete={() => {
              console.log("Animation complete callback triggered");
              
              // Check if the API call has completed and we have Pokemon data
              if (catchStatus.pokemon) {
                // If the API call is done, we can complete the animation flow
                console.log("Pokemon data is available, completing animation flow");
                setCatchStatus({ 
                  loading: false, 
                  success: catchStatus.success, 
                  pokemon: catchStatus.pokemon,
                  error: catchStatus.error
                });
                
                // Show the modal if we have a successful catch
                if (catchStatus.success && catchStatus.pokemon) {
                  console.log("Showing catch modal");
                  setShowCatchModal(true);
                }
              } else {
                // If the API call is still in progress, we need to wait for it
                console.log("Pokemon data not yet available, waiting for API call to complete");
                
                // We'll create a polling mechanism to check for Pokemon data
                const checkInterval = setInterval(() => {
                  console.log("Checking if Pokemon data is available now...");
                  if (catchStatus.pokemon) {
                    clearInterval(checkInterval);
                    console.log("Pokemon data received, completing animation flow");
                    
                    setCatchStatus({
                      loading: false,
                      success: catchStatus.success,
                      pokemon: catchStatus.pokemon,
                      error: catchStatus.error
                    });
                    
                    if (catchStatus.success && catchStatus.pokemon) {
                      console.log("Showing catch modal after API completed");
                      setShowCatchModal(true);
                    }
                  }
                }, 500); // Check every 500ms
                
                // Safety cleanup after 10 seconds
                setTimeout(() => {
                  clearInterval(checkInterval);
                  if (!catchStatus.pokemon) {
                    console.error("API call took too long, ending animation anyway");
                    setCatchStatus({
                      loading: false,
                      success: false,
                      error: "Couldn't find any new Pokémon to catch. Please try again."
                    });
                  }
                }, 10000);
              }
            }}
          />
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Catch Random Pokemon Button */}
        <form action={() => {
          // Immediately set loading state to true to start animation right away
          setCatchStatus({ loading: true });
          console.log("Setting loading state to true - animation should start now");
          
          // Start API call in the background AFTER the next render cycle to ensure animation starts first
          setTimeout(() => {
            console.log("Starting API call");
            catchRandomPokemon()
              .then(result => {
                console.log("API call complete", result);
                
                // Save the result in the state, but keep loading as true until animation completes
                setCatchStatus({ 
                  loading: true,  // Still loading until animation completes
                  success: result.success, 
                  pokemon: result.pokemon,
                  error: result.error
                });
              })
              .catch(error => {
                console.error("Error catching Pokemon:", error);
                setCatchStatus({ 
                  loading: false, 
                  success: false, 
                  error: error instanceof Error ? error.message : 'Unknown error' 
                });
              });
          }, 10); // Small delay to ensure animation starts first
        }}>
          <Button 
            type="submit"
            className="group flex items-center justify-center gap-3 bg-gradient-to-br from-red-700 to-red-900 
                 hover:from-red-600 hover:to-red-800 px-8 py-4 rounded-lg border border-red-500
                 shadow-lg transition-all duration-300 hover:shadow-red-500/40"
          >
            {catchStatus.loading ? (
              'Catching Pokémon...'
            ) : 'Catch a Pokémon!'}
          </Button>
        </form>
        
        <Link href="/pokemon">
          <Button
            className="flex items-center justify-center gap-3 bg-indigo-900/50 hover:bg-indigo-800/50 
                     px-8 py-4 rounded-lg border border-indigo-700/50 hover:border-indigo-600
                     shadow-lg transition-all duration-300 text-white"
          >
            View Bestiary
          </Button>
        </Link>
      </div>

      {/* Pokemon Catch Modal */}
      {catchStatus.pokemon && (
        <PokeBallCatchModal
          pokemon={catchStatus.pokemon}
          isOpen={showCatchModal}
          onClose={() => {
            // First hide the modal UI
            setShowCatchModal(false);
            
            // Important: Add a small delay before resetting the catch status
            // This prevents animation retriggering during the modal close animation
            setTimeout(() => {
              // Completely reset all animation and data state
              setCatchStatus({
                loading: false,
                success: undefined,
                error: undefined,
                pokemon: undefined
              });
              console.log("Animation and catch state completely reset");
            }, 300); // Small delay to ensure modal closes first
          }}
        />
      )}
    </>
  );
}
