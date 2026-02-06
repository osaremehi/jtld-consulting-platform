# SEO / Digital Marketing Specialist

## Role Overview

The SEO/Digital Marketing Specialist is responsible for ensuring the JTLD Consulting Inc platform is discoverable through search engines, drives organic traffic, and converts visitors into registered candidates and employers.

## Priority

**Low** - Phase 3+

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Google Search Console | Search performance monitoring |
| Google Analytics 4 | Traffic and behavior analytics |
| Google Tag Manager | Event tracking management |
| Ahrefs / SEMrush | SEO research and auditing |
| Schema.org | Structured data markup |
| Next.js Metadata API | SEO implementation |
| Mailchimp / SendGrid | Email marketing |
| Google Ads | Paid search campaigns |

---

## Skills

---

### 1. Technical SEO

**Purpose:** This skill exists to implement the on-site technical infrastructure — meta tags, structured data, sitemaps, robots.txt, canonical URLs, and Core Web Vitals optimization — that enables search engines to crawl, index, and rank the JTLD Consulting Inc platform correctly.

**Preconditions:**
- Next.js App Router is used (app directory structure with `layout.tsx` and `page.tsx` files).
- The application is deployed and accessible via a public URL (or staging URL for testing).
- Google Search Console account is created and the site is verified.
- Access to the `app/` directory for adding/modifying metadata exports.

**Steps:**
1. Implement global metadata in `app/layout.tsx` using the Next.js Metadata API:
   ```typescript
   // app/layout.tsx - Global metadata
   export const metadata = {
     title: {
       template: '%s | JTLD Consulting Inc',
       default: 'JTLD Consulting Inc - Find IT Jobs & Talent',
     },
     description: 'Connect with top IT professionals...',
     openGraph: { ... },
     twitter: { ... },
   }
   ```
2. Implement dynamic metadata for every page that has unique content. At minimum, implement `generateMetadata` for:
   - `app/jobs/[id]/page.tsx` — use the job title as the page title, first 160 characters of description as meta description.
   - `app/companies/[id]/page.tsx` — use the company name as the title.
   - `app/blog/[slug]/page.tsx` — use the article title and excerpt.
   ```typescript
   // app/jobs/[id]/page.tsx - Dynamic job metadata
   export async function generateMetadata({ params }) {
     const job = await getJob(params.id)
     return {
       title: job.title,
       description: job.description.slice(0, 160),
     }
   }
   ```
3. Implement Open Graph and Twitter Card meta tags on every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Create a default OG image for pages without a specific one.
4. Create `app/sitemap.ts` to generate a dynamic XML sitemap. Include all public pages: `/`, `/jobs`, `/jobs/[id]` (all published jobs), `/companies/[id]`, `/blog/[slug]`. Set `changeFrequency` and `priority` appropriately (jobs: daily/0.8, homepage: weekly/1.0, blog: weekly/0.6).
5. Create `app/robots.ts` to generate `robots.txt`. Allow crawling of all public pages. Disallow crawling of `/api/`, `/admin/`, `/dashboard/`, `/auth/`. Point to the sitemap URL.
6. Implement canonical URLs on every page to prevent duplicate content. For paginated pages (`/jobs?page=2`), set the canonical to the base URL without pagination parameters, or use `rel="prev"` and `rel="next"`.
7. Optimize URL structure: job URLs should be `/jobs/[slug]` (e.g., `/jobs/senior-react-developer-toronto`) not `/jobs/[id]`. Generate URL-safe slugs from job titles using a utility function. Implement 301 redirects from old URLs if migrating.
8. Run Lighthouse on every key page and fix issues until: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 95. Specifically target: LCP < 2.5s, FID < 100ms, CLS < 0.1.
9. Implement internal linking: job detail pages link to related jobs, company pages link to their open jobs, blog posts link to relevant job listings.
10. Submit the sitemap to Google Search Console. Monitor the Index Coverage report for errors (404s, redirects, excluded pages). Fix all issues.

**What NOT to Do:**
- Do not use client-side-only rendering for content that needs to be indexed. Job listings, company profiles, and blog posts must be server-rendered or statically generated.
- Do not block search engines from crawling job listing pages in `robots.txt`.
- Do not use the same meta title and description on every page. Each page must have unique metadata.
- Do not skip Open Graph tags — social media sharing without OG tags produces ugly, unbranded previews.
- Do not use JavaScript-only navigation (client-side routing without proper `<a>` tags). Search engines need crawlable links.
- Do not ignore Core Web Vitals. Google uses them as ranking factors.

**Done Condition:**
- Every public page has a unique `<title>`, `<meta name="description">`, and Open Graph tags.
- `sitemap.xml` is generated dynamically and includes all public pages.
- `robots.txt` is configured correctly (public pages allowed, private pages disallowed).
- Canonical URLs are set on every page.
- Job URLs use SEO-friendly slugs, not database IDs.
- Lighthouse SEO score is 95+ on all key pages.
- Sitemap is submitted to Google Search Console and showing indexed pages.

---

### 2. On-Page SEO

**Purpose:** This skill exists to optimize the content, heading structure, images, and keyword targeting on every page so the platform ranks for relevant IT staffing and recruitment search queries.

**Preconditions:**
- Technical SEO (Skill 1) is implemented — meta tags, sitemap, robots.txt are in place.
- Keyword research has been conducted (or will be conducted as Step 1 of this skill).
- Access to Ahrefs, SEMrush, or Google Keyword Planner for keyword data.
- Content for job listings, company profiles, and static pages exists.

**Steps:**
1. Conduct keyword research: identify 20-30 target keywords relevant to JTLD Consulting Inc. Prioritize by search volume and competition. Categories to research:
   - High priority: "IT staffing agency", "contract IT jobs", "hire IT contractors", "IT recruitment platform".
   - Job-specific: "React developer jobs", "DevOps engineer contract", "full stack developer Toronto".
   - Location-specific: "IT jobs Toronto", "tech staffing Canada", "IT contractors Ontario".
2. Map keywords to pages: assign 1-2 primary keywords per page. Homepage targets "IT staffing agency" and "hire IT contractors". Job listing page targets "IT contract jobs". Individual job pages target the specific job title + location.
3. Optimize heading hierarchy on every page:
   - Each page has exactly one `<h1>` containing the primary keyword.
   - `<h2>` tags for major sections (e.g., "Job Description", "Requirements", "Benefits").
   - `<h3>` tags for subsections. Never skip heading levels (no `<h1>` followed by `<h3>`).
4. Optimize image alt text: every `<img>` and Next.js `<Image>` component must have descriptive `alt` text. For company logos: `alt="[Company Name] logo"`. For decorative images: `alt=""` (empty, not missing).
5. Optimize content length: job listing descriptions should be at least 300 words. Static pages (About, Services) should be at least 500 words. Blog posts should be 800-1500 words.
6. Optimize URL slugs: use lowercase, hyphen-separated words. Include the primary keyword. Keep under 60 characters. Examples: `/jobs/senior-react-developer-toronto`, `/blog/top-it-skills-2026`.
7. Implement FAQ schema markup on relevant pages (e.g., a FAQ section on the homepage or an "About" page) using `FAQPage` structured data. This enables rich snippets in search results.
8. Implement featured snippet optimization: for blog posts targeting question-based queries, structure the answer in a concise paragraph immediately after the `<h2>` question heading.

**What NOT to Do:**
- Do not stuff keywords unnaturally into content. Write for humans first, search engines second.
- Do not use the same `<h1>` on multiple pages.
- Do not leave images without alt text — this is both an SEO and accessibility failure.
- Do not create thin content pages (under 100 words) just to target a keyword. Google penalizes thin content.
- Do not hide text or use the same color text as the background to stuff keywords. This is a search engine penalty risk.
- Do not change URLs of already-indexed pages without implementing 301 redirects.

**Done Condition:**
- Keyword research document exists with 20-30 target keywords mapped to specific pages.
- Every page has exactly one `<h1>` with the primary keyword.
- Heading hierarchy is correct on all pages (no skipped levels, no duplicate `<h1>`s).
- All images have appropriate alt text.
- Content meets minimum word count guidelines.
- URL slugs are keyword-optimized and under 60 characters.

---

### 3. Google for Jobs Integration

**Purpose:** This skill exists to implement `JobPosting` structured data (Schema.org) on every job listing page so that JTLD Consulting Inc jobs appear directly in Google's job search experience, driving high-intent candidate traffic.

**Preconditions:**
- Job listing pages exist at `app/jobs/[id]/page.tsx` (or `app/jobs/[slug]/page.tsx`).
- Job data includes all fields required by Google's JobPosting schema: title, description, datePosted, hiringOrganization, jobLocation, employmentType.
- Google Search Console is verified and accessible.
- Google Rich Results Test tool is available at https://search.google.com/test/rich-results.

**Steps:**
1. Create a utility function `generateJobPostingSchema(job)` in `src/lib/seo/job-schema.ts` that accepts a job object and returns a valid JSON-LD `JobPosting` schema object:
   ```json
   {
     "@context": "https://schema.org/",
     "@type": "JobPosting",
     "title": "Senior React Developer",
     "description": "We are looking for...",
     "datePosted": "2026-01-29",
     "validThrough": "2026-02-28",
     "employmentType": "CONTRACTOR",
     "hiringOrganization": {
       "@type": "Organization",
       "name": "Tech Corp"
     },
     "jobLocation": {
       "@type": "Place",
       "address": {
         "@type": "PostalAddress",
         "addressLocality": "Toronto",
         "addressRegion": "ON",
         "addressCountry": "CA"
       }
     },
     "baseSalary": {
       "@type": "MonetaryAmount",
       "currency": "CAD",
       "value": {
         "@type": "QuantitativeValue",
         "value": 85,
         "unitText": "HOUR"
       }
     }
   }
   ```
2. Inject the JSON-LD into each job listing page by rendering a `<script type="application/ld+json">` tag in the page component. Use `JSON.stringify(schema)` to serialize. Place it in the `<head>` via Next.js metadata or in the page body.
3. Map all required fields from the Prisma `Job` model to the Schema.org `JobPosting` properties:
   - `job.title` -> `title`
   - `job.description` -> `description` (full HTML description, not truncated)
   - `job.createdAt` -> `datePosted` (ISO 8601 format)
   - `job.expiresAt` -> `validThrough` (ISO 8601 format)
   - `job.type` (CONTRACT, FULL_TIME, PART_TIME) -> `employmentType` (CONTRACTOR, FULL_TIME, PART_TIME)
   - `job.company.name` -> `hiringOrganization.name`
   - `job.location` -> `jobLocation.address` (split into locality, region, country)
   - `job.salary` -> `baseSalary` (with currency and unit: HOUR, MONTH, YEAR)
4. Handle optional but recommended fields: `skills`, `qualifications`, `responsibilities`, `jobBenefits`, `industry`, `directApply` (set to `true` with the apply URL).
5. Handle remote jobs: for remote positions, set `jobLocationType: "TELECOMMUTE"` instead of a physical address. For hybrid, include both.
6. Implement the Google Indexing API for real-time updates: when a job is created, updated, or expired, send a notification to Google via the Indexing API (`POST https://indexing.googleapis.com/v3/urlNotifications:publish`) with the job URL and type (`URL_UPDATED` or `URL_DELETED`).
7. Test every job listing page with Google Rich Results Test. Submit the page URL and verify: no errors, no warnings, all required fields are present, the preview shows correctly.
8. Monitor Google Search Console's "Job posting" enhancement report. Fix any reported issues (missing fields, expired jobs still indexed, etc.).

**What NOT to Do:**
- Do not omit required fields (`title`, `description`, `datePosted`, `hiringOrganization`). Google will reject the listing.
- Do not use fake or misleading salary data to attract clicks. Google penalizes deceptive job postings.
- Do not leave expired jobs with `validThrough` dates in the past still indexed. Remove or update them.
- Do not use HTML in the `title` field. It must be plain text.
- Do not use a generic company name like "Confidential" for `hiringOrganization` unless absolutely necessary — it reduces click-through rate.
- Do not skip testing with Rich Results Test before deploying. A broken schema renders the entire effort useless.

**Done Condition:**
- Every published job listing page includes valid `JobPosting` JSON-LD structured data.
- Google Rich Results Test passes with zero errors for all job listing pages.
- All required fields are populated from real database data (not hardcoded).
- Remote jobs use `jobLocationType: "TELECOMMUTE"`.
- Salary data is included when available with correct currency and unit.
- Google Indexing API is called on job create, update, and expiry.
- Google Search Console shows job postings appearing in the "Job posting" enhancement report with zero errors.

---

### 4. Content Strategy

**Purpose:** This skill exists to plan and produce SEO-optimized content (blog articles, career guides, industry reports) that attracts organic search traffic from candidates and employers and positions JTLD Consulting Inc as an authority in IT staffing.

**Preconditions:**
- Blog section exists in the application (`app/blog/` with `[slug]/page.tsx`).
- Keyword research is completed (from Skill 2) with a list of target keywords.
- Content management system (CMS) or markdown-based blog is set up.
- A content calendar template is available (spreadsheet or project management tool).

**Steps:**
1. Create a content calendar for the next 3 months with at least 2 posts per month. Assign each post a target keyword, a title, a target audience (candidate or employer), and a publish date.
2. Define content categories:
   - **Job market insights**: "Top IT Skills in Demand for 2026", "Tech Salary Trends in Canada".
   - **Career advice**: "How to Prepare for a React Developer Interview", "Transitioning from Full-Time to Contract Work".
   - **Employer guides**: "How to Write a Job Posting That Attracts Top IT Talent", "Managing Remote IT Contractors".
   - **Success stories**: Candidate placement stories (with permission), employer testimonials.
   - **Industry trends**: "AI's Impact on IT Staffing", "The Rise of Contract-to-Hire in Tech".
3. Write each article following SEO best practices:
   - Title includes the target keyword and is under 60 characters.
   - Meta description is 120-160 characters and includes the keyword.
   - Article is 800-1500 words.
   - Include the keyword in the first paragraph, at least one `<h2>`, and naturally throughout (1-2% keyword density, never forced).
   - Include internal links to relevant job listings, company profiles, and other blog posts.
   - Include at least one external link to an authoritative source.
4. Implement article structured data using `Article` schema (JSON-LD): `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `image`.
5. Create landing pages for high-value keywords:
   - `/it-staffing-toronto` targeting "IT staffing Toronto".
   - `/contract-developer-jobs` targeting "contract developer jobs".
   - Each landing page has unique content (not just a filtered job list), an `<h1>` with the keyword, and a call-to-action.
6. Implement content repurposing: turn each blog post into social media snippets (LinkedIn, Twitter/X), email newsletter content, and job alert email content.
7. Track content performance: for each article, monitor organic traffic (Google Analytics), keyword ranking (Ahrefs/SEMrush), time on page, bounce rate, and conversion rate (registrations from blog readers).
8. Update and refresh existing content quarterly: check for outdated statistics, broken links, and ranking drops. Update content and re-publish with a new `dateModified`.

**What NOT to Do:**
- Do not publish duplicate or plagiarized content. Every article must be original.
- Do not create content without a target keyword. Every piece must serve an SEO purpose.
- Do not publish articles without internal links to the platform. Content should drive users toward registration and job applications.
- Do not ignore content performance data. If an article gets zero traffic after 3 months, analyze why and revise or redirect.
- Do not write for search engines at the expense of readability. Content must provide genuine value to the reader.
- Do not publish content with factual errors (wrong salary data, outdated technology claims). Research and cite sources.

**Done Condition:**
- Content calendar exists with 6+ planned articles for the next 3 months.
- At least 4 articles are published and indexed by Google.
- Each article has proper metadata, structured data, internal links, and targets a specific keyword.
- Landing pages exist for top 3 high-value keywords.
- Google Analytics shows organic traffic arriving on blog posts.
- Content performance tracking is in place (traffic, rankings, conversions per article).

---

### 5. Analytics and Tracking

**Purpose:** This skill exists to implement Google Analytics 4, conversion tracking, custom event tracking, and UTM-based attribution so that every marketing decision is backed by data on user behavior, traffic sources, and conversion rates.

**Preconditions:**
- Google Analytics 4 (GA4) property is created.
- Google Tag Manager (GTM) container is created.
- The application is deployed on a public URL.
- Privacy policy and cookie consent mechanism are in place (required for GDPR/PIPEDA compliance).

**Steps:**
1. Install Google Tag Manager: add the GTM container snippet to `app/layout.tsx`. Place the `<script>` in the `<head>` and the `<noscript>` immediately after `<body>`. Use the Next.js `Script` component with `strategy="afterInteractive"` for the main script.
2. Configure GA4 via GTM: create a GA4 Configuration tag in GTM with the Measurement ID. Set it to fire on "All Pages" trigger. Verify data is flowing by checking the GA4 Real-Time report.
3. Set up conversion events. Define these as conversions in GA4:
   - `sign_up` — fired when a candidate or employer completes registration.
   - `job_application_submitted` — fired when a candidate submits a job application.
   - `job_posted` — fired when an employer posts a job.
   - `contact_form_submitted` — fired when any contact form is submitted.
4. Implement custom event tracking via GTM Data Layer. Push events from the application:
   - `dataLayer.push({ event: 'sign_up', user_type: 'candidate' })` on registration success.
   - `dataLayer.push({ event: 'job_application_submitted', job_id: jobId, job_title: jobTitle })` on application success.
   - `dataLayer.push({ event: 'job_search', search_term: query, results_count: count })` on job search.
   - `dataLayer.push({ event: 'job_view', job_id: jobId, job_title: jobTitle })` on job detail page load.
5. Set up UTM parameter strategy: define standard UTM conventions for all external links:
   - Email campaigns: `utm_source=email&utm_medium=newsletter&utm_campaign=weekly-jobs`.
   - Social media: `utm_source=linkedin&utm_medium=social&utm_campaign=job-share`.
   - Paid ads: `utm_source=google&utm_medium=cpc&utm_campaign=it-staffing-toronto`.
   Document all UTM conventions in a shared spreadsheet.
6. Set up goals and funnels in GA4 Explore:
   - Registration funnel: Homepage -> Sign Up Page -> Form Submitted -> Email Verified.
   - Job application funnel: Job Search -> Job View -> Apply Clicked -> Application Submitted.
   - Identify drop-off points and report them.
7. Build custom GA4 dashboards:
   - Traffic overview: sessions, users, new vs. returning, traffic sources.
   - Conversion dashboard: registration rate, application rate, job posting rate by source.
   - Content performance: top pages by traffic, average engagement time, bounce rate.
8. Implement cookie consent: only fire GA4 and GTM tags after the user consents to analytics cookies. Use a consent management platform or a custom cookie banner that updates GTM consent state.
9. Set up monthly reporting: create a Google Looker Studio (Data Studio) dashboard connected to GA4 that auto-refreshes. Include: traffic trend, conversion trend, top traffic sources, top landing pages, top search queries (from Search Console integration).

**What NOT to Do:**
- Do not fire analytics tags before the user consents to cookies. This violates GDPR/PIPEDA.
- Do not use Universal Analytics (UA). It is deprecated. Use GA4 only.
- Do not track personally identifiable information (PII) in GA4 — no email addresses, names, or phone numbers in event parameters.
- Do not create UTM links without following the documented convention. Inconsistent UTMs make attribution analysis unreliable.
- Do not ignore the GA4 Real-Time report during implementation. It is the fastest way to verify events are firing correctly.
- Do not rely on pageview data alone. Custom events (job_view, job_search, sign_up) are what drive actionable insights.

**Done Condition:**
- GA4 is receiving data via GTM (verified in Real-Time report).
- Four conversion events are configured and tracking: `sign_up`, `job_application_submitted`, `job_posted`, `contact_form_submitted`.
- Custom events fire correctly for: job search, job view, registration, application submission.
- UTM conventions are documented and used consistently on all external links.
- Funnels are set up in GA4 Explore for registration and job application flows.
- Cookie consent blocks analytics tracking until the user opts in.
- Monthly reporting dashboard exists in Looker Studio with auto-refreshing data.

---

### 6. Email Marketing

**Purpose:** This skill exists to build automated email campaigns — job alerts, onboarding drip sequences, and newsletters — that re-engage registered users, drive job applications, and increase platform retention.

**Preconditions:**
- Email service provider is configured (SendGrid, Mailchimp, or ConvertKit).
- User email addresses are stored in the database with opt-in consent flags.
- Email templates are designed (or a template system exists).
- CAN-SPAM (US) and CASL (Canada) compliance requirements are understood.

**Steps:**
1. Implement job alert emails:
   - Allow candidates to set job alert preferences: keywords, location, job type, salary range.
   - Store preferences in the database linked to the candidate's profile.
   - Create a cron job that runs daily: query new jobs matching each candidate's preferences, generate a personalized email with job listings, send via the email service.
   - Include: job title, company, location, salary, and a direct "Apply" link with UTM parameters.
2. Implement the onboarding drip campaign:
   - Candidate registration triggers a 5-email sequence over 14 days:
     1. Day 0: Welcome email with platform overview and profile completion CTA.
     2. Day 1: "Complete your profile" reminder with tips.
     3. Day 3: First job recommendations based on their skills.
     4. Day 7: "How to stand out to employers" career advice.
     5. Day 14: "Your weekly job digest" (transition to regular alerts).
   - Employer registration triggers a 3-email sequence:
     1. Day 0: Welcome email with "Post your first job" CTA.
     2. Day 3: "Tips for writing effective job postings".
     3. Day 7: "Browse our talent pool" with candidate highlights.
3. Build a monthly newsletter:
   - Content: industry news, new blog posts, featured jobs, platform updates, candidate success stories.
   - Segment by user type: candidates get career-focused content, employers get hiring-focused content.
   - Schedule for the first Tuesday of each month.
4. Implement A/B testing on email campaigns:
   - Test subject lines (2 variants per campaign, send to 20% of list each, then send the winner to remaining 60%).
   - Track: open rate, click-through rate, conversion rate (registrations/applications from email).
   - Minimum sample size of 100 per variant before declaring a winner.
5. Implement email deliverability best practices:
   - Configure SPF, DKIM, and DMARC records for the sending domain.
   - Use a dedicated sending domain (e.g., `mail.jtldconsulting.com`).
   - Monitor bounce rate (hard bounces > 2% = problem), spam complaint rate (> 0.1% = problem).
   - Implement automatic unsubscribe for hard bounces after 2 consecutive bounces.
6. Implement unsubscribe and preference management:
   - Every email includes a one-click unsubscribe link (legally required).
   - Unsubscribe page allows: unsubscribe from all, unsubscribe from specific types (job alerts, newsletter, product updates).
   - Process unsubscribes within 24 hours (10 business days maximum per CAN-SPAM, but aim for immediate).
7. Build an email analytics dashboard: track per-campaign metrics (sent, delivered, opened, clicked, bounced, unsubscribed, spam complaints). Aggregate weekly and monthly trends.

**What NOT to Do:**
- Do not send emails to users who have not opted in. This violates CAN-SPAM and CASL.
- Do not send emails without an unsubscribe link. This is a legal requirement.
- Do not buy or scrape email lists. Only email users who registered on the platform.
- Do not send more than 1 email per day to any user (excluding transactional emails like password resets).
- Do not use misleading subject lines (e.g., "RE:" or "FWD:" on first-contact emails). This damages trust and deliverability.
- Do not ignore bounce and spam complaint rates. High rates get the domain blacklisted.

**Done Condition:**
- Job alert emails are sent daily to subscribed candidates with matching jobs.
- Onboarding drip campaigns are active for both candidate and employer registration.
- Monthly newsletter is sent to segmented lists (candidates vs. employers).
- A/B testing is implemented on at least one campaign with results tracked.
- SPF, DKIM, and DMARC are configured for the sending domain.
- Unsubscribe mechanism works and processes immediately.
- Email analytics dashboard shows delivery, open, click, and conversion rates.
- Bounce rate is below 2% and spam complaint rate is below 0.1%.

---

### 7. Paid Advertising

**Purpose:** This skill exists to run and optimize paid search (Google Ads) and paid social (LinkedIn Ads) campaigns that drive targeted traffic from employers looking to hire IT talent and candidates searching for IT contract work.

**Preconditions:**
- Google Ads account is created and linked to the Google Analytics 4 property.
- LinkedIn Ads account is created (for employer-targeted campaigns).
- Advertising budget is approved and allocated.
- Landing pages exist for campaign targets (from Skill 4).
- Conversion tracking is implemented (from Skill 5).

**Steps:**
1. Set up Google Ads campaigns for candidate acquisition:
   - Campaign type: Search.
   - Target keywords: "IT contract jobs", "React developer jobs Toronto", "DevOps contract work Canada", etc. (from keyword research).
   - Create 3 ad groups, each targeting a keyword cluster (job type, technology, location).
   - Write 3 ad variations per group. Include: keyword in headline, value proposition, clear CTA ("Apply Now", "Browse Jobs").
   - Set landing page to the relevant filtered job listing page (e.g., `/jobs?type=CONTRACT&tech=React`).
2. Set up Google Ads campaigns for employer acquisition:
   - Campaign type: Search.
   - Target keywords: "hire IT contractors", "IT staffing agency", "post IT jobs online".
   - Landing page: employer-focused landing page with "Post a Job" CTA.
   - Write ad copy emphasizing: access to vetted IT talent, fast time-to-hire, no upfront fees (if applicable).
3. Set up LinkedIn Ads for employer targeting:
   - Campaign type: Sponsored Content.
   - Target audience: HR managers, CTOs, engineering managers at companies with 50-500 employees in tech, finance, healthcare.
   - Create 2-3 ad variations with different images and copy.
   - Landing page: employer-focused landing page.
4. Implement conversion tracking for all campaigns:
   - Google Ads: import GA4 conversions (sign_up, job_posted) into Google Ads for optimization.
   - LinkedIn Ads: install the LinkedIn Insight Tag via GTM. Set up conversion events for employer registration.
5. Set up bid strategy and budgets:
   - Start with "Maximize Clicks" for the first 2 weeks to gather data.
   - Switch to "Target CPA" once 30+ conversions are recorded. Set target CPA based on acceptable customer acquisition cost.
   - Allocate 60% of budget to Google Ads (candidate acquisition), 40% to LinkedIn Ads (employer acquisition).
6. Implement retargeting:
   - Google Ads remarketing: create audiences for users who visited job listings but did not apply, users who started registration but did not complete.
   - LinkedIn retargeting: retarget company page visitors and website visitors with employer-focused ads.
   - Create specific ad copy for retargeting: "Still looking? New React jobs posted today" or "Finish your registration to start hiring".
7. Build a landing page optimization framework:
   - Create dedicated landing pages for each campaign (not the homepage).
   - A/B test landing page elements: headline, CTA button text, form length, hero image.
   - Track conversion rate per landing page variant. Minimum 100 visitors per variant before declaring a winner.
8. Set up weekly reporting: campaign spend, impressions, clicks, CTR, conversions, CPA, ROAS. Compare against targets and adjust bids/budgets.

**What NOT to Do:**
- Do not send paid traffic to the homepage. Always use dedicated, optimized landing pages.
- Do not run campaigns without conversion tracking. Without it, there is no way to measure ROI.
- Do not set and forget campaigns. Review performance weekly and adjust bids, keywords, and ad copy.
- Do not use broad match keywords without negative keyword lists. This wastes budget on irrelevant searches.
- Do not exceed the approved budget without authorization.
- Do not mix candidate-targeting and employer-targeting in the same campaign. Keep audiences separate.

**Done Condition:**
- Google Ads search campaigns are live for candidate and employer acquisition.
- LinkedIn Ads campaign is live for employer targeting.
- Conversion tracking is working: conversions from ads appear in Google Ads and LinkedIn Ads dashboards.
- Retargeting audiences are created and retargeting campaigns are active.
- Weekly reporting shows: spend, clicks, conversions, CPA for each campaign.
- CPA is within the approved target range after the first 30 days.
- At least one landing page A/B test has been run with results documented.

---

### 8. Social Media

**Purpose:** This skill exists to build and maintain the JTLD Consulting Inc brand presence on LinkedIn and Twitter/X through consistent posting, community engagement, and content distribution that drives awareness and traffic to the platform.

**Preconditions:**
- LinkedIn company page is created and verified.
- Twitter/X account is created with a professional profile (bio, profile image, header image).
- Content from the blog and job listings is available for distribution.
- Social media scheduling tool is available (Buffer, Hootsuite, or LinkedIn native scheduling).

**Steps:**
1. Set up the LinkedIn company page:
   - Complete all sections: about, specialties, website URL, industry, company size, headquarters.
   - Upload a professional logo and banner image.
   - Write a compelling "About" section (2000 characters max) that includes target keywords and a clear value proposition.
2. Create a social media content calendar: plan 3-5 posts per week on LinkedIn, 5-7 posts per week on Twitter/X. Mix content types:
   - 40% job-related: featured jobs, new job postings, hiring trends.
   - 30% educational: blog post promotions, career tips, tech industry insights.
   - 20% social proof: candidate success stories, employer testimonials, placement milestones.
   - 10% company updates: new features, team announcements, event participation.
3. Post each new job listing to LinkedIn and Twitter/X with a compelling hook, key details (title, company, location, salary range), and a link to the listing with UTM parameters (`utm_source=linkedin&utm_medium=social&utm_campaign=job-share`).
4. Share each new blog post across social channels: write a unique social caption for each platform (LinkedIn: longer, professional. Twitter/X: shorter, punchy with hashtags).
5. Engage with the community daily:
   - Respond to comments on company posts within 4 hours.
   - Like and comment on relevant industry posts (tech news, hiring discussions).
   - Join and participate in LinkedIn Groups related to IT staffing and tech careers.
6. Build employer brand content:
   - Post "day in the life" or "behind the scenes" content.
   - Share team member profiles and expertise.
   - Highlight the platform's technology stack and innovation.
7. Track social media metrics weekly:
   - LinkedIn: impressions, engagement rate, follower growth, website clicks.
   - Twitter/X: impressions, engagement rate, follower growth, link clicks.
   - Attribute social traffic to registrations and applications using UTM parameters in Google Analytics.

**What NOT to Do:**
- Do not post the same content on LinkedIn and Twitter/X without adapting it. Each platform has different audience expectations and content formats.
- Do not ignore comments or mentions. Unanswered engagement damages brand perception.
- Do not post only job listings. A feed of nothing but jobs feels like spam. Follow the 40/30/20/10 content mix.
- Do not use irrelevant or excessive hashtags. Use 3-5 targeted hashtags on LinkedIn, 2-3 on Twitter/X.
- Do not post during weekends or outside business hours unless analytics show engagement at those times.
- Do not share confidential client or candidate information on social media, even in success stories, without written permission.

**Done Condition:**
- LinkedIn company page is fully set up with all sections completed.
- Twitter/X profile is professional and complete.
- Content calendar exists with 3-5 LinkedIn posts and 5-7 Twitter/X posts planned per week.
- Posts are being published on schedule for at least 4 consecutive weeks.
- Community engagement is happening daily (comments, likes, group participation).
- Social media traffic is tracked in GA4 via UTM parameters.
- Follower count is growing week-over-week on both platforms.

---

## Key Metrics

| Metric | Target |
|--------|--------|
| Organic traffic | Month-over-month growth |
| Keyword rankings | Top 10 for target keywords |
| Click-through rate | > 3% from search results |
| Bounce rate | < 50% on landing pages |
| Registration conversion | > 5% of visitors |
| Job alert subscribers | Growth trend |
| Google for Jobs impressions | Growth trend |
| Page load speed | < 2.5s LCP |

## Learning Resources

- [Google Search Central](https://developers.google.com/search/docs)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org JobPosting](https://schema.org/JobPosting)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Ahrefs Blog](https://ahrefs.com/blog/)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

## Tools

- Google Search Console
- Google Analytics 4
- Google Tag Manager
- Google Rich Results Test
- Ahrefs or SEMrush (SEO research)
- Screaming Frog (site crawling)
- PageSpeed Insights (performance)
- Mailchimp or ConvertKit (email marketing)
