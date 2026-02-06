import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description: "JTLD Consulting serves financial services, healthcare, energy, government, retail, manufacturing, telecom, and education sectors.",
};

const industries = [
  {
    name: "Financial Services",
    href: "/industries/financial-services",
    description: "Banking, insurance, capital markets, and fintech — regulatory compliance, digital transformation, and operational efficiency.",
  },
  {
    name: "Healthcare & Life Sciences",
    href: "/industries/healthcare",
    description: "Hospitals, pharma, biotech, and medtech — patient experience, clinical data, and regulatory compliance.",
  },
  {
    name: "Energy & Utilities",
    href: "/industries/energy",
    description: "Power generation, renewables, oil & gas, and utilities — grid modernization, sustainability, and asset management.",
  },
  {
    name: "Government & Public Sector",
    href: "/industries/government",
    description: "Federal, provincial, and municipal — digital services, citizen experience, and procurement modernization.",
  },
  {
    name: "Retail & E-Commerce",
    href: "/industries/retail",
    description: "Omnichannel retail and marketplace platforms — supply chain, customer analytics, and digital commerce.",
  },
  {
    name: "Manufacturing",
    href: "/industries/manufacturing",
    description: "Discrete and process manufacturing — smart factories, supply chain, and operational technology.",
  },
  {
    name: "Telecommunications",
    href: "/industries/telecom",
    description: "Carriers, ISPs, and network providers — network optimization, customer retention, and 5G strategy.",
  },
  {
    name: "Education",
    href: "/industries/education",
    description: "Universities, colleges, and EdTech — student experience, digital learning, and institutional analytics.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">Industries</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Deep Expertise Across Industries</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Every industry has unique challenges. We bring specialized knowledge and proven frameworks to deliver results in the sectors that matter to you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="group block p-8 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {industry.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{industry.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Learn more
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t See Your Industry?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Our consulting frameworks apply across sectors. Get in touch and we&apos;ll discuss how we can help.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
