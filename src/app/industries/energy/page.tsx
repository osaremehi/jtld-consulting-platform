import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Energy & Utilities Solutions | JTLD Consulting",
  description:
    "Power the future with expert consulting in grid modernization, sustainability, asset management, and predictive maintenance for energy and utilities sectors.",
};

export default function EnergyPage() {
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
            Energy & Utilities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Driving innovation in power generation, renewable energy, and
            utilities through intelligent grid solutions, sustainability
            initiatives, and advanced asset management that powers communities
            and businesses efficiently.
          </p>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            How We Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Smart Grid Modernization
                </h3>
                <p className="text-gray-700">
                  Transform legacy grid infrastructure with IoT sensors, smart
                  meters, and real-time monitoring systems that improve
                  reliability, enable demand response, and integrate renewable
                  energy sources seamlessly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Sustainability & ESG Initiatives
                </h3>
                <p className="text-gray-700">
                  Develop and implement comprehensive sustainability strategies,
                  carbon tracking systems, and ESG reporting frameworks that
                  meet regulatory requirements and stakeholder expectations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Enterprise Asset Management
                </h3>
                <p className="text-gray-700">
                  Optimize the lifecycle management of critical infrastructure
                  assets including generation facilities, transmission lines,
                  and distribution networks through integrated asset performance
                  management systems.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Predictive Maintenance & IoT
                </h3>
                <p className="text-gray-700">
                  Reduce downtime and maintenance costs with AI-powered
                  predictive analytics that identify equipment failures before
                  they occur, extending asset life and improving operational
                  efficiency.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Energy Trading & Market Operations
                </h3>
                <p className="text-gray-700">
                  Implement advanced trading platforms, forecasting models, and
                  market analytics that optimize energy procurement, hedging
                  strategies, and revenue management in dynamic energy markets.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Customer Experience & Billing Modernization
                </h3>
                <p className="text-gray-700">
                  Enhance customer engagement with digital portals, mobile apps,
                  and flexible billing systems that support time-of-use rates,
                  distributed energy resources, and personalized energy
                  management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            Relevant Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/services/business-consulting"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Business Consulting
              </h3>
              <p className="text-gray-700">
                Strategic guidance for energy transition and operational
                transformation.
              </p>
            </Link>
            <Link
              href="/services/business-process"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Business Process Optimization
              </h3>
              <p className="text-gray-700">
                Streamline operations from generation to customer service.
              </p>
            </Link>
            <Link
              href="/services/managed-it"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Managed IT Services
              </h3>
              <p className="text-gray-700">
                Reliable infrastructure for critical energy operations.
              </p>
            </Link>
            <Link
              href="/services/ai"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                AI & Machine Learning
              </h3>
              <p className="text-gray-700">
                Predictive maintenance and energy demand forecasting solutions.
              </p>
            </Link>
            <Link
              href="/services/data-analytics"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Data & Analytics
              </h3>
              <p className="text-gray-700">
                Transform operational data into actionable energy insights.
              </p>
            </Link>
            <Link
              href="/services/cloud-hybrid"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Cloud & Hybrid Infrastructure
              </h3>
              <p className="text-gray-700">
                Scalable cloud solutions for modern energy management.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Power the Future of Energy?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you modernize grid
            infrastructure, embrace sustainability, and optimize energy
            operations.
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
