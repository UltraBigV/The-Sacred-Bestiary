'use client';

import { Button } from '@/components/ui/button';
import { ShieldIcon } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-4">
      <div className="mb-8 relative">
        <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl"></div>
        <ShieldIcon className="w-24 h-24 text-red-400 relative z-10" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
        Something went wrong!
      </h1>
      
      <p className="text-lg md:text-xl mb-2 max-w-2xl text-blue-100">
        An error occurred in the application
      </p>
      
      <p className="text-sm text-gray-400 mb-8 max-w-md">
        {error.message || "Unknown error occurred"}
      </p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={reset}
          className="bg-gradient-to-br from-indigo-700 to-indigo-900 
                 hover:from-indigo-600 hover:to-indigo-800 rounded-lg border border-indigo-500
                 shadow-lg transition-all duration-300"
        >
          Try Again
        </Button>
        
        <Link href="/">
          <Button variant="outline">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
