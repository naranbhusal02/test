"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-4 font-sans text-cream">
      
      {/* Decorative Glow */}
      <div className="absolute w-[350px] h-[350px] bg-gold/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-sm bg-[#181818] border border-gold/15 rounded-2xl shadow-2xl p-8 space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto">
            <Sparkles className="text-gold w-4 h-4" />
          </div>
          <h1 className="font-serif text-xl tracking-wider uppercase">Gentlemen's Room</h1>
          <p className="text-[10px] text-cream/40 uppercase tracking-widest">Admin Control Panel</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-500/20 text-red-200 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] text-cream/60 uppercase tracking-wider block">Access Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/35">
                <Lock size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                placeholder="••••••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold text-[#121212] text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4.5 h-4.5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Unlock Dashboard</span>
            )}
          </button>
        </form>

      </div>
    </main>
  );
}
