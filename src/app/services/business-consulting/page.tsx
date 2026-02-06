import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Consulting",
  description: "Strategic business consulting services — corporate strategy, growth advisory, change management, and organizational design.",
};

const capabilities = [
  { title: "Corporate Strategy", description: "Define your competitive positioning, market focus, and long-term growth plan with data-backed strategy development." },
  { title: "Growth Advisory", description: "Identify and capture new revenue streams, markets, and customer segments with structured growth frameworks." },
  { title: "M&A Due Diligence", description: "Pre-and post-acquisition analysis covering financials, operations, technology, and integration planning." },
  { title: "Organizational Design", description: "Align structure, roles, and governance to your strategy — so the right people make the right decisions." },
  { title: "Change Management", description: "Plan and execute transformation programs that bring your people along, from executive sponsorship to frontline adoption." },
  { title: "Performance Improvement", description: "Diagnose margin erosion, cost overruns, and productivity gaps, then implement targeted operational fixes." },
];

export default function BusinessConsultingPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Strategic Guidance &amp; Consulting</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Business Consulting</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              We partner with leadership teams to define strategy, drive transformation, and deliver measurable business outcomes — from boardroom to execution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Business environments are more complex than ever. We help organizations cut through ambiguity, align around priorities, and move with confidence — whether you&apos;re scaling, restructuring, or entering new markets.
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Sharpen Your Strategy?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s discuss how our consulting team can help you navigate your biggest challenges.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
