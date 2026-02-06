# Product Manager

## Role Overview

The Product Manager is responsible for defining the product vision, strategy, and roadmap for the JTLD Consulting Inc platform. This role bridges business goals with user needs and technical capabilities, ensuring the right features are built in the right order.

## Priority

**Medium** - All Phases

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Jira / Linear | Project and task management |
| Confluence / Notion | Documentation and specs |
| Figma | Design review and feedback |
| Mixpanel / Amplitude | Product analytics |
| Miro | Strategy workshops and mapping |
| Google Analytics | User behavior tracking |

---

## Skills

### 1. Product Strategy

**Purpose**
This skill exists to define the long-term vision, market positioning, and value proposition of the JTLD Consulting Inc platform so that every feature, design, and engineering decision serves a coherent business objective within the Canadian IT staffing market.

**Preconditions**
- Access to Canadian IT staffing market data (market size, growth trends, competitor landscape)
- Stakeholder interviews completed or scheduled (JTLD leadership, sales team, account managers)
- Understanding of the platform's technology stack (Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, NextAuth.js)
- Competitive staffing platforms identified (e.g., Hays, Robert Half, Randstad, TEKsystems, Toptal)

**Steps**
1. Define the product vision: write a single statement (2-3 sentences maximum) that describes what the JTLD Consulting Inc platform will become, who it serves (IT candidates, employers, staffing administrators in Canada), and how it differentiates from competitors.
2. Conduct market research: gather data on the Canadian IT staffing market size, growth rate, key segments (contract vs. permanent, by technology domain, by region), and pricing norms. Document sources for every data point.
3. Perform competitive analysis: audit at least 5 competing platforms. For each, document their feature set, pricing model, user experience strengths and weaknesses, market positioning, and user reviews. Organize findings in a comparison matrix.
4. Complete a SWOT analysis for the JTLD platform: list at minimum 3 items per category (Strengths, Weaknesses, Opportunities, Threats). Ground every item in evidence from market research or stakeholder interviews, not assumptions.
5. Design the value proposition using the Value Proposition Canvas: map customer jobs, pains, and gains for each user type (candidate, employer, admin), then map how the platform's features address each.
6. Define the business model: document revenue streams (job posting fees, subscription plans, premium placements, contractor payroll margins), cost structure, key partnerships, and customer segments.
7. Draft the go-to-market strategy: define launch phases, target user segments for initial launch (e.g., Toronto-based IT contractors and mid-size employers), acquisition channels, and success criteria for each phase.
8. Compile all outputs into a Product Strategy Document. Present to stakeholders for review and iterate until approved.

**What NOT to Do**
- Do not write a vision statement that could apply to any job board; it must be specific to IT staffing in Canada and reflect JTLD's differentiators.
- Do not rely on assumptions about market size or competitor capabilities; cite sources for every claim.
- Do not define the business model without validating pricing assumptions with at least 3 potential customers or industry benchmarks.
- Do not treat the strategy as a one-time document; schedule quarterly reviews.
- Do not conflate product strategy with the product roadmap; strategy defines "why" and "where," the roadmap defines "what" and "when."

**Done Condition**
- Product vision statement written, reviewed, and approved by JTLD leadership.
- Market research document exists with cited data sources covering market size, segments, and trends.
- Competitive analysis matrix covers at least 5 platforms with feature, pricing, and UX comparison.
- SWOT analysis completed with minimum 3 evidence-backed items per category.
- Value Proposition Canvas completed for all three user types.
- Business model documented with revenue streams, cost structure, and pricing approach.
- Go-to-market strategy drafted with phased launch plan and success criteria.
- Product Strategy Document compiled, presented, and approved.

---

### 2. Roadmap and Planning

**Purpose**
This skill exists to translate the product strategy into a sequenced, prioritized plan of features and milestones that the engineering and design teams can execute against, ensuring the most valuable work is done first.

**Preconditions**
- Product strategy approved (vision, value proposition, business model)
- User research available (personas, journey maps, pain points)
- Engineering team capacity understood (team size, velocity if available, technology constraints)
- Stakeholder wish lists and feature requests collected

**Steps**
1. Build the master feature inventory: list every feature the platform could include. For each feature, record: name, description, target user type(s), strategic alignment, and source (user research, stakeholder request, competitive parity, innovation).
2. Prioritize features using the RICE framework: score every feature on Reach (how many users affected per quarter), Impact (how much it moves the needle: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal), Confidence (percentage certainty in the estimates), and Effort (person-months). Calculate RICE score = (Reach x Impact x Confidence) / Effort. Rank by score.
3. Cross-validate with MoSCoW: classify each feature as Must Have, Should Have, Could Have, or Won't Have (this phase). Ensure RICE rankings and MoSCoW classifications are consistent; resolve conflicts explicitly.
4. Organize features into the phased roadmap:
   - **Phase 1: Foundation (MVP)** -- Must Have: User registration and authentication (NextAuth.js), basic job posting (employer), job listing page with search, job detail and application, basic candidate profile, basic employer dashboard.
   - **Phase 2: Growth** -- Should Have: Advanced search and filters, email notifications, application tracking system, employer candidate management, resume upload and parsing, admin panel, security hardening.
   - **Phase 3: Intelligence** -- Could Have: AI-powered job matching, skills-based recommendations, analytics dashboard, automated resume screening, chatbot for candidate support, market trend reports.
   - **Phase 4: Monetization** -- Could Have: Contractor payroll integration, invoicing and billing, premium job postings, subscription plans for employers, featured candidate profiles, API access for partners.
   - **Phase 5: Scale** -- Won't Have (initially): Mobile applications (iOS/Android), multi-language support, video interview integration, skills assessment platform, contractor benefits management, white-label solution.
5. Define milestones for each phase: target start date, target completion date, key deliverables, and success criteria (measurable metrics).
6. Set quarterly OKRs (Objectives and Key Results) aligned to the current roadmap phase. Each objective must have 2-4 measurable key results with specific targets and deadlines.
7. Create a dependency map: identify which features depend on other features, shared infrastructure, or third-party integrations. Flag critical path items.
8. Conduct risk assessment: for each phase, identify top 3 risks (technical, market, resource), their likelihood, impact, and mitigation strategy.
9. Publish the roadmap in a format accessible to all stakeholders (e.g., Linear timeline, Notion page, or Miro board). Include a "last updated" date and change log.

**What NOT to Do**
- Do not prioritize features based on who asked loudest; use RICE scores and strategic alignment.
- Do not create a roadmap with only feature names and no success criteria; every phase needs measurable outcomes.
- Do not commit to specific delivery dates for phases beyond the current one; use time ranges and confidence levels.
- Do not skip dependency mapping; a missed dependency will derail the sprint.
- Do not treat the roadmap as fixed; it is a living document updated at least monthly.
- Do not plan more than one phase in detail; later phases should be directional, not specified.

**Done Condition**
- Master feature inventory exists with every feature scored using RICE and classified with MoSCoW.
- Phased roadmap published with features assigned to phases, milestones defined, and success criteria stated.
- Quarterly OKRs set for the current phase with measurable key results.
- Dependency map created and critical path items flagged.
- Risk assessment completed for the current and next phase.
- Roadmap reviewed and approved by stakeholders, published in a shared location with change log.

---

### 3. Requirements and Specifications

**Purpose**
This skill exists to translate roadmap features into precise, testable specifications that engineers and designers can build from without ambiguity, ensuring nothing is left to interpretation.

**Preconditions**
- Roadmap approved with features assigned to the current phase
- User personas and journey maps available
- UX wireframes or prototypes available for reference (if design work has started)
- Database schema documentation available (Prisma schema for PostgreSQL)
- API patterns established (Next.js API routes or server actions)

**Steps**
1. For each feature in the current phase, write a PRD (Product Requirements Document) containing: feature name, problem statement (what user pain it solves), target user(s), success metrics, scope (what is included and what is explicitly excluded), and dependencies.
2. Break each feature into user stories using the format: "As a [user type], I want [action] so that [benefit]." Write stories for every user type the feature touches. Example: "As a candidate, I want to filter job listings by contract type and location so that I only see relevant positions."
3. Write acceptance criteria for every user story using the Given/When/Then format. Cover the happy path, at least one edge case, and at least one error case per story. Example:
   - Given a candidate is on the job search page
   - When they select "Contract" as job type and "Toronto" as location and click "Search"
   - Then only jobs matching both criteria are displayed, sorted by posting date descending
4. Identify non-functional requirements for each feature: performance targets (e.g., search results load in under 2 seconds), security requirements (e.g., job applicant data visible only to the posting employer), scalability expectations, and data retention rules.
5. Identify edge cases systematically: walk through each user story with the questions "What if the input is empty?", "What if there are zero results?", "What if the user is not authorized?", "What if the operation times out?", "What if there are 10,000 records?" Document each edge case and its expected behavior.
6. Document API requirements: for each feature, list the API endpoints needed, HTTP methods, request/response schemas, authentication requirements, and error response formats. Align with the Next.js API route conventions used in the project.
7. Document data requirements: for each feature, list the database entities involved, required fields, field types, constraints, relationships, and any new Prisma schema changes needed.
8. Review each PRD with engineering (for feasibility), design (for alignment with wireframes), and QA (for testability). Incorporate feedback. Sign off from all three before development begins.

**What NOT to Do**
- Do not write user stories without acceptance criteria; untestable stories lead to ambiguous implementations.
- Do not omit the "explicitly excluded" section from the PRD; developers will build what is not excluded if scope is unclear.
- Do not write acceptance criteria that describe implementation details (e.g., "Use a SQL JOIN"); describe expected behavior only.
- Do not assume engineers will infer edge cases; document every edge case explicitly.
- Do not skip the engineering feasibility review; a spec that cannot be built is wasted work.
- Do not use vague language like "fast," "user-friendly," or "appropriate"; use measurable targets.

**Done Condition**
- PRD exists for every feature in the current phase, with all required sections completed.
- User stories written for every feature, covering all affected user types.
- Acceptance criteria written for every user story in Given/When/Then format, covering happy path, edge case, and error case.
- Non-functional requirements documented with measurable targets.
- API and data requirements documented and aligned with the platform's Next.js/Prisma architecture.
- All PRDs reviewed and signed off by engineering, design, and QA.

---

### 4. Metrics and Analytics

**Purpose**
This skill exists to define what the platform must measure, set up the tracking infrastructure, and establish a cadence for reviewing data so that product decisions are driven by evidence rather than opinion.

**Preconditions**
- Product strategy approved with defined success criteria
- Analytics tools provisioned (Google Analytics, Mixpanel or Amplitude)
- Platform deployed to at least a staging environment with real or realistic user flows
- Engineering support available to implement tracking events

**Steps**
1. Define the KPI framework using the platform's key metrics table:

   | Category | Metric | Target |
   |----------|--------|--------|
   | Acquisition | New user registrations per week | Growth trend |
   | Activation | Profile completion rate | > 60% |
   | Engagement | Job applications per active user | > 3/month |
   | Retention | Monthly active users (MAU) | > 40% return |
   | Revenue | Placements per month | Growth trend |
   | Quality | Time-to-fill (days) | < 14 days |
   | Satisfaction | NPS Score | > 50 |
   | Platform | Page load time | < 2 seconds |

2. For each KPI, define: data source, calculation method, measurement frequency, owner, and dashboard location. Document in a KPI Definitions Sheet.
3. Design the event tracking plan: list every user action that must be tracked (e.g., page views, button clicks, form submissions, search queries, application submissions, job post publications). For each event, define: event name, properties (key-value pairs), trigger condition, and user properties to associate.
4. Implement tracking by working with engineering: provide the event tracking plan as a specification. Review the implementation in staging to verify events fire correctly and properties are populated. Test at least 3 events end-to-end (trigger action in UI, verify event in analytics dashboard).
5. Build analytics dashboards: create a primary product dashboard showing all KPIs in the framework. Create secondary dashboards for: acquisition funnel (registration to profile completion), engagement funnel (search to application to placement), and employer funnel (registration to job post to hire).
6. Set up automated alerts: configure alerts for KPI thresholds (e.g., registration rate drops below 50% of weekly average, page load time exceeds 3 seconds, error rate exceeds 1%).
7. Design the first A/B test: identify one high-impact hypothesis to test (e.g., "Simplifying the application form from 5 fields to 3 will increase application completion rate by 20%"). Define the test: hypothesis, control, variant, sample size, duration, success metric, and statistical significance threshold (95%).
8. Establish a data review cadence: weekly metrics review (team), monthly product review (stakeholders), quarterly business review (leadership). Define the agenda and attendees for each.

**What NOT to Do**
- Do not track events without a clear reason; every tracked event must map to a KPI or a decision the team needs to make.
- Do not launch A/B tests without predefined success criteria and sample size calculations; running tests until "something looks good" is not valid.
- Do not treat vanity metrics (e.g., total page views) as KPIs; focus on metrics that indicate user value and business outcomes.
- Do not set targets without baseline data; measure the current state for at least 2 weeks before setting improvement targets.
- Do not skip the implementation verification step; unverified tracking will produce garbage data and bad decisions.
- Do not present analytics data without context (time range, user segment, comparison period).

**Done Condition**
- KPI framework documented with all metrics, targets, data sources, and calculation methods.
- Event tracking plan delivered to engineering, covering all critical user actions.
- Tracking implementation verified in staging: minimum 3 events tested end-to-end.
- Primary product dashboard built and accessible to the team, showing all KPIs.
- Funnel dashboards built for acquisition, engagement, and employer flows.
- Automated alerts configured for critical KPI thresholds.
- First A/B test designed with hypothesis, success criteria, and sample size.
- Data review cadence established and first review meeting scheduled.

---

### 5. Stakeholder Management

**Purpose**
This skill exists to ensure all stakeholders (JTLD leadership, engineering, design, sales, account managers) are informed, aligned, and able to contribute input at the right time, so that the product reflects collective intelligence without decision paralysis.

**Preconditions**
- Stakeholder list identified (names, roles, communication preferences, decision authority)
- Product strategy and roadmap approved (baseline documents exist)
- Communication channels established (Slack, email, meeting cadence)
- Project management tool set up (Jira/Linear) with appropriate access levels

**Steps**
1. Create a stakeholder map: list every stakeholder by name. For each, record their role, interest level (high/medium/low), influence level (high/medium/low), primary concerns, preferred communication method, and decision authority. Categorize into: Manage Closely (high interest, high influence), Keep Satisfied (low interest, high influence), Keep Informed (high interest, low influence), Monitor (low interest, low influence).
2. Establish a communication plan: define what each stakeholder group receives, how often, and in what format:
   - Engineering team: daily standup, sprint planning, sprint review
   - Design team: weekly design sync, prototype reviews
   - JTLD leadership: bi-weekly status report, monthly roadmap review, quarterly business review
   - Sales/Account managers: monthly product update, feature request review
3. Set up a feature request intake process: create a standard submission form (title, requester, user problem, proposed solution, business impact estimate, urgency). All requests go into a backlog, reviewed weekly, prioritized using RICE scoring, and responded to within 5 business days.
4. Create a status report template: current phase progress (% complete, on/off track), key accomplishments this period, blockers and risks, upcoming milestones, decisions needed. Send on the defined cadence without exceptions.
5. Facilitate trade-off decisions: when constraints arise (scope, timeline, resources), present the options as a structured framework: "We can do A (scope cut), B (timeline extension), or C (resource addition). Here are the trade-offs for each." Let the appropriate decision-maker choose; do not make the decision unilaterally.
6. Manage expectation alignment: before each phase begins, hold a kickoff meeting with all relevant stakeholders. Review scope, timeline, success criteria, and what is explicitly NOT included. Document agreement in writing.
7. Conduct retrospectives at the end of each phase: what went well, what did not, what to change. Document action items and assign owners.

**What NOT to Do**
- Do not send status reports only when things are going well; stakeholders must be informed of risks and blockers immediately.
- Do not allow feature requests to bypass the intake process; "hallway conversations" that become commitments undermine prioritization.
- Do not present trade-off decisions with a predetermined preferred option disguised as options; present genuinely balanced alternatives.
- Do not skip retrospectives because "there is no time"; retrospectives prevent repeated mistakes.
- Do not assume silence from a stakeholder means agreement; confirm explicitly.
- Do not over-communicate with low-interest stakeholders or under-communicate with high-interest ones; match the communication plan.

**Done Condition**
- Stakeholder map created with all stakeholders categorized by interest and influence.
- Communication plan documented and shared with all stakeholders, cadence followed without gaps.
- Feature request intake process operational; all requests logged, reviewed weekly, and responded to within 5 business days.
- Status reports sent on cadence with no missed periods.
- Trade-off decisions documented with options presented, decision made, and rationale recorded.
- Phase kickoff meetings held with scope agreement documented in writing.
- Phase retrospectives completed with action items assigned and tracked.

---

### 6. Agile Methodology

**Purpose**
This skill exists to run the development process using Agile practices that maximize delivery velocity, minimize waste, and ensure continuous improvement across the engineering, design, and product team.

**Preconditions**
- Project management tool set up (Jira or Linear) with project, boards, and workflows configured
- Team members onboarded and have tool access
- Product backlog exists with prioritized user stories and acceptance criteria
- Sprint duration agreed upon (recommendation: 2-week sprints)

**Steps**
1. Groom the product backlog: review the top 20 items in the backlog. Ensure each item has: user story, acceptance criteria, priority ranking, effort estimate (story points using Fibonacci: 1, 2, 3, 5, 8, 13), and assigned labels (feature area, user type). Items not meeting these criteria are sent back to the PM (yourself) for completion before grooming.
2. Run sprint planning: select items from the top of the backlog that fit within the team's velocity (if known) or estimated capacity. Define the sprint goal (a single sentence describing what the sprint will accomplish). Ensure every selected item is understood by the engineering team; if not, discuss until it is clear or defer to next sprint.
3. Conduct daily standups (15 minutes maximum): each team member answers: What did I complete since last standup? What will I work on next? What is blocking me? The PM's job is to track blockers and resolve them within 24 hours.
4. Monitor sprint progress: update the burndown chart daily. If the team is off track by mid-sprint, facilitate a scope adjustment conversation: identify which items to defer to the next sprint to protect the sprint goal.
5. Run sprint review (demo): the team demonstrates completed work to stakeholders. Each item is either accepted (meets acceptance criteria) or rejected (does not meet criteria, returned to backlog). Record acceptance/rejection decisions.
6. Run sprint retrospective: the team discusses what went well, what did not, and one specific improvement to implement in the next sprint. The improvement must be actionable and assigned to a person. Track whether the previous sprint's improvement was actually implemented.
7. Track velocity: record the total story points completed per sprint. After 3 sprints, use the rolling average to forecast capacity for sprint planning. Do not use velocity for individual performance evaluation.
8. Maintain a definition of done checklist. An item is "done" only when: code written, unit tests pass, code reviewed, acceptance criteria verified, deployed to staging, and documented (if applicable). Enforce this consistently.

**What NOT to Do**
- Do not allow items into a sprint without acceptance criteria; undefined work leads to undefined outcomes.
- Do not extend sprints to finish incomplete work; move unfinished items to the next sprint and investigate why they were not completed.
- Do not skip retrospectives or treat them as optional; they are the primary mechanism for continuous improvement.
- Do not use velocity to compare team members or pressure the team to increase points; velocity is a planning tool, not a productivity metric.
- Do not let standups exceed 15 minutes or become status meetings; keep them focused on blockers.
- Do not change the sprint scope after planning without team agreement; protect the sprint commitment.

**Done Condition**
- Product backlog groomed with top 20 items meeting all quality criteria (story, acceptance criteria, estimate, priority).
- Sprint planning completed with sprint goal defined and items selected within capacity.
- Daily standups running with blockers tracked and resolved within 24 hours.
- Sprint burndown chart updated daily and used for mid-sprint scope decisions.
- Sprint review held with stakeholders; all items accepted or explicitly rejected.
- Sprint retrospective completed with one actionable improvement identified, assigned, and tracked.
- Velocity tracked across sprints with rolling average used for planning after sprint 3.
- Definition of done enforced consistently; no item marked complete without meeting all criteria.

---

## Key Metrics to Track

| Category | Metric | Target |
|----------|--------|--------|
| Acquisition | New user registrations per week | Growth trend |
| Activation | Profile completion rate | > 60% |
| Engagement | Job applications per active user | > 3/month |
| Retention | Monthly active users (MAU) | > 40% return |
| Revenue | Placements per month | Growth trend |
| Quality | Time-to-fill (days) | < 14 days |
| Satisfaction | NPS Score | > 50 |
| Platform | Page load time | < 2 seconds |

## Learning Resources

- [Inspired by Marty Cagan](https://www.svpg.com/inspired-how-to-create-tech-products-customers-love/)
- [Product School Resources](https://productschool.com/resources)
- [Mind the Product](https://www.mindtheproduct.com/)
- [Lenny's Newsletter](https://www.lennysnewsletter.com/)
- [Shape Up by Basecamp](https://basecamp.com/shapeup)
- [Amplitude Product Analytics Guide](https://amplitude.com/blog/product-analytics)

## Tools

- Linear or Jira (project management)
- Notion or Confluence (documentation)
- Miro (strategy and mapping)
- Mixpanel or Amplitude (analytics)
- Productboard (feature management)
- Loom (async communication)
- Google Sheets (data analysis)
