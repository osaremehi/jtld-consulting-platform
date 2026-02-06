"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Business Consulting", href: "/services/business-consulting" },
      { label: "Business Process Services", href: "/services/business-process" },
      { label: "Managed IT Services", href: "/services/managed-it" },
      { label: "Artificial Intelligence", href: "/services/ai" },
      { label: "Data Analytics", href: "/services/data-analytics" },
      { label: "Cloud & Hybrid IT", href: "/services/cloud-hybrid" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Healthcare & Life Sciences", href: "/industries/healthcare" },
      { label: "Energy & Utilities", href: "/industries/energy" },
      { label: "Government & Public Sector", href: "/industries/government" },
      { label: "Retail & E-Commerce", href: "/industries/retail" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "View All Industries", href: "/industries" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary-900 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <a href="mailto:info@jtldinc.com" className="hover:text-primary-200 transition-colors">
              info@jtldinc.com
            </a>
            <span className="hidden sm:inline text-primary-300">|</span>
            <a href="tel:+16475551234" className="hidden sm:inline hover:text-primary-200 transition-colors">
              (647) 555-1234
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hover:text-primary-200 transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.svg" alt="JTLD Consulting" width={48} height={52} priority />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-primary-900">JTLD</span>
              <span className="text-xs text-gray-500 tracking-widest uppercase">Consulting</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors rounded-md hover:bg-gray-50"
                >
                  {link.label}
                  {link.children && (
                    <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA button (desktop) */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/consultation"
              className="text-sm font-medium px-5 py-2.5 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors"
            >
              Get a Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => !link.children && setMobileOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-md"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-6 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-1.5 text-sm text-gray-600 hover:text-primary-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-3">
              <Link
                href="/consultation"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-medium px-4 py-2.5 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors"
              >
                Get a Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
