import type { Metadata } from "next";
import Link from "next/link";
import ResumeForm from "@/components/ResumeForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join JTLD Consulting Inc. Explore open roles in business consulting, technology services, AI, data analytics, and more.",
};

const openings = [
  {
    title: "Senior Business Consultant",
    department: "Business Consulting",
    location: "Toronto, ON",
    type: "Full-time",
    href: "/careers/senior-business-consultant",
  },
  {
    title: "Data Analytics Lead",
    department: "Data Analytics",
    location: "Toronto, ON",
    type: "Full-time",
    href: "/careers/data-analytics-lead",
  },
  {
    title: "Cloud Solutions Architect",
    department: "Cloud & Hybrid IT",
    location: "Calgary, AB",
    type: "Full-time",
    href: "/careers/cloud-solutions-architect",
  },
  {
    title: "AI / ML Engineer",
    department: "Artificial Intelligence",
    location: "Remote — Canada",
    type: "Full-time",
    href: "/careers/ai-ml-engineer",
  },
  {
    title: "Business Process Analyst",
    department: "Business Process Services",
    location: "Vancouver, BC",
    type: "Full-time",
    href: "/careers/business-process-analyst",
  },
  {
    title: "Managed IT Services Manager",
    department: "Managed IT Services",
    location: "Toronto, ON",
    type: "Full-time",
    href: "/careers/managed-it-services-manager",
  },
];

const perks = [
  {
    title: "Competitive Compensation",
    description: "Market-leading salaries, performance bonuses, and equity participation for senior roles.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Flexible Work",
    description: "Hybrid and remote options with flexible hours. We trust you to deliver, wherever you work best.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Learning & Growth",
    description: "Annual learning budget, conference sponsorships, certifications, and mentorship programs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision benefits plus a wellness spending account.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Diverse Projects",
    description: "Work across industries and technologies — no two engagements are the same.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Team Culture",
    description: "Collaborative, low-ego environment with regular socials, retreats, and knowledge-sharing sessions.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              Careers
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Build Your Career at JTLD Consulting
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Join a team of consultants, technologists, and strategists who are helping
              organizations across Canada solve their most important challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              Why Join Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              More Than a Job — A Career You&apos;ll Love
            </h2>
            <p className="text-lg text-gray-600">
              We invest in our people because they&apos;re the reason our clients keep coming back.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-6 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-2">
              Open Positions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find Your Next Role
            </h2>
            <p className="text-lg text-gray-600">
              We&apos;re growing across all practices. See what&apos;s available and apply today.
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job) => (
              <Link
                key={job.title}
                href={job.href}
                className="group block bg-white rounded-xl border border-gray-100 p-6 hover:border-primary-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 shrink-0">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Resume */}
      <section id="apply" className="py-20 lg:py-28 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Submit Your Resume
            </h2>
            <p className="text-lg text-primary-200">
              Don&apos;t see the right fit? Send us your resume and we&apos;ll
              reach out when a role matches your skills and experience.
            </p>
          </div>
          <ResumeForm />
        </div>
      </section>
    </>
  );
}
