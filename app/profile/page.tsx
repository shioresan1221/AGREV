'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    setHistory(users[user]?.history || []);
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-light p-6 text-brand-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-brand-primary">Profile: {currentUser}</h1>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-brand-primary">Exam History</h2>
          {history.length === 0 ? (
            <p>No exams taken yet.</p>
          ) : (
            <div className="space-y-4">
              {history.map((exam, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Score: {exam.score} / {exam.total}</p>
                      <p className="text-sm text-gray-600">Skipped: {exam.skipped || 0}</p>
                      <p className="text-sm text-gray-600">Date: {formatDate(exam.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-brand-primary">
                        {Math.round((exam.score / exam.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => router.push('/review')}
            className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
          >
            Start New Exam
          </button>
          <button 
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}