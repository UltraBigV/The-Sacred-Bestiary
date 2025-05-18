import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function PokemonDetailLoading() {
  return (
    <div className="container mx-auto py-6">
      <Link href="/pokemon" passHref>
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Bestiary
        </Button>
      </Link>
      
      <Card className="border-t-8 border-gray-500 shadow-xl">
        <CardHeader className="bg-gray-700 bg-opacity-20">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-indigo-900/50 rounded-lg animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-indigo-900/50 rounded-full animate-pulse"></div>
              <div className="h-6 w-16 bg-indigo-900/50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-indigo-900/30 rounded-lg animate-pulse"></div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <div className="h-4 w-full bg-indigo-900/50 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-indigo-900/50 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-4/6 bg-indigo-900/50 rounded animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Height</h3>
                  <div className="h-4 w-16 bg-indigo-900/50 rounded animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Weight</h3>
                  <div className="h-4 w-16 bg-indigo-900/50 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-indigo-900/50 rounded-full animate-pulse"></div>
                  <div className="h-6 w-24 bg-indigo-900/50 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="stat-item">
                  <div className="text-sm text-gray-400">Stat {i}</div>
                  <div className="h-4 w-12 bg-indigo-900/50 rounded mb-1 animate-pulse"></div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
