"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    // Placeholder — no auth backend yet
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Account Created</h1>
            <p className="text-gray-600 mb-2">
              Thank you for signing up, {form.firstName}!
            </p>
            <p className="text-sm text-gray-500 mb-8">
              The JTLD Client Portal is currently under development. We&apos;ll notify you at{" "}
              <strong className="text-gray-700">{form.email}</strong> when it&apos;s ready.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/consultation"
                className="block w-full px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Join the JTLD Platform
          </h2>
          <p className="text-primary-200 leading-relaxed mb-10">
            Create your account to access the client portal, track project progress, and collaborate with your consulting team.
          </p>
          <div className="space-y-4 text-left">
            {[
              { text: "Real-time project dashboards", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
              { text: "Secure document sharing", icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" },
              { text: "Direct team communication", icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" },
              { text: "Milestone & budget tracking", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="text-sm text-primary-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-12">
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-sm text-gray-600">
                Get started with the JTLD Client Portal.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    required
                    autoComplete="family-name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  autoComplete="organization"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="agreed"
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => update("agreed", e.target.checked)}
                  className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium underline">
                    Privacy Policy
                  </Link>
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary-700 hover:text-primary-800">
                  Log in
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
