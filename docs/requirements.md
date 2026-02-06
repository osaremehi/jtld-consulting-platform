# JTLD Consulting Inc - Platform Requirements Document

## Document Information

| Field | Value |
|-------|-------|
| Project Name | JTLD Consulting Inc Platform |
| Company | JTLD Consulting Inc |
| Reference Models | CGI (cgi.com) |
| Version | 2.0 |
| Created | 2026-01-29 |
| Status | Draft |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Roles & Personas](#2-user-roles--personas)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Technical Architecture Requirements](#5-technical-architecture-requirements)
6. [System Integrations](#6-system-integrations)
7. [Data Requirements](#7-data-requirements)
8. [Phased Delivery Plan](#8-phased-delivery-plan)

---

## 1. Project Overview

### 1.1 Purpose

Build a comprehensive business consulting platform for **JTLD Consulting Inc**, modeled after CGI. The platform delivers strategic guidance, consulting services, and end-to-end solutions that help clients accelerate their digital transformation, optimize operations, and achieve measurable business outcomes through expert consulting, managed services, and technology enablement.

### 1.1.1 Existing Website

JTLD Consulting Inc has an existing website at **http://www.jtldconsulting.com/**. The new platform will replace this site using the same domain (`jtldconsulting.com`), preserving domain authority, SEO value, and brand recognition. A migration plan will ensure:

- All existing URLs are redirected (301) to their new equivalents
- Domain DNS records are updated to point to the new hosting (Vercel)
- SSL/TLS certificate is properly configured (current site has certificate issues)
- Email delivery is maintained during the transition (MX records preserved)
- Google Search Console ownership is transferred to the new site

### 1.2 Vision

To position JTLD Consulting Inc as a trusted business consulting partner that helps enterprises navigate digital transformation, optimize business processes, and unlock competitive advantage through strategic consulting, managed services, and technology solutions.

### 1.3 Business Model

| Revenue Stream | Description |
|---------------|----------------|
| Business Consulting | Strategic guidance and transformation consulting |
| Business Process Services | Process optimization, automation, and outsourcing |
| Managed IT Services | End-to-end IT management and outsourcing |
| Professional Services SOW | Project-based consulting and implementation |
| Recurring Managed Services | Ongoing service contracts and retainers |
| Training & Certification | Professional development and upskilling programs |

### 1.4 Core Services (Modeled After CGI)

#### 1. Business Consulting
- **Digital Transformation Strategy** — End-to-end digital strategy, roadmap, and transformation planning
- **Enterprise Strategy** — Market analysis, competitive positioning, growth strategies
- **Operational Excellence** — Process optimization, efficiency improvements, cost reduction
- **Change Management** — Organizational change, culture transformation, stakeholder engagement
- **Technology Strategy** — IT alignment with business goals, technology roadmaps, vendor evaluation

#### 2. Business Process Services
- **Process Automation** — RPA, workflow automation, intelligent process automation (IPA)
- **Business Process Optimization** — Lean Six Sigma, process re-engineering, efficiency improvements
- **Finance & Accounting Outsourcing** — AP/AR, payroll, accounting process outsourcing
- **Human Resources Services** — HR administration, recruitment process outsourcing, talent management
- **Customer Experience Optimization** — Journey mapping, process optimization, service design

#### 3. Managed IT Services
- **Infrastructure Management** — Cloud infrastructure, on-premises, hybrid IT management
- **IT Operations Outsourcing** — End-to-end IT management, service desk, NOC services
- **Security & Compliance Management** — Managed security services, compliance monitoring, incident response
- **Applications Management** — Application support, maintenance, optimization
- **End-user Services** — Desktop management, mobility, end-user support

#### 4. Artificial Intelligence
- **AI Strategy & Advisory** — AI roadmap, use case identification, implementation planning
- **Machine Learning Solutions** — Model development, MLOps, AI/ML implementation
- **Intelligent Automation** — Agentic AI, chatbots, cognitive automation, intelligent process automation
- **Generative AI Solutions** — LLM implementations, prompt engineering, custom AI applications
- **AI Governance** — Responsible AI, ethics, risk management, compliance

#### 5. Data Analytics
- **Data Strategy & Governance** — Data architecture, governance frameworks, data quality
- **Business Intelligence** — BI platforms, dashboards, analytics, reporting
- **Advanced Analytics** — Predictive analytics, prescriptive analytics, statistical modeling
- **Data Engineering** — Data pipeline development, data lake/warehouse architecture, ETL/ELT
- **Analytics Consulting** — Performance analytics, marketing analytics, financial analytics

#### 6. Cloud & Hybrid IT
- **Cloud Migration** — Assessment, planning, migration execution (AWS, Azure, GCP)
- **Cloud Architecture** — Solution design, cloud-native architecture, scalability planning
- **Cloud Optimization** — Cost optimization, performance optimization, workload management
- **Hybrid & Multi-Cloud** — Hybrid cloud strategies, multi-cloud orchestration, integration
- **Cloud Governance** — Security, compliance, cost management, operational excellence

### 1.5 Industry Sectors Served

| Sector | Description |
|--------|-------------|
| Financial Services & FinTech | Banking, insurance, capital markets, asset management |
| Software & Information Technology | SaaS, product development, IT services |
| Engineering & Construction | Infrastructure, industrial, commercial, residential |
| Systems Integrators & Consulting | Tax, finance, legal, operations, enterprise systems |
| Natural Resources | Oil & gas, mining, forestry, agriculture, utilities, energy |
| Transportation | Airlines, trucking, 3PL, rail, automotive, logistics |
| Government & Public Sector | Federal, provincial, municipal agencies |
| Healthcare & Life Sciences | Hospitals, pharma, biotech, medical devices |
| Telecommunications | Carriers, ISPs, network providers |
| Retail & E-Commerce | Omnichannel retail, marketplace platforms |
| Media, Entertainment & Gaming | Streaming, broadcasting, game studios, content platforms |
| Energy & Utilities | Power generation, renewable energy, smart grid, distribution |
| Consumer & Industrial Products | Manufacturing, CPG, supply chain, logistics |
| Education | Universities, colleges, EdTech, school boards |

### 1.6 Job Categories

| Category | Example Roles |
|----------|--------------|
| Project Management | Project Manager, Scrum Master, Program Manager |
| Business Analysis | Business Analyst, Systems Analyst, Requirements Analyst |
| Software Development | Full-Stack Developer, Frontend, Backend, Mobile |
| Cyber Security | Security Analyst, Penetration Tester, CISO, SOC Analyst |
| Data Analytics | Data Analyst, Data Scientist, BI Developer |
| Quality Assurance | QA Analyst, Test Automation Engineer, SDET |
| ERP/SAP | SAP Consultant, Oracle ERP, Dynamics 365 |
| Application Support | Application Support Analyst, L2/L3 Support |
| Networks & Infrastructure | Network Engineer, Cloud Architect, SysAdmin |
| Help Desk | IT Support Specialist, Help Desk Technician |
| Architecture | Solutions Architect, Enterprise Architect, Cloud Architect |
| Database Administration | DBA, Data Engineer, Database Architect |
| GIS | GIS Analyst, GIS Developer, Spatial Data Analyst |
| Management Consulting | IT Strategy Consultant, Change Management |
| Technical Writing | Technical Writer, Documentation Specialist |
| Cloud Engineering | Cloud Architect, Cloud Engineer, SRE, Platform Engineer |
| AI & Machine Learning | ML Engineer, Data Scientist, AI Researcher, NLP Engineer |
| DevOps & SRE | DevOps Engineer, Site Reliability Engineer, Release Manager |
| UI/UX Design | UX Designer, UI Designer, UX Researcher, Product Designer |
| Agile & Delivery | Scrum Master, Agile Coach, Delivery Manager, Release Train Engineer |
| ServiceNow / ITSM | ServiceNow Developer, ITSM Consultant, Platform Administrator |
| Salesforce | Salesforce Developer, Admin, Architect, Consultant |

---

## 2. User Roles & Personas

### 2.1 User Roles

| Role | Description | Access Level |
|------|-------------|-------------|
| **Guest** | Unauthenticated visitor browsing the site | Public pages, job listings (limited) |
| **Candidate** | IT professional seeking contract or permanent work | Candidate portal, job search, applications |
| **Employer** | Company or hiring manager seeking IT talent | Employer portal, job posting, candidate review |
| **Recruiter** | Internal staff managing placements and relationships | Full ATS, candidate/employer management |
| **Account Executive** | Internal staff managing employer accounts | Employer relationships, contracts, SOWs |
| **Admin** | Platform administrator with full access | All features, user management, settings |
| **Super Admin** | System owner with highest privileges | System configuration, billing, analytics |

### 2.2 Candidate Persona

```
Name:        Sarah Chen
Role:        Senior Software Developer (Contractor)
Goals:       - Find relevant IT contract positions quickly
             - Apply with minimal friction
             - Track application status in real-time
             - Get matched to jobs fitting her skills
             - Access health benefits and insurance
             - Get paid on time with clear pay stubs
Pain Points: - Too many irrelevant job results
             - Lengthy application forms
             - No visibility into application status
             - Having to re-enter resume info manually
             - Unclear pay rates and contract terms
```

### 2.3 Employer Persona

```
Name:        Mark Thompson
Role:        IT Director at a mid-size financial services company
Goals:       - Find qualified IT contractors quickly (within days)
             - Post jobs and receive quality applicants
             - Review and compare candidates efficiently
             - Manage contractor onboarding and compliance
             - Scale team up/down based on project needs
Pain Points: - Screening through unqualified applicants
             - Slow time-to-hire
             - Lack of candidate quality indicators
             - Administrative burden of contractor payroll
             - Managing compliance and insurance
```

### 2.4 Recruiter Persona

```
Name:        Lisa Patel
Role:        IT Recruiter at the staffing company
Goals:       - Match candidates to open roles efficiently
             - Maintain strong candidate relationships
             - Meet placement targets and KPIs
             - Manage pipeline across multiple job orders
             - Ensure smooth onboarding for placed candidates
Pain Points: - Manual matching processes
             - Tracking candidates across spreadsheets
             - Coordinating interviews between parties
             - Keeping candidate profiles up to date
             - Managing high volume of requisitions
```

---

## 3. Functional Requirements

### 3.1 Public Website

#### FR-PW-001: Home Page / Landing Page
- **FR-PW-001.1**: Display hero section with value proposition and primary CTAs ("Find Work" / "Find Talent")
- **FR-PW-001.2**: Display featured/recent job listings (top 6-10)
- **FR-PW-001.3**: Display industry sectors served with icons and links
- **FR-PW-001.4**: Display key statistics (jobs posted, candidates placed, member network size)
- **FR-PW-001.5**: Display client/partner logos (trust signals)
- **FR-PW-001.6**: Display testimonials from candidates and employers
- **FR-PW-001.7**: Display service offerings overview (Contract, Direct Hire, Payroll, SOW, PODs)
- **FR-PW-001.8**: Include newsletter signup form
- **FR-PW-001.9**: Display awards and recognition badges

#### FR-PW-002: About Pages
- **FR-PW-002.1**: Company story and history page
- **FR-PW-002.2**: Mission, vision, and core values page (Accountability, Transparency, Professionalism, Aspiration)
- **FR-PW-002.3**: Leadership team page with photos and bios
- **FR-PW-002.4**: Office locations page with map
- **FR-PW-002.5**: Diversity, equity, and inclusion (DEI) commitment page
- **FR-PW-002.6**: Awards and recognition page
- **FR-PW-002.7**: Careers at the company (internal hiring) page
- **FR-PW-002.8**: Internship/co-op program page

#### FR-PW-003: Services Pages
- **FR-PW-003.1**: Contract Staffing service page with benefits, process, and CTA
- **FR-PW-003.2**: Direct Hire service page with placement process and fees
- **FR-PW-003.3**: Contractor Payroll (Flo-Thru) service page with features
- **FR-PW-003.4**: Professional Services SOW page with engagement model
- **FR-PW-003.5**: Curated Teams (PODs) page with team concept and benefits
- **FR-PW-003.6**: Each service page includes a contact/inquiry form
- **FR-PW-003.7**: Managed Service Provider (MSP) page with engagement model and benefits
- **FR-PW-003.8**: Cloud Services page with migration, architecture, and optimization offerings
- **FR-PW-003.9**: Data & Analytics page with BI, governance, and data platform services
- **FR-PW-003.10**: AI, ML & Automation page with AI strategy and intelligent automation
- **FR-PW-003.11**: Cybersecurity & Risk page with security assessments, IAM, and compliance
- **FR-PW-003.12**: Application Innovation page with modernization and development services
- **FR-PW-003.13**: Digital Workplace Services page with end-user support and collaboration
- **FR-PW-003.14**: Enterprise Service Management page with ServiceNow and ITSM services
- **FR-PW-003.15**: Agile Transformation page with DevOps and delivery pipeline services
- **FR-PW-003.16**: Business Modernization page with legacy migration and digital transformation
- **FR-PW-003.17**: Brand Strategy & Design page with creative services
- **FR-PW-003.18**: Digital Strategy & Experience Design page with UX/CX services
- **FR-PW-003.19**: Training & Upskilling page with course catalog and certification programs
- **FR-PW-003.20**: Technology Partnerships page (AWS, Azure, GCP, Snowflake, ServiceNow, Salesforce)

#### FR-PW-004: Sectors / Industries Pages
- **FR-PW-004.1**: Individual page for each sector (Financial Services, Engineering, Software/IT, etc.)
- **FR-PW-004.2**: Each sector page displays relevant job categories and recent openings
- **FR-PW-004.3**: Each sector page includes case studies or success stories
- **FR-PW-004.4**: Each sector page has a CTA to contact or browse jobs

#### FR-PW-005: Resources Section
- **FR-PW-005.1**: Blog with articles on IT hiring trends, career advice, and industry insights
- **FR-PW-005.2**: Case studies showcasing successful placements and partnerships
- **FR-PW-005.3**: Downloadable eBooks and guides (e.g., salary guide, CWM guide)
- **FR-PW-005.4**: IT hiring trends and salary guide (annual publication)
- **FR-PW-005.5**: Resource filtering by category (blog, case study, eBook)
- **FR-PW-005.6**: Resource search functionality

#### FR-PW-006: Contact Page
- **FR-PW-006.1**: General contact form with subject selection
- **FR-PW-006.2**: Office addresses with map integration
- **FR-PW-006.3**: Phone numbers and email addresses by region
- **FR-PW-006.4**: Separate contact paths for candidates vs employers

#### FR-PW-007: Navigation
- **FR-PW-007.1**: Primary navigation: Find Talent, Search Jobs, Services, Sectors, Resources, About, Contact
- **FR-PW-007.2**: Secondary navigation: Login, Register, Language toggle (EN/FR)
- **FR-PW-007.3**: Mega menu for Services and Sectors with sub-pages
- **FR-PW-007.4**: Mobile responsive hamburger menu
- **FR-PW-007.5**: Sticky header on scroll
- **FR-PW-007.6**: Footer with sitemap links, social media, and legal links

---

### 3.2 Authentication & User Management

#### FR-AU-001: User Registration
- **FR-AU-001.1**: Candidate registration with email, password, first name, last name, phone
- **FR-AU-001.2**: Employer registration with email, password, company name, role/title, phone
- **FR-AU-001.3**: Email verification via confirmation link
- **FR-AU-001.4**: Password strength requirements (min 8 chars, uppercase, lowercase, number, special char)
- **FR-AU-001.5**: Terms of service and privacy policy acceptance checkbox
- **FR-AU-001.6**: Optional LinkedIn/Google OAuth registration
- **FR-AU-001.7**: CAPTCHA/reCAPTCHA to prevent bot registrations
- **FR-AU-001.8**: Duplicate email detection with clear error message

#### FR-AU-002: User Login
- **FR-AU-002.1**: Email and password login
- **FR-AU-002.2**: "Remember me" option for persistent sessions
- **FR-AU-002.3**: OAuth login (LinkedIn, Google)
- **FR-AU-002.4**: Account lockout after 5 failed login attempts (15-minute cooldown)
- **FR-AU-002.5**: Login redirects to appropriate dashboard based on user role
- **FR-AU-002.6**: Session timeout after 30 minutes of inactivity

#### FR-AU-003: Password Management
- **FR-AU-003.1**: Forgot password with email reset link
- **FR-AU-003.2**: Password reset link expires after 1 hour
- **FR-AU-003.3**: Change password from account settings (requires current password)
- **FR-AU-003.4**: Password history — prevent reuse of last 5 passwords

#### FR-AU-004: User Profile Management
- **FR-AU-004.1**: Edit personal information (name, email, phone, location)
- **FR-AU-004.2**: Upload and change profile photo/avatar
- **FR-AU-004.3**: Manage notification preferences (email, SMS, in-app)
- **FR-AU-004.4**: Account deactivation (soft delete)
- **FR-AU-004.5**: Data export (GDPR/PIPEDA compliance)
- **FR-AU-004.6**: Account deletion with confirmation

#### FR-AU-005: Role-Based Access Control (RBAC)
- **FR-AU-005.1**: Candidates can only access candidate portal features
- **FR-AU-005.2**: Employers can only access employer portal features
- **FR-AU-005.3**: Recruiters access internal ATS and CRM features
- **FR-AU-005.4**: Admins access all features plus admin panel
- **FR-AU-005.5**: Route protection — unauthorized access redirects to login
- **FR-AU-005.6**: API endpoint authorization based on user role

---

### 3.3 Job Board & Search

#### FR-JB-001: Job Listing Page
- **FR-JB-001.1**: Display all active job listings in card format
- **FR-JB-001.2**: Each job card shows: title, company, location, job type, salary/rate range, skills, posted date
- **FR-JB-001.3**: Pagination (20 jobs per page) or infinite scroll
- **FR-JB-001.4**: Sort options: newest, relevance, salary (high-low), salary (low-high)
- **FR-JB-001.5**: Total job count displayed
- **FR-JB-001.6**: "New" badge on jobs posted within last 48 hours

#### FR-JB-002: Job Search
- **FR-JB-002.1**: Full-text search by keyword (job title, skills, description)
- **FR-JB-002.2**: Location-based search (city, province/state, remote)
- **FR-JB-002.3**: Search suggestions/autocomplete
- **FR-JB-002.4**: Search results highlighted with matching terms
- **FR-JB-002.5**: Recent searches saved for logged-in users
- **FR-JB-002.6**: URL-based search (shareable search URLs with query params)

#### FR-JB-003: Job Filters
- **FR-JB-003.1**: Filter by job type (Contract, Direct Hire, Contract-to-Hire, Freelance)
- **FR-JB-003.2**: Filter by category (Project Management, Software Development, Cyber Security, etc.)
- **FR-JB-003.3**: Filter by location (city, province/state, country)
- **FR-JB-003.4**: Filter by remote/hybrid/onsite work arrangement
- **FR-JB-003.5**: Filter by salary/rate range (slider or min/max inputs)
- **FR-JB-003.6**: Filter by experience level (Junior, Intermediate, Senior, Lead, Executive)
- **FR-JB-003.7**: Filter by industry sector
- **FR-JB-003.8**: Filter by date posted (last 24h, last 7 days, last 30 days)
- **FR-JB-003.9**: Filter by skills/technologies (multi-select)
- **FR-JB-003.10**: Clear all filters button
- **FR-JB-003.11**: Active filter chips displayed with individual remove option
- **FR-JB-003.12**: Filter count badge showing number of matching results

#### FR-JB-004: Job Detail Page
- **FR-JB-004.1**: Full job description with formatted content (headings, lists, bold)
- **FR-JB-004.2**: Company name and logo
- **FR-JB-004.3**: Location with map
- **FR-JB-004.4**: Job type, contract duration, and work arrangement
- **FR-JB-004.5**: Salary/rate range
- **FR-JB-004.6**: Required skills displayed as tags
- **FR-JB-004.7**: Experience level required
- **FR-JB-004.8**: Posted date and expiry date
- **FR-JB-004.9**: "Apply Now" button (requires login)
- **FR-JB-004.10**: "Save Job" / bookmark button
- **FR-JB-004.11**: Share job via link, email, LinkedIn, Twitter
- **FR-JB-004.12**: "Similar Jobs" section at bottom
- **FR-JB-004.13**: "Report this job" option
- **FR-JB-004.14**: Breadcrumb navigation back to search results

#### FR-JB-005: Job Alerts
- **FR-JB-005.1**: Candidates can create job alerts based on search criteria
- **FR-JB-005.2**: Configure alert frequency (daily, weekly, immediate)
- **FR-JB-005.3**: Email notifications with matching jobs
- **FR-JB-005.4**: Manage and delete job alerts from profile
- **FR-JB-005.5**: One-click unsubscribe from alert emails
- **FR-JB-005.6**: Maximum 10 active alerts per user

---

### 3.4 Candidate Portal

#### FR-CP-001: Candidate Dashboard
- **FR-CP-001.1**: Overview of application statistics (total, pending, reviewed, shortlisted, rejected)
- **FR-CP-001.2**: Recent application activity feed
- **FR-CP-001.3**: Recommended jobs based on profile and skills
- **FR-CP-001.4**: Saved/bookmarked jobs list
- **FR-CP-001.5**: Upcoming interview schedule
- **FR-CP-001.6**: Unread messages/notifications count
- **FR-CP-001.7**: Profile completeness indicator with suggestions
- **FR-CP-001.8**: Active contract status (if currently placed)

#### FR-CP-002: Candidate Profile
- **FR-CP-002.1**: Personal information (name, email, phone, location, LinkedIn URL)
- **FR-CP-002.2**: Professional summary / bio
- **FR-CP-002.3**: Skills and technologies (searchable multi-select with proficiency levels)
- **FR-CP-002.4**: Work experience history (title, company, dates, description)
- **FR-CP-002.5**: Education history (degree, institution, year)
- **FR-CP-002.6**: Certifications (name, issuer, date, expiry)
- **FR-CP-002.7**: Resume upload (PDF, DOCX — max 5MB)
- **FR-CP-002.8**: Multiple resume versions support
- **FR-CP-002.9**: Portfolio/work samples URLs
- **FR-CP-002.10**: Availability status (Available, Open to opportunities, Not available)
- **FR-CP-002.11**: Desired job type (Contract, Direct Hire, Both)
- **FR-CP-002.12**: Desired salary/rate range
- **FR-CP-002.13**: Preferred work arrangement (Remote, Hybrid, Onsite)
- **FR-CP-002.14**: Preferred locations
- **FR-CP-002.15**: Security clearance level (if applicable)
- **FR-CP-002.16**: Work authorization status
- **FR-CP-002.17**: References (name, title, company, contact — visible to recruiter only)

#### FR-CP-003: Job Application
- **FR-CP-003.1**: One-click apply with existing profile and resume
- **FR-CP-003.2**: Optional cover letter (text field or file upload)
- **FR-CP-003.3**: Select which resume version to submit
- **FR-CP-003.4**: Application confirmation page and email
- **FR-CP-003.5**: Prevent duplicate applications to same job
- **FR-CP-003.6**: Withdraw application option

#### FR-CP-004: Application Tracking
- **FR-CP-004.1**: List all submitted applications with status
- **FR-CP-004.2**: Application status pipeline: Submitted → Reviewed → Shortlisted → Interview → Offered → Placed / Rejected
- **FR-CP-004.3**: Status change notifications (email and in-app)
- **FR-CP-004.4**: View application details and submitted materials
- **FR-CP-004.5**: Filter applications by status
- **FR-CP-004.6**: Sort applications by date

#### FR-CP-005: Candidate Benefits (Contractor Care)
- **FR-CP-005.1**: View available health and dental benefits plans
- **FR-CP-005.2**: Enroll in group benefits program
- **FR-CP-005.3**: View liability and errors & omissions insurance details
- **FR-CP-005.4**: Access wellness program resources
- **FR-CP-005.5**: View and RSVP to networking events (tech summits, meetups)
- **FR-CP-005.6**: Dedicated point of contact information

#### FR-CP-006: Messaging
- **FR-CP-006.1**: In-app messaging with assigned recruiter
- **FR-CP-006.2**: Message notifications (email and in-app)
- **FR-CP-006.3**: File attachment support in messages
- **FR-CP-006.4**: Message history and search

---

### 3.5 Employer Portal

#### FR-EP-001: Employer Dashboard
- **FR-EP-001.1**: Overview of active job postings with application counts
- **FR-EP-001.2**: Recent applications feed
- **FR-EP-001.3**: Hiring pipeline visualization (stages and counts)
- **FR-EP-001.4**: Active contractors currently on assignment
- **FR-EP-001.5**: Upcoming interviews schedule
- **FR-EP-001.6**: Unread messages/notifications count
- **FR-EP-001.7**: Key metrics (time-to-fill, applications per job, fill rate)

#### FR-EP-002: Company Profile
- **FR-EP-002.1**: Company name, logo, and description
- **FR-EP-002.2**: Industry sector and company size
- **FR-EP-002.3**: Office locations
- **FR-EP-002.4**: Company website and social media links
- **FR-EP-002.5**: Company culture and benefits description
- **FR-EP-002.6**: Public employer brand page (visible to candidates)

#### FR-EP-003: Job Posting
- **FR-EP-003.1**: Create new job posting with rich text editor
- **FR-EP-003.2**: Required fields: title, description, location, job type, category
- **FR-EP-003.3**: Optional fields: salary/rate range, skills, experience level, duration, work arrangement
- **FR-EP-003.4**: Job posting templates (save and reuse)
- **FR-EP-003.5**: Preview job before publishing
- **FR-EP-003.6**: Schedule future publish date
- **FR-EP-003.7**: Set job expiry date (default 30 days)
- **FR-EP-003.8**: Edit published job posting
- **FR-EP-003.9**: Duplicate existing job posting
- **FR-EP-003.10**: Close/deactivate job posting
- **FR-EP-003.11**: Reopen expired job posting
- **FR-EP-003.12**: Premium/featured job posting option (higher visibility)
- **FR-EP-003.13**: Internal notes field (not visible to candidates)

#### FR-EP-004: Candidate Review & Management
- **FR-EP-004.1**: View all applicants for a job posting
- **FR-EP-004.2**: View candidate profile, resume, and cover letter
- **FR-EP-004.3**: Rate/score candidates (1-5 stars or custom rubric)
- **FR-EP-004.4**: Add private notes on candidates
- **FR-EP-004.5**: Move candidates through pipeline stages (Reviewed, Shortlisted, Interview, Offer, Reject)
- **FR-EP-004.6**: Bulk actions (reject multiple, shortlist multiple)
- **FR-EP-004.7**: Compare candidates side-by-side
- **FR-EP-004.8**: Download candidate resume
- **FR-EP-004.9**: Rejection email templates (customizable)
- **FR-EP-004.10**: Candidate search within applicant pool

#### FR-EP-005: Interview Management
- **FR-EP-005.1**: Schedule interviews with candidates
- **FR-EP-005.2**: Calendar integration (Google Calendar, Outlook)
- **FR-EP-005.3**: Interview confirmation and reminder emails
- **FR-EP-005.4**: Interviewer assignment and feedback collection
- **FR-EP-005.5**: Interview scorecard templates
- **FR-EP-005.6**: Reschedule and cancel with notifications

#### FR-EP-006: Offer Management
- **FR-EP-006.1**: Generate offer letter from templates
- **FR-EP-006.2**: Auto-populate candidate and job details
- **FR-EP-006.3**: Digital signature on offer acceptance
- **FR-EP-006.4**: Offer status tracking (sent, viewed, accepted, declined, expired)
- **FR-EP-006.5**: Counter-offer workflow
- **FR-EP-006.6**: Offer expiry date configuration

#### FR-EP-007: Contractor Management
- **FR-EP-007.1**: View active contractors on assignment
- **FR-EP-007.2**: Contract details (start date, end date, rate, terms)
- **FR-EP-007.3**: Timesheet approval workflow
- **FR-EP-007.4**: Contractor performance feedback
- **FR-EP-007.5**: Contract extension/renewal requests
- **FR-EP-007.6**: Contract termination with notice period

---

### 3.6 Matching System (MatchGuide)

#### FR-MS-001: Automated Matching
- **FR-MS-001.1**: Match candidates to jobs based on skills overlap percentage
- **FR-MS-001.2**: Match based on experience level requirements
- **FR-MS-001.3**: Match based on location and work arrangement preferences
- **FR-MS-001.4**: Match based on salary/rate expectations
- **FR-MS-001.5**: Match based on availability and desired job type
- **FR-MS-001.6**: Generate match score (0-100%) with breakdown
- **FR-MS-001.7**: Display match reasons ("Strong skill match", "Location match", etc.)

#### FR-MS-002: Resume Parsing
- **FR-MS-002.1**: Extract structured data from uploaded resumes (PDF/DOCX)
- **FR-MS-002.2**: Auto-populate candidate profile from parsed resume
- **FR-MS-002.3**: Extract skills, experience, education, and certifications
- **FR-MS-002.4**: Support multiple resume formats and layouts
- **FR-MS-002.5**: Allow candidate to review and edit parsed data

#### FR-MS-003: Job Recommendations
- **FR-MS-003.1**: Recommend jobs to candidates based on profile match
- **FR-MS-003.2**: "Jobs you might like" section on candidate dashboard
- **FR-MS-003.3**: Weekly email digest of recommended jobs
- **FR-MS-003.4**: Candidate feedback on recommendations (relevant / not relevant)
- **FR-MS-003.5**: Improve recommendations based on feedback and application history

#### FR-MS-004: Candidate Recommendations (for Employers)
- **FR-MS-004.1**: Suggest top matching candidates for each job posting
- **FR-MS-004.2**: Rank candidates by match score
- **FR-MS-004.3**: Filter recommended candidates by availability
- **FR-MS-004.4**: Recruiter can override or adjust match results

---

### 3.7 Contractor Payroll (Flo-Thru)

#### FR-FT-001: Timesheet Management
- **FR-FT-001.1**: Contractor submits weekly timesheets
- **FR-FT-001.2**: Time entry by day with project/task allocation
- **FR-FT-001.3**: Regular hours, overtime hours, and expenses tracking
- **FR-FT-001.4**: Timesheet status: Draft → Submitted → Approved → Paid
- **FR-FT-001.5**: Manager/employer approves or rejects timesheets
- **FR-FT-001.6**: Rejection with comments for correction
- **FR-FT-001.7**: Timesheet reminders (auto-email if not submitted by deadline)
- **FR-FT-001.8**: Timesheet history and export

#### FR-FT-002: Payroll Processing
- **FR-FT-002.1**: Calculate gross pay from approved timesheets
- **FR-FT-002.2**: Apply tax deductions (federal, provincial/state)
- **FR-FT-002.3**: Apply benefit deductions
- **FR-FT-002.4**: Calculate net pay
- **FR-FT-002.5**: Process direct deposit payments
- **FR-FT-002.6**: Generate pay stubs (viewable and downloadable as PDF)
- **FR-FT-002.7**: On-time payment guarantee
- **FR-FT-002.8**: Pay period configuration (weekly, bi-weekly, semi-monthly)

#### FR-FT-003: Invoicing
- **FR-FT-003.1**: Auto-generate invoices for employers based on contractor hours
- **FR-FT-003.2**: Apply markup/margin to contractor rates
- **FR-FT-003.3**: Invoice line items with detailed breakdown
- **FR-FT-003.4**: Tax calculation (GST/HST, PST, sales tax)
- **FR-FT-003.5**: Invoice numbering and tracking
- **FR-FT-003.6**: Invoice status: Draft → Sent → Viewed → Paid → Overdue
- **FR-FT-003.7**: Invoice delivery via email (PDF attachment)
- **FR-FT-003.8**: Payment terms configuration (Net 15, Net 30, Net 45)
- **FR-FT-003.9**: Overdue invoice reminders
- **FR-FT-003.10**: Credit notes and adjustments

#### FR-FT-004: Tax & Compliance
- **FR-FT-004.1**: Year-end tax document generation (T4/T4A for Canada, W-2/1099 for US)
- **FR-FT-004.2**: Tax withholding calculation by jurisdiction
- **FR-FT-004.3**: CPP/EI contributions (Canada) or Social Security/Medicare (US)
- **FR-FT-004.4**: Workers' compensation compliance
- **FR-FT-004.5**: Contractor vs employee classification guidance
- **FR-FT-004.6**: Audit trail for all financial transactions

---

### 3.8 Professional Services SOW

#### FR-SOW-001: Statement of Work Management
- **FR-SOW-001.1**: Create SOW with scope, deliverables, timeline, and budget
- **FR-SOW-001.2**: SOW templates for common engagement types
- **FR-SOW-001.3**: SOW version control and change tracking
- **FR-SOW-001.4**: Digital approval workflow (client and vendor signatures)
- **FR-SOW-001.5**: Milestone tracking with status updates
- **FR-SOW-001.6**: Resource allocation to SOW projects
- **FR-SOW-001.7**: Budget tracking and burn rate monitoring
- **FR-SOW-001.8**: SOW completion and closure process

---

### 3.9 Managed Service Provider (MSP) Program

#### FR-MSP-001: MSP Client Portal
- **FR-MSP-001.1**: Client onboarding wizard for MSP program setup
- **FR-MSP-001.2**: MSP dashboard with real-time workforce analytics
- **FR-MSP-001.3**: Vendor management and supplier scorecards
- **FR-MSP-001.4**: Contingent workforce headcount tracking
- **FR-MSP-001.5**: Rate card management by role, level, and geography
- **FR-MSP-001.6**: Compliance tracking (insurance, background checks, certifications)
- **FR-MSP-001.7**: Spend analytics and budget tracking
- **FR-MSP-001.8**: SLA performance monitoring and reporting

#### FR-MSP-002: Vendor Management System (VMS) Integration
- **FR-MSP-002.1**: Multi-vendor requisition distribution
- **FR-MSP-002.2**: Vendor ranking and performance scoring
- **FR-MSP-002.3**: Automated candidate submission workflows
- **FR-MSP-002.4**: Consolidated invoicing across vendors
- **FR-MSP-002.5**: Vendor compliance and insurance verification
- **FR-MSP-002.6**: Diversity supplier tracking and reporting
- **FR-MSP-002.7**: Integration with third-party VMS platforms (Fieldglass, Beeline)

#### FR-MSP-003: Workforce Analytics (MSP)
- **FR-MSP-003.1**: Total contingent workforce spend dashboard
- **FR-MSP-003.2**: Time-to-fill and fill rate by vendor
- **FR-MSP-003.3**: Worker tenure and turnover analytics
- **FR-MSP-003.4**: Market rate benchmarking by role and location
- **FR-MSP-003.5**: Diversity and inclusion workforce metrics
- **FR-MSP-003.6**: Predictive demand forecasting
- **FR-MSP-003.7**: Executive summary reports (PDF export)

---

### 3.10 IT & Business Consulting Services

#### FR-CS-001: Consulting Engagement Management
- **FR-CS-001.1**: Consulting engagement intake form (client needs assessment)
- **FR-CS-001.2**: Proposal generation with scope, deliverables, timeline, and pricing
- **FR-CS-001.3**: Engagement types: advisory, implementation, managed service, assessment
- **FR-CS-001.4**: Project lifecycle management (initiate → plan → execute → close)
- **FR-CS-001.5**: Resource allocation and team assembly from consultant pool
- **FR-CS-001.6**: Client collaboration portal with document sharing
- **FR-CS-001.7**: Progress tracking with milestone status updates
- **FR-CS-001.8**: Client satisfaction surveys and NPS tracking

#### FR-CS-002: Service Catalog
- **FR-CS-002.1**: Cloud Services catalog (migration assessment, architecture review, optimization)
- **FR-CS-002.2**: Data & Analytics catalog (data strategy, BI implementation, governance framework)
- **FR-CS-002.3**: AI & Automation catalog (AI readiness assessment, model development, RPA)
- **FR-CS-002.4**: Cybersecurity catalog (risk assessment, penetration testing, compliance audit, IAM)
- **FR-CS-002.5**: Application Innovation catalog (modernization, custom development, API design)
- **FR-CS-002.6**: Digital Workplace catalog (M365 migration, collaboration, endpoint management)
- **FR-CS-002.7**: Enterprise Service Management catalog (ServiceNow implementation, ITSM maturity)
- **FR-CS-002.8**: Each service includes scope templates, deliverable checklists, and pricing models

#### FR-CS-003: Technology Partnerships
- **FR-CS-003.1**: Partner directory page (AWS, Azure, GCP, Snowflake, ServiceNow, Salesforce, Red Hat)
- **FR-CS-003.2**: Partner certification badges and competency levels
- **FR-CS-003.3**: Partner-specific solution pages with case studies
- **FR-CS-003.4**: Joint go-to-market collateral and co-branded assets
- **FR-CS-003.5**: Partner referral tracking and revenue attribution

---

### 3.11 Workforce Development

#### FR-WD-001: Training & Upskilling Portal
- **FR-WD-001.1**: Course catalog with 500+ instructor-led and self-paced courses
- **FR-WD-001.2**: Course categories: cloud, cybersecurity, data, AI/ML, agile, leadership
- **FR-WD-001.3**: Course enrollment and registration
- **FR-WD-001.4**: Progress tracking and completion certificates
- **FR-WD-001.5**: Certification exam preparation resources
- **FR-WD-001.6**: Skill gap analysis tool (compare current skills to target role)
- **FR-WD-001.7**: Learning paths by role (e.g., "Cloud Engineer Path", "Data Analyst Path")
- **FR-WD-001.8**: Employer-sponsored training programs

#### FR-WD-002: Rising Talent Programs
- **FR-WD-002.1**: Student and co-op program registration
- **FR-WD-002.2**: New graduate program with mentorship matching
- **FR-WD-002.3**: Veteran/military transition program with skills mapping
- **FR-WD-002.4**: Career changers bootcamp program
- **FR-WD-002.5**: Program application, screening, and acceptance workflow
- **FR-WD-002.6**: Mentor-mentee matching and communication
- **FR-WD-002.7**: Program progress tracking and graduation

#### FR-WD-003: Diversity, Equity & Inclusion
- **FR-WD-003.1**: Diversity workforce dashboard (demographics, representation metrics)
- **FR-WD-003.2**: Inclusive hiring assessment tools
- **FR-WD-003.3**: DEI goal setting and progress tracking for employers
- **FR-WD-003.4**: Diverse supplier and vendor identification
- **FR-WD-003.5**: Community partnerships and sponsorship tracking
- **FR-WD-003.6**: Accessibility compliance reporting

---

### 3.12 Curated Teams (PODs)

#### FR-POD-001: POD Management
- **FR-POD-001.1**: Define POD composition (roles, skills, team size)
- **FR-POD-001.2**: Assemble POD from available contractor pool
- **FR-POD-001.3**: POD proposal with team bios and qualifications
- **FR-POD-001.4**: POD engagement terms and pricing
- **FR-POD-001.5**: POD performance tracking and client feedback
- **FR-POD-001.6**: Resource swap within POD (replace team member)
- **FR-POD-001.7**: POD scale-up/scale-down within 5-7 business days

---

### 3.13 Internal Recruiter ATS (Applicant Tracking System)

#### FR-ATS-001: Candidate Database (CRM)
- **FR-ATS-001.1**: Searchable database of all registered candidates
- **FR-ATS-001.2**: Advanced search by skills, experience, location, availability
- **FR-ATS-001.3**: Candidate tags and categories
- **FR-ATS-001.4**: Candidate communication history
- **FR-ATS-001.5**: Recruiter notes and internal ratings
- **FR-ATS-001.6**: Candidate source tracking (referral, job board, LinkedIn, etc.)
- **FR-ATS-001.7**: Candidate status management (active, placed, inactive, blacklisted)
- **FR-ATS-001.8**: Bulk email campaigns to candidate segments

#### FR-ATS-002: Job Order Management
- **FR-ATS-002.1**: Create and manage job orders from employer requests
- **FR-ATS-002.2**: Assign recruiters to job orders
- **FR-ATS-002.3**: Track submissions per job order
- **FR-ATS-002.4**: Job order priority and deadline tracking
- **FR-ATS-002.5**: Client feedback on submitted candidates
- **FR-ATS-002.6**: Job order lifecycle: Open → In Progress → Filled → Closed

#### FR-ATS-003: Placement Management
- **FR-ATS-003.1**: Record placement details (candidate, employer, role, dates, rate)
- **FR-ATS-003.2**: Contract generation from placement
- **FR-ATS-003.3**: Onboarding checklist and document collection
- **FR-ATS-003.4**: Placement revenue and margin tracking
- **FR-ATS-003.5**: Placement history and reporting
- **FR-ATS-003.6**: Extension and renewal management

#### FR-ATS-004: Reference Checking
- **FR-ATS-004.1**: Request references from candidates
- **FR-ATS-004.2**: Reference check questionnaire templates
- **FR-ATS-004.3**: Reference response tracking
- **FR-ATS-004.4**: Reference check completion status

---

### 3.14 Admin Panel

#### FR-AP-001: User Management
- **FR-AP-001.1**: View, search, and filter all platform users
- **FR-AP-001.2**: Edit user profiles and roles
- **FR-AP-001.3**: Activate/deactivate user accounts
- **FR-AP-001.4**: Impersonate user (for debugging/support)
- **FR-AP-001.5**: Bulk user actions (email, deactivate)
- **FR-AP-001.6**: User activity audit log

#### FR-AP-002: Job Management
- **FR-AP-002.1**: View and moderate all job postings
- **FR-AP-002.2**: Approve or reject pending job postings
- **FR-AP-002.3**: Remove inappropriate job postings
- **FR-AP-002.4**: Feature/promote job postings
- **FR-AP-002.5**: Job posting analytics (views, applications, fill rate)

#### FR-AP-003: Platform Analytics Dashboard
- **FR-AP-003.1**: Total users by role (candidates, employers, recruiters)
- **FR-AP-003.2**: New registrations trend (daily, weekly, monthly)
- **FR-AP-003.3**: Active job postings count and trend
- **FR-AP-003.4**: Applications submitted trend
- **FR-AP-003.5**: Placements made and revenue generated
- **FR-AP-003.6**: Time-to-fill metrics by category and sector
- **FR-AP-003.7**: Top skills in demand
- **FR-AP-003.8**: Geographic distribution of jobs and candidates
- **FR-AP-003.9**: Conversion funnel (visitor → register → apply → placed)
- **FR-AP-003.10**: Exportable reports (CSV, PDF)

#### FR-AP-004: Content Management
- **FR-AP-004.1**: Manage blog posts (create, edit, publish, archive)
- **FR-AP-004.2**: Manage case studies
- **FR-AP-004.3**: Manage FAQ entries
- **FR-AP-004.4**: Manage email templates
- **FR-AP-004.5**: Manage static page content

#### FR-AP-005: System Configuration
- **FR-AP-005.1**: Manage job categories and skills taxonomy
- **FR-AP-005.2**: Manage industry sectors
- **FR-AP-005.3**: Configure email notification templates
- **FR-AP-005.4**: Configure payment and billing settings
- **FR-AP-005.5**: Feature flags for enabling/disabling features
- **FR-AP-005.6**: System health monitoring dashboard

---

### 3.15 Notifications & Communication

#### FR-NC-001: Email Notifications
- **FR-NC-001.1**: Welcome email on registration
- **FR-NC-001.2**: Email verification
- **FR-NC-001.3**: Password reset email
- **FR-NC-001.4**: New job application received (to employer)
- **FR-NC-001.5**: Application status change (to candidate)
- **FR-NC-001.6**: Interview invitation (to candidate)
- **FR-NC-001.7**: Offer letter delivery
- **FR-NC-001.8**: Timesheet reminder (to contractor)
- **FR-NC-001.9**: Timesheet approved/rejected (to contractor)
- **FR-NC-001.10**: Invoice delivery (to employer)
- **FR-NC-001.11**: Payment confirmation (to contractor)
- **FR-NC-001.12**: Job alert matches (to candidate)
- **FR-NC-001.13**: Job expiry warning (to employer)
- **FR-NC-001.14**: Contract expiry reminder (to both parties)
- **FR-NC-001.15**: Weekly digest of new jobs (to candidates)

#### FR-NC-002: In-App Notifications
- **FR-NC-002.1**: Notification bell icon with unread count
- **FR-NC-002.2**: Notification dropdown with recent items
- **FR-NC-002.3**: Notification types: info, success, warning, action required
- **FR-NC-002.4**: Mark as read / mark all as read
- **FR-NC-002.5**: Notification history page
- **FR-NC-002.6**: Click notification to navigate to relevant page

#### FR-NC-003: Notification Preferences
- **FR-NC-003.1**: User can enable/disable each notification type
- **FR-NC-003.2**: Choose channel per notification (email, in-app, both, none)
- **FR-NC-003.3**: Email frequency preference (immediate, daily digest, weekly digest)
- **FR-NC-003.4**: Global unsubscribe option

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PE-001 | Page load time (initial) | < 3 seconds |
| NFR-PE-002 | Largest Contentful Paint (LCP) | < 2.5 seconds |
| NFR-PE-003 | First Input Delay (FID) | < 100 milliseconds |
| NFR-PE-004 | Cumulative Layout Shift (CLS) | < 0.1 |
| NFR-PE-005 | API response time (95th percentile) | < 500 milliseconds |
| NFR-PE-006 | Database query time (95th percentile) | < 200 milliseconds |
| NFR-PE-007 | Job search results returned | < 1 second |
| NFR-PE-008 | Resume upload processing | < 10 seconds |
| NFR-PE-009 | Concurrent users supported | 1,000+ simultaneous |
| NFR-PE-010 | Job listing page with 10,000+ jobs | Paginated without degradation |

### 4.2 Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-SC-001 | Horizontal scaling capability | Auto-scale based on load |
| NFR-SC-002 | Database connection pooling | Support 100+ concurrent connections |
| NFR-SC-003 | File storage scalability | Handle 100,000+ resume files |
| NFR-SC-004 | Email sending capacity | 10,000+ emails per day |
| NFR-SC-005 | User base growth | Support 300,000+ registered users |

### 4.3 Availability & Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AV-001 | Platform uptime | 99.9% (8.77 hours downtime/year) |
| NFR-AV-002 | Planned maintenance window | Off-peak hours with advance notice |
| NFR-AV-003 | Recovery Time Objective (RTO) | < 1 hour |
| NFR-AV-004 | Recovery Point Objective (RPO) | < 1 hour (max data loss) |
| NFR-AV-005 | Database backup frequency | Daily full, continuous incremental |
| NFR-AV-006 | Failover mechanism | Automatic with health checks |
| NFR-AV-007 | Zero-downtime deployments | Blue-green or rolling deployments |

### 4.4 Security

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-SE-001 | Data encryption in transit | TLS 1.2+ (HTTPS everywhere) |
| NFR-SE-002 | Data encryption at rest | AES-256 for sensitive data |
| NFR-SE-003 | Password hashing | bcrypt with 12+ salt rounds |
| NFR-SE-004 | OWASP Top 10 compliance | All vulnerabilities addressed |
| NFR-SE-005 | SQL injection prevention | Parameterized queries (Prisma) |
| NFR-SE-006 | XSS prevention | Output encoding, CSP headers |
| NFR-SE-007 | CSRF protection | CSRF tokens on all forms |
| NFR-SE-008 | Rate limiting | Auth endpoints: 5 req/min; API: 100 req/min |
| NFR-SE-009 | File upload security | Type validation, size limits, virus scanning |
| NFR-SE-010 | Security headers | CSP, HSTS, X-Frame-Options, X-Content-Type |
| NFR-SE-011 | Dependency scanning | Automated via CI/CD pipeline |
| NFR-SE-012 | Penetration testing | Annual third-party assessment |
| NFR-SE-013 | Audit logging | All sensitive operations logged |
| NFR-SE-014 | Session management | Secure cookies, timeout, invalidation |

### 4.5 Privacy & Compliance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PR-001 | PIPEDA compliance (Canada) | Full compliance |
| NFR-PR-002 | GDPR compliance (if EU users) | Full compliance |
| NFR-PR-003 | CCPA compliance (if California users) | Full compliance |
| NFR-PR-004 | Privacy policy | Published and accessible |
| NFR-PR-005 | Terms of service | Published and accessible |
| NFR-PR-006 | Cookie consent banner | Implemented with preference center |
| NFR-PR-007 | Data retention policy | Defined and enforced per data type |
| NFR-PR-008 | Right to erasure | Users can request data deletion |
| NFR-PR-009 | Data portability | Users can export their data |
| NFR-PR-010 | Consent management | Track and manage user consents |
| NFR-PR-011 | Data breach notification | Within 72 hours as per regulations |

### 4.6 Accessibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AC-001 | WCAG compliance level | 2.1 AA |
| NFR-AC-002 | Screen reader support | Full compatibility |
| NFR-AC-003 | Keyboard navigation | All features accessible via keyboard |
| NFR-AC-004 | Color contrast ratio | Minimum 4.5:1 for text |
| NFR-AC-005 | Alt text for images | All meaningful images |
| NFR-AC-006 | Form labels and ARIA | All inputs properly labeled |
| NFR-AC-007 | Focus indicators | Visible on all interactive elements |
| NFR-AC-008 | Reduced motion support | Respect prefers-reduced-motion |

### 4.7 Usability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-US-001 | Mobile responsiveness | Fully responsive (320px to 2560px) |
| NFR-US-002 | Browser support | Chrome, Firefox, Safari, Edge (last 2 versions) |
| NFR-US-003 | Job application completion | < 3 minutes for returning users |
| NFR-US-004 | Job posting creation | < 5 minutes |
| NFR-US-005 | Search results relevance | Top 5 results match intent > 80% |
| NFR-US-006 | System Usability Scale (SUS) | Score > 70 |
| NFR-US-007 | Error recovery | Clear error messages with corrective guidance |
| NFR-US-008 | Multi-language support | English and French (Canada) |

### 4.8 SEO

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-SEO-001 | Server-side rendering | All public pages SSR or SSG |
| NFR-SEO-002 | Meta tags | Unique title and description per page |
| NFR-SEO-003 | Structured data | JobPosting schema on all job pages |
| NFR-SEO-004 | XML sitemap | Auto-generated and submitted |
| NFR-SEO-005 | Robots.txt | Configured for proper crawling |
| NFR-SEO-006 | Canonical URLs | Set on all pages |
| NFR-SEO-007 | Google for Jobs | Full integration with JobPosting schema |
| NFR-SEO-008 | Open Graph tags | For social media sharing |
| NFR-SEO-009 | Page speed score | Lighthouse score > 90 |

### 4.9 Maintainability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-MA-001 | Code test coverage | > 80% unit, > 70% integration |
| NFR-MA-002 | Code documentation | JSDoc on all public APIs |
| NFR-MA-003 | Coding standards | ESLint + Prettier enforced |
| NFR-MA-004 | Version control | Git with branching strategy (GitFlow or trunk) |
| NFR-MA-005 | CI/CD pipeline | Automated testing, linting, and deployment |
| NFR-MA-006 | Environment parity | Dev, staging, and production consistency |
| NFR-MA-007 | Database migrations | Version-controlled with Prisma Migrate |
| NFR-MA-008 | Error monitoring | Sentry or equivalent for production errors |
| NFR-MA-009 | Logging | Structured logging with severity levels |
| NFR-MA-010 | Dependency management | Regular updates and security patches |

### 4.10 Infrastructure

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-IN-001 | Hosting platform | Vercel (Next.js) + managed database |
| NFR-IN-002 | CDN | Cloudflare or Vercel Edge Network |
| NFR-IN-003 | Database hosting | Supabase, Neon, or AWS RDS |
| NFR-IN-004 | File storage | AWS S3 or equivalent |
| NFR-IN-005 | Email service | SendGrid or Resend |
| NFR-IN-006 | Caching layer | Redis (Upstash or equivalent) |
| NFR-IN-007 | DNS management | Cloudflare |
| NFR-IN-008 | SSL certificates | Auto-managed (Let's Encrypt / Cloudflare) |
| NFR-IN-009 | Monitoring | Uptime Robot + Sentry + Vercel Analytics |

---

## 5. Technical Architecture Requirements

### 5.1 System Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-SA-001 | Architecture pattern | Modular monolith (Next.js) with microservice extraction path |
| TAR-SA-002 | Frontend architecture | React Server Components + Client Components (Next.js App Router) |
| TAR-SA-003 | Backend architecture | Next.js API Routes + Server Actions for primary API; FastAPI microservice for ML |
| TAR-SA-004 | Rendering strategy | SSR for public pages (SEO); CSR for authenticated dashboards |
| TAR-SA-005 | API gateway | Next.js middleware for routing, auth guards, and rate limiting |
| TAR-SA-006 | Background jobs | Queue-based processing (Bull/BullMQ with Redis) for emails, matching, payroll |
| TAR-SA-007 | Event-driven patterns | Webhook handlers for Stripe, SendGrid; internal event bus for notifications |
| TAR-SA-008 | Caching layers | L1: In-memory (React cache); L2: Redis (API responses, sessions); L3: CDN (static assets) |
| TAR-SA-009 | Search architecture | PostgreSQL full-text search (Phase 1); Elasticsearch migration (Phase 5) |
| TAR-SA-010 | File processing | Async pipeline: upload → validate → scan → store → parse (for resumes) |
| TAR-SA-011 | Multi-tenancy | Shared database with row-level isolation (employer/candidate data separation) |
| TAR-SA-012 | Feature modularity | Feature-based folder structure; lazy-loaded route segments |

#### System Architecture Diagram

```
                         ┌─────────────────┐
                         │   Cloudflare     │
                         │  (CDN + WAF +    │
                         │   DDoS + DNS)    │
                         └────────┬─────────┘
                                  │
                         ┌────────▼─────────┐
                         │   Vercel Edge     │
                         │   (Next.js SSR)   │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
     ┌────────▼────────┐ ┌───────▼────────┐ ┌───────▼────────┐
     │  Next.js App    │ │  Next.js API   │ │  FastAPI ML    │
     │  (React SSR/    │ │  Routes        │ │  Microservice  │
     │   CSR Pages)    │ │  (REST API)    │ │  (Python)      │
     └────────┬────────┘ └───────┬────────┘ └───────┬────────┘
              │                   │                   │
              │         ┌────────┼────────┐          │
              │         │        │        │          │
         ┌────▼────┐ ┌──▼──┐ ┌──▼──┐ ┌───▼───┐ ┌───▼───┐
         │  Redis  │ │ PostgreSQL │ │ AWS S3 │ │ ML    │
         │ (Cache/ │ │ (Primary   │ │ (File  │ │Models │
         │Sessions)│ │  Database) │ │Storage)│ │       │
         └─────────┘ └───────────┘ └────────┘ └───────┘
              │
     ┌────────▼────────┐
     │   BullMQ        │
     │   (Job Queue)   │
     │   - Emails      │
     │   - Matching    │
     │   - Reports     │
     │   - Payroll     │
     └─────────────────┘
```

### 5.2 API Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-API-001 | API style | RESTful API with JSON request/response bodies |
| TAR-API-002 | API versioning | URL-based versioning (e.g., /api/v1/jobs) |
| TAR-API-003 | Authentication | Bearer token (JWT) via NextAuth.js; API keys for external integrations |
| TAR-API-004 | Authorization | Role-based middleware on all endpoints; resource ownership checks |
| TAR-API-005 | Request validation | Zod schemas on all API inputs (body, query params, path params) |
| TAR-API-006 | Response format | Consistent JSON envelope: `{ data, error, meta }` |
| TAR-API-007 | Error handling | Structured error codes with human-readable messages; no stack traces in production |
| TAR-API-008 | Pagination | Cursor-based pagination for lists; `limit`, `cursor`, `hasMore` response fields |
| TAR-API-009 | Filtering | Query parameter-based filtering with field-specific operators |
| TAR-API-010 | Sorting | `sort` and `order` query parameters; multi-field sorting support |
| TAR-API-011 | Rate limiting | Per-endpoint and per-user rate limits; 429 status with `Retry-After` header |
| TAR-API-012 | CORS policy | Allowlist of trusted origins; credentials mode for authenticated requests |
| TAR-API-013 | API documentation | OpenAPI 3.0 spec auto-generated; Swagger UI for internal testing |
| TAR-API-014 | Webhooks (outbound) | Configurable webhook endpoints for employers (application events, status changes) |
| TAR-API-015 | Webhooks (inbound) | Signature-verified handlers for Stripe, SendGrid, and third-party VMS |
| TAR-API-016 | Idempotency | Idempotency keys on payment and mutation endpoints to prevent duplicates |
| TAR-API-017 | Batch operations | Bulk endpoints for admin operations (bulk reject, bulk email, bulk import) |
| TAR-API-018 | File upload API | Multipart form data; pre-signed URL generation for direct-to-S3 uploads |
| TAR-API-019 | Search API | Dedicated search endpoint with full-text query, faceted filters, and relevance scoring |
| TAR-API-020 | Health check | `GET /api/health` returning service status, DB connectivity, Redis connectivity, uptime |

#### Core API Endpoint Map

```
Authentication
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/logout
  POST   /api/v1/auth/forgot-password
  POST   /api/v1/auth/reset-password
  GET    /api/v1/auth/session

Users & Profiles
  GET    /api/v1/users/me
  PUT    /api/v1/users/me
  PUT    /api/v1/users/me/avatar
  GET    /api/v1/users/me/notifications
  PUT    /api/v1/users/me/preferences
  DELETE /api/v1/users/me

Jobs
  GET    /api/v1/jobs                    (list with search/filter/sort)
  GET    /api/v1/jobs/:id
  POST   /api/v1/jobs                    (employer: create)
  PUT    /api/v1/jobs/:id                (employer: update)
  DELETE /api/v1/jobs/:id                (employer: deactivate)
  GET    /api/v1/jobs/:id/applications   (employer: view applicants)
  GET    /api/v1/jobs/:id/matches        (AI matching results)

Applications
  POST   /api/v1/jobs/:id/apply          (candidate: submit)
  GET    /api/v1/applications            (candidate: my applications)
  GET    /api/v1/applications/:id
  PUT    /api/v1/applications/:id/status (employer: update status)
  DELETE /api/v1/applications/:id        (candidate: withdraw)

Candidates (Internal/Recruiter)
  GET    /api/v1/candidates              (search candidate database)
  GET    /api/v1/candidates/:id
  PUT    /api/v1/candidates/:id/tags
  POST   /api/v1/candidates/:id/notes

Contracts & Timesheets
  GET    /api/v1/contracts
  POST   /api/v1/contracts
  GET    /api/v1/contracts/:id/timesheets
  POST   /api/v1/contracts/:id/timesheets
  PUT    /api/v1/timesheets/:id/approve
  PUT    /api/v1/timesheets/:id/reject

Invoices & Payments
  GET    /api/v1/invoices
  POST   /api/v1/invoices
  GET    /api/v1/invoices/:id
  POST   /api/v1/payments/checkout
  POST   /api/v1/webhooks/stripe

Messages
  GET    /api/v1/messages
  POST   /api/v1/messages
  GET    /api/v1/messages/:conversationId

Admin
  GET    /api/v1/admin/users
  PUT    /api/v1/admin/users/:id
  GET    /api/v1/admin/analytics
  GET    /api/v1/admin/jobs
  PUT    /api/v1/admin/jobs/:id/moderate

Search & Matching
  GET    /api/v1/search/jobs
  GET    /api/v1/search/candidates
  POST   /api/v1/matching/job/:id        (trigger matching)
  GET    /api/v1/recommendations         (candidate: job recs)

File Upload
  POST   /api/v1/upload/resume
  POST   /api/v1/upload/avatar
  POST   /api/v1/upload/document
  GET    /api/v1/files/:id               (signed URL)

Health & System
  GET    /api/health
  GET    /api/v1/config/skills           (skills taxonomy)
  GET    /api/v1/config/categories       (job categories)
  GET    /api/v1/config/locations         (locations list)
```

### 5.3 Data Architecture & Governance

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-DA-001 | Primary database | PostgreSQL 16+ (relational, ACID-compliant) |
| TAR-DA-002 | ORM | Prisma ORM with type-safe client and migration management |
| TAR-DA-003 | Schema management | Version-controlled migrations via Prisma Migrate |
| TAR-DA-004 | Data modeling | Normalized schema (3NF) with strategic denormalization for read-heavy queries |
| TAR-DA-005 | Primary keys | CUID2 (collision-resistant, URL-safe, sortable) |
| TAR-DA-006 | Audit fields | `createdAt`, `updatedAt`, `deletedAt` (soft delete) on all entities |
| TAR-DA-007 | Indexing strategy | B-tree indexes on foreign keys and filter columns; GIN indexes for full-text search and array fields |
| TAR-DA-008 | Full-text search | PostgreSQL `tsvector` with weighted ranking (title > skills > description) |
| TAR-DA-009 | Connection pooling | PgBouncer or Prisma connection pool (min 5, max 100 connections) |
| TAR-DA-010 | Read replicas | Read replica for analytics queries and reporting (Phase 3+) |
| TAR-DA-011 | Data partitioning | Time-based partitioning on jobs (by postedAt) and audit_logs (by createdAt) |
| TAR-DA-012 | Backup strategy | Automated daily full backups; continuous WAL archiving for point-in-time recovery |
| TAR-DA-013 | Backup retention | 30 days of daily backups; 12 months of monthly backups |
| TAR-DA-014 | Backup testing | Monthly automated restore testing to verify backup integrity |
| TAR-DA-015 | Data encryption at rest | AES-256 encryption via database provider (Supabase/RDS) |
| TAR-DA-016 | Sensitive field encryption | Application-level encryption for SSN, SIN, bank details using libsodium |
| TAR-DA-017 | PII handling | Personally Identifiable Information tagged in schema; masked in logs and exports |
| TAR-DA-018 | Data classification | Tiers: Public, Internal, Confidential, Restricted; access controls per tier |
| TAR-DA-019 | Data lineage | Track data source, transformations, and consumers for analytics data |
| TAR-DA-020 | Data quality rules | Automated validation: email format, phone format, required fields, referential integrity |
| TAR-DA-021 | Data anonymization | Anonymization functions for GDPR erasure requests (hash PII, remove associations) |
| TAR-DA-022 | Seed data | Comprehensive seed scripts with realistic sample data for development/staging |
| TAR-DA-023 | Data export formats | CSV, JSON, PDF for user data exports and admin reports |

### 5.4 Cybersecurity Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-CS-001 | Security framework | NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover) |
| TAR-CS-002 | Zero trust model | Never trust, always verify; authenticate and authorize every request |
| TAR-CS-003 | Defense in depth | Multiple security layers: WAF → Edge → App → API → Database |
| TAR-CS-004 | Identity & Access Management | NextAuth.js with RBAC; OAuth 2.0/OIDC for SSO; MFA for admin/recruiter accounts |
| TAR-CS-005 | Multi-factor authentication | TOTP (authenticator app) or SMS-based MFA for privileged accounts |
| TAR-CS-006 | Session security | HTTP-only, Secure, SameSite=Strict cookies; 30-min idle timeout; absolute 8-hour timeout |
| TAR-CS-007 | Password policy | Min 12 chars; complexity requirements; bcrypt (12 rounds); no reuse of last 10 |
| TAR-CS-008 | API security | JWT validation; request signing for webhooks; API key rotation policy |
| TAR-CS-009 | Input validation | Server-side Zod validation on all inputs; reject unexpected fields; size limits |
| TAR-CS-010 | Output encoding | React's built-in XSS protection; DOMPurify for rich text; CSP headers |
| TAR-CS-011 | SQL injection prevention | Prisma parameterized queries exclusively; no raw SQL without sanitization |
| TAR-CS-012 | CSRF protection | SameSite cookies + CSRF tokens on state-changing requests |
| TAR-CS-013 | File upload security | Allowlisted MIME types (PDF, DOCX, PNG, JPG); max 10MB; virus scanning (ClamAV) |
| TAR-CS-014 | DDoS protection | Cloudflare WAF + rate limiting; geo-blocking for non-served regions |
| TAR-CS-015 | Bot protection | reCAPTCHA v3 on registration/login; Cloudflare Bot Management |
| TAR-CS-016 | Secrets management | Environment variables via Vercel; no secrets in code; rotation policy (90 days) |
| TAR-CS-017 | Dependency security | Automated npm audit in CI; Snyk continuous monitoring; Dependabot alerts |
| TAR-CS-018 | Container security | Docker image scanning (Trivy); minimal base images; non-root execution |
| TAR-CS-019 | Security logging | Log auth events, access control decisions, admin actions, API errors; immutable log storage |
| TAR-CS-020 | Intrusion detection | Anomaly detection on login patterns; alert on multiple failed attempts from same IP |
| TAR-CS-021 | Incident response plan | Documented runbook: detect → contain → eradicate → recover → lessons learned |
| TAR-CS-022 | Vulnerability management | SAST (SonarQube) in CI; DAST (OWASP ZAP) quarterly; annual penetration test |
| TAR-CS-023 | Data breach response | Notification within 72 hours per PIPEDA/GDPR; pre-drafted communication templates |
| TAR-CS-024 | Security certifications | SOC 2 Type II readiness (Phase 5); ISO 27001 compliance path |
| TAR-CS-025 | Compliance mapping | OWASP Top 10 checklist; CIS benchmarks for cloud infrastructure |

#### Security Headers Configuration

```
Content-Security-Policy:    default-src 'self'; script-src 'self' 'nonce-{random}';
                            style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
                            connect-src 'self' https://api.stripe.com;
                            frame-ancestors 'none';
Strict-Transport-Security:  max-age=63072000; includeSubDomains; preload
X-Content-Type-Options:     nosniff
X-Frame-Options:            DENY
X-XSS-Protection:           0 (rely on CSP instead)
Referrer-Policy:            strict-origin-when-cross-origin
Permissions-Policy:         camera=(), microphone=(), geolocation=(self), payment=(self)
```

### 5.5 Storage Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-ST-001 | Object storage provider | AWS S3 (primary) or Cloudflare R2 (cost optimization) |
| TAR-ST-002 | Storage buckets | Separate buckets: `resumes`, `avatars`, `documents`, `invoices`, `exports` |
| TAR-ST-003 | Access control | Private buckets; pre-signed URLs for time-limited access (15-min expiry) |
| TAR-ST-004 | Upload flow | Client → pre-signed URL → direct-to-S3 upload → server confirmation → DB record |
| TAR-ST-005 | File size limits | Resumes: 10MB; Avatars: 5MB; Documents: 25MB; Bulk imports: 50MB |
| TAR-ST-006 | Allowed file types | Resumes: PDF, DOCX, DOC; Avatars: PNG, JPG, WEBP; Documents: PDF, XLSX, CSV |
| TAR-ST-007 | Virus scanning | ClamAV scan on all uploads before storage; quarantine infected files |
| TAR-ST-008 | Image processing | Auto-resize avatars to 256x256; generate thumbnails; WebP conversion |
| TAR-ST-009 | Storage lifecycle | Move files older than 1 year to Infrequent Access; archive after 3 years; delete after retention |
| TAR-ST-010 | Versioning | S3 object versioning enabled for resumes (keep last 5 versions) |
| TAR-ST-011 | Replication | Cross-region replication for disaster recovery |
| TAR-ST-012 | Encryption | Server-side encryption (SSE-S3 or SSE-KMS) for all stored objects |
| TAR-ST-013 | CDN for static assets | Cloudflare CDN for public static assets (images, fonts, JS/CSS bundles) |
| TAR-ST-014 | Storage monitoring | Track total storage usage, upload/download counts, cost per bucket |
| TAR-ST-015 | Orphan cleanup | Weekly job to identify and remove files not referenced by any DB record |

### 5.6 Network & Domain Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-ND-001 | Primary domain | `jtldconsulting.com` (existing domain — currently at http://www.jtldconsulting.com/) |
| TAR-ND-002 | Subdomain structure | `www` (main site), `app` (authenticated portal), `api` (API), `admin` (admin panel), `blog` (content) |
| TAR-ND-003 | DNS provider | Cloudflare DNS with DNSSEC enabled |
| TAR-ND-004 | DNS records | A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC), CAA |
| TAR-ND-005 | SSL/TLS | TLS 1.3 (preferred), TLS 1.2 (minimum); auto-managed certificates via Cloudflare |
| TAR-ND-006 | HTTPS enforcement | Automatic HTTP → HTTPS redirect; HSTS preload |
| TAR-ND-007 | CDN configuration | Cloudflare CDN with edge caching; cache rules by content type and path |
| TAR-ND-008 | WAF rules | Cloudflare WAF with managed rulesets; custom rules for application-specific threats |
| TAR-ND-009 | DDoS mitigation | Cloudflare DDoS protection (L3/L4/L7); auto-challenge suspicious traffic |
| TAR-ND-010 | Geo-restrictions | Allow traffic from: Canada, USA, UK, EU; block high-risk regions |
| TAR-ND-011 | Load balancing | Vercel Edge Network automatic load balancing; health check endpoints |
| TAR-ND-012 | Email DNS | SPF record, DKIM signing (2048-bit), DMARC policy (p=quarantine → reject) |
| TAR-ND-013 | Reverse DNS | PTR records configured for email sending IP addresses |
| TAR-ND-014 | Network monitoring | Cloudflare analytics; latency tracking by region; uptime monitoring |
| TAR-ND-015 | IPv6 support | Dual-stack (IPv4 + IPv6) via Cloudflare |

#### Domain & Subdomain Map

```
jtldconsulting.com
├── www.jtldconsulting.com        → Main marketing site (Vercel)
├── app.jtldconsulting.com        → Authenticated portal (Vercel)
├── api.jtldconsulting.com        → REST API endpoints (Vercel/AWS)
├── admin.jtldconsulting.com      → Admin panel (Vercel, IP-restricted)
├── blog.jtldconsulting.com       → Blog/resources (Vercel or CMS)
├── ml.jtldconsulting.com         → ML microservice (AWS/Railway)
├── status.jtldconsulting.com     → Public status page (Statuspage.io)
└── mail.jtldconsulting.com       → Email sending (SendGrid/Resend)

DNS Records:
  A       jtldconsulting.com         → Vercel IP
  CNAME   www                        → cname.vercel-dns.com
  CNAME   app                        → cname.vercel-dns.com
  MX      jtldconsulting.com         → SendGrid/Google Workspace
  TXT     jtldconsulting.com         → "v=spf1 include:sendgrid.net ~all"
  TXT     _dmarc.jtldconsulting.com  → "v=DMARC1; p=quarantine; rua=mailto:..."
  TXT     selector._domainkey        → DKIM public key
  CAA     jtldconsulting.com         → letsencrypt.org, cloudflare
```

### 5.7 Caching Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-CA-001 | Cache provider | Redis (Upstash for serverless) |
| TAR-CA-002 | Session storage | Redis-backed sessions via NextAuth.js; 30-min TTL |
| TAR-CA-003 | API response cache | Cache frequently accessed data: job listings (60s), skills taxonomy (1hr), config (1hr) |
| TAR-CA-004 | Search result cache | Cache search queries with identical params (30s TTL; invalidate on new job post) |
| TAR-CA-005 | User profile cache | Cache authenticated user profile data (5-min TTL; invalidate on update) |
| TAR-CA-006 | Rate limiting store | Redis-based sliding window rate limiter per IP and per user |
| TAR-CA-007 | Queue backend | BullMQ job queues backed by Redis for async processing |
| TAR-CA-008 | Cache invalidation | Event-driven invalidation (e.g., job created → clear job list cache) |
| TAR-CA-009 | CDN caching | Static assets: 1 year cache with content-hash filenames; HTML: no-cache with revalidation |
| TAR-CA-010 | Cache monitoring | Track hit/miss ratios, memory usage, eviction rates |

### 5.8 Monitoring, Logging & Observability

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-MO-001 | Error tracking | Sentry for unhandled exceptions, API errors, and client-side errors |
| TAR-MO-002 | Application logging | Structured JSON logs with severity levels (debug, info, warn, error, fatal) |
| TAR-MO-003 | Log fields | timestamp, level, message, requestId, userId, endpoint, duration, statusCode |
| TAR-MO-004 | Log storage | Vercel Logs (short-term); forwarded to Datadog/Logflare (long-term) |
| TAR-MO-005 | Uptime monitoring | Uptime Robot: 1-min checks on all endpoints; alert via email + Slack |
| TAR-MO-006 | APM (Application Performance) | Vercel Analytics + Sentry Performance for response time, throughput, error rate |
| TAR-MO-007 | Database monitoring | Query performance tracking; slow query alerts (> 500ms); connection pool metrics |
| TAR-MO-008 | Infrastructure alerts | CPU, memory, disk alerts on ML microservice; Redis memory alerts |
| TAR-MO-009 | Business metrics | Custom dashboards: daily registrations, applications, placements, revenue |
| TAR-MO-010 | Health check endpoints | `/api/health` returning: app status, DB latency, Redis status, queue depth |
| TAR-MO-011 | Distributed tracing | Request ID propagation across services; trace waterfall visualization |
| TAR-MO-012 | Status page | Public status page showing real-time service status and incident history |
| TAR-MO-013 | Alerting escalation | L1: Slack notification; L2: Email to on-call; L3: PagerDuty phone alert |
| TAR-MO-014 | SLO tracking | Track: 99.9% uptime, < 500ms p95 API response, < 1% error rate |

### 5.9 DevOps & CI/CD Architecture

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-DO-001 | Version control | Git (GitHub) with branch protection on main |
| TAR-DO-002 | Branch strategy | Trunk-based: `main` (production), `develop` (staging), feature branches |
| TAR-DO-003 | CI pipeline | GitHub Actions: lint → type-check → unit test → integration test → build |
| TAR-DO-004 | CD pipeline | Vercel auto-deploy: push to main → production; push to develop → staging |
| TAR-DO-005 | Preview deployments | Automatic preview URL per pull request via Vercel |
| TAR-DO-006 | Database migrations | Automated migration run on deploy; rollback scripts for each migration |
| TAR-DO-007 | Environment management | Separate configs: development (.env.local), staging, production |
| TAR-DO-008 | Secret management | Vercel encrypted environment variables; no secrets in repository |
| TAR-DO-009 | Docker containers | ML microservice containerized; multi-stage builds; image scanning |
| TAR-DO-010 | Infrastructure as Code | Terraform for AWS resources (S3, RDS, ElastiCache); version-controlled |
| TAR-DO-011 | Rollback strategy | Vercel instant rollback to previous deployment; DB migration rollback scripts |
| TAR-DO-012 | Release tagging | Semantic versioning (v1.2.3); GitHub releases with changelogs |
| TAR-DO-013 | Code quality gates | ESLint (0 errors); TypeScript strict mode; test coverage threshold (80%) |
| TAR-DO-014 | Security scanning | npm audit + Snyk in CI; fail build on critical/high vulnerabilities |

### 5.10 Disaster Recovery & Business Continuity

| ID | Requirement | Specification |
|----|-------------|---------------|
| TAR-DR-001 | Recovery Time Objective (RTO) | < 1 hour for full platform recovery |
| TAR-DR-002 | Recovery Point Objective (RPO) | < 1 hour maximum data loss |
| TAR-DR-003 | Database recovery | Point-in-time recovery via WAL archiving; tested monthly |
| TAR-DR-004 | File storage recovery | S3 cross-region replication; versioning for accidental deletions |
| TAR-DR-005 | Multi-region failover | DNS-based failover to secondary region if primary goes down |
| TAR-DR-006 | Runbook documentation | Step-by-step recovery procedures for each component |
| TAR-DR-007 | DR testing | Quarterly disaster recovery drills with documented results |
| TAR-DR-008 | Data export | Full platform data export capability for portability |
| TAR-DR-009 | Vendor lock-in mitigation | Abstraction layers for storage, email, and payment providers |

---

## 6. System Integrations

### 6.1 Required Integrations

| Integration | Purpose | Phase |
|-------------|---------|-------|
| **PostgreSQL** | Primary database | Phase 1 |
| **NextAuth.js** | Authentication (email, Google, LinkedIn) | Phase 1 |
| **SendGrid / Resend** | Transactional email delivery | Phase 2 |
| **AWS S3 / Cloudflare R2** | Resume and document storage | Phase 2 |
| **Redis (Upstash)** | Caching, sessions, rate limiting | Phase 2 |
| **Stripe** | Payment processing | Phase 4 |
| **Stripe Connect** | Contractor payouts | Phase 4 |
| **Google Analytics 4** | User analytics and tracking | Phase 3 |
| **Sentry** | Error tracking and monitoring | Phase 2 |
| **Google Maps API** | Location search and office maps | Phase 2 |
| **Google for Jobs** | JobPosting structured data indexing | Phase 3 |

### 6.2 Optional / Future Integrations

| Integration | Purpose | Phase |
|-------------|---------|-------|
| **OpenAI API** | AI matching, resume parsing, chatbot | Phase 3 |
| **LinkedIn API** | Profile import, job sharing | Phase 3 |
| **Indeed API** | Job board syndication | Phase 3+ |
| **Google Calendar** | Interview scheduling | Phase 3 |
| **Microsoft Teams / Zoom** | Video interview integration | Phase 5 |
| **QuickBooks / Xero** | Accounting integration | Phase 4 |
| **Twilio** | SMS notifications | Phase 3+ |
| **DocuSign** | Electronic signatures for contracts | Phase 4 |
| **Slack** | Internal team notifications | Phase 3 |
| **Fieldglass / Beeline** | VMS platform integration for MSP clients | Phase 5 |
| **ServiceNow API** | ITSM and enterprise service management | Phase 5 |
| **Salesforce API** | CRM integration for sales pipeline | Phase 5 |
| **LMS (Learning Management)** | Training course delivery integration | Phase 5 |
| **Background Check API** | Sterling, Certn — pre-employment screening | Phase 4 |
| **E-Verify / WorkPermit API** | Work authorization verification | Phase 4 |

---

## 7. Data Requirements

### 7.1 Core Data Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **User** | All platform users | id, email, passwordHash, role, firstName, lastName, phone, avatar, status, createdAt |
| **CandidateProfile** | Extended candidate info | userId, summary, skills[], experience[], education[], certifications[], resumeUrl, availability, desiredRate, workArrangement |
| **EmployerProfile** | Company information | userId, companyName, logo, description, industry, size, website, locations[] |
| **Job** | Job posting | id, employerId, title, description, category, location, jobType, salary, skills[], experienceLevel, workArrangement, isActive, postedAt, expiresAt |
| **Application** | Job application | id, jobId, candidateId, status, coverLetter, resumeUrl, matchScore, appliedAt |
| **Contract** | Active placement | id, candidateId, employerId, jobId, startDate, endDate, rate, status |
| **Timesheet** | Weekly hours | id, contractId, weekStarting, hours, overtimeHours, status, approvedBy |
| **Invoice** | Billing | id, employerId, contractId, amount, tax, total, status, dueDate |
| **Payment** | Financial transaction | id, invoiceId, stripeId, amount, status, paidAt |
| **Message** | In-app messaging | id, senderId, receiverId, content, readAt, createdAt |
| **Notification** | User notifications | id, userId, type, title, message, isRead, link, createdAt |
| **JobAlert** | Saved search alerts | id, candidateId, searchCriteria, frequency, isActive |
| **BlogPost** | Resource content | id, title, slug, content, category, author, publishedAt |
| **CaseStudy** | Success stories | id, title, slug, content, sector, publishedAt |
| **ConsultingEngagement** | Consulting project | id, clientId, type, scope, deliverables, status, budget, startDate, endDate |
| **MSPProgram** | MSP client program | id, employerId, vendorList[], rateCards[], spendBudget, slaTargets, status |
| **Vendor** | Staffing vendor (MSP) | id, name, contactEmail, rating, complianceStatus, diversityStatus |
| **TrainingCourse** | Learning catalog | id, title, category, format, duration, instructor, certificationId |
| **Enrollment** | Course enrollment | id, candidateId, courseId, status, completedAt, certificateUrl |
| **SkillGapAnalysis** | Skills assessment | id, candidateId, targetRole, currentSkills[], requiredSkills[], gapScore |
| **AuditLog** | System audit trail | id, userId, action, resource, resourceId, ipAddress, userAgent, createdAt |
| **BackgroundCheck** | Pre-employment screen | id, candidateId, provider, status, completedAt, result |

### 7.2 Data Retention Policy

| Data Type | Retention Period | After Expiry |
|-----------|-----------------|-------------|
| Active user data | While account active | N/A |
| Inactive user data | 2 years after last login | Anonymize or delete |
| Job postings (expired) | 1 year after expiry | Archive |
| Applications | 2 years after decision | Anonymize |
| Financial records | 7 years (tax compliance) | Archive |
| Audit logs | 3 years | Delete |
| Session data | 30 days | Auto-delete |
| Email logs | 1 year | Delete |

---

## 8. Phased Delivery Plan

### Phase 1: Foundation (MVP)
**Goal**: Core job board with authentication and basic profiles

| Feature | Requirements Covered |
|---------|---------------------|
| Home page | FR-PW-001 |
| User registration and login | FR-AU-001, FR-AU-002, FR-AU-003 |
| Candidate profile | FR-CP-002 (basic fields) |
| Employer profile | FR-EP-002 (basic fields) |
| Job posting (create, edit, close) | FR-EP-003 |
| Job listing with search and filters | FR-JB-001, FR-JB-002, FR-JB-003 |
| Job detail page | FR-JB-004 |
| Job application submission | FR-CP-003 |
| Application tracking (basic) | FR-CP-004 |
| RBAC (candidate, employer, admin) | FR-AU-005 |

### Phase 2: Growth
**Goal**: Full portals, notifications, and security hardening

| Feature | Requirements Covered |
|---------|---------------------|
| Candidate dashboard | FR-CP-001 |
| Employer dashboard | FR-EP-001 |
| Email notifications | FR-NC-001 |
| In-app notifications | FR-NC-002 |
| Job alerts | FR-JB-005 |
| Candidate review and pipeline | FR-EP-004 |
| Interview management | FR-EP-005 |
| Admin panel | FR-AP-001, FR-AP-002, FR-AP-003 |
| About, services, sectors pages | FR-PW-002, FR-PW-003, FR-PW-004 |
| Contact page | FR-PW-006 |
| Messaging system | FR-CP-006 |
| Security hardening | NFR-SE-001 through NFR-SE-014 |
| File storage (resumes) | S3 integration |

### Phase 3: Intelligence
**Goal**: AI matching, analytics, and content

| Feature | Requirements Covered |
|---------|---------------------|
| Matching system (MatchGuide) | FR-MS-001, FR-MS-003, FR-MS-004 |
| Resume parsing | FR-MS-002 |
| Job recommendations | FR-MS-003 |
| Analytics dashboard | FR-AP-003 |
| Resources section (blog, case studies) | FR-PW-005 |
| SEO optimization | NFR-SEO-001 through NFR-SEO-009 |
| Google for Jobs integration | NFR-SEO-007 |
| Content management (admin) | FR-AP-004 |

### Phase 4: Monetization
**Goal**: Payments, payroll, and billing

| Feature | Requirements Covered |
|---------|---------------------|
| Stripe payment integration | FR-FT-002 |
| Contractor payroll (Flo-Thru) | FR-FT-001, FR-FT-002 |
| Invoicing system | FR-FT-003 |
| Tax compliance | FR-FT-004 |
| Offer management | FR-EP-006 |
| Contract management | FR-EP-007 |
| Premium job postings | FR-EP-003.12 |
| Internal ATS features | FR-ATS-001 through FR-ATS-004 |

### Phase 5: Scale
**Goal**: Advanced features, consulting, and expansion

| Feature | Requirements Covered |
|---------|---------------------|
| Professional Services SOW | FR-SOW-001 |
| Curated Teams (PODs) | FR-POD-001 |
| Multi-language (EN/FR) | NFR-US-008 |
| Mobile application | Future requirement |
| Video interview integration | Future requirement |
| Skills assessment platform | Future requirement |
| Reference checking system | FR-ATS-004 |
| Advanced reporting and exports | FR-AP-003.10 |

### Phase 6: Enterprise & Consulting
**Goal**: MSP, consulting services, workforce development, and enterprise features

| Feature | Requirements Covered |
|---------|---------------------|
| MSP client portal and vendor management | FR-MSP-001, FR-MSP-002 |
| MSP workforce analytics | FR-MSP-003 |
| VMS integration (Fieldglass, Beeline) | FR-MSP-002.7 |
| IT consulting engagement management | FR-CS-001 |
| Service catalog (cloud, data, AI, cyber) | FR-CS-002 |
| Technology partnerships portal | FR-CS-003 |
| Training and upskilling portal | FR-WD-001 |
| Rising talent programs | FR-WD-002 |
| DEI workforce reporting | FR-WD-003 |
| Background check integration | New integration |
| SOC 2 Type II compliance | TAR-CS-024 |
| Elasticsearch migration | TAR-SA-009 |
| Multi-region disaster recovery | TAR-DR-005 |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| ATS | Applicant Tracking System — software for managing recruitment |
| CRM | Candidate Relationship Management — managing candidate interactions |
| CWM | Contingent Workforce Management — managing non-permanent workers |
| Flo-Thru | S.i. Systems' proprietary contractor payroll service |
| MatchGuide | S.i. Systems' proprietary candidate-job matching platform |
| MSP | Managed Service Provider — outsourced recruitment management |
| POD | A curated team of IT specialists assembled for a specific project |
| RBAC | Role-Based Access Control — permission management by user role |
| SOW | Statement of Work — a scoped project engagement document |
| VMS | Vendor Management System — technology for managing staffing vendors |
| DEI | Diversity, Equity & Inclusion — inclusive workforce practices |
| IAM | Identity & Access Management — managing user identities and access |
| ITSM | IT Service Management — managing IT service delivery |
| WAF | Web Application Firewall — filtering malicious web traffic |
| CDN | Content Delivery Network — distributed content caching |
| SSR | Server-Side Rendering — rendering pages on the server |
| CSR | Client-Side Rendering — rendering pages in the browser |
| JWT | JSON Web Token — compact token format for authentication |
| CUID | Collision-resistant Unique Identifier — URL-safe unique ID |
| WAL | Write-Ahead Logging — PostgreSQL transaction logging for recovery |
| TOTP | Time-based One-Time Password — MFA authenticator codes |
| SLO | Service Level Objective — target performance metric |
| APM | Application Performance Monitoring — tracking app performance |
| RPA | Robotic Process Automation — automating repetitive tasks |

## Appendix B: Reference Sources

- [S.i. Systems — Home](https://www.sisystems.com/us/)
- [S.i. Systems — About](https://www.sisystems.com/about/)
- [S.i. Systems — Contract Staffing](https://www.sisystems.com/find-talent/services/contract-staffing/)
- [S.i. Systems — Direct Hire](https://www.sisystems.com/find-talent/services/direct-hire/)
- [S.i. Systems — Payrolling (Flo-Thru)](https://www.sisystems.com/us/find-talent/services/payrolling/)
- [S.i. Systems — Professional Services SOW](https://www.sisystems.com/find-talent/services/it-professional-services/)
- [S.i. Systems — Candidate Benefits](https://www.sisystems.com/us/search-it-jobs/benefits/)
- [S.i. Systems — Search IT Jobs](https://www.sisystems.com/us/search-it-jobs/)
- [S.i. Systems — Candidate Portal](https://portal.sisystems.com/)
- [S.i. Systems — Resources](https://www.sisystems.com/resources/)
- [S.i. Systems — Case Studies](https://www.sisystems.com/us/resources/case-studies/)
- [S.i. Systems — Blog](https://www.sisystems.com/resources/blog/)
- [S.i. Systems — Financial Services](https://www.sisystems.com/find-talent/sectors/financial-services/)
- [S.i. Systems — Engineering & Construction](https://www.sisystems.com/us/find-talent/sectors/engineering-construction/)
- [S.i. Systems — Natural Resources](https://www.sisystems.com/us/find-talent/sectors/natural-resources/)
- [S.i. Systems — Transportation](https://www.sisystems.com/us/find-talent/sectors/transportation/)
- [S.i. Systems — Software & IT](https://www.sisystems.com/us/find-talent/sectors/software-information-technology/)
- [S.i. Systems — Systems Integrators](https://www.sisystems.com/us/find-talent/sectors/systems-integrators-and-consulting/)
- [S.i. Systems — Contact](https://www.sisystems.com/us/contact/)
- [S.i. Systems — Careers](https://www.sisystems.com/us/about/careers/)
- [S.i. Systems — LinkedIn](https://www.linkedin.com/company/s.i.-systems)
- [TEKsystems — Home](https://www.teksystems.com/en-ca/)
- [TEKsystems — Talent Solutions](https://www.teksystems.com/en/talent-solutions)
- [TEKsystems — Talent Recruiting](https://www.teksystems.com/en-ca/talent-recruiting)
- [TEKsystems — MSP Support](https://www.teksystems.com/en/managed-service-program-support)
- [TEKsystems — IT & Business Services](https://www.teksystems.com/en/it-and-business-services)
- [TEKsystems — Cloud, Digital & Data](https://www.teksystems.com/en/data-and-cloud-services)
- [TEKsystems — Data Analytics](https://www.teksystems.com/en/data-analytics)
- [TEKsystems — Application Innovation](https://www.teksystems.com/en/application-innovation)
- [TEKsystems — Cybersecurity & Risk](https://www.teksystems.com/en/cyber-risk-security)
- [TEKsystems — Digital Workplace](https://www.teksystems.com/en/digital-workplace)
- [TEKsystems — Enterprise Service Management](https://www.teksystems.com/en/enterprise-service-management)
- [TEKsystems — Customer Experience](https://www.teksystems.com/en/elevate-experiences)
- [TEKsystems — Workforce Development](https://www.teksystems.com/en/workforce-development)
- [TEKsystems — Business Transformation](https://www.teksystems.com/en/business-transformation)
- [TEKsystems — Canada Public Sector](https://www.teksystems.com/en-ca/industries/canada-public-sector)
- [TEKsystems — Who We Are](https://www.teksystems.com/en-ca/who-we-are)
- [TEKsystems — LinkedIn](https://www.linkedin.com/company/teksystems)
