import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get a Consultation",
  description:
    "Schedule a free consultation with JTLD Consulting. Tell us about your challenges and we'll match you with a senior advisor.",
};

const services = [
  { value: "business-consulting", label: "Business Consulting" },
  { value: "business-process", label: "Business Process Services" },
  { value: "managed-it", label: "Managed IT Services" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "cloud-hybrid", label: "Cloud & Hybrid IT" },
  { value: "not-sure", label: "Not sure yet — help me decide" },
];

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Challenge",
    description: "Fill out the form with a brief overview of your business situation and goals.",
  },
  {
    number: "02",
    title: "We Match You With an Advisor",
    description: "Within one business day, we'll assign a senior consultant with deep expertise in your area.",
  },
  {
    number: "03",
    title: "Free 30-Minute Discovery Call",
    description: "Meet your advisor for a focused conversation — no sales pitch, just practical insight and next steps.",
  },
];

const reasons = [
  {
    title: "No Obligation",
    description: "The consultation is completely free. We'll give you honest advice whether we're the right fit or not.",
  },
  {
    title: "Senior-Level Access",
    description: "You speak directly with experienced consultants — not junior account reps or sales staff.",
  },
  {
    title: "Actionable Takeaways",
    description: "Walk away with at least one concrete recommendation you can act on immediately.",
  },
  {
    title: "Confidential",
    description: "Everything you share is treated with strict confidence. We'll sign an NDA before the call if you prefer.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Free Consultation
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Get Expert Advice — On Us
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Tell us about your challenge and we&apos;ll connect you with a senior advisor for a free 30-minute discovery call. No strings attached.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary-700 text-white flex items-center justify-center text-lg font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs">{step.description}</p>
                {i < steps.length - 1 && (
                  <svg className="hidden md:block absolute top-7 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-0.5 text-primary-200" aria-hidden="true">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Your Consultation</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We&apos;ll respond within one business day to schedule your discovery call.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    What Service Are You Interested In? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    Describe Your Challenge *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={5}
                    required
                    placeholder="What business problem are you trying to solve? What does success look like?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    defaultValue=""
                  >
                    <option value="" disabled>When do you need to get started?</option>
                    <option value="immediately">Immediately</option>
                    <option value="1-3-months">Within 1–3 months</option>
                    <option value="3-6-months">Within 3–6 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Request a Consultation
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By submitting this form you agree to our{" "}
                  <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 underline">Privacy Policy</Link>.
                  We&apos;ll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Why Book a Consultation?</h3>
                <div className="space-y-6">
                  {reasons.map((reason) => (
                    <div key={reason.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-accent-400/20 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{reason.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 dark:bg-primary-900/30 dark:border-primary-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Prefer to Talk Now?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Call us directly and we&apos;ll connect you with a consultant.
                </p>
                <a
                  href="tel:+14165551234"
                  className="flex items-center gap-3 text-primary-700 dark:text-primary-400 font-semibold hover:text-primary-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (416) 555-1234
                </a>
                <a
                  href="mailto:consult@jtldinc.com"
                  className="flex items-center gap-3 text-primary-700 dark:text-primary-400 font-semibold hover:text-primary-800 transition-colors mt-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  consult@jtldinc.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
