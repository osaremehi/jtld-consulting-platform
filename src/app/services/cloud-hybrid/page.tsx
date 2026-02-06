import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloud & Hybrid IT",
  description: "Cloud strategy and hybrid infrastructure — migration, multi-cloud management, DevOps, and cost optimization.",
};

const capabilities = [
  { title: "Cloud Migration", description: "Plan and execute workload migration to AWS, Azure, or GCP with minimal disruption and a clear cost model." },
  { title: "Hybrid Architecture", description: "Design infrastructure that spans on-premises and cloud, giving you flexibility without sacrificing control or compliance." },
  { title: "Cost Optimization", description: "Audit your cloud spend, right-size resources, and implement FinOps practices that keep costs aligned with value." },
  { title: "DevOps & Automation", description: "Build CI/CD pipelines, infrastructure-as-code, and platform engineering practices that accelerate delivery." },
  { title: "Multi-Cloud Management", description: "Manage workloads across multiple cloud providers with unified governance, security, and visibility." },
  { title: "Cloud Security", description: "Implement cloud-native security controls, identity management, and compliance monitoring from day one." },
];

export default function CloudHybridPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Cloud Strategy &amp; Hybrid Infrastructure</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Cloud &amp; Hybrid IT</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Migrate, modernize, and optimize your infrastructure with a cloud strategy built for performance, security, and cost efficiency.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Cloud isn&apos;t just infrastructure — it&apos;s a business decision. We help you choose the right model, migrate smoothly, and manage your environment to maximize value while minimizing risk and cost.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for the Cloud?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s design a cloud strategy that fits your business — not the other way around.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
