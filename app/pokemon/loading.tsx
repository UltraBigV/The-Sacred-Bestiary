export default function PokemonLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-center mb-8">
        <div className="h-8 w-64 bg-indigo-900/50 rounded-lg animate-pulse"></div>
      </div>
      
      <div className="grid gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="overflow-hidden border-t-8 border-gray-500 shadow-lg rounded-lg">
            <div className="bg-gray-700 bg-opacity-20 p-4">
              <div className="h-8 w-48 bg-indigo-900/50 rounded-lg animate-pulse"></div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3 rounded-lg bg-gray-800 animate-pulse">
                    <div className="w-24 h-24 rounded-full bg-indigo-900/50 mb-2"></div>
                    <div className="h-4 w-20 bg-indigo-900/50 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
