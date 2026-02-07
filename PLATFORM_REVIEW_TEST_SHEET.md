# JTLD Consulting Platform — Review & Test Sheet

> **Version:** 0.1.0
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4
> **Date:** 2026-02-05

---

## Table of Contents

1. [Global Components](#1-global-components)
2. [Home Page](#2-home-page)
3. [Services Hub](#3-services-hub)
4. [Service Detail Pages (×6)](#4-service-detail-pages)
5. [Industries Hub](#5-industries-hub)
6. [Industry Detail Pages (×8)](#6-industry-detail-pages)
7. [About](#7-about)
8. [Insights](#8-insights)
9. [Careers](#9-careers)
10. [Contact](#10-contact)
11. [Consultation](#11-consultation)
12. [Login](#12-login)
13. [Sign Up](#13-sign-up)
14. [ChatBot (Tosh)](#14-chatbot-tosh)
15. [API Endpoints](#15-api-endpoints)
16. [Dark Mode](#16-dark-mode)
17. [Cross-Cutting Concerns](#17-cross-cutting-concerns)

---

## 1. Global Components

### 1.1 Layout (`src/app/layout.tsx`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Root metadata title | "JTLD Consulting Inc \| Business Consulting & Technology Services" | | |
| Title template | "%s \| JTLD Consulting Inc" (child pages prepend their title) | | |
| Meta description present | Yes — mentions strategic consulting, managed IT, AI, data analytics, cloud | | |
| OpenGraph locale | `en_CA` | | |
| Fonts loaded | Geist Sans + Geist Mono via `next/font/google` | | |
| ThemeProvider wraps all children | Yes | | |
| FOWT prevention script in `<head>` | Inline script reads `localStorage('jtld-theme')` and applies `.dark` class before paint | | |
| `suppressHydrationWarning` on `<html>` | Yes | | |
| Header renders on all pages | Yes (in layout) | | |
| Footer renders on all pages | Yes (in layout) | | |
| ChatBot renders on all pages | Yes (in layout) | | |

### 1.2 Header (`src/components/layout/Header.tsx`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| **Top Bar** | | | |
| Email link | `mailto:info@jtldinc.com` — displays "info@jtldinc.com" | | |
| Phone link | `tel:+16475551234` — displays "(647) 555-1234" (hidden on mobile) | | |
| Client Portal link | Links to `/login` | | |
| **Main Nav** | | | |
| Logo | Links to `/` — displays logo.svg image + "JTLD" / "Consulting" text | | |
| Logo dark mode | `dark:invert dark:brightness-200` applied | | |
| Services nav link | Links to `/services` | | |
| Services dropdown (hover) | 6 items: Business Consulting, Business Process Services, Managed IT Services, Artificial Intelligence, Data Analytics, Cloud & Hybrid IT | | |
| Industries nav link | Links to `/industries` | | |
| Industries dropdown (hover) | 7 items: Financial Services, Healthcare & Life Sciences, Energy & Utilities, Government & Public Sector, Retail & E-Commerce, Manufacturing, View All Industries | | |
| About link | Links to `/about` | | |
| Insights link | Links to `/insights` | | |
| Careers link | Links to `/careers` | | |
| Contact link | Links to `/contact` | | |
| Theme toggle button | Sun/Moon icon, toggles dark mode | | |
| Log In button | Links to `/login` | | |
| Sign Up button | Links to `/signup` — outlined style | | |
| Get a Consultation CTA | Links to `/consultation` — solid primary-700 style | | |
| Sticky behavior | `sticky top-0 z-50` | | |
| **Mobile Menu** | | | |
| Hamburger/close icon toggles | `useState(mobileOpen)` | | |
| All nav links present in mobile | Yes, with nested children visible inline | | |
| Mobile auth buttons | Log In + Sign Up side-by-side, Get a Consultation full-width below | | |
| Mobile menu closes on link click | `onClick={() => setMobileOpen(false)}` | | |
| Theme toggle in mobile | Yes (before hamburger) | | |

### 1.3 Footer (`src/components/layout/Footer.tsx`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| **Brand Column** | | | |
| Logo + branding | Logo image (inverted), "JTLD" + "Consulting" text | | |
| Description text | "Strategic business consulting, technology services…" | | |
| Social: LinkedIn | Links to `https://linkedin.com/company/jtld-consulting` (opens new tab) | | |
| Social: Twitter/X | Links to `https://twitter.com/jtldconsulting` (opens new tab) | | |
| Social: Facebook | Links to `https://facebook.com/jtldconsulting` (opens new tab) | | |
| **Services Column (6 links)** | | | |
| Business Consulting | `/services/business-consulting` | | |
| Business Process Services | `/services/business-process` | | |
| Managed IT Services | `/services/managed-it` | | |
| Artificial Intelligence | `/services/ai` | | |
| Data Analytics | `/services/data-analytics` | | |
| Cloud & Hybrid IT | `/services/cloud-hybrid` | | |
| **Industries Column (6 links)** | | | |
| Financial Services | `/industries/financial-services` | | |
| Healthcare | `/industries/healthcare` | | |
| Energy & Utilities | `/industries/energy` | | |
| Government | `/industries/government` | | |
| Retail & E-Commerce | `/industries/retail` | | |
| Manufacturing | `/industries/manufacturing` | | |
| **Company Column (5 links)** | | | |
| About Us | `/about` | | |
| Leadership | `/about/leadership` | | |
| Careers | `/careers` | | |
| Insights & Blog | `/insights` | | |
| Contact Us | `/contact` | | |
| **Bottom Bar** | | | |
| Copyright year | Dynamic: `new Date().getFullYear()` | | |
| Privacy Policy link | `/privacy` | | |
| Terms of Service link | `/terms` | | |
| Accessibility link | `/accessibility` | | |

### 1.4 Theme Toggle (`src/components/ThemeToggle.tsx`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Displays sun icon in dark mode | Yes | | |
| Displays moon icon in light mode | Yes | | |
| Clicking toggles theme | Calls `toggleTheme()` from `useTheme()` | | |
| Accessible `aria-label` | Present | | |

### 1.5 Theme Provider (`src/components/ThemeProvider.tsx`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Manages `"light" \| "dark" \| "system"` state | Yes | | |
| Reads from `localStorage("jtld-theme")` on mount | Yes | | |
| Writes to `localStorage("jtld-theme")` on change | Yes | | |
| Toggles `.dark` class on `document.documentElement` | Yes | | |
| Listens for OS `prefers-color-scheme` changes (system mode) | Yes | | |
| Exports `useTheme()` hook | `{ theme, resolvedTheme, setTheme, toggleTheme }` | | |

---

## 2. Home Page

**Route:** `/`
**File:** `src/app/page.tsx`

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | | | |
| Subtitle | "Business Consulting & Technology Services" | | |
| Heading | "Strategic Consulting That **Drives Results**" (accent color on "Drives Results") | | |
| Description | "JTLD Consulting partners with organizations…" | | |
| CTA 1: "Schedule a Consultation" | Links to `/contact` — white solid button | | |
| CTA 2: "Explore Our Services" | Links to `/services` — bordered button | | |
| **Stats Bar** (overlapping hero) | | | |
| "200+" / "Clients Served" | Displayed | | |
| "95%" / "Client Retention" | Displayed | | |
| "50+" / "Industry Experts" | Displayed | | |
| "12+" / "Industries Covered" | Displayed | | |
| **Services Grid** (6 cards) | | | |
| Section heading | "End-to-End Consulting & Technology Solutions" | | |
| Business Consulting card | Links to `/services/business-consulting` | | |
| Business Process Services card | Links to `/services/business-process` | | |
| Managed IT Services card | Links to `/services/managed-it` | | |
| Artificial Intelligence card | Links to `/services/ai` | | |
| Data Analytics card | Links to `/services/data-analytics` | | |
| Cloud & Hybrid IT card | Links to `/services/cloud-hybrid` | | |
| Each card shows icon, title, description, "Learn more" | Yes | | |
| **Professional Services** (3 cards) | | | |
| Section heading | "Expert Teams, Delivered On Demand" | | |
| Staff Augmentation | Displays title, description, "Coming Soon" placeholder | | |
| Project-Based Delivery | Same | | |
| Managed Services | Same | | |
| CTA: "Discuss Your Needs" | Links to `/consultation` | | |
| **CTA Section** | | | |
| Heading | "Ready to Transform Your Business?" | | |
| CTA 1: "Get Started Today" | Links to `/contact` | | |
| CTA 2: "View All Services" | Links to `/services` | | |
| **Newsletter** | | | |
| Heading | "Stay Informed" | | |
| Email input | `type="email"`, placeholder "Enter your email", required | | |
| Subscribe button | `type="submit"` | | |
| Disclaimer | "No spam, ever. Unsubscribe at any time." | | |

---

## 3. Services Hub

**Route:** `/services`
**File:** `src/app/services/page.tsx`
**Meta title:** "Our Services"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | | | |
| Heading | "What We Do" | | |
| Description | "Six integrated practices…" | | |
| **Services List** (6 services, alternating layout) | | | |
| Each service shows: tagline, title, description, "Learn more" link | Yes | | |
| Each service has Key Capabilities box with checklist | Yes | | |
| Odd/even layout alternation (`lg:order-2` / `lg:order-1`) | Yes | | |
| **Client Stories** (3 testimonials) | | | |
| Sarah M. — COO, Manufacturing Firm | "…30% cost reduction…" | | |
| David K. — VP of Innovation, Financial Services | "…production models in 6 months" | | |
| Jennifer L. — CTO, Healthcare Startup | "…99.9% uptime…25% IT spend reduction" | | |
| **CTA** | "Schedule a Consultation" → `/consultation` | | |

---

## 4. Service Detail Pages

Each detail page follows an identical template structure.

| Route | Title | Pass/Fail | Notes |
|-------|-------|-----------|-------|
| `/services/business-consulting` | "Business Consulting" | | |
| `/services/business-process` | "Business Process Services" | | |
| `/services/managed-it` | "Managed IT Services" | | |
| `/services/ai` | "Artificial Intelligence" | | |
| `/services/data-analytics` | "Data Analytics" | | |
| `/services/cloud-hybrid` | "Cloud & Hybrid IT" | | |

**Per-page checks:**

| Section | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| Hero with title + description | Yes | | |
| Capabilities section (6 capability cards each) | Title, description per capability | | |
| Why section with 3 differentiators | Title, description per item | | |
| CTA section linking to `/consultation` | "Schedule a Consultation" | | |
| All internal links functional | Yes | | |

---

## 5. Industries Hub

**Route:** `/industries`
**File:** `src/app/industries/page.tsx`
**Meta title:** "Industries We Serve"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Deep Expertise Across Industries" | | |
| **Industry Cards Grid** (8 cards, 2-col on md+) | | | |
| Financial Services | Links to `/industries/financial-services` | | |
| Healthcare & Life Sciences | Links to `/industries/healthcare` | | |
| Energy & Utilities | Links to `/industries/energy` | | |
| Government & Public Sector | Links to `/industries/government` | | |
| Retail & E-Commerce | Links to `/industries/retail` | | |
| Manufacturing | Links to `/industries/manufacturing` | | |
| Telecommunications | Links to `/industries/telecom` | | |
| Education | Links to `/industries/education` | | |
| Each card: title, description, "Learn more" arrow | Yes | | |
| **CTA** | "Don't See Your Industry?" → "Contact Us" → `/contact` | | |

---

## 6. Industry Detail Pages

Each detail page follows an identical template structure.

| Route | Title | Pass/Fail | Notes |
|-------|-------|-----------|-------|
| `/industries/financial-services` | "Financial Services" | | |
| `/industries/healthcare` | "Healthcare & Life Sciences" | | |
| `/industries/energy` | "Energy & Utilities" | | |
| `/industries/government` | "Government & Public Sector" | | |
| `/industries/retail` | "Retail & E-Commerce" | | |
| `/industries/manufacturing` | "Manufacturing" | | |
| `/industries/telecom` | "Telecommunications" | | |
| `/industries/education` | "Education" | | |

**Per-page checks:**

| Section | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| Hero with industry title + description | Yes | | |
| Challenges section (industry-specific list) | Yes | | |
| How We Help / Solutions section | Yes | | |
| CTA linking to `/consultation` | Yes | | |

---

## 7. About

**Route:** `/about`
**File:** `src/app/about/page.tsx`
**Meta title:** "About Us"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Who We Are" heading | | |
| **Our Story** | "From Local Roots to National Impact" heading + narrative paragraphs | | |
| **Timeline** (6 milestones) | 2015 → 2025 with vertical line + dot markers | | |
| 2015 | "JTLD Consulting founded in Toronto" | | |
| 2017 | Expanded into managed IT services | | |
| 2019 | Launched AI & data analytics practice | | |
| 2021 | Opened offices in Calgary and Vancouver | | |
| 2023 | 200+ clients served across 12 industries | | |
| 2025 | Cloud & hybrid IT practice launched | | |
| **Mission & Vision** (2 cards) | | | |
| Mission card | "To empower organizations…" | | |
| Vision card | "To be Canada's most trusted consulting partner…" | | |
| **Core Values** (4 values) | | | |
| Accountability | "We own our commitments…" | | |
| Transparency | "Honest communication…" | | |
| Professionalism | "We bring rigor, discipline…" | | |
| Aspiration | "We push boundaries…" | | |
| **Leadership Team** (4 leaders) | | | |
| James Thompson | Founder & CEO | | |
| Lisa Daniels | Chief Operating Officer | | |
| Thomas Lee | VP, Technology Services | | |
| Diana Reyes | VP, Client Partnerships | | |
| **Industry Links section** | Links to industry detail pages | | |
| **CTA** | "Explore Services" → `/services` | | |

---

## 8. Insights

**Route:** `/insights`
**File:** `src/app/insights/page.tsx`
**Meta title:** "Insights & Thought Leadership"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Insights & Perspectives" heading | | |
| **Category Filter Bar** (sticky below header) | | | |
| "All" button (active state: bg-primary-700) | Yes | | |
| Category buttons (6) | Business Consulting, Business Process Services, Managed IT Services, Artificial Intelligence, Data Analytics, Cloud & Hybrid IT | | |
| Inactive state | `bg-gray-100 text-gray-600` (light), `dark:bg-gray-700 dark:text-gray-300` (dark) | | |
| Filter bar sticky behavior | `sticky top-[100px] z-30` | | |
| **Featured Article** | | | |
| Title | "How Mid-Market Companies Are Winning With AI in 2025" | | |
| Author | Thomas Lee, VP Technology Services | | |
| Date | Jan 15, 2025 | | |
| Read time | 8 min read | | |
| Category badge | Artificial Intelligence — amber colors | | |
| Links to | `/insights/ai-mid-market-2025` | | |
| **Article Grid** (5 articles, 3-col on lg) | | | |
| "5 Signs Your Business Strategy Needs a Reset" | Business Consulting, James Thompson | | |
| "From Dashboards to Decisions" | Data Analytics, David Kim | | |
| "The Hidden Costs of Cloud Migration" | Cloud & Hybrid IT, Thomas Lee | | |
| "Lean Operations in 2025: Beyond the Buzzword" | Business Process Services, Lisa Daniels | | |
| "Why Your IT Outsourcing Model Is Overdue for a Review" | Managed IT Services, Jennifer Park | | |
| **Category Badges** (color-coded) | | | |
| Business Consulting | blue-50/blue-700 (dark: blue-900/30 / blue-400) | | |
| Business Process Services | violet-50/violet-700 | | |
| Managed IT Services | emerald-50/emerald-700 | | |
| Artificial Intelligence | amber-50/amber-700 | | |
| Data Analytics | cyan-50/cyan-700 | | |
| Cloud & Hybrid IT | rose-50/rose-700 | | |
| **Newsletter CTA** | | | |
| Heading | "Get Insights Delivered" | | |
| Email input | `type="email"`, placeholder "Enter your email", required | | |
| Subscribe button | Present | | |
| Disclaimer | "No spam, ever. Unsubscribe at any time." | | |

---

## 9. Careers

**Route:** `/careers`
**File:** `src/app/careers/page.tsx`
**Meta title:** "Careers"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Build Your Career at JTLD Consulting" | | |
| **Why Join Us** (6 perks in 3-col grid) | | | |
| Competitive Compensation | Icon + description | | |
| Flexible Work | Icon + description | | |
| Learning & Growth | Icon + description | | |
| Health & Wellness | Icon + description | | |
| Diverse Projects | Icon + description | | |
| Team Culture | Icon + description | | |
| **Open Positions** (6 job listings) | | | |
| Senior Business Consultant | Business Consulting · Toronto, ON · Full-time → `/careers/senior-business-consultant` | | |
| Data Analytics Lead | Data Analytics · Toronto, ON · Full-time → `/careers/data-analytics-lead` | | |
| Cloud Solutions Architect | Cloud & Hybrid IT · Calgary, AB · Full-time → `/careers/cloud-solutions-architect` | | |
| AI / ML Engineer | Artificial Intelligence · Remote — Canada · Full-time → `/careers/ai-ml-engineer` | | |
| Business Process Analyst | Business Process Services · Vancouver, BC · Full-time → `/careers/business-process-analyst` | | |
| Managed IT Services Manager | Managed IT Services · Toronto, ON · Full-time → `/careers/managed-it-services-manager` | | |
| Each listing shows: title, department, location (with icon), type badge, arrow | Yes | | |
| **Submit Resume Section** (`#apply`) | | | |
| Heading | "Submit Your Resume" | | |
| Uses `<ResumeForm />` component | Yes | | |

### 9.1 Resume Form (`src/components/ResumeForm.tsx`)

| Field | Type | Required | Placeholder | Validation |
|-------|------|----------|-------------|------------|
| Full Name | text | Yes* | "Jane Smith" | Required |
| Email | email | Yes* | "jane@example.com" | Required + email format |
| Phone | tel | No | "(416) 555-1234" | — |
| LinkedIn Profile | url | No | "https://linkedin.com/in/janesmith" | — |
| Area of Interest | select | Yes* | "Select a practice area" | Required |
| — Options | | | Business Consulting, Business Process Services, Managed IT Services, Artificial Intelligence, Data Analytics, Cloud & Hybrid IT, Other | |
| Resume (file) | file | Yes* | "Upload PDF or Word document (max 5 MB)" | PDF/DOC/DOCX only, max 5 MB |
| Cover Note | textarea | No | "Tell us a bit about yourself…" | — |

| Functionality | Expected | Pass/Fail | Notes |
|---------------|----------|-----------|-------|
| File type validation | Only `.pdf`, `.doc`, `.docx` accepted | | |
| File size validation | Max 5 MB | | |
| Error display | Red error banner below form fields | | |
| Submit button | "Submit Application" — shows spinner during submission | | |
| Success state | Replaces form with "Application Received!" confirmation | | |
| API endpoint | `POST /api/careers/apply` (FormData) | | |

---

## 10. Contact

**Route:** `/contact`
**File:** `src/app/contact/page.tsx`
**Meta title:** "Contact Us"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Let's Start a Conversation" | | |
| **Contact Form** | | | |

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| First Name | text | Yes* | Required |
| Last Name | text | Yes* | Required |
| Work Email | email | Yes* | Required |
| Phone | tel | No | — |
| Company | text | No | — |
| How Can We Help? | select | Yes* | Required |
| — Options | | | Business Consulting, Business Process Services, Managed IT Services, Artificial Intelligence, Data Analytics, Cloud & Hybrid IT, Partnership Inquiry, Careers, Other |
| Message | textarea (5 rows) | Yes* | Required, placeholder: "Tell us about your project or challenge…" |

| Element | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| Submit button | "Send Message" | | |
| Form action | No backend wired (static form) | | |
| **Sidebar** | | | |
| Email link | `mailto:info@jtldinc.com` | | |
| Phone link | `tel:+14165551234` — displays "(416) 555-1234" | | |
| **Offices** (3 cards) | | | |
| Toronto | 100 King Street West, Suite 5600 · Toronto, ON M5X 1C9 · (416) 555-1234 · toronto@jtldinc.com | | |
| Calgary | 525 8th Avenue SW, Suite 2500 · Calgary, AB T2P 1G1 · (403) 555-5678 · calgary@jtldinc.com | | |
| Vancouver | 1055 West Georgia Street, Suite 1500 · Vancouver, BC V6E 3P3 · (604) 555-9012 · vancouver@jtldinc.com | | |
| Phone links (per office) | `tel:` links with digits extracted | | |
| Email links (per office) | `mailto:` links | | |

---

## 11. Consultation

**Route:** `/consultation`
**File:** `src/app/consultation/page.tsx`
**Meta title:** "Get a Consultation"

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Hero** | "Get Expert Advice — On Us" | | |
| **How It Works** (3 steps, connected by dashed line on md+) | | | |
| Step 01 | "Tell Us About Your Challenge" | | |
| Step 02 | "We Match You With an Advisor" | | |
| Step 03 | "Free 30-Minute Discovery Call" | | |
| Dashed SVG connector between steps (md+ only) | Yes | | |
| **Consultation Form** | | | |

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| First Name | text | Yes* | — |
| Last Name | text | Yes* | — |
| Work Email | email | Yes* | — |
| Phone | tel | No | — |
| Company | text | Yes* | — |
| Job Title | text | No | — |
| Service Interest | select | Yes* | "Select a service" |
| — Options | | | Business Consulting, Business Process Services, Managed IT Services, Artificial Intelligence, Data Analytics, Cloud & Hybrid IT, Not sure yet — help me decide |
| Describe Your Challenge | textarea (5 rows) | Yes* | "What business problem are you trying to solve?" |
| Timeline | select | No | "When do you need to get started?" |
| — Options | | | Immediately, Within 1–3 months, Within 3–6 months, Just exploring options |

| Element | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| Submit button | "Request a Consultation" | | |
| Privacy note | Links to `/privacy` — "By submitting this form you agree to our Privacy Policy" | | |
| Form action | No backend wired (static form) | | |
| **Sidebar: Why Book** (4 reasons) | | | |
| No Obligation | Checkmark icon + description | | |
| Senior-Level Access | Same | | |
| Actionable Takeaways | Same | | |
| Confidential | Same | | |
| **Sidebar: Prefer to Talk Now?** | | | |
| Phone link | `tel:+14165551234` — "(416) 555-1234" | | |
| Email link | `mailto:consult@jtldinc.com` — "consult@jtldinc.com" | | |

---

## 12. Login

**Route:** `/login`
**File:** `src/app/login/page.tsx`
**Client component:** Yes (`"use client"`)

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Left Panel** (desktop only, `hidden lg:flex`) | | | |
| Logo | Links to `/` — logo.svg, 64×70 | | |
| Heading | "Welcome Back" | | |
| Description | "Access your client portal…" | | |
| Feature icons (3) | Project Tracking, Deliverables, Team Chat | | |
| **Right Panel — Form** | | | |
| Mobile logo (lg:hidden) | JTLD + Consulting text | | |
| Heading | "Log in to your account" | | |

| Field | Type | Required | Details |
|-------|------|----------|---------|
| Email Address | email | Yes | `autoComplete="email"`, placeholder: "you@company.com" |
| Password | password (toggleable) | Yes | `autoComplete="current-password"`, placeholder: "Enter your password" |
| Remember me | checkbox | No | |

| Functionality | Expected | Pass/Fail | Notes |
|---------------|----------|-----------|-------|
| Show/hide password toggle | Eye icon button toggles `type` between "text" and "password" | | |
| "Forgot password?" link | Links to `/login` (placeholder) | | |
| Login button | "Log In" — shows spinner + "Signing in…" while loading | | |
| Submit behavior | Placeholder — shows error: "Authentication is not yet available. The client portal is coming soon." after 1s delay | | |
| Error display | Red banner above form | | |
| Disabled state while loading | Button `disabled`, `opacity-60`, `cursor-not-allowed` | | |
| "Don't have an account?" link | Links to `/signup` | | |
| "Need help?" link | Links to `/contact` | | |

---

## 13. Sign Up

**Route:** `/signup`
**File:** `src/app/signup/page.tsx`
**Client component:** Yes (`"use client"`)

| Section | Content / Functionality | Pass/Fail | Notes |
|---------|------------------------|-----------|-------|
| **Left Panel** (desktop only) | | | |
| Logo | Links to `/` | | |
| Heading | "Start Your Partnership" | | |
| Feature list (3 items) | Real-time project dashboards, Direct consultant messaging, Secure document sharing | | |
| **Right Panel — Form** | | | |
| Heading | "Create your account" | | |

| Field | Type | Required | Details |
|-------|------|----------|---------|
| First Name | text | Yes | `autoComplete="given-name"` |
| Last Name | text | Yes | `autoComplete="family-name"` |
| Work Email | email | Yes | `autoComplete="email"`, placeholder: "you@company.com" |
| Company | text | No | `autoComplete="organization"` |
| Password | password (toggleable) | Yes | `minLength={8}`, `autoComplete="new-password"`, placeholder: "Minimum 8 characters" |
| Confirm Password | password (follows toggle) | Yes | `minLength={8}`, `autoComplete="new-password"` |
| Terms agreement | checkbox | Required for submit | Links to `/terms` and `/privacy` |

| Functionality | Expected | Pass/Fail | Notes |
|---------------|----------|-----------|-------|
| Show/hide password toggle | Eye icon toggles both password fields | | |
| Client-side validation | Passwords must match, agreement must be checked | | |
| Error: passwords don't match | "Passwords do not match." | | |
| Error: terms not agreed | "You must agree to the Terms of Service and Privacy Policy." | | |
| Submit behavior | Placeholder — shows success state after 1.2s delay | | |
| Loading state | Spinner + "Creating account…" | | |
| **Success State** | | | |
| Replaces form with confirmation | "Account Created" heading | | |
| Personalized message | "Thank you for signing up, {firstName}!" | | |
| Portal coming soon notice | "The JTLD Client Portal is currently under development. We'll notify you at **{email}**…" | | |
| CTA 1: "Return to Home" | Links to `/` — solid button | | |
| CTA 2: "Book a Consultation" | Links to `/consultation` — outlined button | | |
| "Already have an account?" link | Links to `/login` | | |
| "Need help?" link | Links to `/contact` | | |

---

## 14. ChatBot (Tosh)

**File:** `src/components/ChatBot.tsx`
**Client component:** Yes

### 14.1 UI Elements

| Element | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| Floating trigger button | Fixed `bottom-6 right-6`, primary-700, chat bubble icon | | |
| Button toggles open/closed | Chevron icon when open, chat icon when closed | | |
| Hover effect | `hover:scale-105 hover:shadow-xl` | | |
| Chat window | Fixed `bottom-24 right-6`, 360px wide, rounded-2xl, shadow | | |
| Window header | "Tosh" / "JTLD Virtual Assistant", close button | | |
| Message area | Scrollable, auto-scrolls to bottom | | |
| Input field | Placeholder switches: "Ask me anything about JTLD…" / "Type your answer…" (during collection) | | |
| Send button | Disabled when input empty or bot is typing | | |
| Typing indicator | 3 bouncing dots animation | | |

### 14.2 Initial Greeting

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Greeting message | "Hi there! I'm Tosh, your virtual assistant. How can I help you today?" | | |
| Quick-reply suggestions (4) | "What services do you offer?", "Tell me about JTLD", "I'd like to book a consultation", "How can I contact you?" | | |

### 14.3 LLM-Powered Conversation

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| API endpoint | `POST /api/chat` | | |
| LLM model | `claude-haiku-4-5-20251001` (via Anthropic SDK) | | |
| System prompt | Tosh identity, rules (only answer from knowledge base, 2-3 sentence max, concise) | | |
| Knowledge base | Full JTLD company info: services, industries, leadership, careers, contact info | | |
| Chat history maintained | Sent with each request for context | | |
| `[SUGGEST_CONSULTATION]` detection | Stripped from reply, triggers "Yes, book a consultation" follow-up button | | |
| Error fallback | "I'm having a little trouble right now. You can reach our team at info@jtldinc.com…" | | |
| Missing API key fallback | Returns friendly error, status 200 | | |
| Link pills in messages | Rendered as clickable `<Link>` elements styled as pills | | |
| Follow-up quick replies | Rendered as clickable buttons that auto-send | | |

### 14.4 Lead Collection Flow (Consultation Booking)

| Trigger | Expected | Pass/Fail | Notes |
|---------|----------|-----------|-------|
| "I'd like to book a consultation" | Starts collection flow | | |
| "Book a consultation" | Starts collection flow | | |
| "Yes, book a consultation" (after LLM suggests) | Starts collection flow | | |
| "Yes" / "Yeah" / "Yep" / "Sure" (when awaiting confirm) | Starts collection flow | | |

| Collection Step | Prompt | Validation | Pass/Fail | Notes |
|-----------------|--------|------------|-----------|-------|
| 1. Name | "What's your full name?" | None | | |
| 2. Email | "Thanks, {firstName}! What's the best email to reach you at?" | Email regex — reprompts on invalid | | |
| 3. Company | "And what company are you with?" | None | | |
| 4. Service | "Which service area are you most interested in?" | Quick-reply buttons: 7 service options | | |
| 5. Challenge | "Last one — could you briefly describe the challenge or goal…" | None | | |

| After Collection | Expected | Pass/Fail | Notes |
|------------------|----------|-----------|-------|
| Summary message | Shows collected name, email, company, service, challenge | | |
| Confirmation | "Your request has been submitted! A senior consultant will reach out within one business day…" | | |
| Follow-up suggestions | "What services do you offer?", "Tell me about your industries", "How can I contact you?" | | |

---

## 15. API Endpoints

### 15.1 `POST /api/chat` (`src/app/api/chat/route.ts`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Accepts JSON `{ messages: ChatMessage[] }` | Yes | | |
| Returns `{ reply: string, suggestConsultation: boolean }` | Yes | | |
| Uses Anthropic SDK with `ANTHROPIC_API_KEY` env var | Yes | | |
| Model: `claude-haiku-4-5-20251001` | Yes | | |
| Max tokens: 300 | Yes | | |
| Missing API key: returns friendly error (200) | Yes | | |
| Empty messages: returns greeting (200) | Yes | | |
| Error: returns fallback message (200) | Yes | | |

### 15.2 `POST /api/careers/apply` (`src/app/api/careers/apply/route.ts`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Accepts FormData | Yes | | |
| Required fields: name, email, area | Validates, returns 400 if missing | | |
| Email format validation | Regex check, returns 400 if invalid | | |
| Resume required | Returns 400 if missing or empty | | |
| Resume max size: 5 MB | Returns 400 if exceeded | | |
| Resume allowed types | PDF, DOC, DOCX only — returns 400 otherwise | | |
| Success response | `{ success: true, message: "Application submitted successfully." }` | | |
| Currently logs to console (no DB/S3) | Placeholder implementation | | |

### 15.3 `GET /api/health` (`src/app/api/health/route.ts`)

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Returns health status JSON | `{ status, timestamp, version, uptime, checks }` | | |
| App check: always "up" | Yes | | |
| Database check | "up" if `DATABASE_URL` env set, "down" otherwise | | |
| Redis check | "up" if `REDIS_URL` env set, "down" otherwise | | |
| Overall: "healthy" if app is up | Yes (only app is critical) | | |
| Cache-Control: no-store | Yes | | |
| Version | "0.1.0" | | |

### 15.4 Cron Endpoints (placeholder/scaffold)

| Route | Purpose | Pass/Fail | Notes |
|-------|---------|-----------|-------|
| `POST /api/cron/cleanup-expired-jobs` | Cleanup expired job listings | | |
| `POST /api/cron/send-job-alerts` | Send job alert emails | | |
| `POST /api/cron/send-weekly-digest` | Send weekly digest emails | | |
| `POST /api/cron/timesheet-reminders` | Send timesheet reminders | | |

---

## 16. Dark Mode

### 16.1 Infrastructure

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Tailwind v4 variant: `@variant dark` | `(&:where(.dark, .dark *))` in globals.css | | |
| Class-based toggle (not media query) | `.dark` class on `<html>` | | |
| FOWT prevention | Inline script in `<head>` reads localStorage before paint | | |
| localStorage key | `"jtld-theme"` | | |
| Theme toggle visible on desktop | Before "Log In" button in header | | |
| Theme toggle visible on mobile | Before hamburger button | | |
| Theme persists across reloads | Via localStorage | | |
| System preference respected (default) | When no localStorage value set | | |

### 16.2 Per-Page Dark Mode Coverage

| Page/Component | Has `dark:` classes | Pass/Fail | Notes |
|----------------|-------------------|-----------|-------|
| Header | Yes | | |
| Footer | Yes | | |
| ChatBot | Yes | | |
| Home (`/`) | Yes | | |
| Services hub (`/services`) | Yes | | |
| Business Consulting | Yes | | |
| Business Process Services | Yes | | |
| Managed IT Services | Yes | | |
| Artificial Intelligence | Yes | | |
| Data Analytics | Yes | | |
| Cloud & Hybrid IT | Yes | | |
| About (`/about`) | Yes | | |
| Industries hub (`/industries`) | Yes | | |
| Financial Services | Yes | | |
| Healthcare | Yes | | |
| Energy | Yes | | |
| Government | Yes | | |
| Retail | Yes | | |
| Manufacturing | Yes | | |
| Telecom | Yes | | |
| Education | Yes | | |
| Insights (`/insights`) | Yes | | |
| Careers (`/careers`) | Yes | | |
| Contact (`/contact`) | Yes | | |
| Consultation (`/consultation`) | Yes | | |
| Login (`/login`) | Yes | | |
| Sign Up (`/signup`) | Yes | | |

### 16.3 Dark Mode Visual Checks

| Element Type | Light | Dark | Pass/Fail | Notes |
|-------------|-------|------|-----------|-------|
| Page backgrounds | `bg-white` | `bg-gray-900` | | |
| Alternate sections | `bg-gray-50` | `bg-gray-800` | | |
| Cards (on white) | `bg-gray-50` | `bg-gray-800` | | |
| Cards (on gray-50) | `bg-white` | `bg-gray-700` | | |
| Hero/CTA sections | `bg-primary-900` | Unchanged | | |
| Headings | `text-gray-900` | `text-white` | | |
| Body text | `text-gray-600` | `text-gray-300` | | |
| Secondary text | `text-gray-500` | `text-gray-400` | | |
| Links | `text-primary-600/700` | `text-primary-400` | | |
| Borders (light) | `border-gray-100` | `border-gray-700` | | |
| Borders (medium) | `border-gray-300` | `border-gray-600` | | |
| Form inputs | white bg | `bg-gray-800 border-gray-600 text-white` | | |
| Form placeholders | `text-gray-400` | `text-gray-500` | | |
| Footer | `bg-gray-900` | `bg-gray-950` | | |
| No flash of wrong theme on load | FOWT script prevents white flash | | |

---

## 17. Cross-Cutting Concerns

### 17.1 Navigation Integrity

| Test | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| All header nav links resolve to valid pages | 24 pages exist | | |
| All footer links resolve to valid pages | Yes (note: `/about/leadership`, `/privacy`, `/terms`, `/accessibility` may be 404 — no pages exist) | | |
| All service card links from home page work | 6 service detail pages | | |
| All industry card links work | 8 industry detail pages | | |
| All career listing links work | 6 career detail pages (may be 404 — no pages exist) | | |
| All insight article links work | 6 article detail pages (may be 404 — no pages exist) | | |
| Login ↔ Signup cross-links work | `/login` → `/signup` and back | | |
| "Forgot password?" link | Currently points to `/login` (placeholder) | | |

### 17.2 Missing Pages (Expected 404s)

These links exist in the UI but no corresponding `page.tsx` files were found:

| URL | Linked From | Status |
|-----|-------------|--------|
| `/about/leadership` | Footer | No page |
| `/privacy` | Footer, Consultation form, Signup form | No page |
| `/terms` | Footer, Signup form | No page |
| `/accessibility` | Footer | No page |
| `/careers/senior-business-consultant` | Careers page | No page |
| `/careers/data-analytics-lead` | Careers page | No page |
| `/careers/cloud-solutions-architect` | Careers page | No page |
| `/careers/ai-ml-engineer` | Careers page | No page |
| `/careers/business-process-analyst` | Careers page | No page |
| `/careers/managed-it-services-manager` | Careers page | No page |
| `/insights/ai-mid-market-2025` | Insights page | No page |
| `/insights/business-strategy-reset` | Insights page | No page |
| `/insights/data-analytics-decisions` | Insights page | No page |
| `/insights/cloud-migration-costs` | Insights page | No page |
| `/insights/lean-operations-2025` | Insights page | No page |
| `/insights/it-outsourcing-review` | Insights page | No page |
| `/industries/telecom` | Industries hub | Page exists |
| `/industries/education` | Industries hub | Page exists |

### 17.3 Responsive Design

| Breakpoint | Key Behaviors | Pass/Fail | Notes |
|------------|--------------|-----------|-------|
| Mobile (<640px) | Single-column layouts, hamburger menu, stacked CTAs | | |
| Tablet (640–1024px) | 2-column grids, some elements hidden | | |
| Desktop (1024px+) | Full nav, dropdowns on hover, side-by-side layouts | | |
| Login/Signup left panel | Hidden below `lg` (1024px) | | |
| Stats bar | 2-col on mobile, 4-col on `lg` | | |
| Service list alternating layout | Stacked on mobile, side-by-side on `lg` | | |
| ChatBot window | Max width `calc(100vw - 2rem)` on small screens | | |

### 17.4 SEO & Metadata

| Page | Meta Title | Meta Description | Pass/Fail |
|------|-----------|-----------------|-----------|
| Home | "JTLD Consulting Inc \| Business Consulting & Technology Services" | Yes (in layout) | |
| Services | "Our Services" | Yes | |
| About | "About Us" | Yes | |
| Industries | "Industries We Serve" | Yes | |
| Insights | "Insights & Thought Leadership" | Yes | |
| Careers | "Careers" | Yes | |
| Contact | "Contact Us" | Yes | |
| Consultation | "Get a Consultation" | Yes | |
| Login | None (client component — no metadata export) | — | |
| Signup | None (client component — no metadata export) | — | |

### 17.5 Accessibility

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| `aria-label` on icon-only buttons | Theme toggle, mobile menu, chat send, chat close, password toggle | | |
| `aria-hidden="true"` on decorative SVGs | Steps connector line | | |
| `htmlFor` on all form labels | Yes — matches `id` attributes | | |
| Required fields marked with `*` in labels | Yes | | |
| Focus rings on inputs | `focus:ring-2 focus:ring-primary-500` | | |
| Keyboard navigation of dropdowns | Not implemented (hover-only) — potential issue | | |
| `lang="en"` on `<html>` | Yes | | |
| Form inputs have `autoComplete` attributes | Login + Signup forms | | |

### 17.6 Performance & Technical

| Item | Expected | Pass/Fail | Notes |
|------|----------|-----------|-------|
| Logo image uses `priority` prop | Yes (in Header) | | |
| Fonts loaded via `next/font` (no FOUT) | Geist Sans + Geist Mono | | |
| No unused dependencies | — | | |
| Build succeeds without errors | `npm run build` | | |
| All routes return 200 | 24 page routes | | |
| `/api/health` returns healthy | Check response | | |
| ChatBot lazy-loads (no SSR) | Client component, renders after mount | | |

---

## Summary Checklist

| Category | Total Items | Passed | Failed | Notes |
|----------|------------|--------|--------|-------|
| Global Components (Header/Footer/Theme) | ~50 | | | |
| Home Page | ~25 | | | |
| Services (Hub + 6 Detail) | ~20 | | | |
| Industries (Hub + 8 Detail) | ~15 | | | |
| About | ~20 | | | |
| Insights | ~20 | | | |
| Careers + Resume Form | ~25 | | | |
| Contact | ~15 | | | |
| Consultation | ~20 | | | |
| Login | ~15 | | | |
| Sign Up | ~15 | | | |
| ChatBot (Tosh) | ~25 | | | |
| API Endpoints | ~20 | | | |
| Dark Mode | ~35 | | | |
| Cross-Cutting (Nav, 404s, Responsive, SEO, A11y) | ~40 | | | |
| **TOTAL** | **~360** | | | |
