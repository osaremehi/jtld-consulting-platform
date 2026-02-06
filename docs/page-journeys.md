# JTLD Consulting Inc — Page-Specific User Journey Flowcharts

This document maps how each persona navigates and interacts with every primary page/tab on the JTLD platform. Each section covers one navigation destination, showing the flow per persona from entry → actions → exit/next step.

**Navigation Tabs Covered:**
1. [Home (/)](#1-home-page)
2. [Services (/services)](#2-services-page)
3. [Industries (/industries)](#3-industries-page)
4. [About (/about)](#4-about-page)
5. [Insights (/insights)](#5-insights-page)
6. [Careers (/careers)](#6-careers-page)
7. [Contact (/contact)](#7-contact-page)
8. [Get a Consultation (/consultation)](#8-get-a-consultation-page)
9. [Log In (/login)](#9-log-in-page)
10. [Sign Up (/signup)](#10-sign-up-page)

**Persona Key:**
| Code | Persona |
|------|---------|
| P1 | Executive Decision-Maker |
| P2 | IT / Digital Leader |
| P3 | Operations / Process Leader |
| P4 | Data / Analytics Leader |
| P5 | Small Business Owner |
| P6 | Experienced Consultant (Job Seeker) |
| P7 | Early-Career Professional (Job Seeker) |
| P8 | Technical Specialist (Job Seeker) |
| P9 | Client Project Sponsor |
| P10 | Client Team Member |
| P11 | JTLD Consultant (Internal) |
| P12 | JTLD Talent / HR Manager (Internal) |
| P13 | JTLD Marketing / Content Manager (Internal) |

---

## 1. Home Page

**URL:** `/`
**Primary Personas:** P1, P2, P3, P4, P5

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY POINT    │
│  Google search / │
│  peer referral / │
│  LinkedIn ad     │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LAND ON HOME PAGE          │
│  • Reads hero headline      │
│  • Scans stats bar          │
│    (clients, consultants,   │
│     industries, years)      │
│  • Assesses credibility     │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN SERVICES SECTION      │
│  • Reviews 6 service cards  │
│  • Identifies 1–2 relevant  │
│    services to explore      │
└───────┬─────────────────────┘
        │
        ├──────────────────────────────┐
        ▼                              ▼
┌─────────────────┐        ┌────────────────────┐
│  CLICK SERVICE  │        │  SCROLL TO CTA     │
│  CARD           │        │  "Get a Consulta-  │
│  → /services/*  │        │   tion" button     │
│                 │        │  → /consultation   │
└─────────────────┘        └────────────────────┘
```

### P2 — IT / Digital Leader

```
┌─────────────────┐
│  ENTRY POINT    │
│  Google: "managed│
│  IT services     │
│  Canada"         │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LAND ON HOME PAGE          │
│  • Scans hero — looking     │
│    for tech-specific cues   │
│  • Notes stats bar          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN SERVICES SECTION      │
│  • Looks for: Managed IT,   │
│    Cloud & Hybrid, AI       │
│  • Wants technical depth    │
└───────┬─────────────────────┘
        │
        ├────────────────────────┐
        ▼                        ▼
┌──────────────────┐   ┌──────────────────┐
│  CLICK SPECIFIC  │   │  OPEN TOSH       │
│  SERVICE CARD    │   │  CHATBOT         │
│  → /services/    │   │  "Do you do      │
│    managed-it    │   │   Azure work?"   │
│    cloud-hybrid  │   └──────────────────┘
│    ai            │
└──────────────────┘
```

### P3 — Operations / Process Leader

```
┌─────────────────┐
│  ENTRY POINT    │
│  Peer referral / │
│  industry report │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LAND ON HOME PAGE          │
│  • Reads hero messaging     │
│  • Scans stats for scale    │
│    indicators               │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN SERVICES SECTION      │
│  • Looks for: Business      │
│    Process Services,        │
│    Data Analytics            │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CLICK "Business Process    │
│  Services" CARD             │
│  → /services/business-      │
│    process                  │
└─────────────────────────────┘
```

### P4 — Data / Analytics Leader

```
┌─────────────────┐
│  ENTRY POINT    │
│  Google search / │
│  conference talk │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LAND ON HOME PAGE          │
│  • Hero — scanning for      │
│    data/analytics mention   │
│  • Stats bar — credibility  │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  CLICK "Data     │    │  NAV → SERVICES  │
│  Analytics" CARD │    │  for full list   │
│  → /services/    │    │  → /services     │
│    data-analytics│    └──────────────────┘
└──────────────────┘
```

### P5 — Small Business Owner

```
┌─────────────────┐
│  ENTRY POINT    │
│  Google search / │
│  local referral  │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LAND ON HOME PAGE          │
│  • Reads hero headline      │
│  • Thinks: "Is this for     │
│    companies my size?"      │
│  • Scans stats bar          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN SERVICES SECTION      │
│  • Reviews 6 cards          │
│  • Clicks 1–2 that resonate │
└───────┬─────────────────────┘
        │
        ├──────────────┬──────────────────┐
        ▼              ▼                  ▼
┌────────────┐  ┌─────────────┐  ┌──────────────┐
│ CLICK A    │  │ OPEN TOSH   │  │ SCROLL TO    │
│ SERVICE    │  │ CHATBOT     │  │ CTA SECTION  │
│ CARD       │  │ "Do you     │  │ → /contact   │
│            │  │  work with  │  │ or           │
│            │  │  small      │  │ /consultation│
│            │  │  businesses │  │              │
│            │  │  ?"         │  │              │
└────────────┘  └─────────────┘  └──────────────┘
```

---

## 2. Services Page

**URL:** `/services`
**Primary Personas:** P1, P2, P3, P4, P5, P8

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Home →  │
│  Services nav    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  SERVICES HERO              │
│  • "Six integrated          │
│    practices" — confirms    │
│    breadth of offering      │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN ALL 6 SERVICES        │
│  • Reads tagline + desc     │
│  • Reviews Key Capabilities │
│    for 2–3 relevant areas   │
│  • Clicks "Learn more" on   │
│    Business Consulting and  │
│    one other                │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READ CLIENT STORIES        │
│  • Looks for industry match │
│  • Validates: "Others trust │
│    them with similar scope" │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CTA: "Schedule a           │
│  Consultation"              │
│  → /contact                 │
└─────────────────────────────┘
```

### P2 — IT / Digital Leader

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  Services        │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN FOR TECH SERVICES     │
│  • Managed IT Services      │
│  • Cloud & Hybrid IT        │
│  • Artificial Intelligence  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  DEEP-DIVE: Key Capabilities│
│  • "24/7 monitoring"        │
│  • "DevOps & automation"    │
│  • "ML models, NLP, CV"    │
│  • Clicks "Learn more" →    │
│    detail page              │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  → /services/    │    │  READ CLIENT     │
│    managed-it    │    │  STORIES         │
│  or cloud-hybrid │    │  "IT spend by    │
│  or ai           │    │   25% ... 99.9%  │
│                  │    │   uptime"        │
└──────────────────┘    └───────┬──────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │  → /consultation │
                        └──────────────────┘
```

### P3 — Operations / Process Leader

```
┌─────────────────┐
│  ENTRY: Home →  │
│  Services        │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  FOCUS: Business Process    │
│  Services + Data Analytics  │
│  • Process mapping, Lean,   │
│    workflow automation       │
│  • BI & visualization,      │
│    data engineering          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READ CLIENT STORIES        │
│  • "30% cost reduction" —   │
│    resonates with ops goals │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /services/business-      │
│    process (Learn more)     │
│  or → /consultation         │
└─────────────────────────────┘
```

### P5 — Small Business Owner

```
┌─────────────────┐
│  ENTRY: Home →  │
│  Services        │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  OVERWHELMED BY OPTIONS     │
│  • 6 services — "which one  │
│    is right for me?"        │
│  • Looks for clear entry pt │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  READS 1–2 THAT  │    │  SCROLLS TO CTA  │
│  RESONATE        │    │  "Not Sure Where │
│  (likely Business│    │   to Start?"     │
│   Consulting or  │    │  → /contact      │
│   Managed IT)    │    └──────────────────┘
└──────────────────┘
```

### P8 — Technical Specialist (Job Seeker)

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  Services        │
│  (evaluating     │
│   tech depth)    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN TECH SERVICES         │
│  • AI: ML, NLP, CV, Ethics  │
│  • Cloud: DevOps, multi-    │
│    cloud management         │
│  • Data: engineering,       │
│    pipelines, governance    │
│  • "They list real          │
│    capabilities — good"     │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CLICKS "Learn more" ON     │
│  1–2 TECH SERVICES          │
│  → /services/ai             │
│  → /services/cloud-hybrid   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  NAV → CAREERS              │
│  "They do real tech work —  │
│   let me check open roles"  │
│  → /careers                 │
└─────────────────────────────┘
```

---

## 3. Industries Page

**URL:** `/industries`
**Primary Personas:** P1, P2, P3

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Nav     │
│  dropdown →     │
│  Industries      │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  INDUSTRIES OVERVIEW        │
│  • Scans all 8 verticals    │
│  • Looks for own industry   │
│    (e.g., Financial Services│
│     or Manufacturing)       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CLICKS OWN INDUSTRY        │
│  → /industries/financial-   │
│    services (example)       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READS INDUSTRY DETAIL      │
│  • Key challenges in sector │
│  • How JTLD helps           │
│  • Relevant services mapped │
│  • "They understand my      │
│    industry"                │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  → /services/*   │    │  → /consultation │
│  (related        │    │  or /contact     │
│   service link)  │    │                  │
└──────────────────┘    └──────────────────┘
```

### P2 — IT / Digital Leader

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  Industries      │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  SCAN INDUSTRIES            │
│  • Looking for own vertical │
│  • Wants to see tech        │
│    challenges are understood│
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CLICK INDUSTRY DETAIL      │
│  • Reads sector-specific    │
│    challenges (legacy       │
│    systems, compliance,     │
│    cloud migration)         │
│  • Validates: "They know    │
│    the regulatory landscape"│
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CROSS-LINK TO SERVICE      │
│  → /services/managed-it     │
│  or → /services/cloud-hybrid│
│  → /consultation            │
└─────────────────────────────┘
```

### P3 — Operations / Process Leader

```
┌─────────────────┐
│  ENTRY: Services│
│  → Industries    │
│  cross-link      │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  FIND INDUSTRY MATCH        │
│  • Manufacturing, Retail,   │
│    Healthcare               │
│  • Looking for process-     │
│    specific proof points    │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READ INDUSTRY DETAIL       │
│  • Supply chain, quality,   │
│    compliance challenges    │
│  • "Others in my industry   │
│    trust them"              │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /consultation            │
│  (now confident in          │
│   industry fit)             │
└─────────────────────────────┘
```

---

## 4. About Page

**URL:** `/about`
**Primary Personas:** P1, P4, P6, P7

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  About           │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  COMPANY OVERVIEW           │
│  • Founding story           │
│  • Mission & values         │
│  • "Do they align with our  │
│    culture?"                │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  LEADERSHIP TEAM            │
│  • Reviews leadership bios  │
│  • Checks credentials,      │
│    industry backgrounds     │
│  • "Is there a credible     │
│    leader I can speak to?"  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  WHY JTLD SECTION           │
│  • 4 differentiators        │
│  • Industry cards — sees    │
│    own industry represented │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CTA → /contact             │
│  or → /consultation         │
│  (credibility confirmed)    │
└─────────────────────────────┘
```

### P4 — Data / Analytics Leader

```
┌─────────────────┐
│  ENTRY: Services│
│  → About (to    │
│  check team)     │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LEADERSHIP TEAM            │
│  • Looks for data/analytics │
│    expertise in bios        │
│  • "Do their leaders have   │
│    real technical depth?"   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  VALUES & DIFFERENTIATORS   │
│  • Cross-industry expertise │
│  • Partnership approach     │
│  • "They're not just a      │
│    body shop"               │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /insights (for thought   │
│    leadership validation)   │
│  or → /consultation         │
└─────────────────────────────┘
```

### P6 — Experienced Consultant (Job Seeker)

```
┌─────────────────┐
│  ENTRY: Careers │
│  → About (to    │
│  assess culture) │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  COMPANY VALUES             │
│  • Innovation, integrity,   │
│    partnership, excellence  │
│  • "Does this match my      │
│    values?"                 │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  LEADERSHIP TEAM            │
│  • Reviews who runs the firm│
│  • Assesses leadership style│
│  • "Would I want to work    │
│    under these leaders?"    │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  WHY JTLD SECTION           │
│  • Differentiators align    │
│    with career goals        │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /careers (back to apply) │
│  → /careers#apply           │
└─────────────────────────────┘
```

### P7 — Early-Career Professional (Job Seeker)

```
┌─────────────────┐
│  ENTRY: Careers │
│  → About         │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  COMPANY OVERVIEW           │
│  • Learning about JTLD      │
│  • "What do they stand for?"│
│  • Size, history, mission   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  LEADERSHIP BIOS            │
│  • Inspiration — career     │
│    trajectories of leaders  │
│  • "Can I grow here?"       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /careers#apply           │
│  (convinced to apply)       │
└─────────────────────────────┘
```

---

## 5. Insights Page

**URL:** `/insights`
**Primary Personas:** P1, P2, P3, P4, P13

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  Insights        │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  BROWSE ARTICLES            │
│  • Scans titles for         │
│    strategic relevance      │
│  • Looks for: AI strategy,  │
│    digital transformation,  │
│    industry trends          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CLICK 1–2 ARTICLES         │
│  • Reads for thought        │
│    leadership quality       │
│  • "Do they understand the  │
│    problems I'm facing?"    │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  SUBSCRIBE TO    │    │  → /consultation │
│  NEWSLETTER      │    │  (convinced by   │
│  (email form)    │    │   expertise)     │
└──────────────────┘    └──────────────────┘
```

### P2 — IT / Digital Leader

```
┌─────────────────┐
│  ENTRY: Service │
│  page → Insights │
│  (validation)    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  SEARCH FOR TECHNICAL       │
│  ARTICLES                   │
│  • Cloud migration, AI      │
│    implementation, security │
│  • Wants technical depth    │
│    not marketing fluff      │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READ ARTICLE               │
│  • Evaluates technical      │
│    credibility              │
│  • "They know what they're  │
│    talking about"           │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /consultation            │
│  (expertise validated)      │
└─────────────────────────────┘
```

### P3 — Operations / Process Leader

```
┌─────────────────┐
│  ENTRY: Nav →   │
│  Insights        │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOOK FOR PROCESS CONTENT   │
│  • Lean, automation, BPO    │
│  • Case studies with        │
│    measurable results       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  READ ARTICLE               │
│  • Validates methodology    │
│  • Shares with team for     │
│    internal alignment       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  → /services/business-      │
│    process (deeper dive)    │
│  or → /consultation         │
└─────────────────────────────┘
```

### P4 — Data / Analytics Leader

```
┌─────────────────┐
│  ENTRY: Service │
│  page → Insights │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOOK FOR DATA ARTICLES     │
│  • Data strategy, BI, ML,   │
│    governance best practices│
│  • Reads 2–3 articles per   │
│    session                  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  ASSESS THOUGHT LEADERSHIP  │
│  • "Their team publishes    │
│    real content — not       │
│    generic"                 │
│  • Builds confidence in     │
│    expertise                │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  SUBSCRIBE TO    │    │  → /consultation │
│  NEWSLETTER      │    │                  │
└──────────────────┘    └──────────────────┘
```

### P13 — JTLD Marketing / Content Manager (Internal)

```
┌─────────────────┐
│  ENTRY: Direct  │
│  → /insights     │
│  (content mgmt)  │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  REVIEW PUBLISHED CONTENT   │
│  • Check latest articles    │
│  • Verify formatting, tags  │
│  • Identify content gaps    │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  PLAN NEW CONTENT           │
│  • Note which services/     │
│    industries lack articles │
│  • Draft editorial calendar │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  PUBLISH NEW ARTICLE        │
│  (via CMS or code — future) │
│  • Share on social channels │
│  • Send newsletter          │
└─────────────────────────────┘
```

---

## 6. Careers Page

**URL:** `/careers`
**Primary Personas:** P6, P7, P8, P12

### P6 — Experienced Consultant (Job Seeker)

```
┌─────────────────┐
│  ENTRY: LinkedIn │
│  → Careers page  │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  HERO: "Build Your Career"  │
│  • Scans for seniority      │
│    signals — "meaningful    │
│    engagements"             │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  "WHY JOIN US" PERKS        │
│  • Learning budget          │
│  • Flexible work            │
│  • Career progression       │
│  • Compares to current firm │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  OPEN POSITIONS             │
│  • Scans for role match     │
│  • Checks seniority level   │
│  • Notes practice areas     │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  → /about (check │    │  SCROLL TO       │
│    culture first)│    │  #apply SECTION  │
└───────┬──────────┘    └───────┬──────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
┌─────────────────────────────┐
│  RESUME FORM (#apply)       │
│  • Name, email, phone       │
│  • LinkedIn URL             │
│  • Area of interest:        │
│    "Business Consulting" or │
│    "Cloud & Infrastructure" │
│  • Upload resume (PDF)      │
│  • Cover note               │
│  → SUBMIT                   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUCCESS CONFIRMATION       │
│  "Application submitted!"   │
└─────────────────────────────┘
```

### P7 — Early-Career Professional (Job Seeker)

```
┌─────────────────┐
│  ENTRY: Univ job│
│  board → Careers │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  HERO: "Build Your Career"  │
│  • "Am I qualified?"        │
│  • Looking for entry-level  │
│    signals                  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  "WHY JOIN US" PERKS        │
│  • Mentorship — key draw    │
│  • Learning budget          │
│  • "They invest in people"  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  OPEN POSITIONS             │
│  • Scans for Analyst /      │
│    Junior roles             │
│  • "I don't see entry-level │
│    but I'll apply anyway"   │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  → /about        │    │  RESUME FORM     │
│  (values, team)  │    │  (#apply)        │
└───────┬──────────┘    │  • Area: General │
        │               │  • Cover note:   │
        └──────►────────┤    enthusiasm +  │
                        │    potential      │
                        │  → SUBMIT        │
                        └──────────────────┘
```

### P8 — Technical Specialist (Job Seeker)

```
┌─────────────────┐
│  ENTRY: Services│
│  (AI/Cloud) →   │
│  Careers         │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  OPEN POSITIONS             │
│  • Scans for technical roles│
│  • Data Engineer, ML        │
│    Engineer, Cloud Architect│
│  • Checks tech stack clues  │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  "WHY JOIN US" PERKS        │
│  • Conference budget        │
│  • Certification support    │
│  • Project variety          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  RESUME FORM (#apply)       │
│  • Area: "AI & Data" or     │
│    "Cloud & Infrastructure" │
│  • Attaches resume +        │
│    GitHub/portfolio in note │
│  → SUBMIT                   │
└─────────────────────────────┘
```

### P12 — JTLD Talent / HR Manager (Internal)

```
┌─────────────────┐
│  ENTRY: Direct  │
│  → /careers      │
│  (content review)│
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  REVIEW POSTED ROLES        │
│  • Check if listings are    │
│    current and accurate     │
│  • Identify roles to add    │
│    or remove                │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CHECK RESUME SUBMISSIONS   │
│  • Reviews apps via         │
│    /api/careers/apply       │
│    (email/dashboard future) │
│  • Filters by area, screens │
│    candidates               │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONTACT CANDIDATES         │
│  • Email for phone screen   │
│  • Schedule interviews      │
└─────────────────────────────┘
```

---

## 7. Contact Page

**URL:** `/contact`
**Primary Personas:** P1, P5

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Services│
│  CTA or nav →   │
│  Contact         │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONTACT INFORMATION        │
│  • Email: info@jtldinc.com  │
│  • Phone: (647) 555-1234    │
│  • Office address           │
│  • Prefers direct contact   │
│    over forms               │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  CALLS DIRECTLY  │    │  EMAILS TEAM     │
│  (647) 555-1234  │    │  WITH BRIEF +    │
│  → Schedules     │    │  REQUIREMENTS    │
│    meeting       │    └──────────────────┘
└──────────────────┘
```

### P5 — Small Business Owner

```
┌─────────────────┐
│  ENTRY: Home    │
│  CTA or nav →   │
│  Contact         │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONTACT PAGE               │
│  • Reviews contact options  │
│  • "Will they respond to    │
│    a small company?"        │
└───────┬─────────────────────┘
        │
        ├──────────────────────────┐
        ▼                          ▼
┌──────────────────┐    ┌──────────────────┐
│  SENDS EMAIL     │    │  → /consultation │
│  WITH BASIC      │    │  (prefers form   │
│  INQUIRY         │    │   over cold      │
│                  │    │   call)          │
└──────────────────┘    └──────────────────┘
```

---

## 8. Get a Consultation Page

**URL:** `/consultation`
**Primary Personas:** P1, P2, P3, P4, P5

### P1 — Executive Decision-Maker

```
┌─────────────────┐
│  ENTRY: Home/   │
│  Services CTA → │
│  Consultation    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONSULTATION FORM          │
│  • Full Name                │
│  • Work Email               │
│  • Company Name             │
│  • Job Title: "COO" / "CEO" │
│  • Service Interest:        │
│    "Business Consulting"    │
│  • Challenge description:   │
│    Strategic-level problem  │
│  • Timeline: "Within 1      │
│    month"                   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUBMIT FORM                │
│  • Expects prompt follow-up │
│  • "Will someone senior     │
│    call me back?"           │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONFIRMATION               │
│  "We'll be in touch within  │
│   24 hours"                 │
└─────────────────────────────┘
```

### P2 — IT / Digital Leader

```
┌─────────────────┐
│  ENTRY: Service │
│  detail page →  │
│  Consultation    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONSULTATION FORM          │
│  • Job Title: "VP of IT"    │
│  • Service: "Managed IT"    │
│    or "Cloud & Hybrid IT"   │
│  • Challenge: Specific      │
│    technical problem        │
│    (migration, security,    │
│     legacy modernization)   │
│  • Timeline: "ASAP" or      │
│    "Within 3 months"        │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUBMIT                     │
│  • Expects technical person │
│    on follow-up call, not   │
│    a salesperson            │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONFIRMATION               │
│  → Waits for technical      │
│    scoping call             │
└─────────────────────────────┘
```

### P3 — Operations / Process Leader

```
┌─────────────────┐
│  ENTRY: Industry│
│  page or Service│
│  → Consultation  │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONSULTATION FORM          │
│  • Service: "Business       │
│    Process Services"        │
│  • Challenge: "Our supply   │
│    chain has 30% waste"     │
│  • Wants measurable results │
│    discussion               │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUBMIT → CONFIRMATION      │
│  → Expects discovery call   │
│    with process expert      │
└─────────────────────────────┘
```

### P4 — Data / Analytics Leader

```
┌─────────────────┐
│  ENTRY: Insights│
│  or Services →  │
│  Consultation    │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONSULTATION FORM          │
│  • Service: "Data           │
│    Analytics" or "AI"       │
│  • Challenge: "Failed BI    │
│    project, need data       │
│    strategy"                │
│  • Describes current stack  │
│    and maturity level       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUBMIT → CONFIRMATION      │
│  → Expects data SME on      │
│    follow-up call           │
└─────────────────────────────┘
```

### P5 — Small Business Owner

```
┌─────────────────┐
│  ENTRY: Tosh    │
│  chatbot suggests│
│  consultation    │
│  OR Home CTA     │
└───────┬─────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONSULTATION FORM          │
│  • Company: Small biz name  │
│  • Job Title: "Owner"       │
│  • Service: Unsure — picks  │
│    "Not sure / General"     │
│  • Challenge: Brief, broad  │
│    ("need help growing")    │
│  • Timeline: Flexible       │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  SUBMIT                     │
│  • "Low commitment — let me │
│    see what they say"       │
│  • Hopes for affordable     │
│    starter option           │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  CONFIRMATION               │
│  → Waits for friendly,      │
│    no-pressure call         │
└─────────────────────────────┘
```

---

## 9. Log In Page

**URL:** `/login`
**Primary Personas:** P9, P10, P11, P12, P13

### P9 — Client Project Sponsor

```
┌──────────────────┐
│  ENTRY: Bookmark │
│  or top bar →    │
│  "Client Portal" │
│  → /login        │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOGIN FORM                 │
│  • Email + Password         │
│  • "Remember me" checkbox   │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  AUTHENTICATE               │
│  → Client Portal Dashboard  │
│    (future)                 │
│  • Project status           │
│  • Budget tracking          │
│  • Deliverables             │
│  • Milestone reviews        │
└─────────────────────────────┘
```

### P10 — Client Team Member

```
┌──────────────────┐
│  ENTRY: Email    │
│  invite → /login │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOGIN FORM                 │
│  • First-time: may need     │
│    to set password          │
│  • Returns: email + pw      │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  AUTHENTICATE               │
│  → Shared Workspace (future)│
│  • Shared documents         │
│  • Collaboration tools      │
│  • Training materials       │
└─────────────────────────────┘
```

### P11 — JTLD Consultant (Internal)

```
┌──────────────────┐
│  ENTRY: Bookmark │
│  → /login        │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOGIN FORM                 │
│  • Corporate credentials    │
│  • SSO (future)             │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  AUTHENTICATE               │
│  → Internal Dashboard       │
│    (future)                 │
│  • Current engagements      │
│  • Time tracking            │
│  • Knowledge base           │
│  • Client materials         │
└─────────────────────────────┘
```

### P12 — JTLD Talent / HR Manager (Internal)

```
┌──────────────────┐
│  ENTRY: Bookmark │
│  → /login        │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOGIN FORM                 │
│  • Corporate credentials    │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  AUTHENTICATE               │
│  → Admin Dashboard (future) │
│  • Resume submissions       │
│  • Candidate pipeline       │
│  • Interview scheduling     │
│  • Open requisitions        │
└─────────────────────────────┘
```

### P13 — JTLD Marketing / Content Manager (Internal)

```
┌──────────────────┐
│  ENTRY: Bookmark │
│  → /login        │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  LOGIN FORM                 │
│  • Corporate credentials    │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  AUTHENTICATE               │
│  → CMS / Content Dashboard  │
│    (future)                 │
│  • Publish articles         │
│  • Newsletter management    │
│  • Analytics overview       │
│  • Subscriber list          │
└─────────────────────────────┘
```

---

## 10. Sign Up Page

**URL:** `/signup`
**Primary Personas:** P9, P10 (invited), P1 (new client onboarding)

### P9 — Client Project Sponsor (New Account)

```
┌──────────────────┐
│  ENTRY: Welcome  │
│  email with link │
│  → /signup       │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  SIGN UP FORM               │
│  • Full Name                │
│  • Work Email (pre-filled   │
│    from invite)             │
│  • Company Name             │
│  • Create Password          │
│  • Confirm Password         │
│  • Accept Terms             │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  EMAIL VERIFICATION         │
│  • Verification link sent   │
│  • Click to confirm         │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  ACCOUNT CREATED            │
│  → Redirect to /login       │
│  → First login → Client     │
│    Portal onboarding        │
│    (project charter, team   │
│     intro, dashboard tour)  │
└─────────────────────────────┘
```

### P10 — Client Team Member (Invited)

```
┌──────────────────┐
│  ENTRY: Invite   │
│  email from P9   │
│  or JTLD team    │
│  → /signup       │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  SIGN UP FORM               │
│  • Name, Email (pre-filled) │
│  • Role / Title             │
│  • Create Password          │
│  • Linked to existing       │
│    project/workspace        │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  EMAIL VERIFICATION         │
│  → Confirm email            │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  ACCOUNT CREATED            │
│  → Redirect to /login       │
│  → First login → Shared     │
│    workspace with documents │
│    and collaboration tools  │
└─────────────────────────────┘
```

### P1 — Executive Decision-Maker (Post-Consultation)

```
┌──────────────────┐
│  ENTRY: After    │
│  consultation    │
│  call, sent      │
│  sign-up invite  │
│  → /signup       │
└───────┬──────────┘
        │
        ▼
┌─────────────────────────────┐
│  SIGN UP FORM               │
│  • Full Name                │
│  • Work Email               │
│  • Company + Job Title      │
│  • Create Password          │
└───────┬─────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  VERIFICATION + ACCOUNT     │
│  → Redirect to /login       │
│  → Portal: SOW review,      │
│    digital signing,         │
│    team introductions       │
└─────────────────────────────┘
```

---

## Cross-Page Journey Maps

These show the full multi-page paths personas take across the platform.

### Executive Decision-Maker — Full Journey

```
Google / Referral
      │
      ▼
   HOME ──→ SERVICES ──→ SERVICE DETAIL ──→ CLIENT STORIES
      │                                          │
      ▼                                          ▼
   ABOUT ──→ INDUSTRIES ──→ INDUSTRY DETAIL ──→ INSIGHTS
      │                                          │
      └──────────────────────┬───────────────────┘
                             ▼
                       CONSULTATION
                             │
                             ▼
                    (Follow-up call)
                             │
                             ▼
                         SIGN UP
                             │
                             ▼
                          LOG IN
                             │
                             ▼
                      CLIENT PORTAL
```

### IT / Digital Leader — Full Journey

```
Google (technical search)
      │
      ▼
   HOME ──→ SERVICES ──→ MANAGED IT / CLOUD / AI (detail)
      │                          │
      ▼                          ▼
   TOSH CHATBOT            INSIGHTS (technical articles)
      │                          │
      └──────────┬───────────────┘
                 ▼
           CONSULTATION
                 │
                 ▼
           (Technical scoping call)
```

### Small Business Owner — Full Journey

```
Google / Local referral
      │
      ▼
   HOME ──→ SERVICES (overview)
      │              │
      ▼              ▼
   TOSH CHATBOT    CONTACT
      │
      ▼
   (Tosh suggests consultation)
      │
      ▼
   CONSULTATION (or in-chat lead collection)
      │
      ▼
   (Follow-up call)
```

### Experienced Consultant (Job Seeker) — Full Journey

```
LinkedIn / Job board / Referral
      │
      ▼
   CAREERS ──→ ABOUT (culture check)
      │              │
      ▼              │
   WHY JOIN US       │
      │              │
      ▼              │
   OPEN POSITIONS ◄──┘
      │
      ▼
   RESUME FORM (#apply)
      │
      ▼
   (Confirmation → HR contact)
```

### Technical Specialist (Job Seeker) — Full Journey

```
Tech blog / LinkedIn / GitHub
      │
      ▼
   SERVICES ──→ AI / CLOUD / DATA (detail pages)
      │                    │
      ▼                    ▼
   "Real tech work" ──→ CAREERS
                           │
                           ▼
                      OPEN POSITIONS
                           │
                           ▼
                      RESUME FORM (#apply)
```

### Client Project Sponsor — Full Journey

```
SOW signed → Welcome email
      │
      ▼
   SIGN UP (create account)
      │
      ▼
   LOG IN
      │
      ▼
   CLIENT PORTAL (future)
      │
      ├──→ Project dashboard
      ├──→ Deliverable review
      ├──→ Budget tracking
      └──→ Milestone approval
```

### JTLD Internal Staff — Full Journey

```
Corporate onboarding
      │
      ▼
   LOG IN (corporate credentials)
      │
      ├──→ P11 (Consultant): Internal Dashboard → Engagements → Time tracking
      │
      ├──→ P12 (HR Manager): Admin Dashboard → Resume submissions → Pipeline
      │
      └──→ P13 (Marketing): CMS → Insights publishing → Newsletter → Analytics
```

---

## Persona × Page Interaction Summary

| Page | Entry Sources | Primary Actions | Exit Destinations |
|------|--------------|-----------------|-------------------|
| **Home** | Google, referral, LinkedIn, direct | Scan hero, stats, services → click service card or CTA | Services, Consultation, Tosh |
| **Services** | Home nav, Google | Read service cards, capabilities, client stories | Service detail, Consultation, Contact |
| **Industries** | Nav dropdown, About cross-link | Find own industry, read challenges + fit | Industry detail, Services, Consultation |
| **About** | Nav, Careers cross-link | Read values, leadership, Why JTLD | Consultation, Contact, Careers |
| **Insights** | Nav, Service pages | Browse articles, read 1–2, subscribe | Consultation, Services, Newsletter |
| **Careers** | LinkedIn, job board, nav | Read perks, scan roles, submit resume | About, Resume Form, external |
| **Contact** | Nav, service/home CTAs | Get email/phone, send inquiry | Consultation, external (call/email) |
| **Consultation** | CTAs across all pages, Tosh | Fill detailed form, submit | Confirmation → follow-up call |
| **Log In** | Top bar, bookmark, email invite | Enter credentials, authenticate | Client Portal, Dashboard (future) |
| **Sign Up** | Welcome email invite | Create account, verify email | Log In → Portal onboarding |
