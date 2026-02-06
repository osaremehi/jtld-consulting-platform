import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "JTLD Consulting offers business consulting, process optimization, managed IT, AI, data analytics, and cloud & hybrid IT services.",
};

const services = [
  {
    title: "Business Consulting",
    tagline: "Strategic guidance and consulting",
    description:
      "We help organizations define winning strategies, navigate change, and accelerate growth. From market entry to operational turnaround, our consultants bring the insight and execution discipline to move your business forward.",
    href: "/services/business-consulting",
    features: ["Corporate strategy", "Growth advisory", "M&A due diligence", "Organizational design", "Change management"],
  },
  {
    title: "Business Process Services",
    tagline: "Process optimization & outsourcing",
    description:
      "Streamline operations, reduce costs, and improve quality through end-to-end process redesign and managed outsourcing. We map, measure, and transform the workflows that matter most.",
    href: "/services/business-process",
    features: ["Process mapping & analysis", "Workflow automation", "Outsourcing strategy", "Lean / Six Sigma", "Continuous improvement"],
  },
  {
    title: "Managed IT Services",
    tagline: "End-to-end IT outsourcing",
    description:
      "Offload the complexity of IT operations to a trusted partner. We manage infrastructure, security, support, and compliance so your team can focus on the business.",
    href: "/services/managed-it",
    features: ["24/7 monitoring & support", "Infrastructure management", "Cybersecurity operations", "IT service desk", "Compliance & governance"],
  },
  {
    title: "Artificial Intelligence",
    tagline: "AI solutions & implementation",
    description:
      "From strategy to production, we help organizations harness AI to automate processes, unlock insights, and create competitive advantage — responsibly and at scale.",
    href: "/services/ai",
    features: ["AI strategy & roadmap", "Machine learning models", "Natural language processing", "Computer vision", "AI governance & ethics"],
  },
  {
    title: "Data Analytics",
    tagline: "Data insights & analytics services",
    description:
      "Turn data into decisions. We design analytics platforms, build data pipelines, and deliver the dashboards and models that give your leaders the intelligence they need.",
    href: "/services/data-analytics",
    features: ["Data strategy", "BI & visualization", "Data engineering", "Predictive analytics", "Data governance"],
  },
  {
    title: "Cloud & Hybrid IT",
    tagline: "Cloud strategy and hybrid infrastructure",
    description:
      "Migrate, modernize, and optimize your infrastructure with a cloud strategy built for performance, security, and cost efficiency — whether public, private, or hybrid.",
    href: "/services/cloud-hybrid",
    features: ["Cloud migration", "Hybrid architecture", "Cost optimization", "DevOps & automation", "Multi-cloud management"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              Our Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Consulting &amp; Technology Services That Deliver
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Six integrated practices designed to help your organization think clearer,
              operate smarter, and grow faster.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
                  {service.tagline}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                >
                  Learn more
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-8">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Stories */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              Client Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leaders Across Industries
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "JTLD Consulting helped us redesign our entire supply chain process. The results were immediate — 30% cost reduction in the first quarter.",
                name: "Sarah M.",
                title: "COO, Manufacturing Firm",
              },
              {
                quote: "Their AI implementation roadmap gave us clarity on where to invest. We went from zero AI capabilities to production models in 6 months.",
                name: "David K.",
                title: "VP of Innovation, Financial Services",
              },
              {
                quote: "The managed IT services team at JTLD transformed our infrastructure. Uptime went from 97% to 99.9% while reducing our IT spend by 25%.",
                name: "Jennifer L.",
                title: "CTO, Healthcare Startup",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-8 border border-gray-100"
              >
                <svg className="w-8 h-8 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">
            Book a free consultation and we&apos;ll help you identify the highest-impact
            opportunities for your organization.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
