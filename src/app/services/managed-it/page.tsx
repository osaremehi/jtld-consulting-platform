import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Managed IT Services",
  description: "End-to-end IT outsourcing — 24/7 monitoring, infrastructure management, cybersecurity, and IT service desk.",
};

const capabilities = [
  { title: "24/7 Monitoring & Support", description: "Round-the-clock infrastructure monitoring with proactive alerting and rapid incident response." },
  { title: "Infrastructure Management", description: "Full lifecycle management of servers, networks, storage, and endpoints — on-premises or in the cloud." },
  { title: "Cybersecurity Operations", description: "Security monitoring, vulnerability management, threat detection, and incident response to protect your business." },
  { title: "IT Service Desk", description: "Tiered helpdesk support (L1/L2/L3) with SLA-backed response times and a seamless user experience." },
  { title: "Compliance & Governance", description: "Ensure your IT environment meets regulatory requirements — SOC 2, HIPAA, PCI-DSS, and industry-specific standards." },
  { title: "Vendor Management", description: "Manage relationships with technology vendors, negotiate contracts, and consolidate your IT supplier landscape." },
];

export default function ManagedITPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">End-to-End IT Outsourcing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Managed IT Services</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Reliable, secure, and cost-effective IT operations — managed by experts so your team can focus on what matters most.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              IT complexity grows every year — but your IT budget doesn&apos;t have to. We take full ownership of your technology operations, delivering enterprise-grade service at a predictable cost.
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Simplify Your IT?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s talk about how managed services can reduce your IT burden and improve reliability.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
