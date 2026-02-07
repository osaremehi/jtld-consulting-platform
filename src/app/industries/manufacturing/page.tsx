import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacturing Solutions | JTLD Consulting",
  description:
    "Modernize manufacturing operations with expert consulting in smart factories, IoT, supply chain optimization, quality control, and predictive maintenance.",
};

export default function ManufacturingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-20">
        <div className="container mx-auto px-6">
          <Link
            href="/industries"
            className="text-accent-400 hover:text-accent-300 mb-4 inline-block"
          >
            &larr; Back to Industries
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Manufacturing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Advancing manufacturing excellence through Industry 4.0
            technologies, intelligent automation, and data-driven operations
            that drive quality, efficiency, and innovation across discrete and
            process manufacturing.
          </p>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-8">
            How We Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Smart Factory & Industry 4.0
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Transform traditional manufacturing into connected smart
                  factories with integrated MES, ERP systems, digital twins, and
                  real-time production monitoring that optimize throughput and
                  quality.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Industrial IoT & Automation
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Deploy sensor networks, edge computing, and automated systems
                  that capture machine data, enable remote monitoring, and drive
                  process improvements across the production floor.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Supply Chain & Logistics Optimization
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Optimize end-to-end supply chains with demand-driven planning,
                  supplier collaboration platforms, and logistics management
                  that reduce lead times and improve material availability.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Quality Management & Compliance
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Implement comprehensive quality management systems with
                  statistical process control, automated inspection, and
                  traceability that ensure compliance with ISO, FDA, and
                  industry standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Predictive Maintenance & Asset Performance
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Maximize equipment uptime with AI-powered predictive
                  maintenance, condition monitoring, and asset performance
                  management that prevent unplanned downtime and extend asset
                  life.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Production Planning & Scheduling
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Optimize production schedules with advanced planning systems,
                  capacity optimization, and finite scheduling that balance
                  customer demands with resource constraints and delivery
                  commitments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Services Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-8">
            Relevant Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/services/business-consulting"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                Business Consulting
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Strategic guidance for manufacturing transformation and
                operational excellence.
              </p>
            </Link>
            <Link
              href="/services/business-process"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                Business Process Optimization
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Streamline production processes and lean manufacturing
                initiatives.
              </p>
            </Link>
            <Link
              href="/services/managed-it"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                Managed IT Services
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Reliable infrastructure for manufacturing operations and OT/IT
                convergence.
              </p>
            </Link>
            <Link
              href="/services/ai"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                AI & Machine Learning
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Predictive maintenance and quality control powered by AI.
              </p>
            </Link>
            <Link
              href="/services/data-analytics"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                Data & Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Transform manufacturing data into operational insights.
              </p>
            </Link>
            <Link
              href="/services/cloud-hybrid"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                Cloud & Hybrid Infrastructure
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Secure cloud solutions for modern manufacturing systems.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build the Smart Factory of Tomorrow?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you leverage Industry 4.0
            technologies, optimize operations, and drive manufacturing
            excellence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent-400 text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-accent-300 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
