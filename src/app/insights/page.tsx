import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Expert perspectives on business strategy, AI, data analytics, cloud infrastructure, and digital transformation from JTLD Consulting.",
};

const featured = {
  category: "Artificial Intelligence",
  title: "How Mid-Market Companies Are Winning With AI in 2025",
  excerpt:
    "You don't need a billion-dollar budget to benefit from AI. We break down the practical playbook mid-market firms are using to deploy AI that delivers real ROI — from process automation to predictive analytics.",
  author: "Thomas Lee",
  role: "VP, Technology Services",
  date: "Jan 28, 2025",
  readTime: "8 min read",
  href: "/insights/mid-market-ai-2025",
};

const articles = [
  {
    category: "Business Consulting",
    title: "5 Signs Your Business Strategy Needs a Reset",
    excerpt:
      "Market shifts, stalled growth, and internal misalignment are signals that your strategy may be overdue for a refresh. Here's how to tell — and what to do about it.",
    author: "James Thompson",
    date: "Jan 15, 2025",
    readTime: "6 min read",
    href: "/insights/strategy-reset-signs",
  },
  {
    category: "Data Analytics",
    title: "From Dashboards to Decisions: Making Data Analytics Actually Useful",
    excerpt:
      "Most organizations have plenty of dashboards. What they lack is a data culture that turns insights into action. We outline a practical framework for closing the gap.",
    author: "David Kim",
    date: "Jan 8, 2025",
    readTime: "7 min read",
    href: "/insights/dashboards-to-decisions",
  },
  {
    category: "Cloud & Hybrid IT",
    title: "The Hidden Costs of Cloud Migration — and How to Avoid Them",
    excerpt:
      "Cloud migration promises efficiency and scale, but poorly planned moves can balloon costs. Learn the common pitfalls and how to build a migration plan that delivers.",
    author: "Thomas Lee",
    date: "Dec 18, 2024",
    readTime: "5 min read",
    href: "/insights/cloud-migration-costs",
  },
  {
    category: "Business Process Services",
    title: "Process Optimization in a Remote-First World",
    excerpt:
      "Distributed teams need different processes. We share the frameworks our clients are using to streamline operations when everyone isn't in the same office.",
    author: "Lisa Daniels",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    href: "/insights/remote-process-optimization",
  },
  {
    category: "Managed IT Services",
    title: "Build vs. Buy: When to Outsource IT and When to Keep It In-House",
    excerpt:
      "The decision to outsource IT is rarely black and white. We walk through the criteria that help organizations decide what to keep, what to outsource, and what to co-manage.",
    author: "Diana Reyes",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    href: "/insights/build-vs-buy-it",
  },
  {
    category: "Artificial Intelligence",
    title: "AI Governance: Building Trust Before You Build Models",
    excerpt:
      "Deploying AI without a governance framework is a risk most boards won't accept. Here's how to establish responsible AI practices from day one.",
    author: "Thomas Lee",
    date: "Nov 8, 2024",
    readTime: "5 min read",
    href: "/insights/ai-governance-framework",
  },
];

const categories = [
  "All",
  "Business Consulting",
  "Business Process Services",
  "Managed IT Services",
  "Artificial Intelligence",
  "Data Analytics",
  "Cloud & Hybrid IT",
];

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "Business Consulting": "bg-blue-50 text-blue-700",
    "Business Process Services": "bg-violet-50 text-violet-700",
    "Managed IT Services": "bg-emerald-50 text-emerald-700",
    "Artificial Intelligence": "bg-amber-50 text-amber-700",
    "Data Analytics": "bg-cyan-50 text-cyan-700",
    "Cloud & Hybrid IT": "bg-rose-50 text-rose-700",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[category] || "bg-gray-100 text-gray-700"}`}>
      {category}
    </span>
  );
}

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              Insights
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Ideas That Move Business Forward
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed">
              Expert perspectives on strategy, technology, and transformation from
              the consultants working on the front lines.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-gray-200 bg-white sticky top-[100px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={featured.href}
            className="group block bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-primary-800 to-primary-900 p-10 lg:p-14 flex items-center">
                <div>
                  <CategoryBadge category={featured.category} />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4 group-hover:text-accent-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-primary-200 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-2">Featured</p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{featured.author}</p>
                    <p className="text-xs text-gray-500">{featured.role}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {featured.date} &middot; {featured.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group flex flex-col bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-md transition-all duration-200"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <CategoryBadge category={article.category} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{article.author}</p>
                    <p className="text-xs text-gray-400">
                      {article.date} &middot; {article.readTime}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Insights Delivered
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter for the latest thinking on business strategy,
              technology, and digital transformation.
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
