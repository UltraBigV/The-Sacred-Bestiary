import Link from 'next/link';
import { ShieldIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <div className="mb-8 relative">
        <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl animate-pulse"></div>
        <ShieldIcon className="w-24 h-24 text-red-400 relative z-10" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
        404 - Not Found
      </h1>
      
      <p className="text-xl md:text-2xl mb-8 max-w-2xl text-blue-100">
        The Pokémon you seek is not in this realm
      </p>
      
      <Link href="/">
        <Button
          className="flex items-center justify-center gap-3 bg-gradient-to-br from-indigo-700 to-indigo-900 
                 hover:from-indigo-600 hover:to-indigo-800 px-8 py-4 rounded-lg border border-indigo-500
                 shadow-lg transition-all duration-300"
        >
          Return to the Sacred Realm
        </Button>
      </Link>
    </div>
  );
}
