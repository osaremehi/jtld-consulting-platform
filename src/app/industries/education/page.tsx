import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Education Solutions | JTLD Consulting",
  description:
    "Transform educational institutions with expert consulting in digital learning, student analytics, enrollment management, and institutional efficiency.",
};

export default function EducationPage() {
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
            Education
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Empowering universities, colleges, and EdTech companies to deliver
            exceptional learning experiences through digital transformation,
            data-driven insights, and innovative technology solutions that
            enhance student success and institutional effectiveness.
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
                  Digital Learning & LMS Modernization
                </h3>
                <p className="text-gray-700">
                  Transform educational delivery with modern learning management
                  systems, virtual classrooms, and blended learning environments
                  that support diverse learning modalities and improve student
                  engagement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Student Analytics & Success Platforms
                </h3>
                <p className="text-gray-700">
                  Leverage predictive analytics to identify at-risk students,
                  personalize interventions, track progress, and improve
                  retention and graduation rates through data-driven insights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Enrollment Management & CRM
                </h3>
                <p className="text-gray-700">
                  Optimize student recruitment and enrollment with integrated
                  CRM systems, marketing automation, and application management
                  platforms that streamline the student journey from inquiry to
                  enrollment.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Institutional Efficiency & ERP
                </h3>
                <p className="text-gray-700">
                  Modernize administrative operations with integrated ERP
                  systems that streamline finance, HR, student information,
                  and campus operations while reducing costs and improving
                  service delivery.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  EdTech Platform Development
                </h3>
                <p className="text-gray-700">
                  Build scalable EdTech solutions including adaptive learning
                  platforms, assessment tools, and educational apps that deliver
                  personalized learning experiences and measurable outcomes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Campus IT Infrastructure & Security
                </h3>
                <p className="text-gray-700">
                  Deploy secure, high-performance campus networks, cloud
                  infrastructure, and cybersecurity solutions that support
                  digital learning, research computing, and protect sensitive
                  student data.
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
                Strategic guidance for educational transformation and
                innovation.
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
                Streamline academic and administrative operations.
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
                Reliable campus IT infrastructure and support services.
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
                Personalized learning and student success analytics powered by
                AI.
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
                Transform educational data into actionable insights for student
                success.
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
                Scalable cloud solutions for modern educational institutions.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Education for the Digital Age?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how JTLD Consulting can help you enhance learning
            experiences, improve student outcomes, and drive institutional
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
