# Business Analyst

## Role Overview

The Business Analyst bridges the gap between business stakeholders and the development team. For the JTLD Consulting Inc platform, this role defines the hiring workflows, business rules, data requirements, and process flows that the system must support.

## Priority

**Medium** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Lucidchart / Draw.io | Process flow diagrams |
| Notion / Confluence | Requirements documentation |
| Excel / Google Sheets | Data analysis and modeling |
| Figma | Wireframe review |
| SQL | Data querying for analysis |
| Power BI / Tableau | Business reporting |

---

## Skills

### 1. Requirements Engineering

**Purpose**
This skill exists to elicit, document, validate, and manage all business and functional requirements for the JTLD Consulting Inc platform so that the development team builds exactly what the business needs -- no more, no less, and nothing ambiguous.

**Preconditions**
- Stakeholder list identified (JTLD leadership, hiring managers, account managers, recruiters, IT candidates, employer contacts)
- Access to stakeholders for interviews and workshops (calendars, meeting tools)
- Understanding of the platform's technology stack (Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, NextAuth.js)
- Product roadmap available with features assigned to the current phase
- Documentation templates prepared (BRD, FSD, use case templates)

**Steps**
1. Identify all stakeholder groups and their involvement: JTLD leadership (strategic direction), recruiters/account managers (operational workflows), IT candidates (job seeker experience), employer contacts (hiring manager experience), and the development team (technical constraints). Schedule interviews or workshops with at least one representative from each group.
2. Conduct requirements elicitation using multiple techniques:
   - **Stakeholder interviews**: one-on-one, 45-60 minutes each, semi-structured. Ask about current processes, pain points, desired outcomes, and constraints. Record and transcribe.
   - **Workshops**: group sessions with 3-5 stakeholders to map workflows and resolve conflicting requirements. Use FigJam or Miro for collaborative mapping.
   - **Document analysis**: review existing JTLD process documents, spreadsheets, email templates, and any legacy system documentation to identify implicit requirements.
   - **Observation**: shadow recruiters and account managers during their current workflow (phone screens, candidate submissions, client communications) to identify steps they perform but do not articulate.
3. Document functional requirements: for each feature in the current phase, write requirements using the format "The system shall [action] when [condition] so that [user benefit]." Group requirements by feature area (registration, job posting, search, application, dashboard, admin).
4. Document non-functional requirements: performance (page load under 2 seconds, search results under 1 second for up to 10,000 jobs), security (role-based access, data encryption at rest and in transit, PIPEDA compliance for Canadian user data), scalability (support 10,000 concurrent users), and availability (99.9% uptime target).
5. Create a requirements traceability matrix: map each requirement to its source (which stakeholder, interview, or document), its priority (Must/Should/Could/Won't), the feature it belongs to, and the test case that will validate it.
6. Validate requirements: review the documented requirements with each stakeholder group to confirm accuracy. Resolve conflicts (e.g., recruiters want manual matching, leadership wants automated matching) by documenting both perspectives and facilitating a decision with the Product Manager.
7. Establish a change request process: define how new requirements or changes to existing requirements are submitted, evaluated (impact on scope, timeline, and resources), approved or rejected, and tracked. Every change request must have: requester, description, business justification, impact assessment, and approval status.
8. Write acceptance criteria for each requirement using Given/When/Then format. Each requirement must have at least one happy path, one edge case, and one error case criterion.

**What NOT to Do**
- Do not write requirements based on a single stakeholder's input; cross-validate with at least two sources.
- Do not document requirements in vague language ("the system should be fast," "the UI should be intuitive"); use measurable, testable statements.
- Do not assume you understand a stakeholder's need after one conversation; validate back to them in writing.
- Do not skip non-functional requirements; they are the source of most post-launch failures.
- Do not allow undocumented requirements to enter development; if it is not in the BRD, it does not get built.
- Do not treat requirements as frozen after sign-off; use the change request process for updates, but do not allow uncontrolled scope creep.

**Done Condition**
- Stakeholder interviews completed with at least one representative from each stakeholder group, all transcribed.
- Functional requirements documented for every feature in the current phase, using the standard format.
- Non-functional requirements documented with measurable targets for performance, security, scalability, and availability.
- Requirements traceability matrix created, linking every requirement to its source, priority, feature, and test case.
- All requirements validated with stakeholders; conflicts resolved and decisions documented.
- Change request process defined and communicated to all stakeholders.
- Acceptance criteria written for every requirement in Given/When/Then format.

---

### 2. Business Process Modeling

**Purpose**
This skill exists to map every staffing workflow the platform must support -- from candidate registration to contractor payment -- so that the development team understands the exact sequence of steps, decision points, and business rules that the software must implement.

**Preconditions**
- Requirements engineering completed (functional requirements documented)
- Stakeholder interviews completed (current "as-is" processes understood)
- Process modeling tool available (Lucidchart, Draw.io, or Miro)
- Understanding of BPMN (Business Process Model and Notation) symbols and conventions

**Steps**
1. Map the "As-Is" processes: document how JTLD currently handles each workflow without the platform. Use BPMN notation. Create diagrams for at minimum these five core processes:
   - **Candidate Registration**: Visit Platform --> Register Account --> Complete Profile --> Upload Resume --> Skills Assessment --> Profile Active
   - **Job Posting**: Employer Login --> Create Job Post --> Define Requirements --> Set Budget/Rate --> Review and Publish --> Job Active --> Receive Applications
   - **Application and Matching**: Candidate Searches Jobs --> Views Job Detail --> Submits Application --> System Calculates Match Score --> Employer Reviews --> Shortlist/Reject --> Interview Schedule --> Offer/Reject
   - **Contract Staffing**: Candidate Selected --> Contract Terms Defined --> Contract Signed --> Onboarding --> Time Tracking --> Invoice Generation --> Payment Processing --> Contract Renewal/End
   - **Payroll**: Contractor Submits Timesheet --> Manager Approves --> System Calculates Pay --> Deductions Applied --> Payment Processed --> Pay Stub Generated --> Reporting
2. Identify pain points and inefficiencies in each As-Is process. Annotate diagrams with: manual steps that should be automated, bottlenecks (steps where work queues up), error-prone steps, and steps with no visibility or tracking.
3. Design the "To-Be" processes: create new BPMN diagrams showing how each workflow will work with the platform. For each step, indicate: who performs it (candidate, employer, admin, system), what data is required, what validations occur, and what the outputs are.
4. Perform gap analysis: create a comparison table with columns for As-Is step, To-Be step, gap description, and required platform feature. Every gap must map to a documented requirement.
5. Define decision trees for complex business rules:
   - Application eligibility: what criteria must a candidate meet to apply for a job?
   - Match scoring: what formula determines the match percentage between a candidate and a job?
   - Job expiry: under what conditions does a job posting expire or get extended?
   - Access control: what data can each role see, edit, or delete?
6. Document all decision points as explicit business rules (see Business Rules skill below for the full catalog).
7. Create process documentation for each To-Be workflow: include the BPMN diagram, a step-by-step narrative description, roles involved, data inputs and outputs, exception handling, and SLA targets (e.g., employer reviews applications within 48 hours).
8. Review all process diagrams and documentation with stakeholders (operations team, recruiters, leadership). Iterate until all parties agree the To-Be processes are correct and complete.

**What NOT to Do**
- Do not skip the As-Is process mapping; you cannot design a better process without understanding the current one.
- Do not model processes at too high a level (e.g., "candidate applies for job"); every decision point, validation, and exception must be visible in the diagram.
- Do not invent process steps without stakeholder validation; model what the business needs, not what you assume.
- Do not forget exception handling in To-Be processes (e.g., what happens if the employer does not review an application within 48 hours?).
- Do not create process diagrams without narrative documentation; diagrams alone are not sufficient for developer implementation.

**Done Condition**
- As-Is process diagrams created for all five core workflows using BPMN notation, with pain points annotated.
- To-Be process diagrams created for all five core workflows, showing actor, data, validations, and outputs at every step.
- Gap analysis table completed, mapping every gap to a documented platform requirement.
- Decision trees documented for application eligibility, match scoring, job expiry, and access control.
- Process documentation written for each To-Be workflow, including narrative description, roles, data, exceptions, and SLAs.
- All process diagrams and documentation reviewed and approved by operations stakeholders.

---

### 3. Staffing Industry Domain Knowledge

**Purpose**
This skill exists to ensure the platform correctly implements Canadian IT staffing industry practices -- recruitment lifecycles, contract structures, compliance requirements, rate management, and vendor relationships -- so that the software reflects real-world workflows rather than generic assumptions.

**Preconditions**
- Access to JTLD's current operational processes and documentation
- Access to JTLD recruiters, account managers, and compliance staff for knowledge transfer
- Understanding of Canadian employment law basics (or access to legal counsel)
- Industry reports or resources available (Staffing Industry Analysts, ACSESS -- Association of Canadian Search, Employment and Staffing Services)

**Steps**
1. Document the recruitment lifecycle as practiced by JTLD: sourcing, screening, submission, interview, offer, placement, onboarding, assignment management, offboarding. For each stage, record: who is responsible, what tools are currently used, what data is captured, and what handoffs occur.
2. Document contract staffing specifics: contract types supported (time-and-materials, fixed-price, contract-to-hire, permanent placement), contract duration norms, extension/renewal processes, and early termination procedures. Identify which contract types the platform must support in Phase 1 vs. later phases.
3. Document rate card and margin management: how bill rates and pay rates are determined, typical markup percentages for IT contractors in Canada, rate negotiation workflows, and how rates are stored and displayed in the system. Define business rules for rate ranges (e.g., minimum pay rate, maximum markup).
4. Document compliance requirements for the Canadian context:
   - PIPEDA (Personal Information Protection and Electronic Documents Act): what candidate data requires consent, how consent is collected and stored, data retention periods, and right-to-deletion process.
   - Employment standards: classification of contractors vs. employees, overtime rules, statutory holiday pay, termination notice requirements (varies by province).
   - Tax compliance: T4A reporting for independent contractors, HST/GST considerations, payroll deduction requirements for employees on contract.
5. Document Vendor Management System (VMS) and Managed Service Provider (MSP) concepts: determine whether JTLD operates within any VMS platforms, what data interchange formats are used, and whether the platform needs to integrate with external VMS systems.
6. Create a staffing industry glossary for the platform: define all domain-specific terms (e.g., bill rate, pay rate, markup, spread, requisition, submission, start date, end date, extension, backfill) and ensure the platform's UI and database use these terms consistently.
7. Validate all domain documentation with JTLD's senior recruiters and compliance team. Identify any JTLD-specific variations from standard industry practice and document them.

**What NOT to Do**
- Do not assume US staffing practices apply in Canada; employment law, tax requirements, and compliance obligations differ significantly.
- Do not guess at rate structures or margin calculations; get exact formulas from JTLD's finance or operations team.
- Do not skip compliance documentation; PIPEDA violations carry significant fines, and the platform handles personal data by definition.
- Do not use generic job board terminology when the staffing industry has specific terms; "requisition" is not "job posting," "submission" is not "application."
- Do not finalize domain documentation without recruiter validation; recruiters know the actual workflow, not the idealized version.

**Done Condition**
- Recruitment lifecycle documented with all stages, responsibilities, tools, data, and handoffs.
- Contract staffing types documented with platform phase assignments.
- Rate card and margin management rules documented with exact formulas and business rules.
- Canadian compliance requirements documented for PIPEDA, employment standards, and tax compliance.
- VMS/MSP integration requirements assessed and documented (even if the answer is "not needed for Phase 1").
- Staffing industry glossary created and shared with the development team.
- All domain documentation validated by JTLD senior recruiters and compliance staff.

---

### 4. Data Analysis

**Purpose**
This skill exists to gather, clean, analyze, and visualize data that informs business decisions about the platform -- from market sizing to operational metrics to cost-benefit analysis of proposed features.

**Preconditions**
- Access to JTLD's existing data (placement history, revenue data, client list, candidate database if any)
- SQL access to the platform's PostgreSQL database (once deployed)
- Spreadsheet or BI tool available (Excel, Google Sheets, Power BI, or Tableau)
- KPIs and metrics defined (from Product Manager's metrics framework)

**Steps**
1. Conduct data gathering: identify all data sources relevant to the analysis. For market sizing, use industry reports (Staffing Industry Analysts, Statistics Canada). For operational analysis, use JTLD's internal data (spreadsheets, CRM exports, accounting records). For platform analysis, query the PostgreSQL database directly using SQL.
2. Clean and validate data: check for duplicates, missing values, inconsistent formats, and outliers. Document every cleaning step taken. Do not modify source data; create cleaned copies.
3. Perform market analysis: calculate the addressable market size for JTLD's IT staffing platform in Canada. Break down by segment (contract vs. permanent, by province, by technology domain). Identify growth trends. Document sources and methodology.
4. Perform cost-benefit analysis for proposed platform features: for each major feature, estimate the development cost (engineering hours x rate), the expected benefit (revenue increase, cost reduction, or efficiency gain), the payback period, and the ROI. Present in a standard CBA template.
5. Create operational reports: track KPIs defined in the metrics framework (registrations, applications, placements, time-to-fill, revenue). Build visualizations (charts, graphs, tables) that show trends over time, not just snapshots.
6. Perform cohort analysis: group users by registration date (weekly or monthly cohorts) and track their engagement, application rates, and retention over time. Identify which cohorts perform best and investigate why.
7. Build a data dictionary for the platform: document every database entity (Prisma model), every field (name, type, constraints, description, example values), and every relationship. This is the authoritative reference for what data the platform stores and what it means.
8. Deliver analysis in stakeholder-appropriate formats: executive summary (1 page with key findings and recommendations), detailed report (methodology, data, analysis, visualizations), and raw data appendix (for those who want to verify).

**What NOT to Do**
- Do not present analysis without documenting the methodology and data sources; unverifiable analysis is not useful.
- Do not assume sample data is complete or representative; verify coverage and note limitations explicitly.
- Do not perform cost-benefit analysis with only optimistic estimates; include best-case, expected-case, and worst-case scenarios.
- Do not build reports without defining the audience first; leadership wants summaries, operations wants detail, engineering wants data dictionaries.
- Do not modify source data during cleaning; always work on copies and document transformations.
- Do not infer field names or data types from column headers alone; confirm with the engineering team or Prisma schema.

**Done Condition**
- Data sources identified and access confirmed for all required analyses.
- Data cleaned and validated with cleaning steps documented.
- Market analysis completed with addressable market size, segments, and growth trends, all with cited sources.
- Cost-benefit analysis completed for at least the top 5 proposed features, with best/expected/worst-case scenarios.
- Operational reports built with KPI visualizations showing trends over time.
- Cohort analysis completed for at least the first 3 months of platform data (or planned for post-launch if pre-launch).
- Data dictionary created covering all Prisma models, fields, types, constraints, and relationships.
- All analyses delivered in stakeholder-appropriate formats (executive summary, detailed report, raw data).

---

### 5. Documentation

**Purpose**
This skill exists to create and maintain the authoritative set of business documents -- BRDs, functional specs, use cases, data dictionaries, test scenarios, and training materials -- that ensure everyone building, testing, and using the platform has a single source of truth.

**Preconditions**
- Requirements engineering completed (requirements documented and validated)
- Business process modeling completed (To-Be processes documented)
- Domain knowledge documented (staffing workflows, compliance rules, glossary)
- Documentation platform set up (Notion or Confluence) with folder structure and access controls

**Steps**
1. Create the Business Requirements Document (BRD): compile all validated requirements into a single structured document with sections for: executive summary, project scope, stakeholders, functional requirements (grouped by feature area), non-functional requirements, constraints, assumptions, dependencies, and approval signatures. Version the document (v1.0, v1.1, etc.) and track changes.
2. Create Functional Specification Documents (FSDs) for each feature area: detail the exact behavior of each function. Include: feature description, user roles involved, input fields with validation rules, processing logic, output/display behavior, error handling, and integration points. Cross-reference the BRD requirement IDs.
3. Write use case documents for all three user types. Each use case must include: use case ID, title, primary actor, preconditions, main success scenario (numbered steps), alternative flows, exception flows, postconditions, and business rules that apply. At minimum, create use cases for:
   - Candidate: register, complete profile, search jobs, apply for job, track applications, update profile
   - Employer: register, post job, manage postings, review applications, shortlist candidates, schedule interviews
   - Admin: manage users, review job postings, generate reports, handle disputes, configure system settings
4. Create the data dictionary: document every entity in the platform's Prisma schema. For each entity, list: entity name, description, fields (name, type, constraints, nullable, default, description, example value), relationships (foreign keys, cardinality), and indexes. Ensure the data dictionary stays synchronized with the actual Prisma schema.
5. Write test scenarios derived from business rules and use cases. For each business rule in the catalog, write at least one positive test case (rule is satisfied) and one negative test case (rule is violated). Format: test ID, test name, precondition, steps, expected result, linked requirement ID, linked business rule.
6. Create the business rules catalog: compile all business rules from process modeling and requirements into a single reference table:

   | Rule Category | Rule | Validation |
   |---------------|------|------------|
   | User Registration | Email must be unique | Reject duplicate email with error message |
   | User Registration | Password minimum 8 characters | Reject shorter passwords with validation message |
   | Job Posting | Must include title, description, location, job type | Block publish until all required fields completed |
   | Application | Candidate can apply once per job | Hide or disable Apply button after first application |
   | Application | Resume required to apply | Block application submission without uploaded resume |
   | Matching | Minimum 60% skill match to recommend | Only show recommendations at or above threshold |
   | Expiry | Jobs expire after 30 days unless renewed | Auto-expire and notify employer 5 days before expiry |
   | Access | Employers see only their own job applicants | Filter query results by employer ID |
   | Notifications | Email sent on application status change | Trigger email via notification service on status update |
   | Rates | Contractor rates must fall within defined ranges | Reject rates outside min/max with error message |

7. Create training documentation: write user guides for each role (candidate, employer, admin) explaining how to use the platform. Include screenshots (from prototypes or live system), step-by-step instructions, and FAQ sections. Write in plain language; avoid technical jargon.
8. Establish a documentation maintenance process: assign document owners, define review cadence (monthly for living documents, per-release for versioned documents), and define the process for updating documents when requirements change.

**What NOT to Do**
- Do not create documents without version numbers; undated, unversioned documents cause confusion about which version is current.
- Do not duplicate information across documents without cross-referencing; if a requirement appears in the BRD and the FSD, one must reference the other as the source of truth.
- Do not write use cases that only cover the happy path; alternative and exception flows are required.
- Do not let the data dictionary fall out of sync with the Prisma schema; update them together.
- Do not write training materials using developer terminology; candidates, employers, and admins are not technical users of the platform internals.
- Do not stop documenting after launch; documentation must be maintained for as long as the platform is in use.

**Done Condition**
- BRD completed with all sections, versioned, and signed off by stakeholders.
- FSDs created for every feature area in the current phase, cross-referenced to BRD requirement IDs.
- Use cases written for all three user types covering all core workflows, with main, alternative, and exception flows.
- Data dictionary created covering all Prisma entities, synchronized with the actual schema.
- Test scenarios written for every business rule, with positive and negative cases, linked to requirements.
- Business rules catalog compiled in a single reference document.
- Training documentation created for candidate, employer, and admin roles, reviewed for clarity by a non-technical reader.
- Documentation maintenance process established with owners, review cadence, and update process defined.

---

### 6. Communication and Stakeholder Facilitation

**Purpose**
This skill exists to ensure clear, consistent, and effective information flow between JTLD business stakeholders and the development team, so that requirements are understood, decisions are made efficiently, and no critical information is lost in translation.

**Preconditions**
- Stakeholder list and communication preferences documented
- Meeting cadence established (from Product Manager's communication plan)
- Collaboration tools available (Slack, Zoom/Meet, Notion/Confluence, Jira/Linear)
- BA deliverables in progress or complete (requirements, process maps, use cases)

**Steps**
1. Prepare and facilitate requirements workshops: create an agenda (specific questions to answer, decisions to make), invite the right stakeholders (business + technical), set a time limit (90 minutes maximum), use visual collaboration tools (Miro/FigJam) to map processes in real time, and produce a written summary of decisions within 24 hours.
2. Translate between business and technical language: when business stakeholders describe a need ("we need the system to automatically find the best candidates for a job"), translate it into technical requirements ("the system shall query candidates where skill overlap with job requirements is >= 60%, sorted by match percentage descending, returning the top 20 results with pagination"). Validate the translation with both sides.
3. Facilitate conflict resolution: when stakeholders disagree on requirements (e.g., recruiters want a manual review step, leadership wants full automation), document both positions, list the pros and cons of each, propose a compromise if possible (e.g., automated ranking with manual final approval), and escalate to the Product Manager for a decision if no consensus is reached. Record the final decision and rationale.
4. Create status reports for BA deliverables: track completion status of all BA work products (BRD, FSDs, use cases, data dictionary, test scenarios). Report weekly to the Product Manager: what is complete, what is in progress, what is blocked, and what needs stakeholder input.
5. Conduct stakeholder presentations: when presenting BA deliverables (process maps, requirements, data models) to different audiences, adapt the presentation:
   - For leadership: focus on business impact, scope, timeline, and decisions needed. Maximum 10 slides.
   - For operations/recruiters: focus on workflow changes, what is automated vs. manual, and training needs. Walk through process diagrams.
   - For engineering: focus on data requirements, business rules, edge cases, and acceptance criteria. Provide reference documents.
6. Manage change communication: when requirements change, notify all affected parties (engineering, design, QA, stakeholders) within 24 hours. Include: what changed, why, impact on scope and timeline, and updated documents.
7. Support User Acceptance Testing (UAT): prepare UAT test scripts based on use cases and business rules. Recruit business stakeholders to execute test scripts. Collect feedback in a structured format (pass/fail per test case, defect descriptions, severity). Compile a UAT report and work with engineering to resolve all critical and major defects before launch.

**What NOT to Do**
- Do not facilitate workshops without a prepared agenda; unstructured workshops waste time and produce no actionable outcomes.
- Do not present the same content to leadership and engineering; adapt the message, depth, and format to the audience.
- Do not allow decisions made in meetings to go undocumented; every decision must be recorded in writing within 24 hours.
- Do not translate business requirements into technical specifications without validating the translation with the engineering team.
- Do not skip UAT or treat it as a formality; UAT is the last checkpoint before real users encounter the system.
- Do not communicate requirement changes verbally without following up in writing; verbal changes are forgotten and disputed.

**Done Condition**
- Requirements workshops facilitated for all major feature areas, with written summaries produced within 24 hours.
- Business-to-technical translations documented and validated by both business stakeholders and engineering.
- Stakeholder conflicts resolved with decisions documented, including rationale and any compromises.
- Weekly BA status reports delivered to the Product Manager with no gaps.
- Stakeholder presentations delivered to all relevant audience groups with audience-appropriate content.
- Requirement changes communicated to all affected parties within 24 hours, with updated documents.
- UAT test scripts prepared, UAT sessions conducted with business stakeholders, and UAT report compiled with defect resolution tracked to completion.

---

## Business Rules Reference

| Rule Category | Example Rules |
|---------------|---------------|
| User Registration | Email must be unique; password minimum 8 chars |
| Job Posting | Must include title, description, location, job type |
| Application | Candidate can apply once per job; resume required |
| Matching | Minimum 60% skill match to recommend |
| Expiry | Jobs expire after 30 days unless renewed |
| Access | Employers see only their own job applicants |
| Notifications | Email sent on application status change |
| Rates | Contractor rates must fall within defined ranges |

## Learning Resources

- [IIBA BABOK Guide](https://www.iiba.org/business-analysis-certifications/babok-guide/)
- [Business Analysis Body of Knowledge](https://www.iiba.org/)
- [Lucidchart BPMN Guide](https://www.lucidchart.com/pages/bpmn)
- [Staffing Industry Analysts](https://staffingindustry.com/)
- [Use Case Modeling Guide](https://www.usability.gov/how-to-and-tools/methods/use-cases.html)

## Tools

- Lucidchart or Draw.io (process diagrams)
- Notion or Confluence (documentation)
- Jira (requirement tracking)
- Excel / Google Sheets (data analysis)
- Miro (workshops and mapping)
- Balsamiq (quick wireframes)
- SQL client (data queries)
