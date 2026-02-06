# Payment / Payroll Integration Specialist

## Role Overview

The Payment/Payroll Integration Specialist is responsible for building the financial systems of the JTLD Consulting Inc platform, including contractor payments, invoicing, payroll processing, tax compliance, and integration with payment gateways.

## Priority

**Medium** - Phase 4

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Stripe | Payment processing |
| Stripe Connect | Marketplace payments |
| PayPal Business | Alternative payment method |
| QuickBooks API | Accounting integration |
| Plaid | Bank account verification |
| PDFKit / React PDF | Invoice generation |
| Node-cron | Scheduled payment jobs |

---

## Skills

---

### 1. Payment Gateway Integration

**Purpose:** This skill exists to integrate Stripe (and Stripe Connect) as the primary payment processor, handling customer management, checkout sessions, webhooks, refunds, and PCI-compliant card handling for the JTLD Consulting Inc platform.

**Preconditions:**
- Stripe account created with API keys available (publishable key and secret key).
- Stripe CLI installed locally for webhook testing (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`).
- `stripe` npm package installed in the project.
- Prisma schema includes `Payment` model with `stripePaymentId`, `amount`, `currency`, `status`, and `type` fields.
- Environment variables configured: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.

**Steps:**
1. Initialize the Stripe client in a shared module (`src/lib/stripe.ts`) using the secret key from environment variables. Never instantiate Stripe in multiple places.
2. Implement customer creation: when an employer registers, create a corresponding Stripe Customer via `stripe.customers.create({ email, name, metadata: { userId } })`. Store the `stripeCustomerId` on the User/Employer record in PostgreSQL.
3. Implement checkout sessions for premium job postings:
   - Create a `POST /api/payments/checkout` route that calls `stripe.checkout.sessions.create()` with the line items, success URL, and cancel URL.
   - Redirect the employer to the Stripe-hosted checkout page.
   - Follow this flow:
     ```
     Employer --> Select Premium Plan --> Stripe Checkout
       --> Payment Processed --> Webhook Received
       --> Job Posted as Premium --> Receipt Emailed
     ```
4. Implement the webhook handler at `POST /api/webhooks/stripe`:
   - Verify the webhook signature using `stripe.webhooks.constructEvent(body, sig, webhookSecret)`.
   - Handle these events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`, `charge.refunded`.
   - For each event, update the corresponding `Payment` record in PostgreSQL with the new status.
5. Implement Stripe Connect for contractor payouts:
   - Create Connected Accounts for contractors using `stripe.accounts.create({ type: 'express' })`.
   - Generate onboarding links via `stripe.accountLinks.create()` and redirect contractors to complete KYC.
   - Process split payments: when an employer pays, use `stripe.paymentIntents.create({ transfer_data: { destination: contractorStripeAccountId }, application_fee_amount })` to deduct the platform fee.
   - Follow this flow:
     ```
     Placement Made --> Calculate Platform Fee
       --> Deduct from Contractor Payment (Stripe Connect)
       --> Record Commission Revenue
       --> Financial Reporting
     ```
6. Implement refund handling: create a `POST /api/payments/refund` route that calls `stripe.refunds.create({ payment_intent })`. Update the Payment record status to `REFUNDED`.
7. Implement payment method management: allow employers to save and manage cards via `stripe.paymentMethods.list({ customer, type: 'card' })` and `stripe.paymentMethods.detach()`.
8. Write integration tests for every payment route using Stripe test mode (use `tok_visa` for test cards). Verify webhook signature validation rejects tampered payloads.

**What NOT to Do:**
- Do not store raw card numbers, CVVs, or sensitive payment data anywhere in the application. Stripe handles PCI compliance through tokenization.
- Do not skip webhook signature verification. Without it, anyone can POST fake events to your webhook endpoint.
- Do not use `stripe.charges.create()` directly — use Payment Intents or Checkout Sessions (charges API is legacy).
- Do not hardcode Stripe API keys in source code. Always use environment variables.
- Do not assume webhooks arrive in order or exactly once. Implement idempotency by checking `stripePaymentId` uniqueness before processing.
- Do not test with live mode keys in development. Always use Stripe test mode.

**Done Condition:**
- Stripe client is initialized in `src/lib/stripe.ts` and used consistently across all payment routes.
- Checkout sessions work end-to-end: employer starts checkout, completes payment on Stripe, webhook fires, Payment record is created in PostgreSQL with status `COMPLETED`.
- Stripe Connect onboarding works: contractor creates connected account, completes KYC, receives payouts.
- Refunds process correctly and update the Payment record to `REFUNDED`.
- All webhook events are handled and verified with signature validation.
- All payment routes have integration tests passing in CI.

---

### 2. Invoicing System

**Purpose:** This skill exists to generate, track, and deliver PDF invoices to employers for contractor billable hours, including line items, tax calculations, and status lifecycle management.

**Preconditions:**
- `Invoice` and `LineItem` Prisma models are migrated to the database:
  ```prisma
  model Invoice {
    id            String        @id @default(cuid())
    invoiceNumber String        @unique
    employerId    String
    amount        Decimal
    tax           Decimal
    total         Decimal
    status        InvoiceStatus @default(DRAFT)
    dueDate       DateTime
    paidDate      DateTime?
    lineItems     LineItem[]
    createdAt     DateTime      @default(now())
  }

  enum InvoiceStatus {
    DRAFT
    SENT
    VIEWED
    PAID
    OVERDUE
    CANCELLED
  }
  ```
- PDFKit or `@react-pdf/renderer` is installed for PDF generation.
- Email service (SendGrid or similar) is configured for invoice delivery.
- Tax rates for applicable jurisdictions (GST/HST for Canada, sales tax for US) are defined as configuration constants.

**Steps:**
1. Implement sequential invoice numbering: create a utility that generates invoice numbers in the format `INV-YYYYMM-XXXX` (e.g., `INV-202602-0001`). Store the last used number in the database or use an atomic counter to prevent duplicates under concurrency.
2. Build the `POST /api/invoices` route to create a new invoice:
   - Accept `employerId`, `lineItems` (array of `{ description, quantity, unitPrice }`), and `dueDate`.
   - Calculate subtotal (sum of `quantity * unitPrice` for all line items).
   - Calculate tax based on the employer's jurisdiction (e.g., 13% HST for Ontario).
   - Calculate total = subtotal + tax.
   - Save the invoice with status `DRAFT`.
3. Build the `GET /api/invoices/[id]/pdf` route to generate a PDF:
   - Fetch the invoice with all line items from the database.
   - Render the PDF using PDFKit or React PDF with: company header (JTLD Consulting Inc), invoice number, date, due date, employer billing address, line item table (description, quantity, unit price, line total), subtotal, tax breakdown, total, payment instructions.
   - Return the PDF as a `Content-Type: application/pdf` response.
4. Implement invoice status transitions:
   - `DRAFT` -> `SENT` (when emailed to employer).
   - `SENT` -> `VIEWED` (when employer opens the invoice link, tracked via a unique token).
   - `SENT`/`VIEWED` -> `PAID` (when payment is received, set `paidDate`).
   - `SENT`/`VIEWED` -> `OVERDUE` (when `dueDate` passes without payment, checked by a cron job).
   - Any status -> `CANCELLED` (manual cancellation by admin).
5. Implement invoice delivery: `POST /api/invoices/[id]/send` emails the PDF to the employer's billing email with the invoice attached and a link to view/pay online.
6. Implement recurring invoice automation: for ongoing contracts, create a cron job (using `node-cron`) that runs on the first of each month, calculates billable hours from approved timesheets, and generates invoices automatically. Follow this flow:
   ```
   Pay Period Ends --> Calculate Billable Hours
     --> Apply Markup/Margin --> Generate Invoice (PDF)
     --> Send to Employer --> Track Payment Status
     --> Payment Received --> Record in System
   ```
7. Build credit note support: `POST /api/invoices/[id]/credit` creates a negative-amount invoice referencing the original, adjusting the employer's balance.
8. Implement multi-currency support: store `currency` on the invoice, default to `CAD`, format amounts using `Intl.NumberFormat` with the correct currency code.

**What NOT to Do:**
- Do not allow duplicate invoice numbers. Use database unique constraints and atomic generation.
- Do not calculate tax on the client side. All tax calculations must happen server-side with validated rates.
- Do not skip the `DRAFT` status — invoices must be reviewable before sending.
- Do not send invoices without a PDF attachment. The PDF is the legal document.
- Do not hardcode tax rates. Store them in configuration so they can be updated when rates change.
- Do not assume all employers are in the same tax jurisdiction. Tax calculation must be jurisdiction-aware.

**Done Condition:**
- Invoices can be created, viewed, sent, paid, and cancelled through the API.
- Invoice numbers are sequential, unique, and never duplicated.
- PDF generation produces a professional invoice with all required fields.
- Tax calculation is correct for at least Canadian (GST/HST) and US (sales tax) jurisdictions.
- Recurring invoice cron job generates invoices monthly for active contracts.
- All invoice status transitions are enforced (no skipping states).
- Invoice delivery emails arrive with the PDF attached.

---

### 3. Contractor Payroll

**Purpose:** This skill exists to manage the complete contractor pay cycle — from timesheet submission and approval through gross/net pay calculation, deductions, payment processing via Stripe Connect, and pay stub delivery.

**Preconditions:**
- `Timesheet` Prisma model is migrated:
  ```prisma
  model Timesheet {
    id            String          @id @default(cuid())
    contractorId  String
    contractId    String
    weekStarting  DateTime
    hoursWorked   Decimal
    hourlyRate    Decimal
    status        TimesheetStatus @default(SUBMITTED)
    approvedAt    DateTime?
    createdAt     DateTime        @default(now())
  }

  enum TimesheetStatus {
    SUBMITTED
    APPROVED
    REJECTED
    PAID
  }
  ```
- Stripe Connect accounts are set up for contractors (from Skill 1).
- Pay rate data (regular rate, overtime threshold, overtime multiplier) is stored per contract.
- Tax withholding tables are available for applicable jurisdictions.

**Steps:**
1. Build the timesheet submission flow: `POST /api/timesheets` accepts `contractId`, `weekStarting`, `hoursWorked`. Validate that `hoursWorked` is positive and does not exceed 168 (hours in a week). Set status to `SUBMITTED`. Prevent duplicate submissions for the same contractor + week.
2. Build the timesheet approval flow: `PUT /api/timesheets/[id]/approve` (manager only). Validate that the timesheet is in `SUBMITTED` status. Set status to `APPROVED` and record `approvedAt`. Also build `PUT /api/timesheets/[id]/reject` with a required `reason` field.
3. Build the payroll calculation engine:
   - Fetch all `APPROVED` timesheets for the pay period.
   - For each contractor, calculate gross pay: `hoursWorked * hourlyRate`. If hours exceed overtime threshold (e.g., 40 hrs/week), apply overtime multiplier (e.g., 1.5x) to excess hours.
   - Calculate deductions: federal tax withholding, state/provincial tax withholding, CPP/EI (Canada) or Social Security/Medicare (US), any benefits deductions, any garnishments.
   - Calculate net pay: gross pay minus total deductions.
4. Process payments via Stripe Connect:
   - For each contractor, create a transfer: `stripe.transfers.create({ amount: netPayInCents, currency: 'cad', destination: contractorStripeAccountId, metadata: { payPeriod, contractorId } })`.
   - Update all processed timesheets to status `PAID`.
   - Follow this flow:
     ```
     Contractor Submits Timesheet --> Manager Approves
       --> System Calculates Gross Pay --> Apply Deductions
       --> Calculate Net Pay --> Process Payment (Stripe Connect)
       --> Generate Pay Stub --> Email Contractor
     ```
5. Generate pay stubs: for each payroll run, create a PDF pay stub showing: pay period dates, gross pay, itemized deductions (each tax type, benefits, etc.), net pay, year-to-date totals. Store the PDF and make it downloadable from the contractor dashboard.
6. Implement pay period configuration: support weekly, bi-weekly, and monthly pay periods. Store the configuration per contract. The payroll cron job should trigger based on the configured frequency.
7. Build year-end tax document generation: at tax year end, aggregate all pay data per contractor and generate T4/T4A (Canada) or W-2/1099 (US) documents. Deliver via secure download and email.
8. Build the payroll dashboard for admins: show pending timesheets, approved timesheets awaiting payment, payroll run history, total payroll amounts by period, and flagged discrepancies.

**What NOT to Do:**
- Do not process payments for unapproved timesheets. Every timesheet must be explicitly approved before it enters payroll calculation.
- Do not calculate deductions using hardcoded percentages. Tax rates change annually — use configuration tables that can be updated.
- Do not round intermediate calculations. Use `Decimal` type throughout and only round the final net pay to 2 decimal places.
- Do not allow a timesheet to be paid twice. Check the status is `APPROVED` (not `PAID`) before processing.
- Do not skip generating a pay stub for any payment. Every payment must have a corresponding pay stub.
- Do not process payroll without an audit trail. Log every calculation step with inputs and outputs.

**Done Condition:**
- Timesheets can be submitted, approved, rejected, and paid through the API.
- Payroll calculation correctly computes gross pay (including overtime), deductions, and net pay.
- Stripe Connect transfers succeed and contractor bank accounts receive funds.
- Pay stubs are generated as PDFs with full deduction breakdown for every payment.
- Year-end tax documents are generated for all contractors.
- Payroll dashboard shows accurate data for admins.
- No timesheet is paid without approval. No payment occurs without a pay stub.

---

### 4. Tax Compliance

**Purpose:** This skill exists to implement accurate tax withholding calculations, jurisdiction-aware tax rates, and regulatory reporting (CRA/IRS) so the platform's payroll and invoicing systems meet legal requirements.

**Preconditions:**
- Federal and state/provincial tax tables for the current year are obtained from CRA (Canada) or IRS (US).
- The platform stores the contractor's tax jurisdiction (province/state) and filing status.
- The contractor has provided tax identification (SIN for Canada, SSN/EIN for US) securely.
- Employee vs. contractor classification rules are documented for the jurisdictions the platform operates in.

**Steps:**
1. Create a tax calculation module (`src/lib/tax/`) with separate files for each jurisdiction: `federal-ca.ts`, `provincial-ca.ts`, `federal-us.ts`, `state-us.ts`.
2. Implement Canadian federal tax calculation: apply progressive tax brackets (15% on first $55,867, 20.5% on next $55,867, etc. — use current year brackets). Account for the basic personal amount exemption.
3. Implement Canadian provincial tax calculation: each province has different brackets (e.g., Ontario: 5.05% on first $51,446, 9.15% on next $51,454, etc.). Load the contractor's province from their profile.
4. Implement CPP and EI contributions:
   - CPP: calculate based on pensionable earnings between the basic exemption ($3,500) and the maximum pensionable earnings. Apply the current year rate (e.g., 5.95%).
   - EI: calculate based on insurable earnings up to the maximum. Apply the current year rate (e.g., 1.63%).
5. Implement US federal tax calculation: apply progressive brackets based on filing status (single, married filing jointly, etc.). Account for the standard deduction.
6. Implement US state tax calculation: for states with income tax, apply the state's bracket structure. Handle states with no income tax (TX, FL, WA, etc.) as zero withholding.
7. Implement Social Security and Medicare (FICA): Social Security at 6.2% up to the wage base limit, Medicare at 1.45% with no cap (plus 0.9% additional Medicare tax above $200k).
8. Implement GST/HST calculation for invoicing: determine the applicable rate based on the province of supply (5% GST in Alberta, 13% HST in Ontario, 15% HST in Nova Scotia, etc.).
9. Build a tax rate configuration table in the database or a versioned JSON file that can be updated annually without code changes.
10. Generate year-end reports: for Canadian contractors, produce data for T4A slips. For US contractors, produce data for 1099-NEC forms. Include: total earnings, total taxes withheld, employer information.

**What NOT to Do:**
- Do not hardcode tax rates or bracket thresholds in the calculation logic. They must be configurable and versioned by tax year.
- Do not apply employee tax rules to independent contractors, or vice versa. Classification matters for which deductions apply.
- Do not store SIN/SSN in plaintext. Encrypt at rest and mask in UI (show only last 4 digits).
- Do not assume a single jurisdiction. A contractor in Ontario pays different provincial tax than one in Alberta.
- Do not skip CPP/EI (Canada) or FICA (US) calculations. These are legally required employer/employee contributions.
- Do not generate tax documents with incorrect totals. Cross-check year-end totals against the sum of all pay stubs.

**Done Condition:**
- Tax calculation module exists with separate functions for each jurisdiction (CA federal, CA provincial, US federal, US state).
- Given a contractor's gross pay, jurisdiction, and filing status, the module returns the correct withholding amounts for all applicable taxes.
- CPP/EI (Canada) and Social Security/Medicare (US) calculations are correct, including annual maximums.
- GST/HST rates are applied correctly on invoices based on province of supply.
- Tax rate configuration can be updated without code changes.
- Year-end tax document data is generated accurately for all contractors.
- All tax calculations are unit tested with known inputs and expected outputs from CRA/IRS tax tables.

---

### 5. Financial Reporting

**Purpose:** This skill exists to build dashboards and exportable reports that give administrators real-time visibility into revenue, accounts receivable, payroll costs, cash flow, and platform commissions.

**Preconditions:**
- Payment, Invoice, and Timesheet data exists in the database.
- Admin role and authorization middleware are implemented (admin-only access).
- A charting library is installed (e.g., Recharts, Chart.js) for dashboard visualizations.
- Export format requirements are defined (CSV for spreadsheets, PDF for formal reports).

**Steps:**
1. Build a `GET /api/admin/reports/revenue` endpoint that returns total revenue by period (daily, weekly, monthly, yearly). Revenue = sum of all `Payment` records with status `COMPLETED` and type `JOB_POSTING`, `SUBSCRIPTION`, or `PLATFORM_FEE`. Group by `createdAt` date.
2. Build a `GET /api/admin/reports/accounts-receivable` endpoint that returns all unpaid invoices grouped by aging bucket: current (0-30 days), 30-60 days, 60-90 days, 90+ days. Calculate totals for each bucket.
3. Build a `GET /api/admin/reports/payroll` endpoint that returns total payroll costs by period: gross pay total, deductions total, net pay total, number of contractors paid. Group by pay period.
4. Build a `GET /api/admin/reports/cash-flow` endpoint that returns money in (payments received) vs. money out (contractor payments, refunds) by period. Calculate net cash flow.
5. Build a `GET /api/admin/reports/commissions` endpoint that returns platform fee revenue from Stripe Connect transactions. Show per-placement commission amounts and totals.
6. Build the financial dashboard page at `/admin/finance`:
   - Revenue chart (line chart, monthly trend).
   - Accounts receivable aging chart (stacked bar chart).
   - Payroll summary (cards showing current period totals).
   - Cash flow chart (dual-line chart: inflows vs. outflows).
   - Commission summary (table with per-placement breakdown).
7. Implement CSV export: `GET /api/admin/reports/[type]/export?format=csv` generates a CSV file with all data points for the requested report type and date range.
8. Implement PDF export: `GET /api/admin/reports/[type]/export?format=pdf` generates a formatted PDF report with charts rendered as images and summary tables.
9. Add date range filters to all reports: `?startDate=2026-01-01&endDate=2026-01-31`. Validate date inputs and default to the current month if not provided.
10. Implement data caching: cache report queries for 5 minutes (using Redis or in-memory cache) to avoid expensive aggregation queries on every page load.

**What NOT to Do:**
- Do not expose financial reports to non-admin users. Every report endpoint must check for admin role authorization.
- Do not calculate financial totals in the frontend. All aggregations must happen server-side in SQL/Prisma queries.
- Do not return raw database records. Reports must return pre-aggregated, summarized data.
- Do not skip date range validation. An open-ended query across all time could time out on large datasets.
- Do not mix currencies in a single report total without conversion. If multi-currency exists, show separate totals per currency.
- Do not cache reports for longer than 5 minutes. Financial data needs to be reasonably current.

**Done Condition:**
- Five report endpoints exist and return accurate data: revenue, accounts receivable, payroll, cash flow, commissions.
- Financial dashboard page renders charts and summaries correctly with real data.
- CSV and PDF exports work for all report types.
- Date range filtering works on all reports with proper validation.
- All report endpoints are admin-only (return 403 for non-admin users).
- Reports load within 2 seconds (cached) for typical data volumes.

---

### 6. Security and PCI Compliance

**Purpose:** This skill exists to ensure that all financial data handling meets PCI DSS requirements, payment information is tokenized (never stored raw), audit trails exist for every transaction, and access to financial operations is restricted by role.

**Preconditions:**
- Stripe is the payment processor (Stripe handles PCI Level 1 compliance for card data).
- The application never receives or stores raw card numbers (uses Stripe Elements or Checkout).
- Database encryption at rest is enabled on the PostgreSQL instance.
- Role-based access control (RBAC) is implemented via NextAuth.js.

**Steps:**
1. Verify that no payment form in the application collects card numbers directly. All card input must use Stripe Elements (`@stripe/react-stripe-js`) or Stripe Checkout (hosted page). Audit every form in the codebase that touches payment.
2. Implement tokenization: when a customer saves a payment method, store only the Stripe `paymentMethodId` (e.g., `pm_xxx`) in the database, never the card number. Display only the last 4 digits and card brand in the UI.
3. Implement an audit trail for all financial transactions:
   - Create an `AuditLog` table with: `id`, `action` (PAYMENT_CREATED, REFUND_ISSUED, INVOICE_SENT, etc.), `performedBy` (userId), `targetId` (paymentId/invoiceId), `metadata` (JSON), `createdAt`.
   - Log every create, update, and delete operation on Payment, Invoice, and Timesheet records.
   - Audit logs must be append-only — no updates or deletes allowed on audit records.
4. Implement access control for financial operations:
   - Only admins can: view all invoices, process payroll, issue refunds, view financial reports, export financial data.
   - Employers can: view their own invoices, make payments, see their payment history.
   - Contractors can: submit timesheets, view their own pay stubs, view their own payment history.
   - No role can: view another user's financial data, modify completed payments, delete audit logs.
5. Encrypt sensitive financial fields at rest: contractor bank account details (if stored), tax identification numbers. Use application-level encryption with a key stored in environment variables, separate from the database encryption.
6. Implement rate limiting on payment endpoints: no more than 10 payment attempts per user per minute. Return 429 with `Retry-After` header.
7. Configure Stripe webhook endpoints to accept requests only from Stripe's IP ranges (or rely on signature verification as implemented in Skill 1).
8. Conduct a security audit: review all financial endpoints for authorization checks, input validation, SQL injection protection (Prisma parameterizes by default), and error message safety (no leaking of internal IDs or stack traces).

**What NOT to Do:**
- Do not store raw card numbers, CVVs, or full bank account numbers in the database.
- Do not allow any user to delete or modify audit log entries.
- Do not expose internal payment IDs (Stripe payment intent IDs) in URLs or client-facing error messages.
- Do not skip authorization checks on any financial endpoint — even if "it's behind the admin nav."
- Do not log sensitive payment data (card numbers, CVVs, bank account numbers) in application logs.
- Do not disable Stripe webhook signature verification in production.

**Done Condition:**
- No raw card data exists anywhere in the codebase or database. Only Stripe token references are stored.
- Audit log table exists and captures every financial transaction with actor, action, and timestamp.
- Audit logs are append-only — no update/delete operations are possible.
- RBAC is enforced: unauthorized access to financial endpoints returns 403.
- Rate limiting is active on payment endpoints.
- Security audit is completed with findings documented and all critical issues resolved.

---

## Database Models for Payments

```prisma
model Invoice {
  id            String        @id @default(cuid())
  invoiceNumber String        @unique
  employerId    String
  amount        Decimal
  tax           Decimal
  total         Decimal
  status        InvoiceStatus @default(DRAFT)
  dueDate       DateTime
  paidDate      DateTime?
  lineItems     LineItem[]
  createdAt     DateTime      @default(now())
}

model Payment {
  id              String        @id @default(cuid())
  stripePaymentId String        @unique
  amount          Decimal
  currency        String        @default("CAD")
  status          PaymentStatus
  type            PaymentType
  paidAt          DateTime?
  createdAt       DateTime      @default(now())
}

model Timesheet {
  id            String          @id @default(cuid())
  contractorId  String
  contractId    String
  weekStarting  DateTime
  hoursWorked   Decimal
  hourlyRate    Decimal
  status        TimesheetStatus @default(SUBMITTED)
  approvedAt    DateTime?
  createdAt     DateTime        @default(now())
}

enum InvoiceStatus {
  DRAFT
  SENT
  VIEWED
  PAID
  OVERDUE
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentType {
  JOB_POSTING
  SUBSCRIPTION
  CONTRACTOR_PAY
  PLATFORM_FEE
}

enum TimesheetStatus {
  SUBMITTED
  APPROVED
  REJECTED
  PAID
}
```

## Learning Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Connect Guide](https://stripe.com/docs/connect)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [CRA Payroll Guide (Canada)](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll.html)
- [IRS Employer Tax Guide (US)](https://www.irs.gov/publications/p15)
- [PCI DSS Requirements](https://www.pcisecuritystandards.org/)

## Tools

- Stripe Dashboard (payment management)
- Stripe CLI (local webhook testing)
- Stripe Test Mode (development testing)
- PDFKit or React PDF (invoice generation)
- QuickBooks (accounting integration)
- Xero (alternative accounting)
- Postman (API testing)
