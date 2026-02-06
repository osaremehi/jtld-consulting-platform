# Security Engineer

## Role Overview

The Security Engineer is responsible for protecting the JTLD Consulting Inc platform, its users, and their data from threats and vulnerabilities. This role ensures compliance with privacy regulations and implements security best practices across the entire application stack.

## Priority

**High** - Phase 2

## Core Technologies

| Technology | Purpose |
|------------|---------|
| OWASP ZAP | Vulnerability scanning |
| Snyk | Dependency vulnerability scanning |
| Helmet.js | HTTP security headers |
| bcrypt | Password hashing |
| JWT | Token-based authentication |
| Cloudflare | WAF and DDoS protection |
| ESLint Security Plugin | Code security linting |
| SonarQube | Code quality and security analysis |

---

## Skills

---

### 1. Injection Prevention (SQL, NoSQL, Command, LDAP)

**Purpose:** This skill exists to eliminate all injection attack vectors in the JTLD Consulting Inc platform by enforcing parameterized queries, input sanitization, and Content Security Policy across every data entry point.

**Preconditions:**
- Prisma ORM is configured as the database access layer (Prisma uses parameterized queries by default).
- All API routes are identified and documented.
- A Zod validation schema exists or will be created for every API endpoint that accepts user input.
- ESLint with the security plugin is installed in the project.

**Steps:**
1. Audit every API route in `app/api/` and every Server Action for raw SQL usage. Search the codebase for `$queryRaw`, `$executeRaw`, and `$queryRawUnsafe`. If raw SQL is used, confirm all user-supplied values are passed as parameterized template literal arguments, never concatenated strings.
2. Create or verify Zod schemas for every API endpoint that accepts input. Each schema must define explicit types, maximum lengths, and allowed patterns. Example: `z.string().max(255).regex(/^[a-zA-Z0-9\s-]+$/)` for a job title field.
3. Apply `z.parse()` or `z.safeParse()` at the top of every API route handler and Server Action, before any business logic executes. Reject invalid input with a 400 response immediately.
4. Configure Content Security Policy (CSP) headers in `next.config.js` or middleware to restrict script sources, style sources, and frame ancestors. Start with a strict policy and loosen only for verified third-party integrations (e.g., analytics scripts).
5. Sanitize all user-generated content that will be rendered as HTML (e.g., rich text job descriptions) using a library like `DOMPurify` or `sanitize-html`. Strip all `<script>`, `<iframe>`, `onclick`, and other executable tags/attributes.
6. Run OWASP ZAP automated scan against the staging environment to detect any remaining injection vulnerabilities. Address all high and medium findings.
7. Add an ESLint security rule (`eslint-plugin-security`) to flag potential injection patterns (e.g., `eval()`, template string concatenation in queries) and fail the CI build on violations.

**What NOT to Do:**
- Do not use `$queryRawUnsafe` under any circumstances. If raw SQL is needed, use `$queryRaw` with parameterized template literals.
- Do not trust client-side validation as a security measure. All validation must be duplicated server-side.
- Do not allow user-generated HTML to render without sanitization, even in admin-only views.
- Do not set CSP to `unsafe-inline` or `unsafe-eval` unless absolutely required by a verified third-party library, and document the exception.
- Do not assume Prisma's default parameterization covers all cases; raw queries and custom SQL fragments must be manually verified.

**Done Condition:** Every API route and Server Action validates input with Zod before processing. No raw SQL concatenation exists in the codebase. CSP headers are configured and active in production. User-generated HTML is sanitized before rendering. OWASP ZAP scan returns zero high or medium injection findings. ESLint security plugin is enabled and passing in CI.

---

### 2. Authentication Security

**Purpose:** This skill exists to implement bulletproof authentication for the JTLD Consulting Inc platform using NextAuth.js, bcrypt password hashing, brute-force protection, secure session management, and CSRF prevention.

**Preconditions:**
- NextAuth.js is installed and configured with at least one provider (credentials, Google, LinkedIn).
- Prisma adapter for NextAuth.js is set up and connected to the PostgreSQL database.
- The `User`, `Account`, `Session`, and `VerificationToken` models exist in `schema.prisma`.
- bcrypt (or argon2) library is installed.

**Steps:**
1. Configure password hashing in the credentials provider: hash passwords with bcrypt using a minimum of 12 salt rounds. Verify the hash comparison uses `bcrypt.compare()` (timing-safe comparison).
2. Enforce password strength requirements at registration: minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character. Implement this as a Zod schema shared between client and server.
3. Implement account lockout: after 5 consecutive failed login attempts for the same email, lock the account for 15 minutes. Store the attempt count and lockout timestamp in the database. Reset the counter on successful login.
4. Configure secure session cookies in NextAuth.js options:
   ```typescript
   cookies: {
     sessionToken: {
       name: '__Secure-next-auth.session-token',
       options: {
         httpOnly: true,
         sameSite: 'strict',
         path: '/',
         secure: true, // HTTPS only
       },
     },
   },
   ```
5. Enable CSRF protection: NextAuth.js includes built-in CSRF token handling. Verify the CSRF token is present in the sign-in form and validated on POST requests. For custom forms outside NextAuth, use the `next-auth/csrf` token or implement a custom double-submit cookie pattern.
6. Configure session timeout: set `session.maxAge` in NextAuth.js to 24 hours for regular users and 1 hour for admin sessions. Implement idle timeout on the client side that logs out after 30 minutes of inactivity.
7. Implement OAuth security for social login providers (Google, LinkedIn): validate the `state` parameter, verify `id_token` signatures, restrict allowed OAuth callback URLs to the exact production and preview domains.
8. Add rate limiting on the `/api/auth/signin` and `/api/auth/callback` endpoints: maximum 5 requests per minute per IP address using a Redis-based rate limiter.
9. Log all authentication events (login success, login failure, logout, password change, account lockout) to the security audit log with timestamp, IP address, and user agent. Do not log passwords or tokens.

**What NOT to Do:**
- Do not use fewer than 12 bcrypt salt rounds. Lower values are computationally trivial to brute-force.
- Do not store plaintext passwords, password hints, or reversible password encodings anywhere in the database.
- Do not expose whether an email exists in the system through login error messages. Use a generic "Invalid email or password" message for both cases.
- Do not set `sameSite: 'none'` on session cookies unless cross-site auth is explicitly required and CSRF is mitigated by other means.
- Do not skip rate limiting on auth endpoints. Credential stuffing attacks will overwhelm the system.
- Do not log full request bodies on auth routes; they contain passwords.

**Done Condition:** Passwords are hashed with bcrypt (12+ rounds). Account lockout activates after 5 failed attempts. Password strength validation is enforced on registration and password change. Session cookies are configured with `httpOnly`, `secure`, and `sameSite: 'strict'`. CSRF tokens are validated on all state-changing requests. OAuth providers are configured with restricted callback URLs. Rate limiting is active on auth endpoints. Authentication events are logged to the audit log without sensitive data.

---

### 3. Role-Based Access Control (RBAC)

**Purpose:** This skill exists to enforce that candidates, employers, and admins can only access the resources and perform the actions appropriate to their role, preventing privilege escalation and unauthorized data access.

**Preconditions:**
- The `User` model in `schema.prisma` has a `role` field with an enum type: `CANDIDATE`, `EMPLOYER`, `ADMIN`.
- NextAuth.js session includes the user's `role` (extended via the `session` callback).
- All API routes and pages requiring protection are identified.

**Steps:**
1. Define the permission matrix:
   - `CANDIDATE`: view/search jobs, view own profile, edit own profile, upload resume, apply to jobs, view own applications.
   - `EMPLOYER`: post jobs, edit own jobs, view candidates who applied to own jobs, manage company profile.
   - `ADMIN`: all candidate and employer permissions, plus: manage all users, manage all jobs, view platform analytics, manage system settings.
2. Create a reusable authorization middleware function (e.g., `withAuth(handler, allowedRoles)`) that wraps API route handlers. This middleware must:
   - Retrieve the session via `getServerSession()`.
   - Return 401 if no session exists.
   - Return 403 if the user's role is not in the `allowedRoles` array.
   - Pass the authenticated user object to the handler.
3. Apply the authorization middleware to every API route. Example: `POST /api/jobs` requires `['EMPLOYER', 'ADMIN']`. `GET /api/admin/users` requires `['ADMIN']`.
4. Implement resource ownership checks: beyond role checks, verify that users can only modify their own resources. Example: `PUT /api/jobs/[id]` must confirm `job.employerId === session.user.id` unless the user is an `ADMIN`.
5. Protect client-side routes: use a `useSession()` check in page components or a layout-level middleware (`middleware.ts`) that redirects unauthorized users. Example: `/dashboard/employer` redirects `CANDIDATE` users to `/dashboard/candidate`.
6. Protect server-rendered pages: in Server Components, call `getServerSession()` and verify the role before rendering. Return `notFound()` or `redirect()` for unauthorized access.
7. Audit all existing API routes and pages: create a spreadsheet mapping every route to its required role(s). Verify each one has the authorization check. Flag any route that is unprotected.

**What NOT to Do:**
- Do not rely solely on client-side role checks (hiding UI elements). The API must independently enforce authorization on every request.
- Do not use a single "isAuthenticated" check where role-specific access is required. Authentication is not authorization.
- Do not hardcode user IDs or roles in application logic. Always read from the session.
- Do not allow role escalation through user-editable fields. The `role` field must only be changeable by admins via a dedicated admin endpoint.
- Do not skip ownership checks. A valid `EMPLOYER` role does not mean they can edit another employer's job.

**Done Condition:** Every API route has an authorization middleware that checks both role and (where applicable) resource ownership. Client-side routes redirect unauthorized users. Server-rendered pages verify roles before rendering. The permission matrix is documented and matches the implementation. No API route is accessible without the correct role. Attempting to access another user's resources returns 403.

---

### 4. HTTP Security Headers

**Purpose:** This skill exists to configure all recommended HTTP security headers on the JTLD Consulting Inc platform to mitigate clickjacking, MIME-type sniffing, XSS, and protocol downgrade attacks.

**Preconditions:**
- The Next.js application has a `next.config.js` file.
- The application is deployed on Vercel behind Cloudflare.
- A list of third-party scripts and resources is available (analytics, fonts, CDN assets) for CSP configuration.

**Steps:**
1. Add security headers in `next.config.js` using the `headers()` configuration:
   ```javascript
   async headers() {
     return [
       {
         source: '/(.*)',
         headers: [
           { key: 'X-Content-Type-Options', value: 'nosniff' },
           { key: 'X-Frame-Options', value: 'DENY' },
           { key: 'X-XSS-Protection', value: '0' }, // Disabled; CSP is the modern replacement
           { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
           { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
           {
             key: 'Strict-Transport-Security',
             value: 'max-age=63072000; includeSubDomains; preload',
           },
           {
             key: 'Content-Security-Policy',
             value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.sentry.io; frame-ancestors 'none';",
           },
         ],
       },
     ];
   },
   ```
2. Tailor the Content-Security-Policy to the exact third-party resources used: add Vercel Analytics domain, Sentry DSN domain, Google Fonts domain, and any OAuth provider domains. Remove `unsafe-inline` for scripts if possible by using nonces or hashes.
3. Verify headers are present: deploy to staging and inspect response headers using browser DevTools (Network tab), `curl -I`, or Mozilla Observatory (`observatory.mozilla.org`).
4. Test for regressions: after adding strict CSP, navigate every page and feature in the application. Check the browser console for CSP violation reports. Fix legitimate violations by adding the required source to the CSP directive.
5. Set up CSP violation reporting: add `report-uri` or `report-to` directive pointing to Sentry or a dedicated CSP report endpoint so violations in production are logged and tracked.
6. Run Mozilla Observatory scan. Target a score of A+ (125+). Address any findings.
7. Run SSL Labs test to confirm HSTS is detected and the SSL configuration scores A or A+.

**What NOT to Do:**
- Do not skip the `Content-Security-Policy` header. It is the single most effective defense against XSS.
- Do not set `X-Frame-Options` to `SAMEORIGIN` unless the application actually uses iframes internally. Use `DENY` by default.
- Do not add `unsafe-eval` to CSP unless a third-party library explicitly requires it, and document the exception with a plan to remove it.
- Do not forget to test the CSP in all environments (development, preview, production); each may load different third-party resources.
- Do not set HSTS `max-age` to a low value in production. Use at least 2 years (63072000 seconds) and include `preload`.

**Done Condition:** All security headers are configured and verified in the production response. Mozilla Observatory score is A+ or A. No CSP violations appear in the browser console during full-site testing. CSP violation reporting is active and sending reports to Sentry. SSL Labs confirms HSTS is active. The `Permissions-Policy` restricts unused browser APIs.

---

### 5. API Security (Rate Limiting, CORS, Input Validation)

**Purpose:** This skill exists to secure all API endpoints on the JTLD Consulting Inc platform against abuse, data exfiltration, and malformed input by implementing rate limiting, CORS restrictions, request size limits, and comprehensive input validation.

**Preconditions:**
- Redis is available for rate limiting state (Upstash or equivalent).
- Zod is installed for schema validation.
- All API routes are catalogued with their expected request/response shapes.
- CORS requirements are defined (which origins need API access).

**Steps:**
1. Implement rate limiting using a Redis-backed middleware (e.g., `@upstash/ratelimit` or custom implementation):
   - Auth endpoints (`/api/auth/*`): 5 requests per minute per IP.
   - Search/listing endpoints: 60 requests per minute per IP.
   - Write endpoints (create job, submit application): 20 requests per minute per authenticated user.
   - File upload endpoints: 10 requests per hour per authenticated user.
   - Return `429 Too Many Requests` with a `Retry-After` header when limits are exceeded.
2. Configure CORS in Next.js middleware or API route handlers:
   ```typescript
   const allowedOrigins = [
     'https://app.jtldconsulting.com',
     'https://www.jtldconsulting.com',
     process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
   ].filter(Boolean);
   ```
   - Set `Access-Control-Allow-Origin` to the specific requesting origin (not `*`).
   - Set `Access-Control-Allow-Methods` to only the methods the endpoint supports.
   - Set `Access-Control-Allow-Credentials: true` for authenticated endpoints.
   - Respond to preflight `OPTIONS` requests with appropriate headers and a 204 status.
3. Enforce request size limits: set `bodyParser.sizeLimit` in Next.js API route config to `1mb` for JSON endpoints and `10mb` for file upload endpoints. Reject oversized payloads with 413.
4. Validate all request inputs with Zod schemas at the top of every handler:
   - Path parameters: validate IDs are valid UUIDs or integers.
   - Query parameters: validate pagination (positive integers, max page size 100), filter values (enum membership), sort fields (allowlist).
   - Request body: validate every field with type, length, format, and required/optional constraints.
   - Return 400 with a structured error response listing all validation failures.
5. Implement webhook signature verification for any incoming webhooks (Stripe, third-party integrations): validate the `X-Signature` or `X-Hub-Signature-256` header against the webhook payload using HMAC-SHA256.
6. Add API key management for any external API consumers: generate keys via the admin panel, store hashed keys in the database, validate on each request, and support key rotation without downtime.
7. Sanitize all error responses: return structured error objects (`{ error: string, code: string }`) without stack traces, database column names, or internal implementation details. In production, set `NODE_ENV=production` to suppress Next.js debug pages.

**What NOT to Do:**
- Do not set CORS to `Access-Control-Allow-Origin: *` on authenticated endpoints. This allows any website to make credentialed requests.
- Do not skip rate limiting on any write endpoint. Automated abuse (spam job postings, fake applications) will degrade the platform.
- Do not return raw Prisma/database errors to the client. They expose table names, column names, and constraint details.
- Do not validate only the request body while ignoring query parameters and path parameters. All input vectors are attack surfaces.
- Do not hardcode API keys in the codebase. Store them in environment variables or a secrets manager.
- Do not assume authenticated users are safe; rate limit them too, just with higher thresholds.

**Done Condition:** Rate limiting is active on all endpoint categories with appropriate thresholds. CORS allows only approved origins. Request size limits are enforced. Every API endpoint validates all inputs (body, query, path) with Zod. Error responses contain no internal details. Webhook signatures are verified. API keys (if applicable) are hashed and rotatable. A 429 response is returned when rate limits are exceeded, with a `Retry-After` header.

---

### 6. Secure File Upload and Storage

**Purpose:** This skill exists to implement safe file upload handling for resumes and documents on the JTLD Consulting Inc platform, preventing malicious file uploads, ensuring secure storage, and controlling access via time-limited signed URLs.

**Preconditions:**
- S3 bucket is provisioned with encryption and versioning (DevOps Skill 2 completed).
- IAM credentials for S3 are stored in environment variables.
- The application has a file upload UI component (drag-and-drop or file input).
- Zod schemas exist for the upload API endpoint.

**Steps:**
1. Validate file type on both client and server: accept only `.pdf`, `.doc`, `.docx`, `.txt`, and `.rtf` for resumes. Check the file extension and the MIME type. Additionally, read the file's magic bytes (file signature) to confirm the actual file type matches the declared MIME type (prevents `.exe` renamed to `.pdf`).
2. Enforce file size limits: maximum 5MB per file for resumes. Reject oversized files with a 413 response before uploading to S3.
3. Generate a unique, non-guessable file name for storage: use `crypto.randomUUID()` combined with the original file extension. Example: `resumes/a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf`. Never store files with the original user-provided filename (prevents path traversal and name collision).
4. Upload the file to S3 using the AWS SDK v3 `PutObjectCommand`. Set metadata including the original filename (for display), the uploading user's ID, and the upload timestamp. Enable server-side encryption on the object.
5. Store the S3 object key and metadata in the database (e.g., a `Resume` or `Document` table with columns: `id`, `userId`, `s3Key`, `originalFilename`, `mimeType`, `sizeBytes`, `uploadedAt`).
6. Generate pre-signed GET URLs for file access with a 15-minute expiration. Never expose the raw S3 URL. The API route that generates the pre-signed URL must verify the requesting user has permission to access the file (owner or admin).
7. Scan uploaded files for malware: integrate a virus scanning service (ClamAV via Lambda, or a managed service). Mark files as `pending_scan`, `clean`, or `infected` in the database. Only generate pre-signed URLs for `clean` files. Quarantine `infected` files.
8. Implement file deletion: when a user deletes their resume, delete the S3 object and the database record. Support GDPR right-to-erasure by ensuring complete removal.

**What NOT to Do:**
- Do not store uploaded files on the application server's filesystem. Use S3 exclusively.
- Do not use the user-provided filename as the S3 key. It enables path traversal attacks and filename collisions.
- Do not generate pre-signed URLs without verifying the requesting user's permission to access that file.
- Do not skip magic-byte validation. MIME types and file extensions can be spoofed trivially.
- Do not serve uploaded files directly from a public S3 URL. All access must go through pre-signed URLs with short expiration.
- Do not skip virus scanning. A malicious PDF can exploit client-side PDF viewers.

**Done Condition:** File uploads validate type (extension, MIME, magic bytes) and size (5MB max) on both client and server. Files are stored in S3 with unique, random names and server-side encryption. The database stores file metadata with user ownership. Pre-signed URLs are generated with 15-minute expiration and permission checks. Virus scanning runs on all uploads and infected files are quarantined. File deletion removes both the S3 object and the database record.

---

### 7. Data Protection and Privacy Compliance (GDPR/PIPEDA/CCPA)

**Purpose:** This skill exists to ensure the JTLD Consulting Inc platform complies with GDPR, PIPEDA, and CCPA privacy regulations by implementing consent management, data minimization, right-to-erasure, data portability, and proper data retention policies.

**Preconditions:**
- The database schema includes tables/columns for storing user consent records.
- Legal counsel has reviewed and approved the privacy policy text.
- A list of all PII fields stored in the database is documented (name, email, phone, address, resume content, IP address, etc.).
- Cookie consent requirements are defined for the target jurisdictions.

**Steps:**
1. Implement a cookie consent banner: display on first visit, allow users to accept or reject non-essential cookies (analytics, marketing). Store consent choice in a database record linked to the user (if authenticated) or in a first-party cookie (if anonymous). Block non-essential cookies and tracking scripts until consent is granted.
2. Build consent tracking in the database: create a `Consent` table with columns `id`, `userId`, `type` (e.g., `marketing_emails`, `analytics_cookies`, `data_processing`), `granted` (boolean), `grantedAt`, `revokedAt`, `ipAddress`, `userAgent`. Record every consent grant and revocation as an immutable audit trail.
3. Implement Right to Erasure (data deletion):
   - Build a "Delete My Account" feature in user settings.
   - On request: delete the user's profile data, applications, uploaded resumes (S3 + database), and anonymize or delete any records that reference the user.
   - For data that must be retained for legal reasons (e.g., financial records), anonymize the PII fields instead of deleting the record.
   - Send a confirmation email after deletion is complete.
   - Process deletion requests within 30 days (GDPR requirement).
4. Implement Data Portability (data export):
   - Build a "Download My Data" feature in user settings.
   - Generate a JSON or CSV export containing: profile information, application history, uploaded documents (as download links), consent records, and activity log.
   - Deliver the export as a downloadable ZIP file via a time-limited pre-signed URL.
5. Apply data minimization: audit every database table and remove any columns that store data not required for the application's function. Example: do not store a user's full address if only city and country are needed for job matching.
6. Configure data retention policies:
   - Active user data: retained indefinitely while the account is active.
   - Inactive accounts (no login for 24 months): send a reminder email, then delete after 30 additional days if no action.
   - Job applications for filled positions: anonymize candidate PII after 12 months.
   - Server logs: retain for 90 days, then delete.
7. Mask PII in application logs: implement a log sanitizer that redacts email addresses, phone numbers, and names from all log output. Replace with masked values (e.g., `j***@e***.com`).
8. Publish the privacy policy at `/privacy` and the terms of service at `/terms`. Link to the privacy policy in the registration form, requiring acknowledgment before account creation.

**What NOT to Do:**
- Do not collect user data that is not explicitly required for the platform's function (data minimization principle).
- Do not store consent as a single boolean. Track each consent type independently with timestamps and audit trail.
- Do not skip anonymization of retained records. Deleting PII from active records while leaving it in backups or logs is not compliant.
- Do not treat data deletion as optional or "best effort." Deletion requests must be processed within 30 days.
- Do not block account registration behind analytics cookie consent. Only essential cookies are required for functionality.
- Do not log PII in any environment (development, staging, or production).

**Done Condition:** Cookie consent banner is live and blocks non-essential cookies until consent is granted. Consent records are stored with full audit trail. "Delete My Account" removes or anonymizes all user PII within 30 days and deletes S3 files. "Download My Data" generates a complete export. Data retention policies are automated (inactive account cleanup, log rotation). PII is masked in all logs. Privacy policy is published and linked at registration.

---

### 8. Dependency Vulnerability Scanning

**Purpose:** This skill exists to continuously monitor and remediate known vulnerabilities in third-party npm packages used by the JTLD Consulting Inc platform, preventing supply-chain attacks and exploitation of known CVEs.

**Preconditions:**
- The project uses npm with a `package-lock.json` committed to the repository.
- GitHub Actions CI/CD pipeline is configured (DevOps Skill 4 completed).
- A Snyk account is created (free tier is sufficient for open-source scanning).
- Team members have permissions to approve and merge dependency update PRs.

**Steps:**
1. Run `npm audit` locally and review the output. Categorize findings by severity: critical, high, moderate, low. Fix critical and high vulnerabilities immediately with `npm audit fix`. For vulnerabilities that require a major version upgrade, evaluate the upgrade path and test thoroughly.
2. Add `npm audit --audit-level=high` to the CI/CD pipeline as a required step. Configure it to fail the build if any high or critical vulnerabilities are found.
3. Install and configure Snyk:
   - Run `snyk auth` to authenticate.
   - Run `snyk test` to scan the project.
   - Run `snyk monitor` to register the project for continuous monitoring.
   - Configure Snyk to create automatic pull requests for fixable vulnerabilities.
4. Enable GitHub Dependabot: create `.github/dependabot.yml` to automatically open PRs for outdated dependencies:
   ```yaml
   version: 2
   updates:
     - package-ecosystem: "npm"
       directory: "/"
       schedule:
         interval: "weekly"
       open-pull-requests-limit: 10
       labels:
         - "dependencies"
       reviewers:
         - "jtld-team"
   ```
5. Establish a dependency review process: before merging any dependency update PR, verify the changelog for breaking changes, run the full test suite, and check the bundle size impact.
6. Pin critical dependencies to exact versions in `package.json` (remove `^` or `~` prefixes) for security-sensitive packages like `next-auth`, `bcrypt`, `prisma`. Use ranges for less sensitive packages.
7. Audit the `package-lock.json` for duplicate or unnecessary transitive dependencies. Use `npm dedupe` to reduce the dependency tree.
8. Schedule a monthly manual review: check for deprecated packages, packages with no recent maintenance, and packages flagged by Snyk or npm audit that have no fix available (evaluate alternatives).

**What NOT to Do:**
- Do not ignore `npm audit` warnings with `--force` or `--legacy-peer-deps` without understanding the implications. Each suppression must be documented and justified.
- Do not merge Dependabot PRs without running the test suite. Automated updates can introduce breaking changes.
- Do not use packages with zero maintenance (no commits in 2+ years, no response to issues) for security-critical functionality.
- Do not commit the `node_modules` directory. Always rely on `package-lock.json` and `npm ci` for reproducible installs.
- Do not assume a passing `npm audit` means the project is secure. It only checks known CVEs in the npm registry; zero-day vulnerabilities and malicious packages require additional vigilance.

**Done Condition:** `npm audit` returns zero high or critical vulnerabilities. Snyk is monitoring the project and auto-creating fix PRs. Dependabot is configured and opening weekly dependency update PRs. The CI/CD pipeline fails on high/critical vulnerabilities. A monthly manual review process is documented and scheduled. Critical packages are pinned to exact versions.

---

### 9. Security Testing (SAST, DAST, Penetration Testing)

**Purpose:** This skill exists to proactively discover vulnerabilities in the JTLD Consulting Inc platform through static analysis, dynamic scanning, and manual penetration testing before attackers do.

**Preconditions:**
- The application is deployable to a staging environment.
- OWASP ZAP is installed (for DAST).
- SonarQube or SonarCloud account exists (for SAST).
- ESLint with security plugins is configured.
- A test user account exists for each role (candidate, employer, admin) in staging.

**Steps:**
1. Configure Static Application Security Testing (SAST):
   - Set up SonarQube (self-hosted) or SonarCloud (hosted) with the project repository.
   - Configure the analysis to scan TypeScript and JavaScript files.
   - Add a SonarQube step to the CI/CD pipeline that runs on every PR.
   - Review and triage all findings: fix security hotspots and vulnerabilities rated "High" or "Critical." Mark false positives with justification.
2. Configure Dynamic Application Security Testing (DAST):
   - Deploy the application to a staging environment.
   - Configure OWASP ZAP to spider the staging application starting from the login page.
   - Run an authenticated scan: configure ZAP with a valid session cookie for each user role (candidate, employer, admin).
   - Run a full active scan (injection tests, XSS probes, CSRF checks).
   - Export the report and triage findings by severity.
3. Perform manual penetration testing on critical flows:
   - Authentication: attempt credential stuffing, session hijacking, CSRF on login/logout.
   - Authorization: attempt to access another user's data by manipulating IDs in URLs and API requests. Attempt privilege escalation (candidate accessing employer endpoints).
   - File upload: attempt to upload executable files (.exe, .js, .php) disguised as PDFs. Attempt path traversal in filenames.
   - Input injection: attempt SQL injection, XSS, and command injection on all input fields and URL parameters.
   - Business logic: attempt to apply to a job twice, submit negative salary values, create job postings as a candidate.
4. Schedule security scans:
   - SAST (SonarQube): on every PR (automated).
   - DAST (OWASP ZAP): weekly against staging (automated via CI/CD or cron job).
   - Manual penetration testing: quarterly or before major releases.
5. Create a vulnerability tracking system: log all findings in a security issue tracker (GitHub Issues with "security" label or a dedicated tool). Track severity, affected component, remediation status, and assigned owner.
6. Establish a fix SLA: critical vulnerabilities fixed within 24 hours, high within 7 days, medium within 30 days, low within 90 days.

**What NOT to Do:**
- Do not run DAST scans (especially active scans) against production. They generate malicious-looking traffic and can corrupt data.
- Do not dismiss "informational" findings without review. Some reveal attack surface that could be chained with other vulnerabilities.
- Do not treat passing CI security checks as proof the application is secure. Automated tools have blind spots; manual testing is essential.
- Do not delay fixing critical vulnerabilities. A known unpatched critical vulnerability is an open invitation.
- Do not share penetration test reports outside the security team without redacting sensitive details (exploitable URLs, credentials used).

**Done Condition:** SonarQube runs on every PR and blocks merging on critical/high findings. OWASP ZAP runs weekly against staging with authenticated scans for all roles. Manual penetration testing has been performed on all critical flows and findings are documented. A vulnerability tracker exists with all findings logged, assigned, and tracked against the fix SLA. No critical or high vulnerabilities remain unresolved.

---

### 10. Incident Response

**Purpose:** This skill exists to establish a documented, rehearsed process for detecting, containing, and recovering from security incidents (data breaches, unauthorized access, service compromise) affecting the JTLD Consulting Inc platform.

**Preconditions:**
- Monitoring and alerting are in place (DevOps Skill 6 completed).
- Security logging is active (authentication events, access control violations, error spikes).
- Contact information for the incident response team is documented and accessible.
- Legal counsel is available for data breach notification requirements.

**Steps:**
1. Create the Incident Response Plan document with these sections:
   - **Detection**: How incidents are identified (Sentry alerts, monitoring alerts, user reports, security scan findings).
   - **Classification**: Severity levels (P1: data breach/system compromise, P2: unauthorized access/vulnerability exploited, P3: suspicious activity/failed attack, P4: informational/near-miss).
   - **Roles**: Incident Commander (coordinates response), Technical Lead (investigates and remediates), Communications Lead (notifies stakeholders), Legal (advises on regulatory obligations).
   - **Escalation**: Who to notify at each severity level and within what timeframe (P1: entire team within 15 minutes; P2: security lead within 1 hour).
2. Define containment procedures for common scenarios:
   - Compromised user account: force password reset, invalidate all sessions, review recent activity.
   - Compromised API key or secret: rotate the key immediately, audit usage logs, deploy the new key to all environments.
   - Data breach (database access): take the database offline if active exfiltration is detected, rotate all database credentials, assess the scope of exposed data.
   - Malicious file upload: quarantine the file in S3, block the uploading user's account, scan all recent uploads.
3. Define data breach notification procedures:
   - GDPR: notify the supervisory authority within 72 hours and affected users "without undue delay."
   - PIPEDA: notify the Privacy Commissioner and affected individuals as soon as feasible.
   - Prepare notification templates (email to users, statement for website, report to regulators) with placeholders for incident-specific details.
4. Create a forensic investigation checklist:
   - Preserve all logs (do not rotate or delete during investigation).
   - Capture database query logs for the incident timeframe.
   - Review access logs (Cloudflare, Vercel, application) for the affected endpoints.
   - Identify the attack vector (how did the attacker gain access?).
   - Determine the scope (what data was accessed/exfiltrated?).
   - Determine the timeline (when did the incident start and when was it contained?).
5. Conduct a post-incident review within 48 hours of resolution:
   - Document a timeline of events.
   - Identify the root cause.
   - List remediation actions taken and remaining actions needed.
   - Update the Incident Response Plan based on lessons learned.
   - Share a sanitized summary with the broader team to improve security awareness.
6. Run a tabletop exercise quarterly: simulate a security incident scenario (e.g., "an attacker has obtained a database dump via a SQL injection") and walk through the response plan with the team. Identify gaps and update the plan.

**What NOT to Do:**
- Do not delete or rotate logs during an active investigation. Logs are evidence.
- Do not publicly disclose the incident before completing initial assessment and consulting legal counsel.
- Do not skip notification obligations. GDPR requires 72-hour notification; delays incur fines.
- Do not blame individuals in the post-incident review. Focus on process and system improvements.
- Do not assume the incident is contained without verifying. Attackers often maintain multiple access paths.
- Do not treat the Incident Response Plan as a one-time document. Update it after every incident and exercise.

**Done Condition:** The Incident Response Plan document is written, reviewed, and accessible to all team members. Containment procedures exist for the four common scenarios listed. Data breach notification templates are prepared for GDPR and PIPEDA. A forensic investigation checklist is documented. A post-incident review template exists. At least one tabletop exercise has been conducted and the plan has been updated based on findings.

---

### 11. Security Logging and Monitoring

**Purpose:** This skill exists to capture, store, and alert on security-relevant events across the JTLD Consulting Inc platform so that attacks are detected in real time and forensic evidence is preserved.

**Preconditions:**
- A logging infrastructure exists (Sentry for errors, application logs in structured JSON format).
- A log aggregation service is available (Datadog, Logtail, CloudWatch, or Vercel Logs).
- Alert notification channels are configured (Slack, email, PagerDuty).
- The authentication system is in place and logging basic events.

**Steps:**
1. Define the security events to log:
   - Authentication: login success, login failure (with reason: wrong password, account locked, user not found), logout, password change, password reset request, MFA verification.
   - Authorization: access denied (403), role escalation attempt, resource ownership violation.
   - Data access: PII export requested, account deletion requested, admin accessed user data.
   - File operations: file upload (with metadata), file download, file deletion, malware detected.
   - API abuse: rate limit exceeded, invalid input (multiple validation failures from same IP), CORS violation.
   - System: deployment started/completed, database migration executed, environment variable changed.
2. Implement a structured security log format:
   ```json
   {
     "timestamp": "2025-01-15T10:30:00Z",
     "level": "warn",
     "event": "auth.login.failure",
     "userId": null,
     "email_masked": "j***@e***.com",
     "ip": "192.168.1.100",
     "userAgent": "Mozilla/5.0...",
     "reason": "invalid_password",
     "metadata": { "attemptCount": 3 }
   }
   ```
3. Create a security logging utility (`lib/security-logger.ts`) that all modules use. This utility must: enforce the structured format, automatically mask PII, include the request IP and user agent, and categorize events by type.
4. Ship logs to the aggregation service: configure the logging utility to send logs to Datadog, Logtail, or CloudWatch in addition to stdout. Ensure log delivery is asynchronous and does not block request processing.
5. Create alert rules for high-priority security events:
   - 5+ failed logins from the same IP in 5 minutes (potential brute force).
   - 3+ authorization failures from the same user in 1 minute (potential privilege escalation probe).
   - Any rate limit exceeded event on auth endpoints.
   - Any malware-detected event on file upload.
   - Any admin data access event (audit trail trigger).
6. Build a security dashboard showing: failed login attempts over time, rate limit violations, authorization failures, top offending IPs, and file upload anomalies.
7. Configure log retention: retain security logs for a minimum of 12 months (regulatory requirement). Set up automated archival to cold storage (S3 Glacier) after 90 days to reduce costs.

**What NOT to Do:**
- Do not log passwords, session tokens, API keys, or unmasked PII. These become liabilities if logs are compromised.
- Do not use `console.log` for security events. Use the structured security logger exclusively for auditability.
- Do not set log retention shorter than 12 months. Regulatory investigations and forensic analysis require historical data.
- Do not ignore high-frequency "noise" events without investigation. Repeated low-severity events (e.g., many 403s) can indicate reconnaissance.
- Do not make security logs accessible to all application users. Restrict access to the security team and admins only.

**Done Condition:** All defined security events are logged in the structured format with masked PII. Logs are shipped to the aggregation service in real time. Alert rules are configured and tested for the five high-priority scenarios listed. A security dashboard visualizes failed logins, rate limit violations, and authorization failures. Log retention is set to 12 months with archival to cold storage. The security logging utility is documented and used consistently across the codebase.

---

## Security Checklist for This Project

### Authentication
- [ ] Passwords hashed with bcrypt (12+ salt rounds)
- [ ] Account lockout after 5 failed login attempts
- [ ] Password minimum requirements enforced
- [ ] Session timeout configured
- [ ] Secure cookie settings (HttpOnly, Secure, SameSite=Strict)
- [ ] CSRF protection enabled

### Authorization
- [ ] RBAC implemented (candidate, employer, admin)
- [ ] API endpoints verify user role
- [ ] Users can only access their own data
- [ ] Admin routes require admin role

### Data Protection
- [ ] HTTPS enforced everywhere
- [ ] Sensitive data encrypted at rest
- [ ] PII masked in logs
- [ ] Resume files stored securely with signed URLs
- [ ] Database connections encrypted (SSL)

### API Security
- [ ] All inputs validated with Zod schemas
- [ ] Rate limiting on auth endpoints
- [ ] File upload size and type restrictions
- [ ] CORS properly configured
- [ ] Error responses don't leak internal details

### Headers & Configuration
- [ ] Content-Security-Policy header
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Strict-Transport-Security
- [ ] Referrer-Policy configured

### Dependencies
- [ ] npm audit runs in CI pipeline
- [ ] No known vulnerabilities in dependencies
- [ ] Lock file committed to repository
- [ ] Regular dependency updates scheduled

### Compliance
- [ ] Privacy policy published
- [ ] Cookie consent banner implemented
- [ ] Data deletion capability built
- [ ] Data export capability built
- [ ] Consent tracking in database

## Learning Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [NextAuth.js Security](https://next-auth.js.org/getting-started/introduction)
- [Web Security Academy (PortSwigger)](https://portswigger.net/web-security)
- [Snyk Learn](https://learn.snyk.io/)

## Tools

- OWASP ZAP (vulnerability scanning)
- Snyk (dependency scanning)
- npm audit (Node.js vulnerability check)
- Burp Suite Community (security testing)
- SonarQube (code analysis)
- Mozilla Observatory (header analysis)
- SSL Labs (TLS configuration test)
