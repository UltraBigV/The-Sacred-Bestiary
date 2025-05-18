import { ShieldIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <div className="animate-pulse">
        <ShieldIcon className="w-24 h-24 text-yellow-500 animate-bounce" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-blue-100">
        Summoning Creatures...
      </h2>
    </div>
  );
}
