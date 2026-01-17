'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-brand-dark">
      <main className="flex flex-col items-center text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary">
          Board Exam Reviewer
        </h1>
        <p className="text-xl mb-8 opacity-80">
          Master your licensure exam with progress tracking and simulations.
        </p>
        
        <div className="w-full">
          {currentUser ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Link href="/review?subject=Crop%20Science">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Crop Science</h3>
                    <p className="text-gray-600">Study plant growth, nutrients, and cultivation.</p>
                  </div>
                </Link>
                <Link href="/review?subject=Soil%20Science">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Soil Science</h3>
                    <p className="text-gray-600">Learn about soil composition and fertility.</p>
                  </div>
                </Link>
                <Link href="/review?subject=Crop%20Protection">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Crop Protection</h3>
                    <p className="text-gray-600">Explore pest management and disease control.</p>
                  </div>
                </Link>
                <Link href="/review?subject=Animal%20Science">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Animal Science</h3>
                    <p className="text-gray-600">Understand animal nutrition and health.</p>
                  </div>
                </Link>
                <Link href="/review?subject=Agricultural%20Economics">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Agricultural Economics</h3>
                    <p className="text-gray-600">Study farm management and market principles.</p>
                  </div>
                </Link>
                <Link href="/review?subject=Extension">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-brand-primary">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Extension</h3>
                    <p className="text-gray-600">Learn about agricultural education and outreach.</p>
                  </div>
                </Link>
              </div>
              <div className="flex gap-4 justify-center">
                <Link href="/profile">
                  <button className="px-6 py-3 border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold">
                    Profile
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <button className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-all font-semibold shadow-md">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}