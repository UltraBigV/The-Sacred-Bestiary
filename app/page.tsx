import { ShieldIcon } from 'lucide-react';
import HomePageClient from '@/components/HomePageClient';

// This is now a Server Component by default (no 'use client')
export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <div className="mb-8 relative">
        <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
        <ShieldIcon className="w-24 h-24 text-yellow-500 relative z-10" />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
        The Sacred Bestiary
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl text-blue-100">
        Explore the mystical creatures of the Pokémon world
      </p>
      
      {/* Client Component that handles all interactive elements */}
      <HomePageClient />
    </div>
  );
}
