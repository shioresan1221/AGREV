'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  password: string;
  history: any[];
  isAdmin: boolean;
}

export default function AdminPage() {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    if (user !== 'sanjonri112018@gmail.com') {
      router.push('/');
      return;
    }
    const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
    setCurrentUser(user);
    setUsers(allUsers);
  }, [router]);

  const handleDeleteUser = (email: string) => {
    if (email === currentUser) {
      alert('Cannot delete yourself');
      return;
    }
    const updatedUsers = { ...users };
    delete updatedUsers[email];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleToggleAdmin = (email: string) => {
    const updatedUsers = { ...users };
    updatedUsers[email].isAdmin = !updatedUsers[email].isAdmin;
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="p-6 text-brand-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-brand-primary">Admin Panel</h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <div className="space-y-4">
            {Object.entries(users).map(([email, user]) => (
              <div key={email} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold">{email}</p>
                  <p className="text-sm text-gray-600">History: {user.history.length} attempts</p>
                  {user.isAdmin && <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Admin</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleAdmin(email)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(email)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}