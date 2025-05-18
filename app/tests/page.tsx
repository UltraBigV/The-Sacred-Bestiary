'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Database as DatabaseIcon, Activity as ActivityIcon } from 'lucide-react';
import { testApiConnection, testDatabaseConnection } from '@/lib/tests';

interface TestResultSuccess {
  success: true;
  data?: unknown; // Or a more specific type if known
  message?: string;
}

interface TestResultError {
  success: false;
  error: string;
}

type TestResult = TestResultSuccess | TestResultError;

export default function TestingPage() {
  const [apiResult, setApiResult] = useState<TestResult | null>(null);
  const [dbResult, setDbResult] = useState<TestResult | null>(null);
  const [isApiTesting, setIsApiTesting] = useState(false);
  const [isDbTesting, setIsDbTesting] = useState(false);
  
  const handleTestApi = async () => {
    setIsApiTesting(true);
    try {
      const result = await testApiConnection();
      setApiResult(result as TestResult);
    } catch (error) {
      setApiResult({
        success: false,
        error: (error as Error).message
      });
    } finally {
      setIsApiTesting(false);
    }
  };
  
  const handleTestDb = async () => {
    setIsDbTesting(true);
    try {
      const result = await testDatabaseConnection();
      setDbResult(result as TestResult);
    } catch (error) {
      setDbResult({
        success: false,
        error: (error as Error).message
      });
    } finally {
      setIsDbTesting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
        System Tests
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-indigo-900/30 rounded-lg border border-indigo-700/50 p-6">
          <div className="flex items-center mb-4">
            <ActivityIcon className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold">PokéAPI Connection Test</h2>
          </div>
          
          <p className="text-blue-100 mb-4">
            Tests the connection to the external Pokémon API.
          </p>
          
          <Button 
            onClick={handleTestApi} 
            disabled={isApiTesting}
            className="w-full"
          >
            {isApiTesting ? 'Testing...' : 'Test API Connection'}
          </Button>
          
          {apiResult && (
            <div className="mt-4 p-4 rounded-md bg-black/20">
              <h3 className="font-semibold mb-2">
                {apiResult.success 
                  ? <span className="text-green-400">Success!</span> 
                  : <span className="text-red-400">Failed</span>}
              </h3>
              <pre className="overflow-auto text-xs whitespace-pre-wrap">
                {JSON.stringify(apiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="bg-indigo-900/30 rounded-lg border border-indigo-700/50 p-6">
          <div className="flex items-center mb-4">
            <DatabaseIcon className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold">Database Connection Test</h2>
          </div>
          
          <p className="text-blue-100 mb-4">
            Tests the connection to the PostgreSQL database.
          </p>
          
          <Button 
            onClick={handleTestDb} 
            disabled={isDbTesting}
            className="w-full"
          >
            {isDbTesting ? 'Testing...' : 'Test Database Connection'}
          </Button>
          
          {dbResult && (
            <div className="mt-4 p-4 rounded-md bg-black/20">
              <h3 className="font-semibold mb-2">
                {dbResult.success 
                  ? <span className="text-green-400">Success!</span> 
                  : <span className="text-red-400">Failed</span>}
              </h3>
              <pre className="overflow-auto text-xs whitespace-pre-wrap">
                {JSON.stringify(dbResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
