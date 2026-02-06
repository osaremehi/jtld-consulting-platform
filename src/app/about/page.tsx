import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JTLD Consulting Inc — our mission, values, leadership, and commitment to delivering strategic business consulting and technology solutions.",
};

const values = [
  {
    title: "Accountability",
    description:
      "We own our commitments. Every engagement has clear deliverables, timelines, and measurable outcomes that we stand behind.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description:
      "Honest communication is the foundation of every client relationship. We share what we know, flag risks early, and keep no surprises.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Professionalism",
    description:
      "We bring rigor, discipline, and respect to every interaction — from the first conversation through final delivery and beyond.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Aspiration",
    description:
      "We push boundaries for our clients and ourselves. We pursue excellence, embrace innovation, and never settle for good enough.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

const leadership = [
  {
    name: "James Thompson",
    role: "Founder & CEO",
    bio: "20+ years in management consulting and digital transformation across financial services and technology sectors.",
  },
  {
    name: "Lisa Daniels",
    role: "Chief Operating Officer",
    bio: "Former Big Four partner specializing in business process optimization and operational excellence.",
  },
  {
    name: "Thomas Lee",
    role: "VP, Technology Services",
    bio: "Enterprise architect with deep expertise in cloud infrastructure, AI/ML, and managed IT services.",
  },
  {
    name: "Diana Reyes",
    role: "VP, Client Partnerships",
    bio: "15+ years building long-term client relationships in consulting, with a focus on healthcare and public sector.",
  },
];

const milestones = [
  { year: "2015", event: "JTLD Consulting founded in Toronto" },
  { year: "2017", event: "Expanded into managed IT services" },
  { year: "2019", event: "Launched AI & data analytics practice" },
  { year: "2021", event: "Opened offices in Calgary and Vancouver" },
  { year: "2023", event: "200+ clients served across 12 industries" },
  { year: "2025", event: "Cloud & hybrid IT practice launched" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Built on Expertise. Driven by Results.
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              JTLD Consulting Inc is a Canadian business consulting and technology services firm.
              We partner with organizations to solve complex challenges, optimize operations, and
              unlock growth through strategy, process excellence, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                From Local Roots to National Impact
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015 in Toronto, JTLD Consulting started with a simple belief: businesses
                  deserve consulting partners who don&apos;t just diagnose problems — they stay to solve them.
                </p>
                <p>
                  What began as a small team of business strategists has grown into a full-service
                  consulting firm with practices spanning business consulting, process optimization,
                  managed IT, artificial intelligence, data analytics, and cloud infrastructure.
                </p>
                <p>
                  Today, we serve over 200 clients across 12 industries from offices in Toronto,
                  Calgary, and Vancouver. Our approach hasn&apos;t changed: we embed with our clients,
                  understand their challenges deeply, and deliver solutions that produce measurable results.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-primary-100" />
              <div className="space-y-8">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary-50 border-2 border-primary-300 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    </div>
                    <p className="text-sm font-bold text-primary-700">{milestone.year}</p>
                    <p className="text-gray-600">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower organizations with the strategic insight, operational excellence, and
                technology capabilities they need to thrive in an increasingly complex and
                competitive landscape.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Canada&apos;s most trusted consulting partner — known for delivering
                outcomes that matter, building lasting relationships, and making expertise accessible
                to organizations of every size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These four principles guide every decision we make, every engagement we take on,
              and every relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl text-primary-600 mb-5">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced leaders with decades of combined expertise in consulting,
              technology, and business transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-xl p-6 border border-gray-100 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-700">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{person.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-3">{person.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why JTLD */}
      <section className="py-20 lg:py-28 bg-white">
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
              {[
                { name: "Financial Services", href: "/industries/financial-services" },
                { name: "Healthcare & Life Sciences", href: "/industries/healthcare" },
                { name: "Energy & Utilities", href: "/industries/energy" },
                { name: "Government & Public Sector", href: "/industries/government" },
                { name: "Retail & E-Commerce", href: "/industries/retail" },
                { name: "Manufacturing", href: "/industries/manufacturing" },
                { name: "Telecommunications", href: "/industries/telecom" },
                { name: "Education", href: "/industries/education" },
              ].map((industry) => (
                <Link
                  key={industry.name}
                  href={industry.href}
                  className="group p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 text-center"
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

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto">
            Ready to tackle your biggest business challenges? Get in touch to learn how
            JTLD Consulting can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
