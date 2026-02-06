import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Services & FinTech Solutions | JTLD Consulting",
  description:
    "Transform your financial services operations with expert consulting in regulatory compliance, digital banking, fraud detection, and legacy system modernization.",
};

export default function FinancialServicesPage() {
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
            Financial Services & FinTech
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Empowering banks, insurance companies, and capital markets firms
            with cutting-edge technology solutions and strategic consulting to
            navigate regulatory complexity, accelerate digital transformation,
            and deliver exceptional customer experiences.
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
                  Regulatory Compliance & Risk Management
                </h3>
                <p className="text-gray-700">
                  Navigate complex regulatory requirements with confidence.
                  We help implement compliance frameworks, automate reporting,
                  and build risk management systems that meet SOX, Basel III,
                  GDPR, and other critical standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Digital Banking Transformation
                </h3>
                <p className="text-gray-700">
                  Modernize your banking platforms with mobile-first solutions,
                  open banking APIs, and seamless omnichannel experiences that
                  meet evolving customer expectations in the digital age.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Fraud Detection & Prevention
                </h3>
                <p className="text-gray-700">
                  Leverage AI and machine learning to detect fraudulent
                  transactions in real-time, reduce false positives, and
                  protect your customers while maintaining frictionless
                  experiences.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Legacy System Modernization
                </h3>
                <p className="text-gray-700">
                  Migrate from outdated mainframe systems to modern, scalable
                  cloud architectures without disrupting critical operations.
                  Our phased approach minimizes risk while maximizing ROI.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Data Analytics & Business Intelligence
                </h3>
                <p className="text-gray-700">
                  Unlock the value of your financial data with advanced
                  analytics, predictive modeling, and real-time dashboards that
                  drive better decision-making and competitive advantage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  FinTech Innovation & Integration
                </h3>
                <p className="text-gray-700">
                  Stay competitive with emerging technologies including
                  blockchain, cryptocurrency platforms, robo-advisors, and
                  embedded finance solutions that create new revenue streams.
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
                Strategic guidance for digital transformation and operational
                excellence.
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
                Streamline operations and improve efficiency across your
                organization.
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
                Comprehensive IT management and support for financial
                institutions.
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
                Deploy intelligent systems for fraud detection and predictive
                analytics.
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
                Transform financial data into actionable business insights.
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
                Secure, compliant cloud solutions for modern financial
                services.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Financial Services Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you navigate regulatory
            challenges, modernize legacy systems, and deliver innovative
            financial solutions.
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
