import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Process Services",
  description: "Process optimization and outsourcing — workflow automation, Lean/Six Sigma, and continuous improvement services.",
};

const capabilities = [
  { title: "Process Mapping & Analysis", description: "Visualize end-to-end workflows, identify bottlenecks, and quantify waste to build a clear optimization roadmap." },
  { title: "Workflow Automation", description: "Automate repetitive, manual tasks with RPA and intelligent automation to free up capacity and reduce errors." },
  { title: "Outsourcing Strategy", description: "Determine which functions to outsource, select the right partners, and manage transitions seamlessly." },
  { title: "Lean / Six Sigma", description: "Apply proven methodologies to eliminate waste, reduce variation, and deliver consistent, high-quality outcomes." },
  { title: "Shared Services Design", description: "Consolidate back-office functions into shared services centers that scale efficiently across business units." },
  { title: "Continuous Improvement", description: "Embed a culture of ongoing optimization with KPI frameworks, feedback loops, and governance structures." },
];

export default function BusinessProcessPage() {
  return (
    <>
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-primary-300 text-sm hover:text-white transition-colors mb-6">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              All Services
            </Link>
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Process Optimization &amp; Outsourcing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">Business Process Services</h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Streamline operations, reduce costs, and improve quality through systematic process redesign and managed outsourcing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Inefficient processes drain resources and slow growth. We map your operations, identify high-impact improvement areas, and deliver automation and redesign that produces measurable ROI.
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your Operations?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">Let&apos;s identify the processes holding your business back and build a plan to fix them.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</Link>
        </div>
      </section>
    </>
  );
}
