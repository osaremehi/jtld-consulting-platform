import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artificial Intelligence",
  description: "AI solutions and implementation — strategy, machine learning, NLP, computer vision, and responsible AI governance.",
};

const capabilities = [
  { title: "AI Strategy & Roadmap", description: "Assess AI readiness, identify high-value use cases, and build a prioritized implementation plan aligned to business goals." },
  { title: "Machine Learning Models", description: "Design, train, and deploy custom ML models for prediction, classification, recommendation, and optimization." },
  { title: "Natural Language Processing", description: "Extract insights from text at scale — document processing, sentiment analysis, chatbots, and knowledge mining." },
  { title: "Computer Vision", description: "Automate visual inspection, object detection, and image classification for manufacturing, retail, and healthcare." },
  { title: "Intelligent Automation", description: "Combine AI with RPA to automate complex, judgment-based workflows that traditional automation can't handle." },
  { title: "AI Governance & Ethics", description: "Establish responsible AI frameworks covering bias detection, explainability, privacy, and regulatory compliance." },
];

export default function AIPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">AI Solutions &amp; Implementation</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Artificial Intelligence</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              From strategy to production-ready systems, we help organizations harness AI to automate, predict, and innovate — responsibly and at scale.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              AI is transforming every industry — but only for organizations that implement it thoughtfully. We bridge the gap between AI ambition and real-world production, ensuring every model delivers business value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Put AI to Work?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s explore how AI can create value for your organization — starting with a focused assessment.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
