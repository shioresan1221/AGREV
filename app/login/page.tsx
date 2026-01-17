'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (isSignUp) {
      if (users[username]) {
        alert('User already exists');
        return;
      }
      users[username] = { password, history: [] };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', username);
      router.push('/');
    } else {
      if (users[username] && users[username].password === password) {
        localStorage.setItem('currentUser', username);
        router.push('/');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-brand-dark">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-brand-primary text-center">
          {isSignUp ? 'Create Account' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-primary focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-primary focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-all"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-brand-primary hover:underline"
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}