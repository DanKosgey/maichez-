import React, { useState } from 'react';
import { Lock, TrendingUp, ArrowRight, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '../supabase/client';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // --- LOGIN LOGIC ---
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      // App.tsx listener will handle the rest (redirect, profile fetch)
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-trade-neon/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md bg-trade-dark border border-gray-800 rounded-3xl p-8 relative z-10 shadow-2xl shadow-black/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-800 mb-6 border border-gray-700">
            <TrendingUp className="h-8 w-8 text-trade-neon" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Access the Mbauni Protocol Terminal</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-trade-neon focus:ring-1 focus:ring-trade-neon outline-none transition"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-trade-neon focus:ring-1 focus:ring-trade-neon outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20 flex items-center justify-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-green-500 text-sm font-medium text-center bg-green-500/10 py-3 rounded-lg border border-green-500/20">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-trade-neon hover:bg-green-400 text-black font-black py-4 rounded-xl text-lg transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-trade-neon/20"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                Login to Portal
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <button onClick={onBack} className="w-full text-gray-500 text-sm hover:text-white transition">
            &larr; Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;