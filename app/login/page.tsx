'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from 'emailjs-com';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [expectedCode, setExpectedCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (isSignUp) {
      if (users[email]) {
        alert('User already exists');
        return;
      }
      if (!isVerifying) {
        // Generate code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setExpectedCode(code);
        setIsVerifying(true);
        // Send email with code
        emailjs.init('your_user_id'); // Replace with your EmailJS user ID
        emailjs.send('your_service_id', 'your_template_id', { // Replace with your service and template IDs
          to_email: email,
          code: code
        }).then(() => {
          alert('Verification code sent to your email');
        }).catch((error) => {
          console.error('Email send error:', error);
          alert('Failed to send email. Code: ' + code); // Fallback to alert
        });
        return;
      } else {
        if (verificationCode !== expectedCode) {
          alert('Invalid code');
          return;
        }
        users[email] = { password, history: [], isAdmin: false };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', email);
        router.push('/');
      }
    } else {
      if (users[email] && users[email].password === password) {
        localStorage.setItem('currentUser', email);
        router.push('/');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-brand-dark">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-brand-primary text-center">
          {isSignUp ? 'Create Account' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-primary focus:outline-none"
              required
              disabled={isVerifying}
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
              disabled={isVerifying}
            />
          </div>
          {isVerifying && (
            <div>
              <label className="block text-sm font-medium mb-1">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-primary focus:outline-none"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-all"
          >
            {isSignUp ? (isVerifying ? 'Verify & Sign Up' : 'Send Code') : 'Login'}
          </button>
        </form>
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setIsVerifying(false);
            setVerificationCode('');
            setExpectedCode('');
          }}
          className="w-full mt-4 text-brand-primary hover:underline"
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}