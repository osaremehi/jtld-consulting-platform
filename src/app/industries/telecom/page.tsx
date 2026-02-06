import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Telecommunications Solutions | JTLD Consulting",
  description:
    "Transform telecom operations with expert consulting in 5G deployment, network optimization, customer retention, and billing modernization.",
};

export default function TelecomPage() {
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
            Telecommunications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Connecting the future with innovative solutions for carriers, ISPs,
            and communication service providers through next-generation network
            technologies, intelligent operations, and enhanced customer
            experiences.
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
                  5G Network Deployment & Optimization
                </h3>
                <p className="text-gray-700">
                  Plan and deploy next-generation 5G networks with optimized
                  coverage, capacity planning, spectrum management, and
                  network slicing strategies that enable new services and
                  revenue opportunities.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Network Performance & Optimization
                </h3>
                <p className="text-gray-700">
                  Maximize network performance with real-time monitoring,
                  automated optimization, and predictive analytics that improve
                  quality of service, reduce congestion, and enhance user
                  experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Customer Experience & Retention
                </h3>
                <p className="text-gray-700">
                  Reduce churn and increase customer satisfaction with
                  AI-powered analytics that identify at-risk subscribers,
                  personalize offers, and enable proactive service management
                  and support.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Billing & Revenue Management Modernization
                </h3>
                <p className="text-gray-700">
                  Transform billing operations with cloud-based BSS/OSS systems,
                  real-time charging, flexible pricing models, and automated
                  revenue assurance that support complex service offerings.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  OSS/BSS Transformation
                </h3>
                <p className="text-gray-700">
                  Modernize operational and business support systems with
                  cloud-native platforms, microservices architectures, and API
                  integration that enable agility and faster time-to-market for
                  new services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  IoT & Enterprise Solutions
                </h3>
                <p className="text-gray-700">
                  Develop new revenue streams with IoT connectivity platforms,
                  M2M solutions, and enterprise services that leverage network
                  assets for smart cities, connected vehicles, and industrial
                  applications.
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
                Strategic guidance for telecom transformation and growth.
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
                Streamline operations from network planning to customer care.
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
                Reliable infrastructure for carrier-grade operations.
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
                Network optimization and customer analytics powered by AI.
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
                Transform network and customer data into telecom insights.
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
                Cloud-native solutions for modern telecom services.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Connect the Future of Telecommunications?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you deploy 5G, optimize
            network performance, and deliver exceptional customer experiences.
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
