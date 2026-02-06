# JTLD Consulting Inc - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Project Name | JTLD Consulting Inc Platform |
| Document Type | Technical Specification |
| Version | 1.0 |
| Created | 2026-02-05 |
| Status | Draft |
| Based On | Requirements Document v2.0 (2026-01-29) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Database Design](#5-database-design)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [API Specification](#7-api-specification)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Backend Architecture](#9-backend-architecture)
10. [Infrastructure & DevOps](#10-infrastructure--devops)
11. [Security Architecture](#11-security-architecture)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Performance & Caching](#13-performance--caching)
14. [Monitoring & Observability](#14-monitoring--observability)
15. [Testing Strategy](#15-testing-strategy)
16. [Phased Implementation Plan](#16-phased-implementation-plan)
17. [Risk Register](#17-risk-register)

---

## 1. Executive Summary

### 1.1 Purpose

This document provides the complete technical specification for the JTLD Consulting Inc platform — an enterprise-grade IT staffing, recruitment, and technology consulting platform. It translates the business requirements into actionable engineering decisions, defining the architecture, data models, APIs, security posture, infrastructure, and implementation phases needed to build and ship the product.

### 1.2 Scope

The platform replaces the existing website at `jtldinc.com` and delivers:

- A public marketing site with SEO-optimized content for 20 services and 14 industry sectors
- A job board with full-text search, filters, and alerts
- Role-based portals for candidates, employers, recruiters, and admins
- AI-powered candidate-job matching (MatchGuide)
- Contractor payroll processing (Flo-Thru) with timesheet management and invoicing
- Managed Service Provider (MSP) program with vendor management
- IT consulting engagement management with service catalog
- Workforce development portal with training, mentorship, and DEI reporting

### 1.3 Architecture Philosophy

| Principle | Rationale |
|-----------|-----------|
| Modular monolith | Ship fast with Next.js; extract microservices when scaling demands it |
| Server-first rendering | SSR/SSG for public pages (SEO); CSR for authenticated dashboards |
| Feature-based structure | Organize by domain (jobs, candidates, payroll) not by file type |
| Progressive enhancement | Core functionality works without JavaScript; interactivity layered on |
| Security by default | Zero trust, defense in depth, OWASP Top 10 compliance from day one |

### 1.4 Key Technical Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Framework | Next.js 16 (App Router) | SSR + API routes in one codebase; Vercel-optimized deployment |
| Language | TypeScript (strict mode) | Type safety across frontend and backend; Prisma type generation |
| Database | PostgreSQL 16+ | ACID compliance, full-text search, JSON support, mature ecosystem |
| ORM | Prisma | Type-safe queries, migration management, schema-first modeling |
| Auth | NextAuth.js v5 | Multi-provider OAuth, JWT sessions, RBAC middleware support |
| Styling | Tailwind CSS 4 | Utility-first, tree-shakeable, design-system compatible |
| Payments | Stripe + Stripe Connect | PCI-compliant, contractor payouts, invoicing support |
| File storage | AWS S3 | Pre-signed URLs, lifecycle policies, cross-region replication |
| Cache/Queue | Redis (Upstash) | Serverless-compatible; sessions, rate limiting, BullMQ queues |
| ML service | FastAPI (Python) | Resume parsing, matching algorithms; deployed separately |
| Hosting | Vercel | Edge functions, preview deploys, instant rollback |
| CDN/WAF | Cloudflare | DDoS protection, WAF rules, DNS management, edge caching |

---

## 2. System Architecture

### 2.1 Architecture Diagram

```
                    ┌──────────────────────┐
                    │     Cloudflare        │
                    │  CDN + WAF + DNS +    │
                    │  DDoS Protection      │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │    Vercel Edge        │
                    │  Middleware Layer     │
                    │  (Auth, Rate Limit)   │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
┌─────────▼──────────┐ ┌──────▼──────────┐ ┌───────▼──────────┐
│   Next.js App      │ │  Next.js API    │ │  FastAPI ML      │
│   React RSC + CC   │ │  Routes v1      │ │  Microservice    │
│   (SSR/CSR Pages)  │ │  (REST API)     │ │  (Python 3.11+)  │
└─────────┬──────────┘ └──────┬──────────┘ └───────┬──────────┘
          │                    │                     │
          │         ┌─────────┼─────────┐           │
          │         │         │         │           │
     ┌────▼───┐ ┌───▼────┐ ┌─▼──────┐ ┌▼────────┐ │
     │ Redis  │ │PostgreSQL│ │ AWS S3 │ │SendGrid │ │
     │(Upstash)│ │ (Neon/  │ │ (File  │ │(Email)  │ │
     │Cache/  │ │ Supabase/│ │Storage)│ │         │ │
     │Session │ │  RDS)   │ │        │ │         │ │
     │Queue   │ │         │ │        │ │         │ │
     └────┬───┘ └────────┘ └────────┘ └─────────┘ │
          │                                         │
     ┌────▼──────────┐                    ┌─────────▼──────┐
     │   BullMQ      │                    │   ML Models    │
     │  Job Queues   │                    │  scikit-learn  │
     │  - Email      │                    │  spaCy / NLP   │
     │  - Matching   │                    │  OpenAI API    │
     │  - Reports    │                    └────────────────┘
     │  - Payroll    │
     └───────────────┘
```

### 2.2 Request Flow

1. **DNS resolution** — Cloudflare resolves `jtldinc.com` and applies WAF rules
2. **Edge middleware** — Vercel Edge runs auth guards, rate limiting, and geo checks
3. **Server rendering** — Next.js renders pages via React Server Components (public) or Client Components (dashboards)
4. **API handling** — API routes validate input with Zod, check authorization, query Prisma, and return JSON envelopes
5. **Background processing** — Long-running tasks (email, matching, payroll) are dispatched to BullMQ queues
6. **ML inference** — Resume parsing and candidate matching requests are proxied to the FastAPI microservice

### 2.3 Multi-Tenancy Model

The platform uses **shared database with row-level isolation**:

- Every `Job`, `Application`, `Contract`, and `Invoice` record is scoped by `employerId`
- Candidate data is scoped by `candidateId`
- Prisma middleware enforces tenant isolation on all queries
- Admin/recruiter roles bypass tenant filters with explicit `role` checks

---

## 3. Technology Stack

### 3.1 Core Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Runtime | Node.js | 20 LTS | Server runtime |
| Framework | Next.js | 16.x | Full-stack React framework |
| UI Library | React | 19.x | Component-based UI |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Database | PostgreSQL | 16+ | Primary data store |
| ORM | Prisma | 6.x | Database access and migrations |
| Auth | NextAuth.js | 5.x | Authentication and sessions |
| Validation | Zod | 3.x | Runtime schema validation |
| Cache | Redis (Upstash) | 7.x | Cache, sessions, queues |
| Queue | BullMQ | 5.x | Background job processing |
| Email | SendGrid or Resend | Latest | Transactional email |
| Payments | Stripe | Latest | Payment processing |
| Storage | AWS S3 | Latest | File storage |
| Fonts | Geist | Latest | Typography |

### 3.2 Development Dependencies

| Tool | Purpose |
|------|---------|
| ESLint 9 | Code linting |
| Prettier | Code formatting |
| Jest | Unit testing |
| Playwright | End-to-end testing |
| Prisma CLI | Database migrations |
| Husky | Git hooks |
| lint-staged | Pre-commit linting |

### 3.3 Infrastructure Services

| Service | Provider | Purpose |
|---------|----------|---------|
| Hosting | Vercel | Application deployment |
| CDN / WAF | Cloudflare | Edge caching, DDoS, DNS |
| Database | Neon / Supabase / AWS RDS | Managed PostgreSQL |
| Cache | Upstash | Serverless Redis |
| File Storage | AWS S3 | Documents, resumes, avatars |
| Email | SendGrid / Resend | Transactional email |
| Error Tracking | Sentry | Exception monitoring |
| Uptime | Uptime Robot | Health checks |
| Analytics | Google Analytics 4 | User analytics |
| ML Hosting | AWS / Railway | FastAPI microservice |

### 3.4 ML/AI Stack (Phase 3+)

| Technology | Purpose |
|-----------|---------|
| Python 3.11+ | ML runtime |
| FastAPI | ML API framework |
| scikit-learn | Matching algorithms |
| spaCy | NLP and resume parsing |
| OpenAI API | LLM-powered features |
| Docker | ML service containerization |

---

## 4. Project Structure

### 4.1 Directory Layout

```
jtld-consulting-inc-platform/
├── docs/                              # Documentation
│   ├── requirements.md                # Business requirements
│   ├── tech-spec.md                   # This document
│   └── skillsets/                     # Team role definitions
│
├── prisma/                            # Database
│   ├── schema.prisma                  # Prisma schema
│   ├── migrations/                    # Migration files
│   └── seed.ts                        # Seed data
│
├── public/                            # Static assets
│   ├── images/                        # Site images
│   ├── fonts/                         # Custom fonts
│   └── robots.txt                     # SEO
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (marketing)/               # Public marketing pages (route group)
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── about/                 # About pages
│   │   │   ├── services/              # Services pages
│   │   │   ├── sectors/               # Industry sector pages
│   │   │   ├── resources/             # Blog, case studies, guides
│   │   │   ├── contact/               # Contact page
│   │   │   └── layout.tsx             # Marketing layout
│   │   │
│   │   ├── (auth)/                    # Auth pages (route group)
│   │   │   ├── login/                 # Login page
│   │   │   ├── register/              # Registration page
│   │   │   ├── forgot-password/       # Password reset request
│   │   │   ├── reset-password/        # Password reset form
│   │   │   └── layout.tsx             # Auth layout (centered card)
│   │   │
│   │   ├── (portal)/                  # Authenticated portals (route group)
│   │   │   ├── candidate/             # Candidate portal
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/
│   │   │   │   ├── applications/
│   │   │   │   ├── jobs/
│   │   │   │   ├── messages/
│   │   │   │   └── settings/
│   │   │   ├── employer/              # Employer portal
│   │   │   │   ├── dashboard/
│   │   │   │   ├── company/
│   │   │   │   ├── jobs/
│   │   │   │   ├── candidates/
│   │   │   │   ├── contracts/
│   │   │   │   └── settings/
│   │   │   ├── recruiter/             # Recruiter ATS
│   │   │   │   ├── dashboard/
│   │   │   │   ├── candidates/
│   │   │   │   ├── job-orders/
│   │   │   │   ├── placements/
│   │   │   │   └── reports/
│   │   │   ├── admin/                 # Admin panel
│   │   │   │   ├── dashboard/
│   │   │   │   ├── users/
│   │   │   │   ├── jobs/
│   │   │   │   ├── analytics/
│   │   │   │   ├── content/
│   │   │   │   └── settings/
│   │   │   └── layout.tsx             # Portal layout (sidebar nav)
│   │   │
│   │   ├── api/                       # API routes
│   │   │   ├── v1/
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── jobs/
│   │   │   │   ├── applications/
│   │   │   │   ├── candidates/
│   │   │   │   ├── contracts/
│   │   │   │   ├── timesheets/
│   │   │   │   ├── invoices/
│   │   │   │   ├── payments/
│   │   │   │   ├── messages/
│   │   │   │   ├── notifications/
│   │   │   │   ├── admin/
│   │   │   │   ├── search/
│   │   │   │   ├── matching/
│   │   │   │   ├── upload/
│   │   │   │   └── config/
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   └── sendgrid/
│   │   │   └── health/
│   │   │
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # Root layout
│   │   ├── not-found.tsx              # 404 page
│   │   └── error.tsx                  # Error boundary
│   │
│   ├── components/                    # Shared UI components
│   │   ├── ui/                        # Primitives (Button, Input, Card, etc.)
│   │   ├── forms/                     # Form components
│   │   ├── layout/                    # Header, Footer, Sidebar, Nav
│   │   ├── jobs/                      # Job-specific components
│   │   ├── candidates/                # Candidate-specific components
│   │   └── shared/                    # Shared across features
│   │
│   ├── lib/                           # Shared utilities and config
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── db.ts                      # Prisma client singleton
│   │   ├── redis.ts                   # Redis client
│   │   ├── s3.ts                      # AWS S3 client
│   │   ├── email.ts                   # Email service
│   │   ├── stripe.ts                  # Stripe client
│   │   ├── queue.ts                   # BullMQ configuration
│   │   ├── logger.ts                  # Structured logging
│   │   ├── validation.ts              # Shared Zod schemas
│   │   ├── constants.ts               # Application constants
│   │   ├── errors.ts                  # Custom error classes
│   │   └── utils.ts                   # General utilities
│   │
│   ├── services/                      # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── job.service.ts
│   │   ├── application.service.ts
│   │   ├── candidate.service.ts
│   │   ├── employer.service.ts
│   │   ├── matching.service.ts
│   │   ├── payroll.service.ts
│   │   ├── invoice.service.ts
│   │   ├── notification.service.ts
│   │   ├── search.service.ts
│   │   └── upload.service.ts
│   │
│   ├── hooks/                         # React custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-jobs.ts
│   │   ├── use-notifications.ts
│   │   └── use-debounce.ts
│   │
│   ├── types/                         # TypeScript type definitions
│   │   ├── api.ts                     # API request/response types
│   │   ├── auth.ts                    # Auth types
│   │   ├── job.ts                     # Job-related types
│   │   └── index.ts                   # Re-exports
│   │
│   └── middleware.ts                  # Next.js middleware (auth, rate limit)
│
├── workers/                           # BullMQ worker processes
│   ├── email.worker.ts
│   ├── matching.worker.ts
│   ├── payroll.worker.ts
│   └── report.worker.ts
│
├── ml-service/                        # FastAPI ML microservice
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── models/
│   │   └── services/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── tests/                             # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .github/                           # GitHub config
│   └── workflows/
│       ├── ci.yml                     # CI pipeline
│       └── deploy.yml                 # Deployment
│
├── .env.example                       # Environment variable template
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── jest.config.ts                     # Jest configuration
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Dependencies and scripts
```

### 4.2 Import Path Aliases

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/services/*": ["./src/services/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/types/*": ["./src/types/*"]
  }
}
```

---

## 5. Database Design

### 5.1 Design Principles

- **CUID2** primary keys on all tables (collision-resistant, URL-safe, sortable)
- **Soft deletes** via `deletedAt` timestamp (null = active)
- **Audit fields** on every table: `createdAt`, `updatedAt`, `deletedAt`
- **Normalized to 3NF** with strategic denormalization for read-heavy paths
- **Enum types** for finite value sets (role, status, job type)

### 5.2 Entity Relationship Overview

```
User (1) ──── (0..1) CandidateProfile
User (1) ──── (0..1) EmployerProfile
User (1) ──── (0..*) Notification
User (1) ──── (0..*) Message (sender)
User (1) ──── (0..*) AuditLog

EmployerProfile (1) ──── (0..*) Job
Job (1) ──── (0..*) Application
Job (1) ──── (0..*) JobSkill

CandidateProfile (1) ──── (0..*) Application
CandidateProfile (1) ──── (0..*) CandidateSkill
CandidateProfile (1) ──── (0..*) WorkExperience
CandidateProfile (1) ──── (0..*) Education
CandidateProfile (1) ──── (0..*) Certification
CandidateProfile (1) ──── (0..*) Resume

Application (1) ──── (0..1) Contract
Contract (1) ──── (0..*) Timesheet
Contract (1) ──── (0..*) Invoice
Invoice (1) ──── (0..1) Payment
```

### 5.3 Core Schema (Prisma)

```prisma
// ─── Enums ───────────────────────────────────────────────

enum UserRole {
  CANDIDATE
  EMPLOYER
  RECRUITER
  ACCOUNT_EXECUTIVE
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  PENDING_VERIFICATION
  ACTIVE
  SUSPENDED
  DEACTIVATED
}

enum JobType {
  CONTRACT
  DIRECT_HIRE
  CONTRACT_TO_HIRE
  FREELANCE
}

enum WorkArrangement {
  REMOTE
  HYBRID
  ONSITE
}

enum ExperienceLevel {
  JUNIOR
  INTERMEDIATE
  SENIOR
  LEAD
  EXECUTIVE
}

enum ApplicationStatus {
  SUBMITTED
  REVIEWED
  SHORTLISTED
  INTERVIEW
  OFFERED
  PLACED
  REJECTED
  WITHDRAWN
}

enum TimesheetStatus {
  DRAFT
  SUBMITTED
  APPROVED
  REJECTED
  PAID
}

enum InvoiceStatus {
  DRAFT
  SENT
  VIEWED
  PAID
  OVERDUE
  CANCELLED
}

enum Availability {
  AVAILABLE
  OPEN_TO_OPPORTUNITIES
  NOT_AVAILABLE
}

// ─── Models ──────────────────────────────────────────────

model User {
  id              String      @id @default(cuid())
  email           String      @unique
  passwordHash    String?
  role            UserRole    @default(CANDIDATE)
  status          UserStatus  @default(PENDING_VERIFICATION)
  firstName       String
  lastName        String
  phone           String?
  avatarUrl       String?
  emailVerified   DateTime?
  lastLoginAt     DateTime?
  failedLogins    Int         @default(0)
  lockedUntil     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  deletedAt       DateTime?

  candidateProfile  CandidateProfile?
  employerProfile   EmployerProfile?
  accounts          Account[]
  sessions          Session[]
  sentMessages      Message[]       @relation("sender")
  receivedMessages  Message[]       @relation("receiver")
  notifications     Notification[]
  auditLogs         AuditLog[]
  jobAlerts         JobAlert[]

  @@index([email])
  @@index([role])
  @@index([status])
  @@map("users")
}

model CandidateProfile {
  id                String        @id @default(cuid())
  userId            String        @unique
  summary           String?       @db.Text
  availability      Availability  @default(NOT_AVAILABLE)
  desiredJobType    JobType?
  desiredRateMin    Decimal?      @db.Decimal(10, 2)
  desiredRateMax    Decimal?      @db.Decimal(10, 2)
  desiredSalaryMin  Decimal?      @db.Decimal(10, 2)
  desiredSalaryMax  Decimal?      @db.Decimal(10, 2)
  workArrangement   WorkArrangement?
  preferredLocations String[]
  linkedinUrl       String?
  portfolioUrl      String?
  securityClearance String?
  workAuthorization String?
  profileComplete   Int           @default(0) // percentage
  searchVector      Unsupported("tsvector")?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  user              User          @relation(fields: [userId], references: [id])
  skills            CandidateSkill[]
  experiences       WorkExperience[]
  education         Education[]
  certifications    Certification[]
  resumes           Resume[]
  applications      Application[]
  contracts         Contract[]    @relation("contractor")
  references        Reference[]

  @@index([availability])
  @@index([desiredJobType])
  @@map("candidate_profiles")
}

model EmployerProfile {
  id              String    @id @default(cuid())
  userId          String    @unique
  companyName     String
  logoUrl         String?
  description     String?   @db.Text
  industry        String?
  companySize     String?
  website         String?
  locations       Json?     // array of { city, province, country }
  socialLinks     Json?     // { linkedin, twitter, etc. }
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields: [userId], references: [id])
  jobs            Job[]
  contracts       Contract[] @relation("employer")
  invoices        Invoice[]

  @@map("employer_profiles")
}

model Skill {
  id          String    @id @default(cuid())
  name        String    @unique
  category    String?
  aliases     String[]  // alternative names for matching
  createdAt   DateTime  @default(now())

  candidateSkills CandidateSkill[]
  jobSkills       JobSkill[]

  @@index([name])
  @@index([category])
  @@map("skills")
}

model CandidateSkill {
  id              String    @id @default(cuid())
  candidateId     String
  skillId         String
  proficiency     Int?      // 1-5
  yearsExperience Int?

  candidate       CandidateProfile @relation(fields: [candidateId], references: [id])
  skill           Skill            @relation(fields: [skillId], references: [id])

  @@unique([candidateId, skillId])
  @@map("candidate_skills")
}

model WorkExperience {
  id          String    @id @default(cuid())
  candidateId String
  title       String
  company     String
  startDate   DateTime
  endDate     DateTime?
  isCurrent   Boolean   @default(false)
  description String?   @db.Text
  createdAt   DateTime  @default(now())

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])

  @@map("work_experiences")
}

model Education {
  id          String    @id @default(cuid())
  candidateId String
  degree      String
  fieldOfStudy String?
  institution String
  year        Int?
  createdAt   DateTime  @default(now())

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])

  @@map("education")
}

model Certification {
  id          String    @id @default(cuid())
  candidateId String
  name        String
  issuer      String
  issuedDate  DateTime?
  expiryDate  DateTime?
  createdAt   DateTime  @default(now())

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])

  @@map("certifications")
}

model Resume {
  id          String    @id @default(cuid())
  candidateId String
  fileName    String
  fileUrl     String
  fileSize    Int
  mimeType    String
  isPrimary   Boolean   @default(false)
  parsedData  Json?     // structured resume data from ML parser
  version     Int       @default(1)
  createdAt   DateTime  @default(now())

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])

  @@map("resumes")
}

model Job {
  id              String          @id @default(cuid())
  employerId      String
  title           String
  slug            String          @unique
  description     String          @db.Text
  category        String
  location        String
  jobType         JobType
  workArrangement WorkArrangement @default(ONSITE)
  experienceLevel ExperienceLevel?
  salaryMin       Decimal?        @db.Decimal(10, 2)
  salaryMax       Decimal?        @db.Decimal(10, 2)
  rateMin         Decimal?        @db.Decimal(10, 2)
  rateMax         Decimal?        @db.Decimal(10, 2)
  currency        String          @default("CAD")
  duration        String?         // e.g., "6 months", "12 months"
  isActive        Boolean         @default(true)
  isFeatured      Boolean         @default(false)
  internalNotes   String?         @db.Text
  applicationCount Int            @default(0) // denormalized for perf
  postedAt        DateTime        @default(now())
  expiresAt       DateTime?
  closedAt        DateTime?
  searchVector    Unsupported("tsvector")?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  deletedAt       DateTime?

  employer        EmployerProfile @relation(fields: [employerId], references: [id])
  skills          JobSkill[]
  applications    Application[]

  @@index([employerId])
  @@index([category])
  @@index([jobType])
  @@index([location])
  @@index([isActive, postedAt])
  @@index([expiresAt])
  @@map("jobs")
}

model JobSkill {
  id        String  @id @default(cuid())
  jobId     String
  skillId   String
  isRequired Boolean @default(true)

  job       Job   @relation(fields: [jobId], references: [id])
  skill     Skill @relation(fields: [skillId], references: [id])

  @@unique([jobId, skillId])
  @@map("job_skills")
}

model Application {
  id          String            @id @default(cuid())
  jobId       String
  candidateId String
  status      ApplicationStatus @default(SUBMITTED)
  coverLetter String?           @db.Text
  resumeUrl   String?
  matchScore  Int?              // 0-100, populated by matching engine
  recruiterNotes String?        @db.Text
  rating      Int?              // 1-5 employer rating
  appliedAt   DateTime          @default(now())
  reviewedAt  DateTime?
  updatedAt   DateTime          @updatedAt

  job         Job               @relation(fields: [jobId], references: [id])
  candidate   CandidateProfile  @relation(fields: [candidateId], references: [id])
  contract    Contract?

  @@unique([jobId, candidateId]) // prevent duplicate applications
  @@index([jobId, status])
  @@index([candidateId])
  @@index([status])
  @@map("applications")
}

model Contract {
  id            String    @id @default(cuid())
  applicationId String?   @unique
  candidateId   String
  employerId    String
  jobTitle      String
  startDate     DateTime
  endDate       DateTime?
  hourlyRate    Decimal   @db.Decimal(10, 2)
  currency      String    @default("CAD")
  status        String    @default("ACTIVE") // ACTIVE, COMPLETED, TERMINATED
  terms         String?   @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  application   Application?     @relation(fields: [applicationId], references: [id])
  candidate     CandidateProfile @relation("contractor", fields: [candidateId], references: [id])
  employer      EmployerProfile  @relation("employer", fields: [employerId], references: [id])
  timesheets    Timesheet[]
  invoices      Invoice[]

  @@index([candidateId])
  @@index([employerId])
  @@index([status])
  @@map("contracts")
}

model Timesheet {
  id            String          @id @default(cuid())
  contractId    String
  weekStarting  DateTime
  entries       Json            // array of { date, hours, project?, notes? }
  regularHours  Decimal         @db.Decimal(5, 2)
  overtimeHours Decimal         @default(0) @db.Decimal(5, 2)
  expenses      Decimal         @default(0) @db.Decimal(10, 2)
  status        TimesheetStatus @default(DRAFT)
  submittedAt   DateTime?
  approvedBy    String?
  approvedAt    DateTime?
  rejectionNote String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  contract      Contract @relation(fields: [contractId], references: [id])

  @@unique([contractId, weekStarting])
  @@index([contractId])
  @@index([status])
  @@map("timesheets")
}

model Invoice {
  id            String        @id @default(cuid())
  invoiceNumber String        @unique
  contractId    String
  employerId    String
  subtotal      Decimal       @db.Decimal(10, 2)
  taxAmount     Decimal       @db.Decimal(10, 2)
  total         Decimal       @db.Decimal(10, 2)
  currency      String        @default("CAD")
  status        InvoiceStatus @default(DRAFT)
  lineItems     Json          // array of line item details
  dueDate       DateTime
  sentAt        DateTime?
  viewedAt      DateTime?
  paidAt        DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  contract      Contract        @relation(fields: [contractId], references: [id])
  employer      EmployerProfile @relation(fields: [employerId], references: [id])
  payment       Payment?

  @@index([employerId])
  @@index([status])
  @@index([dueDate])
  @@map("invoices")
}

model Payment {
  id            String    @id @default(cuid())
  invoiceId     String    @unique
  stripePaymentId String?
  amount        Decimal   @db.Decimal(10, 2)
  currency      String    @default("CAD")
  status        String    // PENDING, SUCCEEDED, FAILED, REFUNDED
  paidAt        DateTime?
  createdAt     DateTime  @default(now())

  invoice       Invoice @relation(fields: [invoiceId], references: [id])

  @@map("payments")
}

model Message {
  id              String    @id @default(cuid())
  senderId        String
  receiverId      String
  conversationId  String
  content         String    @db.Text
  attachmentUrl   String?
  readAt          DateTime?
  createdAt       DateTime  @default(now())

  sender          User @relation("sender", fields: [senderId], references: [id])
  receiver        User @relation("receiver", fields: [receiverId], references: [id])

  @@index([conversationId, createdAt])
  @@index([receiverId, readAt])
  @@map("messages")
}

model Notification {
  id        String    @id @default(cuid())
  userId    String
  type      String    // APPLICATION_STATUS, INTERVIEW, TIMESHEET, etc.
  title     String
  message   String
  link      String?
  isRead    Boolean   @default(false)
  createdAt DateTime  @default(now())

  user      User @relation(fields: [userId], references: [id])

  @@index([userId, isRead, createdAt])
  @@map("notifications")
}

model JobAlert {
  id              String    @id @default(cuid())
  userId          String
  searchCriteria  Json      // { keywords, location, jobType, skills, etc. }
  frequency       String    @default("DAILY") // IMMEDIATE, DAILY, WEEKLY
  isActive        Boolean   @default(true)
  lastSentAt      DateTime?
  createdAt       DateTime  @default(now())

  user            User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([isActive, frequency])
  @@map("job_alerts")
}

model Reference {
  id          String    @id @default(cuid())
  candidateId String
  name        String
  title       String
  company     String
  email       String?
  phone       String?
  relationship String?
  status      String    @default("PENDING") // PENDING, SENT, COMPLETED
  response    Json?
  createdAt   DateTime  @default(now())

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])

  @@map("references")
}

model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String    @db.Text
  excerpt     String?
  category    String
  authorId    String
  imageUrl    String?
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@index([isPublished, publishedAt])
  @@map("blog_posts")
}

model AuditLog {
  id          String    @id @default(cuid())
  userId      String?
  action      String    // CREATE, UPDATE, DELETE, LOGIN, LOGOUT, etc.
  resource    String    // User, Job, Application, etc.
  resourceId  String?
  details     Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime  @default(now())

  user        User?     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([resource, resourceId])
  @@index([createdAt])
  @@map("audit_logs")
}

// ─── NextAuth.js Models ──────────────────────────────────

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

### 5.4 Indexing Strategy

| Index Type | Columns | Purpose |
|-----------|---------|---------|
| B-tree | `users.email` | Login lookups |
| B-tree | `jobs.employerId` | Employer job listings |
| B-tree | `jobs.isActive, jobs.postedAt` | Active job listing queries |
| B-tree | `applications.jobId, applications.status` | Applicant pipeline views |
| B-tree | `applications.candidateId` | Candidate application history |
| B-tree | `contracts.candidateId` | Contractor active contracts |
| B-tree | `timesheets.contractId` | Timesheet lookups by contract |
| B-tree | `invoices.dueDate` | Overdue invoice queries |
| B-tree | `notifications.userId, notifications.isRead` | Unread notification counts |
| B-tree | `audit_logs.createdAt` | Time-range audit queries |
| GIN | `jobs.searchVector` | Full-text job search |
| GIN | `candidate_profiles.searchVector` | Full-text candidate search |

### 5.5 Full-Text Search Configuration

```sql
-- Job search vector with weighted ranking
ALTER TABLE jobs ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(location, '')), 'D')
  ) STORED;

CREATE INDEX idx_jobs_search ON jobs USING GIN(search_vector);

-- Query example
SELECT *, ts_rank(search_vector, query) AS rank
FROM jobs, plainto_tsquery('english', 'senior react developer toronto') query
WHERE search_vector @@ query AND is_active = true
ORDER BY rank DESC
LIMIT 20;
```

---

## 6. Authentication & Authorization

### 6.1 NextAuth.js Configuration

```typescript
// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 60 }, // 30-min timeout
  providers: [
    CredentialsProvider({ /* email + password */ }),
    GoogleProvider({ /* OAuth */ }),
    LinkedInProvider({ /* OAuth */ }),
  ],
  callbacks: {
    jwt({ token, user }) { /* embed role, userId */ },
    session({ session, token }) { /* expose role, userId */ },
  },
});
```

### 6.2 Password Policy

| Rule | Value |
|------|-------|
| Minimum length | 8 characters (12 for admin) |
| Complexity | Uppercase + lowercase + number + special character |
| Hashing | bcrypt with 12 salt rounds |
| History | Prevent reuse of last 5 passwords |
| Lockout | 5 failed attempts → 15-minute lockout |
| Reset expiry | 1-hour token lifetime |

### 6.3 Role-Based Access Control (RBAC)

```typescript
// Middleware route protection matrix
const ROUTE_ACCESS: Record<string, UserRole[]> = {
  "/candidate/*":   ["CANDIDATE"],
  "/employer/*":    ["EMPLOYER"],
  "/recruiter/*":   ["RECRUITER", "ACCOUNT_EXECUTIVE"],
  "/admin/*":       ["ADMIN", "SUPER_ADMIN"],
};

// API endpoint authorization
const API_ACCESS: Record<string, UserRole[]> = {
  "POST /api/v1/jobs":                ["EMPLOYER", "RECRUITER", "ADMIN"],
  "PUT  /api/v1/applications/:id/status": ["EMPLOYER", "RECRUITER", "ADMIN"],
  "GET  /api/v1/admin/*":             ["ADMIN", "SUPER_ADMIN"],
  "GET  /api/v1/candidates":          ["RECRUITER", "ACCOUNT_EXECUTIVE", "ADMIN"],
};
```

### 6.4 Session Management

| Setting | Value |
|---------|-------|
| Storage | JWT in HTTP-only cookie |
| Idle timeout | 30 minutes |
| Absolute timeout | 8 hours |
| Cookie flags | `HttpOnly`, `Secure`, `SameSite=Strict` |
| CSRF | Double-submit cookie pattern |

### 6.5 MFA (Phase 2+)

- TOTP (authenticator app) required for `ADMIN`, `SUPER_ADMIN`, and `RECRUITER` roles
- Optional for `CANDIDATE` and `EMPLOYER`
- Backup codes (10 single-use) generated at enrollment

---

## 7. API Specification

### 7.1 API Design Conventions

| Convention | Specification |
|-----------|---------------|
| Base URL | `/api/v1/` |
| Format | JSON request and response bodies |
| Auth | `Authorization: Bearer <jwt>` header |
| Versioning | URL-based (`/api/v1/`, `/api/v2/`) |
| Pagination | Cursor-based: `?cursor=<id>&limit=20` |
| Sorting | `?sort=createdAt&order=desc` |
| Filtering | `?status=ACTIVE&jobType=CONTRACT` |
| Search | `?q=<search_term>` |

### 7.2 Response Envelope

All API responses use a consistent envelope:

```typescript
// Success response
{
  "data": { /* resource or resource array */ },
  "meta": {
    "total": 150,
    "cursor": "clx1234567890",
    "hasMore": true,
    "requestId": "req_abc123"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  },
  "meta": {
    "requestId": "req_abc123"
  }
}
```

### 7.3 Error Codes

| HTTP Status | Code | Meaning |
|------------|------|---------|
| 400 | `VALIDATION_ERROR` | Request body/params failed Zod validation |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Authenticated but insufficient permissions |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate resource (e.g., duplicate application) |
| 429 | `RATE_LIMITED` | Too many requests; includes `Retry-After` header |
| 500 | `INTERNAL_ERROR` | Server error; logged to Sentry |

### 7.4 Rate Limiting

| Endpoint Group | Limit | Window |
|---------------|-------|--------|
| Auth (login, register, password reset) | 5 requests | 1 minute |
| Job search | 30 requests | 1 minute |
| API general (authenticated) | 100 requests | 1 minute |
| File uploads | 10 requests | 1 minute |
| Webhooks | 1000 requests | 1 minute |

Implementation: Redis sliding window with `Retry-After` header on 429 responses.

### 7.5 Core Endpoint Map

```
AUTH
  POST   /api/v1/auth/register           Register new user
  POST   /api/v1/auth/login              Login with credentials
  POST   /api/v1/auth/logout             End session
  POST   /api/v1/auth/forgot-password    Request password reset email
  POST   /api/v1/auth/reset-password     Reset password with token
  GET    /api/v1/auth/session            Get current session

USERS
  GET    /api/v1/users/me                Get current user profile
  PUT    /api/v1/users/me                Update current user profile
  PUT    /api/v1/users/me/avatar         Upload avatar
  GET    /api/v1/users/me/notifications  Get user notifications
  PUT    /api/v1/users/me/preferences    Update notification preferences
  DELETE /api/v1/users/me                Delete account (soft delete)

JOBS
  GET    /api/v1/jobs                    List jobs (search, filter, sort, paginate)
  GET    /api/v1/jobs/:id                Get job details
  POST   /api/v1/jobs                    Create job posting
  PUT    /api/v1/jobs/:id                Update job posting
  DELETE /api/v1/jobs/:id                Close/deactivate job
  GET    /api/v1/jobs/:id/applications   List applicants for a job
  GET    /api/v1/jobs/:id/matches        Get AI match results

APPLICATIONS
  POST   /api/v1/jobs/:id/apply          Submit application
  GET    /api/v1/applications            List my applications (candidate)
  GET    /api/v1/applications/:id        Get application details
  PUT    /api/v1/applications/:id/status Update application status
  DELETE /api/v1/applications/:id        Withdraw application

CANDIDATES (Recruiter/Admin)
  GET    /api/v1/candidates              Search candidate database
  GET    /api/v1/candidates/:id          Get candidate details
  PUT    /api/v1/candidates/:id/tags     Update candidate tags
  POST   /api/v1/candidates/:id/notes    Add recruiter note

CONTRACTS & TIMESHEETS
  GET    /api/v1/contracts               List contracts
  POST   /api/v1/contracts               Create contract
  GET    /api/v1/contracts/:id/timesheets List timesheets for contract
  POST   /api/v1/contracts/:id/timesheets Submit timesheet
  PUT    /api/v1/timesheets/:id/approve  Approve timesheet
  PUT    /api/v1/timesheets/:id/reject   Reject timesheet

INVOICES & PAYMENTS
  GET    /api/v1/invoices                List invoices
  POST   /api/v1/invoices                Generate invoice
  GET    /api/v1/invoices/:id            Get invoice details
  POST   /api/v1/payments/checkout       Create Stripe checkout session

MESSAGES
  GET    /api/v1/messages                List conversations
  POST   /api/v1/messages                Send message
  GET    /api/v1/messages/:conversationId Get conversation

SEARCH & MATCHING
  GET    /api/v1/search/jobs             Full-text job search with facets
  GET    /api/v1/search/candidates       Full-text candidate search (recruiter)
  POST   /api/v1/matching/job/:id        Trigger AI matching for a job
  GET    /api/v1/recommendations         Get job recommendations (candidate)

FILE UPLOAD
  POST   /api/v1/upload/resume           Upload resume (returns pre-signed URL)
  POST   /api/v1/upload/avatar           Upload avatar
  POST   /api/v1/upload/document         Upload document
  GET    /api/v1/files/:id               Get signed download URL

ADMIN
  GET    /api/v1/admin/users             List/search all users
  PUT    /api/v1/admin/users/:id         Update user (role, status)
  GET    /api/v1/admin/analytics          Platform analytics
  GET    /api/v1/admin/jobs              List all jobs (with moderation)
  PUT    /api/v1/admin/jobs/:id/moderate Approve/reject/feature job

CONFIG
  GET    /api/v1/config/skills           Skills taxonomy
  GET    /api/v1/config/categories       Job categories
  GET    /api/v1/config/locations        Locations list

WEBHOOKS
  POST   /api/webhooks/stripe            Stripe payment events
  POST   /api/webhooks/sendgrid          Email delivery events

HEALTH
  GET    /api/health                     System health check
```

---

## 8. Frontend Architecture

### 8.1 Rendering Strategy

| Page Type | Rendering | Cache | Reason |
|----------|-----------|-------|--------|
| Home page | SSG with ISR (60s) | CDN | SEO; content changes infrequently |
| Service/sector pages | SSG | CDN | Static marketing content |
| Job listing page | SSR | Redis (60s) | Dynamic content; SEO-critical |
| Job detail page | SSR with ISR (60s) | CDN | SEO; structured data for Google for Jobs |
| Blog/resources | SSG with ISR (300s) | CDN | Content-driven; SEO important |
| Auth pages | SSR | None | Dynamic form handling |
| Dashboards | CSR | React Query | Authenticated; real-time data |
| Admin panel | CSR | React Query | Internal; no SEO needed |

### 8.2 Component Architecture

```
Components follow an atomic design pattern:

ui/          → Primitives: Button, Input, Select, Card, Badge, Modal, Toast
forms/       → Form wrappers: FormField, SearchBar, FileUpload, RichTextEditor
layout/      → Structural: Header, Footer, Sidebar, MegaMenu, Breadcrumbs
jobs/        → Domain: JobCard, JobFilters, JobSearchBar, JobDetailView
candidates/  → Domain: CandidateCard, SkillBadge, ApplicationTimeline
shared/      → Cross-cutting: DataTable, Pagination, EmptyState, LoadingSkeleton
```

### 8.3 State Management

| State Type | Solution | Examples |
|-----------|----------|---------|
| Server state | React Query (TanStack Query) | Jobs list, applications, user profile |
| Form state | React Hook Form + Zod | Registration, job posting, profile editing |
| URL state | `useSearchParams` | Job filters, pagination, sort order |
| UI state | React `useState` / `useReducer` | Modal open/close, sidebar toggle |
| Auth state | NextAuth `useSession` | Current user, role |
| Global state | React Context (minimal) | Theme, notification count |

### 8.4 Design System

| Token | Value |
|-------|-------|
| Font family | Geist Sans (body), Geist Mono (code) |
| Font scale | 12, 14, 16, 18, 20, 24, 30, 36, 48, 60px |
| Color palette | Brand primary, secondary, neutral, success, warning, error, info |
| Border radius | 4, 6, 8, 12, 16px |
| Spacing scale | 4px increments (4, 8, 12, 16, 20, 24, 32, 40, 48, 64) |
| Breakpoints | `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px` |
| Dark mode | CSS custom properties toggled via `prefers-color-scheme` |

### 8.5 SEO Implementation

| Feature | Implementation |
|---------|---------------|
| Meta tags | `generateMetadata()` per page with unique title/description |
| Open Graph | OG image, title, description on all public pages |
| Structured data | `JobPosting` schema on job detail pages (Google for Jobs) |
| Sitemap | Auto-generated `sitemap.xml` via Next.js sitemap function |
| Robots | `robots.txt` with crawl rules; `noindex` on auth/portal pages |
| Canonical URLs | Set via `alternates.canonical` in metadata |
| Breadcrumbs | `BreadcrumbList` structured data on all pages |

### 8.6 Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|------------|----------------|
| Color contrast | Minimum 4.5:1 for text; verified with axe-core |
| Keyboard navigation | All interactive elements focusable; logical tab order |
| Screen readers | Semantic HTML; ARIA labels on custom components |
| Focus indicators | Visible focus rings on all interactive elements |
| Alt text | Required on all `<img>` elements |
| Form labels | Every input associated with a `<label>` |
| Reduced motion | `prefers-reduced-motion` media query respected |
| Skip navigation | "Skip to main content" link on all pages |

---

## 9. Backend Architecture

### 9.1 Service Layer Pattern

All business logic lives in the `src/services/` layer, keeping API routes thin:

```typescript
// API route (thin controller)
// src/app/api/v1/jobs/route.ts
export async function GET(request: NextRequest) {
  const params = jobSearchSchema.parse(getSearchParams(request));
  const result = await jobService.search(params);
  return NextResponse.json({ data: result.jobs, meta: result.meta });
}

// Service (business logic)
// src/services/job.service.ts
export const jobService = {
  async search(params: JobSearchParams) {
    const { query, filters, cursor, limit } = params;
    // Build Prisma query with full-text search
    // Apply filters, pagination
    // Return results with metadata
  },
  async create(data: CreateJobInput, employerId: string) {
    // Validate employer exists
    // Generate slug
    // Create job with skills
    // Invalidate cache
    // Queue matching job
    return job;
  },
};
```

### 9.2 Validation Layer

Every API endpoint validates input with Zod schemas:

```typescript
// src/lib/validation.ts
export const createJobSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(50).max(10000),
  category: z.string(),
  location: z.string(),
  jobType: z.nativeEnum(JobType),
  workArrangement: z.nativeEnum(WorkArrangement).optional(),
  experienceLevel: z.nativeEnum(ExperienceLevel).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  skills: z.array(z.string()).min(1).max(20),
  duration: z.string().optional(),
  expiresAt: z.coerce.date().optional(),
});
```

### 9.3 Error Handling

```typescript
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

// Usage in services
throw new AppError("NOT_FOUND", 404, "Job not found");
throw new AppError("FORBIDDEN", 403, "You do not own this job posting");
throw new AppError("CONFLICT", 409, "You have already applied to this job");

// Global error handler in API routes catches and formats consistently
```

### 9.4 Background Job Queue (BullMQ)

| Queue | Job Type | Trigger | Priority |
|-------|----------|---------|----------|
| `email` | Send transactional email | Application submitted, status change, password reset | High |
| `matching` | Run AI matching for a job | Job created/updated | Medium |
| `payroll` | Process payroll run | Timesheet approved, scheduled | High |
| `report` | Generate analytics report | Admin request, scheduled weekly | Low |
| `cleanup` | Orphan file cleanup, expired job deactivation | Cron schedule | Low |
| `notifications` | Send batch notification digests | Scheduled daily/weekly | Medium |

```typescript
// src/lib/queue.ts
import { Queue, Worker } from "bullmq";
import { redis } from "./redis";

export const emailQueue = new Queue("email", { connection: redis });
export const matchingQueue = new Queue("matching", { connection: redis });

// Dispatch a job
await emailQueue.add("application-received", {
  to: employer.email,
  template: "application-received",
  data: { candidateName, jobTitle },
});
```

### 9.5 Email Templates

| Template | Trigger | Recipients |
|---------|---------|-----------|
| `welcome` | Registration | New user |
| `verify-email` | Registration | New user |
| `password-reset` | Forgot password | User |
| `application-received` | Application submitted | Employer |
| `application-status` | Status updated | Candidate |
| `interview-invite` | Interview scheduled | Candidate |
| `timesheet-reminder` | Weekly (if not submitted) | Contractor |
| `timesheet-approved` | Timesheet approved | Contractor |
| `invoice-sent` | Invoice generated | Employer |
| `payment-confirmation` | Payment processed | Contractor |
| `job-alert` | New matching jobs found | Candidate |
| `job-expiry` | 3 days before expiry | Employer |
| `contract-expiry` | 14 days before end | Both parties |
| `weekly-digest` | Weekly (Monday) | Candidates with alerts |

---

## 10. Infrastructure & DevOps

### 10.1 Environment Configuration

| Environment | URL | Branch | Database | Purpose |
|------------|-----|--------|----------|---------|
| Development | `localhost:3000` | Feature branches | Local PostgreSQL | Local development |
| Staging | `staging.jtldinc.com` | `develop` | Staging DB | QA and testing |
| Production | `jtldinc.com` | `main` | Production DB | Live site |

### 10.2 Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/jtld?schema=public"

# Auth
NEXTAUTH_SECRET="<random-32-char-secret>"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""

# Redis
REDIS_URL="redis://default:pass@host:6379"

# AWS S3
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""
AWS_S3_REGION="ca-central-1"

# Email
SENDGRID_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Monitoring
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""

# Analytics
GA4_MEASUREMENT_ID=""

# Maps
GOOGLE_MAPS_API_KEY=""

# ML Service
ML_SERVICE_URL="http://ml.jtldinc.com"

# OpenAI (Phase 3+)
OPENAI_API_KEY=""
```

### 10.3 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint          # ESLint (0 errors)
      - run: npx tsc --noEmit     # TypeScript strict
      - run: npm test              # Jest unit tests
      - run: npm run test:coverage # Coverage > 80%

  integration:
    needs: quality
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_DB: test, POSTGRES_PASSWORD: test }
    steps:
      - run: npx prisma migrate deploy
      - run: npm run test:integration

  build:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - run: npm audit --audit-level=high
      - uses: snyk/actions/node@master
```

### 10.4 Deployment Flow

```
Feature branch → PR → CI checks pass → Review → Merge to develop
  ↓
develop → Auto-deploy to staging (Vercel preview)
  ↓
develop → PR to main → CI checks pass → Review → Merge
  ↓
main → Auto-deploy to production (Vercel)
  ↓
Prisma migrations run automatically on deploy
```

### 10.5 Domain & DNS Configuration

| Record | Name | Value | Purpose |
|--------|------|-------|---------|
| A | `jtldinc.com` | Vercel IP | Root domain |
| CNAME | `www` | `cname.vercel-dns.com` | www subdomain |
| CNAME | `app` | `cname.vercel-dns.com` | Auth portal |
| MX | `jtldinc.com` | SendGrid MX | Email delivery |
| TXT | `jtldinc.com` | SPF record | Email auth |
| TXT | `_dmarc` | DMARC policy | Email auth |
| TXT | `selector._domainkey` | DKIM key | Email signing |
| CAA | `jtldinc.com` | `letsencrypt.org` | CA restriction |

### 10.6 SSL/TLS Configuration

| Setting | Value |
|---------|-------|
| Protocol | TLS 1.3 preferred, TLS 1.2 minimum |
| Certificate | Auto-managed via Cloudflare |
| HSTS | `max-age=63072000; includeSubDomains; preload` |
| HTTPS redirect | Enforced via Cloudflare page rule |

---

## 11. Security Architecture

### 11.1 Security Layers

```
Layer 1: Cloudflare (CDN/WAF/DDoS)
  → WAF managed rulesets
  → Bot management
  → Rate limiting (L7)
  → Geo-blocking

Layer 2: Vercel Edge (Middleware)
  → Auth guard (JWT validation)
  → Route-level rate limiting
  → CORS enforcement
  → Security headers injection

Layer 3: Application (Next.js)
  → Zod input validation
  → RBAC authorization
  → CSRF protection
  → Output encoding (React)
  → File upload validation

Layer 4: Database (PostgreSQL)
  → Parameterized queries (Prisma)
  → Row-level isolation
  → Encryption at rest (AES-256)
  → Connection pooling
  → Audit logging
```

### 11.2 Security Headers

```typescript
// next.config.ts → headers()
{
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'nonce-{random}'; " +
    "style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; " +
    "connect-src 'self' https://api.stripe.com; frame-ancestors 'none';",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(self), payment=(self)"
}
```

### 11.3 File Upload Security

| Check | Implementation |
|-------|---------------|
| MIME type validation | Allowlist: PDF, DOCX, DOC, PNG, JPG, WEBP, XLSX, CSV |
| File size limits | Resume: 10MB, Avatar: 5MB, Document: 25MB |
| Magic byte verification | Validate file header matches declared MIME type |
| Virus scanning | ClamAV scan before storage |
| Filename sanitization | Strip special characters; generate UUID filename |
| Storage isolation | Pre-signed URLs with 15-minute expiry |

### 11.4 Sensitive Data Handling

| Data | Classification | Storage | Access |
|------|---------------|---------|--------|
| Passwords | Restricted | bcrypt hash (12 rounds) | Never exposed |
| SSN/SIN | Restricted | Application-level AES-256 | Admin only, masked in UI |
| Bank details | Restricted | Stripe (PCI-compliant) | Never stored locally |
| Email/phone | Confidential | Database (encrypted at rest) | Owner + recruiter + admin |
| Resume content | Confidential | S3 (SSE-S3 encryption) | Owner + recruiter + employer (per application) |
| Job postings | Internal | Database | Public when active |
| Audit logs | Internal | Immutable storage | Admin only |

### 11.5 Compliance Targets

| Regulation | Scope | Key Requirements |
|-----------|-------|-----------------|
| PIPEDA | Canadian users | Consent, access, correction, retention limits |
| GDPR | EU users (if applicable) | Right to erasure, data portability, DPO |
| CCPA | California users (if applicable) | Disclosure, opt-out, deletion |
| OWASP Top 10 | All | Injection, auth, XSS, CSRF, etc. |
| SOC 2 Type II | Phase 5 | Security, availability, processing integrity |

---

## 12. Third-Party Integrations

### 12.1 Integration Matrix

| Integration | Phase | Type | Authentication | Fallback |
|------------|-------|------|---------------|----------|
| PostgreSQL (Neon/Supabase) | 1 | Database | Connection string | RDS |
| NextAuth.js | 1 | Auth library | Config-based | - |
| SendGrid | 2 | Email API | API key | Resend |
| AWS S3 | 2 | Storage API | IAM keys | Cloudflare R2 |
| Redis (Upstash) | 2 | Cache/queue | Connection string | Vercel KV |
| Sentry | 2 | Error tracking | DSN | Console logging |
| Google Maps | 2 | Maps API | API key | Static maps |
| Stripe | 4 | Payment API | Secret key | - |
| Stripe Connect | 4 | Payout API | Platform account | - |
| Google Analytics 4 | 3 | Analytics | Measurement ID | Vercel Analytics |
| Google for Jobs | 3 | SEO schema | Schema markup | - |
| OpenAI API | 3 | AI/ML API | API key | scikit-learn fallback |
| LinkedIn OAuth | 1 | Auth provider | OAuth credentials | Email-only login |
| Google OAuth | 1 | Auth provider | OAuth credentials | Email-only login |

### 12.2 Webhook Handling

```typescript
// Inbound webhook verification pattern
// src/app/api/webhooks/stripe/route.ts
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  // Process event idempotently (check if already processed)
  switch (event.type) {
    case "payment_intent.succeeded":
      await paymentService.handleSuccess(event.data.object);
      break;
    case "invoice.payment_failed":
      await paymentService.handleFailure(event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}
```

### 12.3 Abstraction Layers

To mitigate vendor lock-in, external services are wrapped in abstraction interfaces:

```typescript
// src/lib/email.ts
interface EmailProvider {
  send(to: string, template: string, data: Record<string, unknown>): Promise<void>;
}

// Can swap SendGrid for Resend without changing service layer
export const emailProvider: EmailProvider = new SendGridProvider();
```

The same pattern applies to:
- Storage (S3 / R2)
- Cache (Upstash Redis / Vercel KV)
- Payment (Stripe)

---

## 13. Performance & Caching

### 13.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse, Web Vitals |
| First Input Delay (FID) | < 100ms | Lighthouse, Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse, Web Vitals |
| Time to First Byte (TTFB) | < 800ms | Server-side measurement |
| API response time (p95) | < 500ms | Sentry Performance |
| Database query time (p95) | < 200ms | Query logging |
| Lighthouse score | > 90 | CI check |

### 13.2 Caching Strategy

| Layer | Technology | TTL | Invalidation |
|-------|-----------|-----|-------------|
| CDN (L3) | Cloudflare Edge | Static: 1yr (content-hashed); HTML: revalidate | Deploy-time purge |
| API cache (L2) | Redis (Upstash) | Job list: 60s; Config: 1hr; Search: 30s | Event-driven (on write) |
| Session cache (L2) | Redis | 30 minutes | On logout / timeout |
| Component cache (L1) | React Server Components `cache()` | Per-request | Automatic |
| Client cache | React Query | 5 minutes (stale-while-revalidate) | On mutation |

### 13.3 Database Performance

| Optimization | Implementation |
|-------------|----------------|
| Connection pooling | Prisma pool: min 5, max 100 connections |
| Query optimization | Use `select` to fetch only needed fields |
| N+1 prevention | Use `include` / `relationLoadStrategy: "join"` |
| Pagination | Cursor-based (not offset) for large datasets |
| Read replicas | Analytics queries routed to read replica (Phase 3+) |
| Full-text search | PostgreSQL `tsvector` with GIN indexes |
| Denormalization | `applicationCount` on Job for listing pages |

### 13.4 Frontend Performance

| Optimization | Implementation |
|-------------|----------------|
| Code splitting | Dynamic imports with `next/dynamic` for heavy components |
| Image optimization | `next/image` with WebP conversion, lazy loading |
| Font optimization | `next/font` with Geist (self-hosted, no layout shift) |
| Bundle analysis | `@next/bundle-analyzer` in CI |
| Prefetching | `<Link prefetch>` on navigation links |
| Skeleton loading | Loading.tsx files for Suspense boundaries |

---

## 14. Monitoring & Observability

### 14.1 Monitoring Stack

| Concern | Tool | Configuration |
|---------|------|---------------|
| Error tracking | Sentry | Client + server; source maps; release tracking |
| Uptime | Uptime Robot | 1-min checks on `/api/health`; Slack + email alerts |
| APM | Sentry Performance | Transaction tracing; slow query detection |
| Logs | Vercel Logs + Datadog | Structured JSON; 30-day retention |
| Analytics | Google Analytics 4 | Page views, events, conversions |
| Business metrics | Custom admin dashboard | Registrations, applications, placements, revenue |
| Status page | Statuspage.io | Public-facing at `status.jtldinc.com` |

### 14.2 Health Check Endpoint

```typescript
// GET /api/health
{
  "status": "healthy",
  "timestamp": "2026-02-05T12:00:00Z",
  "version": "1.0.0",
  "checks": {
    "database": { "status": "up", "latencyMs": 12 },
    "redis": { "status": "up", "latencyMs": 3 },
    "queue": { "status": "up", "depth": 5 },
    "storage": { "status": "up" }
  },
  "uptime": 86400
}
```

### 14.3 Structured Logging Format

```json
{
  "timestamp": "2026-02-05T12:00:00.000Z",
  "level": "info",
  "message": "Job created",
  "requestId": "req_abc123",
  "userId": "usr_xyz789",
  "endpoint": "POST /api/v1/jobs",
  "duration": 245,
  "statusCode": 201,
  "metadata": { "jobId": "job_def456" }
}
```

### 14.4 Alerting Rules

| Condition | Severity | Channel | Escalation |
|-----------|----------|---------|-----------|
| Error rate > 5% (5 min) | Critical | Slack + Email + PagerDuty | Immediate |
| API p95 > 2s (10 min) | High | Slack + Email | 15 min |
| Database connections > 80% | High | Slack + Email | 15 min |
| Redis memory > 80% | Warning | Slack | 30 min |
| Health check fails (3 consecutive) | Critical | Slack + Email + PagerDuty | Immediate |
| Disk usage > 90% | Warning | Email | 1 hour |

---

## 15. Testing Strategy

### 15.1 Test Pyramid

| Layer | Tool | Coverage Target | Scope |
|-------|------|----------------|-------|
| Unit tests | Jest | > 80% | Services, utilities, validation schemas |
| Integration tests | Jest + Prisma (test DB) | > 70% | API routes, database queries, auth flows |
| E2E tests | Playwright | Critical paths | Registration, login, job search, apply, post job |
| Visual tests | Playwright screenshots | Key pages | Home, job listing, dashboards |

### 15.2 Test Organization

```
tests/
├── unit/
│   ├── services/
│   │   ├── job.service.test.ts
│   │   ├── application.service.test.ts
│   │   └── matching.service.test.ts
│   ├── lib/
│   │   ├── validation.test.ts
│   │   └── utils.test.ts
│   └── components/
│       ├── JobCard.test.tsx
│       └── SearchBar.test.tsx
├── integration/
│   ├── api/
│   │   ├── auth.test.ts
│   │   ├── jobs.test.ts
│   │   └── applications.test.ts
│   └── services/
│       └── payroll.test.ts
└── e2e/
    ├── auth.spec.ts           # Register → verify → login → logout
    ├── job-search.spec.ts     # Search → filter → view details
    ├── apply.spec.ts          # Login → search → apply → track
    ├── post-job.spec.ts       # Employer login → create job → view applicants
    └── admin.spec.ts          # Admin login → manage users → moderate jobs
```

### 15.3 CI Quality Gates

| Gate | Threshold | Action on Failure |
|------|-----------|------------------|
| ESLint | 0 errors | Block merge |
| TypeScript | 0 errors (strict mode) | Block merge |
| Unit test coverage | > 80% | Block merge |
| Integration tests | All pass | Block merge |
| E2E tests | All pass | Block merge |
| Bundle size | < 250KB first-load JS | Warn |
| Lighthouse score | > 90 | Warn |
| Security audit | 0 critical/high vulnerabilities | Block merge |

---

## 16. Phased Implementation Plan

### Phase 1: Foundation (MVP)

**Objective**: Core job board with authentication, basic profiles, and job applications.

| Deliverable | Details |
|-------------|---------|
| **Project setup** | Prisma, NextAuth, Tailwind, ESLint, Prettier, Jest, Husky |
| **Database schema** | Users, CandidateProfile, EmployerProfile, Job, Application, Skill |
| **Authentication** | Email/password registration, login, email verification, password reset, Google/LinkedIn OAuth |
| **RBAC middleware** | Route protection for candidate, employer, admin roles |
| **Home page** | Hero, featured jobs, service overview, testimonials, stats |
| **Job board** | Listing page, full-text search, filters, pagination, sort |
| **Job detail page** | Full description, skills tags, apply button, share, similar jobs |
| **Candidate profile** | Personal info, skills, experience, education, resume upload |
| **Employer profile** | Company info, logo, description |
| **Job posting** | Create, edit, close, preview, duplicate |
| **Application flow** | One-click apply, application tracking, status pipeline |
| **Basic admin** | User listing, job moderation |
| **CI/CD** | GitHub Actions pipeline, Vercel deployment |

**Dependencies to install**:
```
prisma @prisma/client next-auth @auth/prisma-adapter
zod react-hook-form @hookform/resolvers
bcryptjs @types/bcryptjs
@tanstack/react-query
lucide-react clsx tailwind-merge
```

### Phase 2: Growth

**Objective**: Full portals, notifications, file storage, security hardening.

| Deliverable | Details |
|-------------|---------|
| **Candidate dashboard** | Stats, recent activity, recommendations, saved jobs |
| **Employer dashboard** | Active postings, recent applications, pipeline, metrics |
| **Email notifications** | 15 notification templates via SendGrid/Resend |
| **In-app notifications** | Bell icon, dropdown, mark as read, notification page |
| **Job alerts** | Create from search criteria, daily/weekly email digests |
| **Candidate pipeline** | Employer reviews, scores, notes, pipeline stages, bulk actions |
| **Interview management** | Schedule, calendar integration, reminders, scorecards |
| **File storage** | S3 integration, pre-signed URLs, resume/avatar upload |
| **Messaging** | In-app messaging between candidate and recruiter |
| **Marketing pages** | About, services (20 pages), sectors (14 pages), contact |
| **Security hardening** | CSP headers, rate limiting, CSRF, input validation |
| **Redis caching** | Session storage, API cache, rate limiting |
| **Sentry integration** | Error tracking, performance monitoring |

### Phase 3: Intelligence

**Objective**: AI-powered matching, analytics, content management, SEO.

| Deliverable | Details |
|-------------|---------|
| **ML microservice** | FastAPI service for resume parsing and matching |
| **Resume parsing** | Extract skills, experience, education from PDF/DOCX |
| **MatchGuide engine** | Skills overlap, location, salary, experience scoring (0-100) |
| **Job recommendations** | "Jobs you might like" on candidate dashboard |
| **Candidate recommendations** | Top matching candidates per job posting |
| **Analytics dashboard** | Admin metrics: registrations, applications, placements, revenue |
| **Blog/resources** | Blog CMS, case studies, resource filtering |
| **Content management** | Admin CRUD for blog posts, case studies, FAQs |
| **SEO optimization** | Structured data (JobPosting), sitemap, meta tags, Open Graph |
| **Google for Jobs** | JobPosting schema on all active job detail pages |
| **Google Analytics 4** | Page view tracking, conversion events |

### Phase 4: Monetization

**Objective**: Payments, contractor payroll, invoicing, internal ATS.

| Deliverable | Details |
|-------------|---------|
| **Stripe integration** | Payment processing for premium postings, subscriptions |
| **Contractor payroll** | Timesheet submission, approval workflow, payroll calculation |
| **Invoicing** | Auto-generate invoices from timesheets, tax calculation |
| **Pay stubs** | PDF generation, contractor payment history |
| **Offer management** | Offer letter templates, digital signature, tracking |
| **Contract management** | Active contractors, extension/renewal, termination |
| **Internal ATS** | Recruiter candidate database, job orders, placement tracking |
| **Reference checking** | Request, questionnaire, response tracking |
| **Premium features** | Featured job postings, employer subscription tiers |
| **Stripe Connect** | Contractor direct deposit payouts |

### Phase 5: Scale

**Objective**: Advanced features, performance, i18n, compliance.

| Deliverable | Details |
|-------------|---------|
| **Professional Services SOW** | SOW creation, templates, milestone tracking |
| **Curated Teams (PODs)** | POD composition, assembly, engagement management |
| **Multi-language (EN/FR)** | next-intl for Canadian French support |
| **Elasticsearch** | Migrate search from PostgreSQL FTS for scale |
| **Performance optimization** | Profiling, bundle optimization, query tuning |
| **Advanced reporting** | Exportable CSV/PDF reports, scheduled reports |
| **Video interviews** | Microsoft Teams / Zoom integration |
| **Skills assessments** | Assessment platform integration |
| **Mobile PWA** | Progressive Web App with offline support |

### Phase 6: Enterprise & Consulting

**Objective**: MSP program, consulting services, workforce development, compliance.

| Deliverable | Details |
|-------------|---------|
| **MSP client portal** | Onboarding, analytics, vendor management, SLA tracking |
| **VMS integration** | Fieldglass / Beeline integration |
| **IT consulting** | Engagement management, service catalog, proposal generation |
| **Technology partnerships** | Partner directory, certification badges |
| **Training portal** | Course catalog, enrollment, progress, certificates |
| **Rising talent programs** | Student/co-op/veteran programs, mentorship matching |
| **DEI reporting** | Diversity dashboard, inclusive hiring tools |
| **Background checks** | Sterling/Certn API integration |
| **SOC 2 Type II** | Compliance audit preparation |
| **Multi-region DR** | Secondary region failover, cross-region replication |

---

## 17. Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|------|--------|-----------|------------|
| 1 | Scope creep across 6 phases | High | High | Strict phase gates; each phase has clear acceptance criteria |
| 2 | Database performance degrades at scale | High | Medium | Indexing strategy, connection pooling, read replicas, Elasticsearch migration path |
| 3 | Third-party service outage (Stripe, SendGrid) | High | Low | Abstraction layers; fallback providers; circuit breaker pattern |
| 4 | Security breach / data leak | Critical | Low | Defense in depth; OWASP compliance; penetration testing; incident response plan |
| 5 | ML model accuracy insufficient | Medium | Medium | Phased rollout; human-in-the-loop review; A/B testing; fallback to rule-based matching |
| 6 | Regulatory non-compliance (PIPEDA/GDPR) | High | Low | Privacy-by-design; data classification; consent management; legal review |
| 7 | Vendor lock-in (Vercel, AWS) | Medium | Medium | Abstraction layers; standard APIs; containerized ML service |
| 8 | Payroll calculation errors | Critical | Low | Comprehensive test suite; dual-calculation verification; manual review for first 3 months |
| 9 | Domain migration SEO loss | Medium | Medium | 301 redirects; Google Search Console monitoring; staged rollout |
| 10 | Development velocity slowdown | Medium | Medium | Modular architecture; feature flags; automated testing; CI/CD pipeline |

---

## Appendix A: NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "analyze": "ANALYZE=true next build",
    "postinstall": "prisma generate"
  }
}
```

## Appendix B: Migration Checklist (jtldinc.com)

| Step | Action | Status |
|------|--------|--------|
| 1 | Inventory all existing URLs on current site | Pending |
| 2 | Create 301 redirect map (old URL → new URL) | Pending |
| 3 | Update DNS A/CNAME records to point to Vercel | Pending |
| 4 | Configure SSL/TLS via Cloudflare | Pending |
| 5 | Preserve MX records for email delivery | Pending |
| 6 | Set up Google Search Console for new site | Pending |
| 7 | Submit updated sitemap.xml | Pending |
| 8 | Monitor search rankings for 30 days post-migration | Pending |
| 9 | Remove old hosting after 90-day monitoring period | Pending |

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| ATS | Applicant Tracking System |
| CRM | Candidate Relationship Management |
| CWM | Contingent Workforce Management |
| Flo-Thru | Contractor payroll service |
| MatchGuide | AI-powered candidate-job matching engine |
| MSP | Managed Service Provider |
| POD | Curated team of IT specialists |
| RBAC | Role-Based Access Control |
| SOW | Statement of Work |
| VMS | Vendor Management System |
| RSC | React Server Components |
| CC | Client Components |
| ISR | Incremental Static Regeneration |
