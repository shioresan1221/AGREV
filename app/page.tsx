'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      setIsAdmin(users[user]?.isAdmin || false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-brand-light text-brand-dark">
      <main className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary">
          Board Exam Reviewer
        </h1>
        <p className="text-xl mb-8 opacity-80">
          Master your licensure exam with progress tracking and simulations.
        </p>
        
        <div className="flex gap-4">
          {currentUser ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Link href="/review?subject=Crop%20Science">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Crop Science
                  </button>
                </Link>
                <Link href="/review?subject=Soil%20Science">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Soil Science
                  </button>
                </Link>
                <Link href="/review?subject=Crop%20Protection">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Crop Protection
                  </button>
                </Link>
                <Link href="/review?subject=Animal%20Science">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Animal Science
                  </button>
                </Link>
                <Link href="/review?subject=Agricultural%20Economics">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Agricultural Economics
                  </button>
                </Link>
                <Link href="/review?subject=Extension">
                  <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                    Extension
                  </button>
                </Link>
              </div>
              <Link href="/profile">
                <button className="px-6 py-3 border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold">
                  Profile
                </button>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold">
                    Admin Panel
                  </button>
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold"
              >
                Logout ({currentUser})
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}