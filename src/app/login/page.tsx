"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Placeholder — no auth backend yet
    setTimeout(() => {
      setError("Authentication is not yet available. The client portal is coming soon.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-md px-12 text-center">
          <Link href="/" className="inline-block mb-10">
            <Image src="/logo.svg" alt="JTLD Consulting" width={64} height={70} />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-primary-200 leading-relaxed">
            Access your client portal to track projects, review deliverables, and collaborate with your JTLD team.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Project Tracking", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
              { label: "Deliverables", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
              { label: "Team Chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
            ].map((item) => (
              <div key={item.label}>
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="text-xs text-primary-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.svg" alt="JTLD Consulting" width={40} height={44} />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-primary-900">JTLD</span>
                <span className="text-xs text-gray-500 tracking-widest uppercase">Consulting</span>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Log in to your account</h1>
              <p className="text-sm text-gray-600">
                Access the JTLD Client Portal to manage your engagements.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/login"
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-primary-700 hover:text-primary-800">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Need help?{" "}
            <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
