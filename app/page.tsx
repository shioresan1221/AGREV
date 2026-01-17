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
              <Link href="/review">
                <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-primary transition-all font-semibold shadow-md">
                  Start Review
                </button>
              </Link>
              <Link href="/profile">
                <button className="px-6 py-3 border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold">
                  Profile
                </button>
              </Link>
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