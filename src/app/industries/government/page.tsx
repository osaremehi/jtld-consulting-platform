import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Public Sector Solutions | JTLD Consulting",
  description:
    "Modernize government operations with expert consulting in digital services, citizen experience, procurement modernization, and secure data sharing.",
};

export default function GovernmentPage() {
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
            Government & Public Sector
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Empowering federal, provincial, and municipal governments to deliver
            better services to citizens through digital transformation, legacy
            system modernization, and secure, efficient technology solutions.
          </p>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            How We Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Digital Government Services
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Transform citizen-facing services with modern web portals,
                  mobile apps, and self-service platforms that make government
                  more accessible, transparent, and responsive to community
                  needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Citizen Experience Enhancement
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Design and implement user-centric service delivery models that
                  reduce wait times, simplify processes, and improve
                  satisfaction across all touchpoints from permits to social
                  services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Procurement & Contract Management
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Modernize procurement processes with e-procurement platforms,
                  vendor management systems, and contract lifecycle management
                  that ensure compliance, transparency, and value for taxpayers.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Legacy System Modernization
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Migrate mission-critical systems from aging infrastructure to
                  modern, secure platforms that reduce maintenance costs,
                  improve performance, and enable innovation while maintaining
                  operational continuity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Secure Data Sharing & Interoperability
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Enable seamless, secure data exchange between agencies and
                  levels of government through API-first architectures, identity
                  management, and compliance with privacy and security
                  standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Cybersecurity & Compliance
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Protect sensitive government data and infrastructure with
                  comprehensive security frameworks, threat detection, incident
                  response, and compliance with FedRAMP, NIST, and other
                  standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Services Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            Relevant Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/services/business-consulting"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Business Consulting
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Strategic guidance for digital government transformation.
              </p>
            </Link>
            <Link
              href="/services/business-process"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Business Process Optimization
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Streamline government operations and service delivery.
              </p>
            </Link>
            <Link
              href="/services/managed-it"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Managed IT Services
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Reliable IT infrastructure for mission-critical government
                services.
              </p>
            </Link>
            <Link
              href="/services/ai"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                AI & Machine Learning
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Intelligent automation for improved government efficiency.
              </p>
            </Link>
            <Link
              href="/services/data-analytics"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Data & Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Transform government data into actionable policy insights.
              </p>
            </Link>
            <Link
              href="/services/cloud-hybrid"
              className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Cloud & Hybrid Infrastructure
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Secure, compliant cloud solutions for government agencies.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Modernize Government Services?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you deliver better
            citizen experiences, modernize legacy systems, and build secure,
            efficient digital government.
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
