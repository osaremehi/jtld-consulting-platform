import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Analytics",
  description: "Data insights and analytics services — BI, data engineering, predictive analytics, and data governance.",
};

const capabilities = [
  { title: "Data Strategy", description: "Define your data vision, architecture, and governance model to turn data into a strategic asset." },
  { title: "BI & Visualization", description: "Build interactive dashboards and reporting solutions with Power BI, Tableau, and Looker that leaders actually use." },
  { title: "Data Engineering", description: "Design and implement modern data pipelines, warehouses, and lakes that are reliable, scalable, and cost-efficient." },
  { title: "Predictive Analytics", description: "Apply statistical modeling and machine learning to forecast demand, churn, risk, and other critical business outcomes." },
  { title: "Data Governance", description: "Establish data quality, lineage, cataloging, and access controls to ensure trust and compliance across the organization." },
  { title: "Self-Service Analytics", description: "Empower business users with governed self-service tools and training so insights aren't bottlenecked by IT." },
];

export default function DataAnalyticsPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Data Insights &amp; Analytics</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Data Analytics</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Turn raw data into actionable intelligence. We build the platforms, pipelines, and models that give your organization a data-driven edge.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Most organizations collect more data than they use. We close the gap — from building reliable data infrastructure to delivering the insights and predictions that drive better decisions.
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Unlock Your Data?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s assess your data maturity and build a roadmap to analytics that actually moves the needle.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
