import Link from "next/link";

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "95%", label: "Client Retention" },
  { value: "50+", label: "Industry Experts" },
  { value: "12+", label: "Industries Covered" },
];

const services = [
  {
    title: "Business Consulting",
    description:
      "Strategic guidance to navigate complex challenges, optimize operations, and accelerate growth across your organization.",
    href: "/services/business-consulting",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "Business Process Services",
    description:
      "Process optimization and outsourcing solutions that streamline workflows, reduce costs, and improve operational efficiency.",
    href: "/services/business-process",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
  },
  {
    title: "Managed IT Services",
    description:
      "End-to-end IT outsourcing that keeps your infrastructure secure, reliable, and aligned with business objectives.",
    href: "/services/managed-it",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Artificial Intelligence",
    description:
      "AI solutions and implementation that transform how your business operates — from strategy to production-ready systems.",
    href: "/services/ai",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Data Analytics",
    description:
      "Data insights and analytics services that turn raw data into actionable intelligence for smarter decision-making.",
    href: "/services/data-analytics",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Cloud & Hybrid IT",
    description:
      "Cloud strategy and hybrid infrastructure solutions that deliver scalability, security, and cost optimization.",
    href: "/services/cloud-hybrid",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
];

const industries = [
  { name: "Financial Services", href: "/industries/financial-services" },
  { name: "Healthcare & Life Sciences", href: "/industries/healthcare" },
  { name: "Energy & Utilities", href: "/industries/energy" },
  { name: "Government & Public Sector", href: "/industries/government" },
  { name: "Retail & E-Commerce", href: "/industries/retail" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Telecommunications", href: "/industries/telecom" },
  { name: "Education", href: "/industries/education" },
];

const testimonials = [
  {
    quote:
      "JTLD Consulting helped us redesign our entire supply chain process. The results were immediate — 30% cost reduction in the first quarter.",
    name: "Sarah M.",
    title: "COO, Manufacturing Firm",
  },
  {
    quote:
      "Their AI implementation roadmap gave us clarity on where to invest. We went from zero AI capabilities to production models in 6 months.",
    name: "David K.",
    title: "VP of Innovation, Financial Services",
  },
  {
    quote:
      "The managed IT services team at JTLD transformed our infrastructure. Uptime went from 97% to 99.9% while reducing our IT spend by 25%.",
    name: "Jennifer L.",
    title: "CTO, Healthcare Startup",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)"
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              Business Consulting &amp; Technology Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Strategic Consulting That <span className="text-accent-400">Drives Results</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl">
              JTLD Consulting partners with organizations to solve complex business challenges
              through strategic consulting, process optimization, and technology-driven solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Schedule a Consultation
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary-700">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              End-to-End Consulting &amp; Technology Solutions
            </h2>
            <p className="text-lg text-gray-600">
              From strategic advisory to hands-on implementation, we deliver solutions
              that create lasting value for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block p-8 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-primary-600 mb-4 group-hover:text-primary-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center mt-4 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Learn more
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why JTLD Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
                Why JTLD Consulting
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                A Partner Invested in Your Success
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We don&apos;t just advise — we embed with your teams to ensure strategies translate
                into execution. Our consultants bring deep industry expertise and a commitment
                to measurable outcomes.
              </p>
              <div className="space-y-4">
                {[
                  "Outcome-driven engagements with clear KPIs",
                  "Cross-industry expertise from seasoned consultants",
                  "Technology-enabled solutions, not just slide decks",
                  "Flexible engagement models that fit your needs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.name}
                  href={industry.href}
                  className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 text-center"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
                    {industry.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-white">
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
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 rounded-xl p-8 border border-gray-100"
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

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how JTLD Consulting can help you tackle your biggest challenges
            and unlock new opportunities for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Informed</h2>
            <p className="text-gray-600 mb-6">
              Get the latest business insights, industry trends, and consulting perspectives delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-gray-500">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
