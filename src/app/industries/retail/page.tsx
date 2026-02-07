import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retail & E-Commerce Solutions | JTLD Consulting",
  description:
    "Transform retail operations with expert consulting in omnichannel commerce, supply chain optimization, customer analytics, and personalization.",
};

export default function RetailPage() {
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
            Retail & E-Commerce
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Revolutionizing retail experiences through seamless omnichannel
            strategies, intelligent supply chain management, and personalized
            customer engagement that drives growth and loyalty in competitive
            markets.
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
                  Omnichannel Commerce Excellence
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Create seamless shopping experiences across web, mobile, and
                  physical stores with unified commerce platforms that enable
                  buy online pickup in-store, endless aisle, and consistent
                  customer experiences everywhere.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Supply Chain Optimization
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Transform supply chain operations with real-time visibility,
                  demand forecasting, and intelligent inventory management that
                  reduce stockouts, minimize waste, and improve fulfillment
                  speed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Customer Analytics & Insights
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Unlock deep customer understanding through advanced analytics,
                  behavioral tracking, and predictive modeling that inform
                  merchandising, marketing, and strategic decisions.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Personalization & Customer Engagement
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Deliver tailored experiences with AI-powered recommendation
                  engines, dynamic pricing, personalized marketing, and loyalty
                  programs that increase conversion rates and customer lifetime
                  value.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Inventory & Demand Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Optimize inventory across channels with machine learning
                  forecasting, automated replenishment, and allocation
                  strategies that balance availability with working capital
                  efficiency.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Store Operations & POS Modernization
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Modernize in-store operations with cloud-based POS systems,
                  mobile checkout, clienteling tools, and store analytics that
                  empower associates and enhance the physical retail experience.
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
                Strategic guidance for retail transformation and growth.
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
                Streamline operations from procurement to fulfillment.
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
                Reliable infrastructure for 24/7 retail operations.
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
                Personalization and demand forecasting powered by AI.
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
                Transform customer and operational data into retail insights.
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
                Scalable cloud solutions for modern retail commerce.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Retail Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you create seamless
            omnichannel experiences, optimize your supply chain, and drive
            customer loyalty.
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
