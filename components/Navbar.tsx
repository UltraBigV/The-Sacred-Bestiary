'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldIcon, HomeIcon, DatabaseIcon } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'text-blue-300 hover:text-yellow-300';
  };
  
  return (
    <nav className="bg-indigo-900/80 backdrop-blur-sm border-b border-indigo-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <ShieldIcon className="h-8 w-8 text-yellow-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-indigo-900">P</span>
              </div>
            </div>
            <span className="text-lg font-bold tracking-wider text-blue-100">
              SACRED BESTIARY
            </span>
          </Link>          <div className="flex items-center space-x-6">
            <Link href="/" className={`flex flex-col items-center ${isActive('/')}`}>
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/pokemon" className={`flex flex-col items-center ${isActive('/pokemon')}`}>
              <DatabaseIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Creatures</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
