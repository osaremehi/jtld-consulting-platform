# Content Writer / Copywriter

## Role Overview

The Content Writer is responsible for creating all written content on the JTLD Consulting Inc platform, from marketing copy and landing pages to email templates, help documentation, and blog articles that drive organic traffic and user engagement.

## Priority

**Low** - Phase 2+

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Grammarly | Grammar and style checking |
| Hemingway Editor | Readability optimization |
| Google Docs | Collaborative writing |
| WordPress / MDX | Blog content management |
| Canva | Supporting visual content |
| Ahrefs / SEMrush | Keyword research for content |

---

## Skills

### 1. Website Copywriting

**Purpose:** This skill exists to produce every piece of static page copy on jtldconsulting.com so that visitors immediately understand the platform's value and convert into candidates or employers.

**Preconditions:**
- Brand voice and tone guidelines are finalized (see Skill 2 below).
- Wireframes or page layouts for each target page are available from the UI/UX designer.
- A shared Google Doc or Notion workspace is accessible for drafts and reviews.
- Stakeholder list (who approves copy) is defined.

**Steps:**
1. Obtain the finalized wireframe or layout for the target page (Home, About, Services, How It Works, Pricing, Contact, FAQ, Testimonials/Case Studies).
2. Identify every text slot on the wireframe: hero headline, subheading, body paragraphs, CTAs, feature labels, trust signals, footer blurbs.
3. For each text slot, write three candidate versions that match the brand voice guidelines.
4. Run all drafts through Hemingway Editor; target Grade 8 or lower readability.
5. Run all drafts through Grammarly; resolve every flagged issue.
6. Ensure every CTA uses an action verb ("Post a Job", "Find Work", "Get Started") and never a vague label ("Click Here", "Submit").
7. Write microcopy for all interactive elements on the page: button labels, tooltips, placeholder text, empty states.
8. Write error messages for every form on the page using the pattern: what happened, why it happened, what the user can do next. Never blame the user.
9. Compile all copy into a single document keyed to the wireframe slot IDs.
10. Submit for stakeholder review. Incorporate feedback. Repeat review until approval is received.
11. Hand off final approved copy to the front-end developer with exact slot-to-text mapping.

**Content examples to follow:**

Home Page Hero:
```
Headline:   "Connect with Canada's Top IT Talent"
Subheading: "Find skilled IT professionals for contract,
             direct hire, and project-based roles."
CTA:        "Post a Job" | "Find Work"
```

Job Card Microcopy:
```
Title:      "Senior React Developer"
Company:    "Tech Corp"
Location:   "Toronto, ON (Remote)"
Type:       "Contract - 6 months"
Posted:     "2 days ago"
CTA:        "Apply Now"
```

Empty State:
```
Icon:       [Search illustration]
Heading:    "No jobs match your search"
Body:       "Try adjusting your filters or search terms.
             You can also set up a job alert to get
             notified when matching positions are posted."
CTA:        "Clear Filters" | "Create Job Alert"
```

Error Message:
```
Bad:  "Error 500: Internal server error"
Good: "Something went wrong on our end. Please try again
       in a few moments. If the issue persists, contact
       our support team."
```

**What NOT to Do:**
- Do not write copy without the wireframe in hand; you will guess at structure and rewrite later.
- Do not use jargon-heavy language that alienates non-technical employers.
- Do not write placeholder text ("Lorem ipsum") and plan to replace it later; write real copy from the start.
- Do not skip microcopy (tooltips, placeholders, empty states); these are not optional polish items.
- Do not finalize copy without running it through both Hemingway and Grammarly.
- Do not use passive voice in CTAs (e.g., "A job can be posted" instead of "Post a Job").

**Done Condition:** Every text slot identified in every wireframe has approved, final copy. A handoff document exists mapping each slot ID to its text. Readability is Grade 8 or below. Grammarly reports zero critical issues. Stakeholder has signed off.

---

### 2. Brand Voice & Tone Definition

**Purpose:** This skill exists to create and maintain a single-source-of-truth brand voice guide so that every piece of content across jtldconsulting.com sounds like it came from the same organization.

**Preconditions:**
- Company mission, vision, and values are documented.
- Target audience profiles (IT candidates, employers/hiring managers) are defined.
- At least 3 competitor platforms have been reviewed for voice comparison.
- A shared location (Notion, Google Docs) is available for the living style guide.

**Steps:**
1. Interview stakeholders to extract 5 core brand personality adjectives (e.g., professional, approachable, direct, trustworthy, knowledgeable).
2. For each adjective, write a "We are / We are not" statement. Example: "We are approachable, not casual. We are professional, not stiff."
3. Define three audience-specific tone modes:
   - Employer-facing: professional, confident, results-oriented.
   - Candidate-facing: supportive, encouraging, clear.
   - System/transactional: neutral, efficient, helpful.
4. For each tone mode, write 3 before/after examples showing incorrect vs. correct tone.
5. Create a terminology table: list every platform-specific term and its approved usage (e.g., "candidate" not "applicant", "employer" not "client", "contract role" not "gig").
6. Write rules for inclusive language: no gendered pronouns for unknown users, no ableist idioms, no culturally specific slang.
7. Compile everything into a Brand Voice & Tone Guide document with sections: Personality, Tone Modes, Terminology, Inclusive Language, Examples.
8. Circulate the guide to all content creators and developers who write UI text.
9. Schedule quarterly reviews to update the guide based on new product features or audience feedback.

**What NOT to Do:**
- Do not define voice based on personal preference; ground every choice in audience research and brand values.
- Do not create a guide and then ignore it; every piece of copy must be checked against it.
- Do not assume one tone fits all contexts; employer-facing and candidate-facing copy must differ.
- Do not leave terminology ambiguous; if two words could be used, pick one and ban the other.
- Do not skip inclusive language rules; this is a Canadian platform and inclusivity is a legal and ethical requirement.

**Done Condition:** A published Brand Voice & Tone Guide document exists. It contains personality adjectives with "We are / We are not" pairs, three tone modes with examples, a terminology table, and inclusive language rules. At least one stakeholder has approved it. The document URL has been shared with all team members who produce content.

---

### 3. Email Template Writing

**Purpose:** This skill exists to write the copy for every transactional and marketing email sent by the JTLD Consulting Inc platform through SendGrid or Resend, ensuring high open rates, clear messaging, and consistent brand voice.

**Preconditions:**
- Brand voice and tone guide is complete (Skill 2).
- Email service provider (SendGrid or Resend) is configured and accessible.
- List of all platform-triggered email events is finalized by the back-end developer.
- Email template designs (HTML/CSS layouts) are available from the UI designer, or a decision has been made to use plain-text templates.

**Steps:**
1. Obtain the complete list of email events from the back-end team. The required set is:
   - Welcome email (candidate variant + employer variant)
   - Email verification
   - Password reset
   - Job alert notifications
   - Application received confirmation
   - Application status update
   - Interview invitation
   - Offer letter template
   - Contract renewal reminder
   - Newsletter template
   - Re-engagement email
   - Weekly digest
2. For each email, write: subject line (under 50 characters), preview text (under 90 characters), header, body, CTA button text, and footer.
3. Write three subject line variants per email for future A/B testing.
4. Ensure every email has an unsubscribe link reference placeholder and a physical mailing address placeholder (CAN-SPAM / CASL compliance).
5. Apply the correct tone mode from the brand voice guide: candidate-facing emails get supportive tone; employer-facing emails get professional tone; system emails get neutral tone.
6. Run all email copy through Grammarly and Hemingway Editor.
7. Preview each email in Mailchimp or the email provider's preview tool to verify copy fits the HTML layout without overflow or truncation.
8. Test every personalization merge tag (e.g., `{{first_name}}`, `{{job_title}}`) to confirm they render correctly with sample data.
9. Submit all email copy for stakeholder review. Incorporate feedback.
10. Hand off final copy to the developer as a structured document: one section per email event, with clearly labeled fields (subject, preview, header, body, CTA, footer).

**What NOT to Do:**
- Do not write email copy without knowing the HTML template dimensions; copy that overflows looks unprofessional.
- Do not use a single generic subject line; always write at least three variants for A/B testing.
- Do not forget CASL/CAN-SPAM compliance elements (unsubscribe link, physical address).
- Do not assume merge tags work; test each one with real sample data.
- Do not send marketing emails with the same tone as transactional emails; they serve different purposes and audiences.
- Do not skip preview text; most email clients display it and empty preview text wastes engagement opportunity.

**Done Condition:** Every email event on the master list has a complete copy document (subject, preview text, header, body, CTA, footer). Three subject line variants exist per email. All merge tags have been tested. CASL/CAN-SPAM compliance placeholders are present. Stakeholder has approved. Copy has been handed off in structured format to the developer.

---

### 4. System Messages & UX Writing

**Purpose:** This skill exists to write every piece of in-app text that is not marketing copy -- success messages, error messages, confirmation dialogs, empty states, loading indicators, tooltips, form validation, and notifications -- so that users always know what happened, why, and what to do next.

**Preconditions:**
- UI component inventory is available from the front-end developer (all modals, toasts, form fields, empty states, loading states).
- Brand voice and tone guide is complete (Skill 2), specifically the system/transactional tone mode.
- Error codes and their technical meanings are documented by the back-end developer.

**Steps:**
1. Obtain the full UI component inventory: every modal, toast, inline alert, tooltip, form field, empty state, and loading state across the platform.
2. Categorize each component by message type: success, error, confirmation, empty state, loading, tooltip, validation, notification.
3. For each success message, write copy that confirms the action completed and tells the user what happens next. Example: "Your application has been submitted. You'll receive a confirmation email shortly."
4. For each error message, write copy using this three-part structure: (a) what went wrong in plain language, (b) why it might have happened if known, (c) what the user can do to fix it. Never use technical jargon. Never blame the user.
5. For each confirmation dialog, write copy that states the consequence of the action clearly. Example: "Are you sure you want to withdraw your application? This cannot be undone."
6. For each empty state, write copy that explains the state and offers a constructive next action. Example: "No applications yet. Start browsing jobs to find your next opportunity."
7. For each loading state, write copy that sets expectations. Example: "Finding the best matches for you..."
8. For each tooltip, write a single sentence (under 15 words) that clarifies the adjacent UI element.
9. For each form validation message, write specific corrective instructions. Bad: "Invalid input." Good: "Please enter a valid email address (e.g., name@example.com)."
10. Compile all UX copy into a spreadsheet or document keyed to component IDs.
11. Review the entire set for terminology consistency against the brand voice guide terminology table.
12. Submit for stakeholder and developer review.

**What NOT to Do:**
- Do not write generic messages ("An error occurred") without specific guidance for the user.
- Do not blame the user ("You entered an invalid email").
- Do not use technical error codes in user-facing messages ("Error 422: Unprocessable Entity").
- Do not write tooltips longer than one sentence; they should clarify, not lecture.
- Do not leave any empty state without a CTA; every dead end must offer a way forward.
- Do not invent component IDs; use the exact IDs from the UI component inventory.

**Done Condition:** Every component in the UI inventory has corresponding UX copy. All copy is compiled in a document keyed to component IDs. Terminology is consistent with the brand voice guide. No error message uses technical jargon. No empty state lacks a CTA. Stakeholder and developer have approved.

---

### 5. SEO Content Writing

**Purpose:** This skill exists to produce keyword-optimized long-form content (blog posts, resource pages, guides) that drives organic search traffic to jtldconsulting.com and establishes JTLD Consulting Inc as an authority in IT staffing.

**Preconditions:**
- Access to Ahrefs or SEMrush for keyword research.
- Blog or resource section of jtldconsulting.com is built and deployable (WordPress, MDX, or CMS).
- Brand voice and tone guide is complete (Skill 2).
- Google Search Console and Google Analytics are configured for jtldconsulting.com.
- A content calendar template exists or is created.

**Steps:**
1. Conduct keyword research using Ahrefs or SEMrush. Identify 20+ target keywords in these topic clusters:
   - IT job market trends and insights
   - Career advice for IT professionals
   - Salary guides by role and location (Canadian market)
   - Interview preparation tips
   - Resume writing best practices
   - Skills development recommendations
   - Employer hiring guides
   - Industry reports and analysis
2. For each keyword, record: search volume, keyword difficulty, search intent (informational, navigational, transactional), and top 3 competing pages.
3. Prioritize keywords by a composite score: high volume + low difficulty + high relevance to JTLD Consulting Inc services.
4. For each prioritized keyword, create a content brief: target keyword, secondary keywords (3-5), target word count (minimum 1500 words), heading structure (H1, H2s, H3s), competing pages to outperform, and internal link targets.
5. Write the article following the brief. Structure:
   - H1: Contains the primary keyword naturally.
   - Introduction (100-150 words): Hook, context, promise of value.
   - Body: H2 sections covering subtopics, each 200-400 words.
   - Conclusion: Summary and CTA (link to job board, service page, or newsletter signup).
6. Write the meta title (under 60 characters, includes primary keyword) and meta description (under 155 characters, includes primary keyword, contains a CTA).
7. Write alt text for every image in the article: descriptive, includes keyword where natural, under 125 characters.
8. Add internal links to at least 3 other pages on jtldconsulting.com within the article body.
9. Run the article through Hemingway Editor (target Grade 8 or lower) and Grammarly.
10. Publish the article and submit the URL to Google Search Console for indexing.
11. After 30 days, check Google Search Console for impressions, clicks, and average position. If the page is not ranking on page 1 for the target keyword, create a content refresh plan.
12. Maintain a content calendar with publishing dates, assigned keywords, status (draft, review, published, needs refresh), and performance metrics.

**What NOT to Do:**
- Do not write content without keyword research first; uninformed content wastes effort.
- Do not stuff keywords; use primary keyword 3-5 times per 1000 words, secondary keywords 1-2 times each.
- Do not publish articles under 1500 words for competitive keywords; thin content will not rank.
- Do not skip meta titles and descriptions; these are the first thing searchers see.
- Do not forget alt text on images; this is both an SEO and accessibility requirement.
- Do not publish and forget; every article must be reviewed at the 30-day mark.
- Do not ignore search intent; if the keyword intent is informational, do not write a sales page.

**Done Condition:** At least 20 target keywords are researched and documented. A content brief exists for each prioritized keyword. Published articles meet all structural requirements (heading hierarchy, word count, internal links, meta tags, alt text). Every article scores Grade 8 or below in Hemingway. A content calendar is maintained and up to date. Published articles have been submitted to Google Search Console.

---

### 6. Blog / Resource Content Production

**Purpose:** This skill exists to execute the ongoing production pipeline of blog posts and resource articles planned in the content calendar, ensuring consistent publishing cadence and quality.

**Preconditions:**
- Content calendar with assigned topics, keywords, and deadlines exists (from Skill 5).
- Content briefs are written for all scheduled articles (from Skill 5).
- Blog platform (WordPress, MDX, CMS) is functional and the writer has publishing access.
- Brand voice and tone guide is complete (Skill 2).
- At least one round of SEO keyword research has been completed (Skill 5).

**Steps:**
1. Pull the next article assignment from the content calendar.
2. Review the content brief: target keyword, secondary keywords, heading structure, word count target, competing pages.
3. Research the topic by reading the top 5 ranking pages for the target keyword. Identify gaps in their coverage that the JTLD article can fill.
4. Write the first draft following the content brief structure.
5. Add data, statistics, or examples specific to the Canadian IT market where applicable.
6. Add internal links to relevant JTLD Consulting Inc pages (job board, services, other blog posts).
7. Write image alt text for every visual element.
8. Write the meta title and meta description.
9. Self-edit: run through Hemingway (target Grade 8) and Grammarly. Fix all issues.
10. Submit for peer or stakeholder review. Incorporate feedback.
11. Publish the article on the blog platform.
12. Update the content calendar status to "Published" with the publish date and URL.
13. Share the published URL with the marketing team for social media distribution.

**What NOT to Do:**
- Do not publish without a peer review; a second pair of eyes catches errors the writer becomes blind to.
- Do not deviate from the content brief without updating the brief first.
- Do not publish articles without internal links; every article must link to at least 3 other JTLD pages.
- Do not use stock phrases like "In today's fast-paced world" or "Without further ado."
- Do not copy or closely paraphrase competitor content; original analysis and insights are required.
- Do not miss the publishing deadline without notifying stakeholders and updating the calendar.

**Done Condition:** The article is published on the blog. The content calendar is updated with status "Published," the publish date, and the live URL. The article meets all content brief requirements (keyword usage, word count, heading structure, internal links, meta tags, alt text). Hemingway score is Grade 8 or below. Grammarly reports zero critical issues. The marketing team has been notified.

---

### 7. Legal Content Drafting

**Purpose:** This skill exists to draft the initial versions of all legal and policy pages for jtldconsulting.com so they can be sent to legal counsel for review, ensuring the platform has compliant legal documentation before launch.

**Preconditions:**
- Legal counsel (lawyer or legal service) is identified and engaged for final review.
- List of required legal pages is confirmed: Terms of Service, Privacy Policy, Cookie Policy, Acceptable Use Policy, Contractor Agreement Template, Data Processing Agreement.
- Data collection and processing practices are documented by the development team (what data is collected, where it is stored, how it is processed).
- Applicable regulations are identified: PIPEDA (Canadian federal), provincial privacy laws, CASL (anti-spam), GDPR (if serving EU users).

**Steps:**
1. For each legal page, research 3-5 comparable documents from competitor IT staffing platforms.
2. Create an outline for each document listing every required section.
3. Draft the Terms of Service covering: acceptance of terms, account creation and responsibilities, prohibited uses, intellectual property, limitation of liability, termination, governing law (Canadian jurisdiction), dispute resolution.
4. Draft the Privacy Policy covering: what data is collected, how it is collected, purpose of collection, data storage and security, third-party sharing (SendGrid, Cloudflare, AWS S3, analytics), user rights (access, correction, deletion), data retention periods, contact information for privacy inquiries.
5. Draft the Cookie Policy covering: what cookies are used, purpose of each cookie, how to manage cookie preferences, third-party cookies (analytics, Cloudflare).
6. Draft the Acceptable Use Policy covering: prohibited content, prohibited behavior, enforcement actions, reporting mechanism.
7. Draft Contractor Agreement Template covering: engagement terms, payment terms, confidentiality, intellectual property, termination, non-solicitation.
8. Draft the Data Processing Agreement covering: roles (controller vs. processor), processing purposes, security measures, sub-processors, breach notification, data return/deletion.
9. Write all drafts in plain language; avoid unnecessarily dense legalese while maintaining legal precision.
10. Flag every section where a legal decision is needed with a `[LEGAL REVIEW REQUIRED]` tag and a specific question for counsel.
11. Submit all drafts to legal counsel for review. Track feedback and revisions.
12. Incorporate legal counsel's revisions. Obtain final approval.
13. Hand off approved legal pages to the developer for deployment on jtldconsulting.com.

**What NOT to Do:**
- Do not publish any legal page without review and approval from qualified legal counsel.
- Do not copy legal text from another website verbatim; this is both a legal risk and may not reflect JTLD's actual practices.
- Do not omit the `[LEGAL REVIEW REQUIRED]` tags; counsel needs to know where decisions are needed.
- Do not assume GDPR does not apply; if any EU user can access the platform, GDPR provisions should be drafted.
- Do not use impenetrable legalese where plain language is possible; users should be able to understand the documents.
- Do not treat legal pages as one-time tasks; schedule annual reviews.

**Done Condition:** All six legal documents are drafted. Every draft contains `[LEGAL REVIEW REQUIRED]` tags where legal decisions are needed. Drafts have been submitted to legal counsel. After counsel review, final approved versions exist. Approved versions have been handed off to the developer with deployment instructions. An annual review reminder is scheduled.

---

### 8. Help Documentation & FAQ Writing

**Purpose:** This skill exists to create the platform's self-service help content so that candidates and employers can resolve common questions without contacting support, reducing support ticket volume and improving user satisfaction.

**Preconditions:**
- Platform features are built or feature specifications are finalized.
- Common user questions have been collected (from stakeholder interviews, competitor FAQ analysis, or early user testing).
- Help center structure is decided (in-app help panel, dedicated /help page, or external knowledge base).
- Brand voice and tone guide is complete (Skill 2).

**Steps:**
1. Compile a master list of all user-facing features and workflows on the platform (account creation, profile editing, job search, applying, posting jobs, managing applications, billing, notifications, etc.).
2. For each feature, write 3-5 anticipated questions a user would ask.
3. Group questions into categories: Getting Started, Account Management, For Candidates, For Employers, Billing & Payments, Technical Issues.
4. For each question, write an answer that follows this structure:
   - One-sentence direct answer.
   - Step-by-step instructions if the answer involves a workflow (with numbered steps).
   - A "Still need help?" line linking to support contact.
5. Write a dedicated FAQ page for jtldconsulting.com with the top 15-20 most common questions.
6. Write contextual help tooltips for complex form fields and features (these feed into Skill 4 deliverables).
7. Write an onboarding guide for new candidates: "Getting Started as a Candidate on JTLD Consulting Inc" (step-by-step, with screenshots placeholders).
8. Write an onboarding guide for new employers: "Getting Started as an Employer on JTLD Consulting Inc" (step-by-step, with screenshot placeholders).
9. Run all help content through Hemingway (target Grade 6 for help docs -- simpler than marketing copy) and Grammarly.
10. Submit for review by a team member who did not write the content (fresh eyes test: can they follow the instructions without confusion?).
11. Publish help content to the designated location.
12. After launch, review support tickets monthly to identify new FAQ topics and update documentation.

**What NOT to Do:**
- Do not write help docs from the developer's perspective; write from the user's perspective ("Click your profile picture in the top right" not "Navigate to the user dropdown component").
- Do not assume users know platform terminology; define terms on first use.
- Do not write walls of text; use numbered steps, bullet points, and short paragraphs.
- Do not skip the "Still need help?" link; every help article must offer an escape hatch to human support.
- Do not treat help docs as a launch-once deliverable; they must be updated whenever features change.

**Done Condition:** A master list of features and anticipated questions exists. All questions have answers in the approved structure. FAQ page is written with 15-20 questions. Both onboarding guides (candidate and employer) are written. All content scores Grade 6 or below in Hemingway. A fresh-eyes review has been completed. Content is published. A monthly review process is scheduled.

---

## Learning Resources

- [Microcopy: The Complete Guide](https://www.microcopybook.com/)
- [Google's UX Writing Guide](https://developers.google.com/style)
- [Mailchimp Content Style Guide](https://styleguide.mailchimp.com/)
- [Hemingway Editor](https://hemingwayapp.com/)
- [Copyblogger](https://copyblogger.com/)
- [UX Writing Hub](https://uxwritinghub.com/)

## Tools

- Grammarly (grammar and style)
- Hemingway Editor (readability)
- Google Docs (collaborative writing)
- Notion (content planning)
- Ahrefs (keyword research)
- Canva (supporting visuals)
- Mailchimp (email template preview)
- Google Trends (topic research)
