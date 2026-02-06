# UX Designer

## Role Overview

The UX Designer is responsible for ensuring the JTLD Consulting Inc platform is intuitive, efficient, and enjoyable to use for all user types - candidates, employers, and administrators. This role focuses on user research, information architecture, interaction design, and usability testing.

## Priority

**High** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Figma | Wireframing and prototyping |
| FigJam | User flow diagrams and workshops |
| Maze | Unmoderated usability testing |
| Hotjar | Heatmaps and session recordings |
| Google Analytics | User behavior analytics |
| Optimal Workshop | Card sorting and tree testing |

---

## Skills

### 1. User Research

**Purpose**
This skill exists to discover who the platform's users are, what they need, and where current experiences fail them, so that every design decision is grounded in evidence rather than assumption.

**Preconditions**
- Access to target user populations (IT candidates, hiring employers, staffing administrators in Canada)
- Interview/survey tools set up (e.g., Google Forms, Typeform, Calendly for scheduling)
- Competitive staffing platforms identified for benchmarking (e.g., Hays, Robert Half, Randstad, TEKsystems)
- Stakeholder alignment on research goals and timelines

**Steps**
1. Define research objectives: list specific questions to answer (e.g., "What causes candidates to abandon applications?" or "How do employers compare contractor profiles?").
2. Identify and recruit participants: minimum 5 per user type (candidate, employer, admin). Use screener surveys to confirm they match the target personas.
3. Conduct competitive analysis: audit at least 5 competing IT staffing platforms. Document their registration flows, search/filter patterns, job detail layouts, and dashboard designs. Capture screenshots and annotate strengths and weaknesses.
4. Perform user interviews using a semi-structured script. Record each session (with consent). Cover goals, current tools used, pain points, and desired outcomes.
5. Distribute quantitative surveys to validate interview findings across a broader sample (minimum 20 respondents per user type).
6. Build user personas from research data. Each persona must include: name, role, goals (minimum 3), pain points (minimum 3), tools currently used, and a quote summarizing their core need. The three primary personas for this platform are:
   - **Sarah Chen** - IT professional seeking contract work. Goals: find relevant positions quickly, apply with minimal friction, track application status, get matched to fitting jobs. Pain points: irrelevant results, lengthy forms, no status visibility, manual resume re-entry.
   - **Mark Thompson** - IT Manager at a mid-size company. Goals: find qualified contractors quickly, post jobs and receive quality applicants, compare candidates efficiently, manage onboarding. Pain points: unqualified applicant volume, slow time-to-hire, no quality indicators, managing multiple postings.
   - **Lisa Patel** - Operations Manager at the staffing company. Goals: monitor platform health, manage users and permissions, oversee postings and applications, generate leadership reports. Pain points: manual matching, no real-time analytics, dispute management, downtime impact.
7. Create user journey maps for each persona. Map stages (Awareness, Registration, Core Task, Follow-up, Return) against actions, thoughts, emotions, pain points, and opportunities.
8. Synthesize findings into a research report: include methodology, participant demographics, key findings (ranked by severity), persona documents, journey maps, and prioritized recommendations.

**What NOT to Do**
- Do not create personas based on team assumptions without conducting actual interviews or surveys.
- Do not interview fewer than 5 people per user type and declare the research complete.
- Do not skip competitive analysis; the staffing industry has established UX patterns that users expect.
- Do not treat qualitative and quantitative findings as interchangeable; report them separately and note where they converge.
- Do not assume Canadian IT staffing users have the same needs as general job seekers; this is a specialized market.

**Done Condition**
- Minimum 5 interviews completed per user type (candidate, employer, admin), each recorded and transcribed.
- Competitive analysis document covers at least 5 platforms with annotated screenshots.
- Three validated personas exist with all required fields populated from research data.
- Journey maps completed for each persona.
- Research report delivered, reviewed by at least one stakeholder, and feedback incorporated.

---

### 2. Information Architecture

**Purpose**
This skill exists to organize the platform's content, navigation, and labeling so that candidates, employers, and administrators can find what they need without confusion or wasted clicks.

**Preconditions**
- User research completed (personas and journey maps available)
- Full inventory of platform content types (job listings, candidate profiles, employer dashboards, admin panels, settings pages, help/FAQ)
- Understanding of the three distinct user roles and their access levels in the JTLD Consulting Inc platform

**Steps**
1. Conduct a content audit: list every page, feature, and content type the platform requires across all three user roles. Organize into a spreadsheet with columns for content name, user role(s), frequency of use, and priority.
2. Run card sorting exercises with representative users (minimum 5 per role). Use open card sorting first to discover how users naturally group content. Use closed card sorting to validate proposed categories.
3. Design the site map: create a hierarchical diagram showing every page and its parent-child relationships. Separate site maps for candidate-facing, employer-facing, and admin-facing sections. Ensure shared elements (login, profile, settings) appear consistently.
4. Define the navigation structure:
   - Primary navigation: top-level items visible to all authenticated users (role-appropriate).
   - Secondary navigation: contextual sidebar or tabs within sections.
   - Utility navigation: account settings, help, logout.
5. Establish the labeling system: write a glossary of all navigation labels, page titles, and key terms. Validate labels through tree testing with at least 5 users per role. Example: decide whether to use "Jobs," "Positions," or "Opportunities" and confirm users understand the chosen term.
6. Run tree testing: give users tasks (e.g., "Find where to update your resume," "Find where to review applicants for your open position") and measure success rate and directness. Minimum 80% success rate required for core tasks.
7. Design search and filtering patterns: define what fields are searchable (job title, skills, location, rate, contract type), what filters are available, and how results are sorted by default.
8. Document the final information architecture in a single deliverable: site map diagram, navigation spec, labeling glossary, and card sort/tree test results.

**What NOT to Do**
- Do not design navigation based on internal team terminology; use language validated with actual users.
- Do not create a single flat navigation that mixes candidate, employer, and admin items together.
- Do not skip tree testing and assume the site map is correct because it "looks logical."
- Do not forget to account for empty states (e.g., new user with no applications, employer with no job posts yet).
- Do not ignore mobile navigation constraints; the information architecture must work on small screens.

**Done Condition**
- Site map diagram exists for all three user roles, reviewed and approved.
- Card sorting completed with at least 5 users per role, results documented.
- Tree testing completed with at least 5 users per role, core tasks achieving 80%+ success rate.
- Navigation spec document delivered with primary, secondary, and utility navigation defined.
- Labeling glossary finalized and shared with the development team.

---

### 3. Interaction Design

**Purpose**
This skill exists to define exactly how users interact with every element on the platform -- how pages flow into each other, how forms behave, how errors are communicated, and how feedback confirms user actions.

**Preconditions**
- Information architecture completed (site map, navigation structure, labeling)
- User personas and journey maps available
- Design system or component library established (or in progress) using Tailwind CSS conventions
- Understanding of the Next.js page routing model used by the platform

**Steps**
1. Map all core user flows as step-by-step diagrams. At minimum, create flows for:
   - **Candidate Job Search Flow**: Landing Page --> Browse/Search Jobs --> View Job Details --> Apply (or Save Job / Set Alert), with registration/login branching.
   - **Employer Hiring Flow**: Login --> Dashboard --> Post New Job --> Review Applications --> Shortlist --> Schedule Interview, with Edit/Manage Jobs branching.
   - **Application Tracking Flow**: Candidate Applies --> Employer Reviews --> Status Update --> Notification, with states: Pending --> Reviewed --> Shortlisted --> Interview --> Offered/Rejected.
2. For each flow, identify every decision point, error state, and edge case. Document them in a table: trigger, expected behavior, error behavior, recovery path.
3. Design microinteractions for: button clicks (loading state, success, error), form field validation (inline, on blur), notification dismissal, status badge changes, and list filtering/sorting.
4. Define form interaction patterns: field order, tab progression, inline validation rules, required field indicators, auto-save behavior for long forms (e.g., job posting), and multi-step form progress indicators.
5. Apply progressive disclosure: determine what information is shown by default vs. expandable (e.g., job listing cards show title/company/rate by default; skills, description, and requirements expand on click or detail page).
6. Specify feedback mechanisms for every user action: success toasts, error banners, loading spinners/skeletons, empty states, and confirmation dialogs for destructive actions (delete job post, withdraw application).
7. Document all interaction specifications in an interaction design document. Include: flow diagrams, decision tables, microinteraction specs, form behavior specs, and feedback mechanism inventory.

**What NOT to Do**
- Do not define flows that skip error states; every action that can fail must have a defined recovery path.
- Do not design interactions that require users to remember information across pages; use persistent context (breadcrumbs, step indicators).
- Do not assume all users interact via mouse; define keyboard interactions, focus order, and touch targets (minimum 44x44px).
- Do not design confirmation dialogs for non-destructive actions; reserve them for irreversible operations.
- Do not leave any interaction undefined with "TBD" or "to be designed later."

**Done Condition**
- User flow diagrams exist for all core tasks (minimum: job search, job posting, application submission, application review, profile management).
- Every flow diagram includes decision points, error states, and recovery paths.
- Microinteraction specs documented for all interactive components.
- Form interaction patterns defined and reviewed with the frontend development team.
- Interaction design document delivered and accepted by the design lead and tech lead.

---

### 4. Wireframing and Prototyping

**Purpose**
This skill exists to translate information architecture and interaction designs into visual layouts that the team can review, test with users, and hand off to developers -- progressing from rough sketches to interactive prototypes.

**Preconditions**
- Information architecture finalized (site map, navigation)
- Interaction design specs completed (user flows, form behaviors, feedback patterns)
- Figma workspace set up with the project's design system / component library
- Page inventory list: every page and modal the platform requires

**Steps**
1. Create low-fidelity wireframes for all pages. Use gray boxes, placeholder text, and no color. Focus exclusively on layout, content hierarchy, and component placement. Cover:
   - Landing/home page
   - Job search results page
   - Job detail page
   - Candidate registration and profile pages
   - Employer registration and dashboard
   - Job posting creation form
   - Application management view (employer)
   - Application tracking view (candidate)
   - Admin dashboard and user management
   - Settings and account pages
2. Review low-fidelity wireframes with the team. Collect feedback on layout, missing elements, and flow. Revise until approved.
3. Create mid-fidelity wireframes: add real labels, approximate content lengths, component states (default, hover, active, disabled, error), and responsive breakpoints (desktop at 1280px, tablet at 768px, mobile at 375px).
4. Build high-fidelity interactive prototypes in Figma for the three core flows:
   - Candidate: search --> view job --> apply --> confirmation
   - Employer: create job post --> publish --> view applicants --> shortlist
   - Admin: dashboard overview --> manage users --> view reports
5. Link all prototype screens with realistic transitions. Include loading states, success states, and at least one error state per flow.
6. Annotate prototypes with developer notes: spacing values (using Tailwind spacing scale), component names, interaction triggers, and responsive behavior descriptions.
7. Export and organize prototype links for usability testing and developer handoff.

**What NOT to Do**
- Do not jump to high-fidelity wireframes without completing and getting approval on low-fidelity layouts first.
- Do not wireframe only the "happy path"; include empty states, error states, and edge cases in every wireframe.
- Do not use Lorem Ipsum for critical content like form labels, navigation items, or CTAs; use realistic text.
- Do not create wireframes for desktop only; responsive layouts for tablet and mobile are required.
- Do not treat wireframes as final designs; they are for structure validation, not pixel-perfect aesthetics.

**Done Condition**
- Low-fidelity wireframes exist for every page in the page inventory, reviewed and approved.
- Mid-fidelity wireframes include all component states and responsive breakpoints.
- High-fidelity interactive prototypes built for the three core flows, with loading, success, and error states.
- Prototypes annotated with developer handoff notes.
- All wireframes and prototypes organized in Figma with consistent naming conventions and accessible to the full team.

---

### 5. Usability Testing

**Purpose**
This skill exists to validate (or invalidate) design decisions by observing real users attempting real tasks on the platform, so that problems are discovered before code is written or shipped.

**Preconditions**
- Interactive prototypes ready for testing (high-fidelity, clickable)
- User personas defined (to recruit matching participants)
- Test goals defined (which design questions need answers)
- Testing tool configured (Maze for unmoderated, or Zoom/Meet for moderated sessions)

**Steps**
1. Write a test plan: define the objective (e.g., "Validate the job application flow for candidates"), the number of participants (minimum 5 per user type being tested), the test format (moderated vs. unmoderated), and the tasks to test.
2. Write task scenarios in plain language. Each scenario must describe a goal without revealing the UI path. Example: "You are looking for a 6-month React developer contract in Toronto paying at least $80/hour. Find a matching job and apply for it." Write at minimum 5 task scenarios per test round.
3. Recruit participants matching the target personas. Screen candidates to confirm they match the user type, technical comfort level, and domain relevance. Do not test with team members or stakeholders.
4. Conduct test sessions:
   - For moderated: use think-aloud protocol. Record screen and audio. Do not help or lead the participant. Note where they hesitate, make errors, or express confusion.
   - For unmoderated (Maze): set up mission-based tasks. Collect click paths, completion rates, and time-on-task.
5. After each session, log findings immediately: task success/failure, time on task, errors encountered, user quotes, and severity rating (critical, major, minor, cosmetic).
6. Analyze results across all participants. Identify patterns: if 3+ of 5 participants fail the same task, it is a critical usability issue. Calculate:
   - Task success rate (target: 80%+ for core tasks)
   - Average time on task
   - Error rate per task
   - System Usability Scale (SUS) score (target: 68+ is above average)
7. Create a usability test report: executive summary, methodology, participant demographics, task-by-task results with severity ratings, video clips of key moments, and prioritized recommendations with specific design changes.
8. Conduct a heuristic evaluation separately: walk through the entire platform against Nielsen's 10 Usability Heuristics. Document each violation with severity, location, heuristic violated, and recommended fix.
9. Iterate: update wireframes/prototypes based on findings. Re-test critical issues in the next round.

**What NOT to Do**
- Do not test with fewer than 5 participants per user type; statistical patterns are unreliable below this threshold.
- Do not write leading task scenarios (e.g., "Click the Apply button on the job detail page"); describe goals, not steps.
- Do not skip testing on mobile breakpoints; test desktop and mobile separately.
- Do not dismiss a usability issue because only one participant encountered it; log everything and assess severity.
- Do not delay testing until the product is fully built; test prototypes early and often.
- Do not use team members or stakeholders as test participants; they have insider knowledge that biases results.

**Done Condition**
- Test plan document exists with objectives, participant criteria, and task scenarios.
- Minimum 5 test sessions completed per user type being tested, all recorded.
- Findings logged for every session with task success/failure, time, errors, quotes, and severity.
- Usability test report delivered with prioritized recommendations.
- Heuristic evaluation completed against Nielsen's 10 heuristics.
- Design iterations made based on critical and major findings; re-test scheduled for next round.

---

### 6. Accessibility (a11y)

**Purpose**
This skill exists to ensure the JTLD Consulting Inc platform is usable by all people, including those with visual, motor, auditory, or cognitive disabilities, meeting WCAG 2.1 AA compliance as a baseline legal and ethical requirement.

**Preconditions**
- Wireframes or prototypes available for review
- Understanding of WCAG 2.1 AA success criteria
- Accessibility testing tools installed: Stark (Figma plugin), axe DevTools (browser extension), screen reader available (NVDA on Windows or VoiceOver on macOS)
- Tailwind CSS configuration accessible (to verify color contrast tokens)

**Steps**
1. Audit color contrast across all design files. Every text element must meet minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold), 3:1 for UI components and graphical objects. Use Stark or WebAIM contrast checker. Document every failure.
2. Review all interactive elements for keyboard accessibility:
   - Every interactive element must be reachable via Tab key.
   - Focus order must follow logical reading order (left-to-right, top-to-bottom).
   - Focus indicators must be visible (not suppressed by CSS).
   - Custom components (dropdowns, modals, tabs) must have proper keyboard interaction patterns per WAI-ARIA practices.
3. Verify all images and icons have appropriate alternative text. Decorative images use empty alt attributes (`alt=""`). Informative images have descriptive alt text. Icon buttons have aria-labels.
4. Review all forms for accessibility:
   - Every input has an associated `<label>` element (not just placeholder text).
   - Required fields are indicated in a way that does not rely on color alone.
   - Error messages are programmatically associated with their fields using `aria-describedby`.
   - Form submission errors are announced to screen readers.
5. Check focus management for dynamic content:
   - When modals open, focus moves to the modal and is trapped inside.
   - When modals close, focus returns to the triggering element.
   - When content updates dynamically (e.g., search results filtering), changes are announced via ARIA live regions.
6. Ensure reduced motion support: verify that animations respect `prefers-reduced-motion` media query. No content should rely solely on animation to convey meaning.
7. Test with a screen reader: navigate the full candidate job search and application flow using only a screen reader. Log every point where information is missing, confusing, or not announced.
8. Create an accessibility audit report: list every issue found, its WCAG success criterion, severity, location (page/component), and recommended fix. Track remediation status.

**What NOT to Do**
- Do not treat accessibility as a final step; integrate it from the first wireframe.
- Do not rely solely on automated tools (axe, Lighthouse); they catch roughly 30% of accessibility issues. Manual testing and screen reader testing are required.
- Do not use color as the only means of conveying information (e.g., red for error, green for success must also include text labels or icons).
- Do not remove focus outlines for aesthetic reasons without providing an alternative visible focus indicator.
- Do not assume placeholder text substitutes for labels; placeholders disappear when the user types and are not reliably read by all screen readers.
- Do not skip testing with actual assistive technology users if possible; automated checks plus designer walkthroughs are a minimum, not a maximum.

**Done Condition**
- Color contrast audit completed; all failures documented and fixed or ticketed.
- Keyboard navigation tested on every page; all interactive elements reachable and operable, focus order logical, focus indicators visible.
- All images and icons audited for alt text; decorative vs. informative categorization documented.
- All forms audited for label associations, error message accessibility, and required field indication.
- Screen reader walkthrough of core flows completed; all issues logged.
- Accessibility audit report delivered with issue severity, WCAG criteria references, and remediation status tracking.
- Platform passes axe DevTools automated scan with zero critical or serious violations on all core pages.

---

## Usability Principles for This Project

1. **Simplicity**: Minimize steps to complete core tasks (apply, post job)
2. **Clarity**: Use clear labels, helpful descriptions, and obvious CTAs
3. **Feedback**: Show status for every action (loading, success, error)
4. **Consistency**: Same patterns and components across all pages
5. **Forgiveness**: Allow undo, confirm destructive actions, save drafts
6. **Efficiency**: Smart defaults, auto-fill, remember preferences
7. **Accessibility**: Usable by everyone regardless of ability

## Learning Resources

- [Nielsen Norman Group Articles](https://www.nngroup.com/articles/)
- [Laws of UX](https://lawsofux.com/)
- [Interaction Design Foundation](https://www.interaction-design.org/)
- [Don't Make Me Think (Steve Krug)](https://sensible.com/dont-make-me-think/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Figma Prototyping Guide](https://www.figma.com/resources/learn-design/prototyping/)

## Tools

- Figma (wireframing and prototyping)
- FigJam (collaborative workshops)
- Maze (usability testing)
- Hotjar (heatmaps and session replay)
- UserTesting.com (remote user testing)
- Optimal Workshop (card sorting)
- Miro (journey mapping)
- Stark (accessibility checker for Figma)
