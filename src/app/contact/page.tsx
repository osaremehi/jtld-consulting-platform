import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with JTLD Consulting Inc. Schedule a consultation, request a proposal, or reach out to our offices in Toronto, Calgary, and Vancouver.",
};

const offices = [
  {
    city: "Toronto",
    address: "100 King Street West, Suite 5600",
    region: "Toronto, ON M5X 1C9",
    phone: "(416) 555-1234",
    email: "toronto@jtldinc.com",
  },
  {
    city: "Calgary",
    address: "525 8th Avenue SW, Suite 2500",
    region: "Calgary, AB T2P 1G1",
    phone: "(403) 555-5678",
    email: "calgary@jtldinc.com",
  },
  {
    city: "Vancouver",
    address: "1055 West Georgia Street, Suite 1500",
    region: "Vancouver, BC V6E 3P3",
    phone: "(604) 555-9012",
    email: "vancouver@jtldinc.com",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Whether you need strategic consulting, technology services, or want to explore a
              partnership — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Fill out the form below and a member of our team will get back to you within one business day.
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    How Can We Help? *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="business-process">Business Process Services</option>
                    <option value="managed-it">Managed IT Services</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="cloud-hybrid">Cloud &amp; Hybrid IT</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project or challenge..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"

                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-10">
              {/* Quick contact */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Get in Touch Directly</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@jtldinc.com"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <span className="text-sm">info@jtldinc.com</span>
                  </a>
                  <a
                    href="tel:+14165551234"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <span className="text-sm">(416) 555-1234</span>
                  </a>
                </div>
              </div>

              {/* Offices */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <div key={office.city} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{office.city}</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>{office.address}</p>
                        <p>{office.region}</p>
                        <a href={`tel:${office.phone.replace(/[^+\d]/g, "")}`} className="block hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                          {office.phone}
                        </a>
                        <a href={`mailto:${office.email}`} className="block hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
