import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare & Life Sciences Solutions | JTLD Consulting",
  description:
    "Advance healthcare delivery with expert consulting in patient data management, HIPAA compliance, clinical analytics, telehealth, and EHR optimization.",
};

export default function HealthcarePage() {
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
            Healthcare & Life Sciences
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Transforming patient care and operational excellence for hospitals,
            pharmaceutical companies, and biotech firms through innovative
            technology solutions, data-driven insights, and regulatory
            compliance expertise.
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
                  Patient Data Management & Security
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Implement secure, integrated patient data platforms that
                  enable seamless information sharing across care teams while
                  maintaining the highest standards of data privacy and
                  security.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  HIPAA Compliance & Regulatory Support
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Ensure full compliance with HIPAA, HITECH, and other
                  healthcare regulations through comprehensive audits, risk
                  assessments, and implementation of best-practice security
                  frameworks.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Clinical Analytics & Population Health
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Leverage advanced analytics to improve patient outcomes,
                  identify at-risk populations, optimize treatment protocols,
                  and drive evidence-based clinical decision-making.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Telehealth & Remote Care Solutions
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Deploy scalable telehealth platforms that expand access to
                  care, improve patient engagement, and enable remote
                  monitoring for chronic disease management and virtual
                  consultations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  EHR Optimization & Interoperability
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Maximize the value of your electronic health record
                  investments through workflow optimization, system integration,
                  and implementation of FHIR standards for seamless data
                  exchange.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Life Sciences R&D & Clinical Trials
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Accelerate drug discovery and clinical trial processes with
                  AI-powered analytics, digital trial platforms, and data
                  management solutions that improve efficiency and regulatory
                  compliance.
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
              <p className="text-gray-700 dark:text-gray-200">
                Strategic guidance for healthcare transformation and value-based
                care.
              </p>
            </Link>
            <Link
              href="/services/business-process"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Business Process Optimization
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Streamline clinical workflows and administrative operations.
              </p>
            </Link>
            <Link
              href="/services/managed-it"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Managed IT Services
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Reliable IT infrastructure for healthcare delivery
                organizations.
              </p>
            </Link>
            <Link
              href="/services/ai"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                AI & Machine Learning
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Intelligent solutions for diagnostics, drug discovery, and
                clinical insights.
              </p>
            </Link>
            <Link
              href="/services/data-analytics"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Data & Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                Transform healthcare data into actionable clinical and
                operational insights.
              </p>
            </Link>
            <Link
              href="/services/cloud-hybrid"
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Cloud & Hybrid Infrastructure
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                HIPAA-compliant cloud solutions for modern healthcare delivery.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Healthcare Delivery?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you improve patient
            outcomes, ensure regulatory compliance, and leverage technology for
            better healthcare.
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
