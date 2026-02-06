# Backend Developer

## Role Overview

The Backend Developer is responsible for building the server-side logic, API endpoints, authentication, business rules, and data processing that power the JTLD Consulting Inc platform behind the scenes.

## Priority

**Critical** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime for server-side code |
| Next.js API Routes | Backend endpoints within Next.js |
| TypeScript | Type-safe server-side code |
| Prisma | Database ORM for queries and migrations |
| NextAuth.js | Authentication and session management |
| Zod | Schema validation for API inputs |

---

## Skills

### 1. Node.js Fundamentals & Async Programming

**Purpose:** This skill exists to write correct, non-blocking server-side JavaScript that handles concurrent requests efficiently without crashing or leaking resources.

**Preconditions:**
- Node.js 18+ is installed and available in the project environment
- The developer understands JavaScript ES6+ syntax (arrow functions, destructuring, template literals, modules)
- The Next.js project is initialized and `npm install` has been run

**Steps:**
1. Understand the event loop: Node.js is single-threaded. All I/O (database queries, file reads, HTTP calls) must be asynchronous. Never block the event loop with synchronous operations on the server.
2. Use `async/await` for all asynchronous operations. Wrap await calls in `try/catch` blocks to handle errors. Example:
   ```ts
   async function getJob(id: string) {
     try {
       const job = await prisma.job.findUnique({ where: { id } });
       if (!job) throw new Error("Job not found");
       return job;
     } catch (error) {
       // Handle or rethrow with context
       throw new Error(`Failed to fetch job ${id}: ${error}`);
     }
   }
   ```
3. Use `Promise.all()` when multiple independent async operations can run in parallel (e.g., fetching a user and their applications simultaneously).
4. Set timeouts on external calls (API calls to third-party services, email sends) to prevent hanging requests. Use `AbortController` with `fetch` or library-specific timeout options.
5. Use environment variables (`process.env`) for all configuration values (database URL, API keys, secrets). Never hardcode them. Access them through a validated config module.
6. Verify: run the server, make concurrent requests, confirm no request blocks another, and confirm errors are caught and returned as structured responses (not unhandled rejections).

**What NOT to Do:**
- Do not use synchronous file system operations (`fs.readFileSync`) in request handlers. Use async equivalents.
- Do not use `var`. Use `const` by default, `let` only when reassignment is needed.
- Do not leave `catch` blocks empty. Always log the error or rethrow it.
- Do not hardcode database URLs, API keys, or secrets in source code.
- Do not assume a Promise will always resolve. Always handle the rejection case.

**Done Condition:** All async operations use `async/await` with `try/catch`. No synchronous blocking calls exist in request handlers. Environment variables are used for all configuration. Concurrent requests are handled without blocking. No unhandled promise rejections appear in the server logs.

---

### 2. RESTful API Route Handlers

**Purpose:** This skill exists to build well-structured API endpoints in Next.js that follow REST conventions, handle all HTTP methods correctly, and return consistent response formats.

**Preconditions:**
- Next.js App Router is set up (`/app` directory)
- Prisma Client is initialized and connected to the database
- The API endpoint structure is defined (see API Endpoints reference below)

**Steps:**
1. Create API route files under `app/api/`. Each resource gets its own directory. Example:
   - `app/api/jobs/route.ts` for `GET /api/jobs` (list) and `POST /api/jobs` (create)
   - `app/api/jobs/[id]/route.ts` for `GET /api/jobs/:id`, `PUT /api/jobs/:id`, `DELETE /api/jobs/:id`
   - `app/api/jobs/[id]/apply/route.ts` for `POST /api/jobs/:id/apply`
2. Export named functions matching HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`. Example:
   ```ts
   import { NextRequest, NextResponse } from "next/server";

   export async function GET(request: NextRequest) {
     // Parse query params, fetch data, return response
     const jobs = await prisma.job.findMany();
     return NextResponse.json({ data: jobs }, { status: 200 });
   }

   export async function POST(request: NextRequest) {
     const body = await request.json();
     // Validate, create, return
     return NextResponse.json({ data: newJob }, { status: 201 });
   }
   ```
3. Use consistent response format across all endpoints:
   - Success: `{ data: <result> }` with appropriate status code (200, 201)
   - Error: `{ error: { message: "description", code: "ERROR_CODE" } }` with appropriate status code (400, 401, 403, 404, 500)
4. Parse and validate path parameters (`params.id`) and query parameters (`request.nextUrl.searchParams`) before using them.
5. Return correct HTTP status codes: 200 (OK), 201 (Created), 204 (No Content for successful DELETE), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).
6. Test every endpoint with Postman or Thunder Client: send valid requests, invalid requests, requests with missing fields, and requests with wrong HTTP methods. Verify responses match the expected format and status code.

**What NOT to Do:**
- Do not return 200 for errors. Use the correct error status code.
- Do not return raw Prisma errors to the client. Map them to user-friendly messages.
- Do not forget to handle the case where a resource is not found (return 404, not 500).
- Do not use `GET` for operations that modify data. Use `POST`, `PUT`, `PATCH`, or `DELETE`.
- Do not accept unvalidated input. Every request body and query param must be validated before use.

**Done Condition:** Every API endpoint returns the correct HTTP status code, uses the consistent response format (`{ data }` or `{ error }`), handles all edge cases (not found, invalid input, unauthorized), and is tested with at least one valid and one invalid request per method.

---

### 3. Server Actions for Form Submissions

**Purpose:** This skill exists to handle form submissions and data mutations using Next.js Server Actions, providing a type-safe, progressively-enhanced alternative to traditional API calls for form-driven operations.

**Preconditions:**
- Next.js 14+ with App Router is set up
- Prisma Client is configured
- Zod is installed for input validation
- The form component on the frontend is built and ready to call a Server Action

**Steps:**
1. Create a Server Action file (e.g., `app/actions/jobs.ts`) with the `"use server"` directive at the top.
2. Define the action function. Accept either `FormData` (for progressive enhancement) or typed arguments. Validate input with Zod immediately:
   ```ts
   "use server";
   import { z } from "zod";

   const createJobSchema = z.object({
     title: z.string().min(1),
     description: z.string().min(10),
     company: z.string().min(1),
     location: z.string().min(1),
     jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]),
   });

   export async function createJob(formData: FormData) {
     const raw = Object.fromEntries(formData.entries());
     const parsed = createJobSchema.safeParse(raw);
     if (!parsed.success) {
       return { success: false, errors: parsed.error.flatten().fieldErrors };
     }
     const job = await prisma.job.create({ data: parsed.data });
     return { success: true, data: job };
   }
   ```
3. Return a structured result: `{ success: true, data: <result> }` on success, `{ success: false, errors: <fieldErrors> }` on validation failure, `{ success: false, error: "message" }` on server error.
4. Check authentication and authorization inside the action before performing the mutation. Use `getServerSession()` from NextAuth.js to verify the user is logged in and has the correct role.
5. Call `revalidatePath()` or `revalidateTag()` after successful mutations to refresh cached data on the frontend.
6. Test: submit the form with valid data (confirm record is created), submit with invalid data (confirm field errors are returned), submit while logged out (confirm unauthorized response).

**What NOT to Do:**
- Do not skip input validation. Even though the form validates on the client, the Server Action must validate independently.
- Do not perform mutations without checking authentication. An unauthenticated user must not be able to create, update, or delete resources.
- Do not return raw exceptions. Catch errors inside the action and return a structured error response.
- Do not forget `revalidatePath()` after mutations. The frontend will display stale data otherwise.
- Do not put `"use server"` on individual functions if the entire file is server-only. Put it at the top of the file once.

**Done Condition:** Each Server Action validates input with Zod, checks authentication and authorization, performs the database mutation, calls `revalidatePath()`, and returns a structured result object. Invalid and unauthorized submissions return appropriate error responses without crashing.

---

### 4. Authentication with NextAuth.js

**Purpose:** This skill exists to implement secure user registration, login, logout, and session management using NextAuth.js so that candidates, employers, and admins can access their respective features.

**Preconditions:**
- NextAuth.js (v4 or v5) is installed as a project dependency
- PostgreSQL database is running and the `User` table exists in the Prisma schema
- `bcrypt` (or `bcryptjs`) is installed for password hashing
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` environment variables are set in `.env`

**Steps:**
1. Create the NextAuth.js configuration file. For App Router, create `app/api/auth/[...nextauth]/route.ts`. Configure the `CredentialsProvider` for email/password login:
   ```ts
   import NextAuth from "next-auth";
   import CredentialsProvider from "next-auth/providers/credentials";
   import { compare } from "bcryptjs";

   const handler = NextAuth({
     providers: [
       CredentialsProvider({
         name: "credentials",
         credentials: {
           email: { label: "Email", type: "email" },
           password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
           const user = await prisma.user.findUnique({
             where: { email: credentials.email },
           });
           if (!user) return null;
           const isValid = await compare(credentials.password, user.passwordHash);
           if (!isValid) return null;
           return { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` };
         },
       }),
     ],
     callbacks: {
       async jwt({ token, user }) {
         if (user) { token.role = user.role; token.id = user.id; }
         return token;
       },
       async session({ session, token }) {
         session.user.role = token.role;
         session.user.id = token.id;
         return session;
       },
     },
     pages: { signIn: "/auth/login" },
   });

   export { handler as GET, handler as POST };
   ```
2. Build the registration endpoint (`app/api/auth/register/route.ts`): validate input with Zod, check if email already exists, hash the password with `bcrypt` (salt rounds = 12), create the user in the database, return success (do not return the password hash).
3. Optionally configure OAuth providers (Google, LinkedIn, GitHub) by adding them to the `providers` array with their respective client ID and secret from environment variables.
4. Create a `SessionProvider` wrapper component (`"use client"`) and add it to the root layout so `useSession()` is available throughout the app.
5. Extend the NextAuth.js TypeScript types to include `role` and `id` on the session user object. Create a `types/next-auth.d.ts` file with module augmentation.
6. Test the full auth flow: register a new user, log in with correct credentials (session is created), log in with wrong credentials (error displayed), access a protected page while logged out (redirected to login), log out (session is destroyed).

**What NOT to Do:**
- Do not store passwords in plain text. Always hash with bcrypt before saving.
- Do not return the password hash in any API response or session object.
- Do not hardcode `NEXTAUTH_SECRET`. Generate a random 32+ character string and store it in `.env`.
- Do not skip the TypeScript type extension for NextAuth. Without it, `session.user.role` will have type errors.
- Do not trust client-side session data for authorization decisions. Always verify the session server-side in API routes and Server Actions.

**Done Condition:** Users can register with email and password. Users can log in and receive a session. Wrong credentials return an error without revealing whether the email or password was wrong. The session includes `id`, `email`, `role`, and `name`. Protected API routes reject unauthenticated requests with 401. Logout destroys the session. TypeScript types are extended and compile without errors.

---

### 5. Role-Based Access Control (RBAC)

**Purpose:** This skill exists to restrict platform features based on the user's role (CANDIDATE, EMPLOYER, ADMIN) so that each user type can only access and modify the resources they are authorized for.

**Preconditions:**
- NextAuth.js is configured and the session includes the user's `role`
- The `UserRole` enum exists in the Prisma schema (`CANDIDATE`, `EMPLOYER`, `ADMIN`)
- The API routes and Server Actions to be protected are built

**Steps:**
1. Create a reusable authorization helper function:
   ```ts
   import { getServerSession } from "next-auth";
   import { authOptions } from "@/lib/auth";

   export async function requireAuth(allowedRoles?: UserRole[]) {
     const session = await getServerSession(authOptions);
     if (!session) {
       return { authorized: false, status: 401, error: "Not authenticated" };
     }
     if (allowedRoles && !allowedRoles.includes(session.user.role)) {
       return { authorized: false, status: 403, error: "Insufficient permissions" };
     }
     return { authorized: true, user: session.user };
   }
   ```
2. Apply the helper at the top of every protected API route and Server Action. Example: `POST /api/jobs` requires `EMPLOYER` or `ADMIN`. `GET /api/admin/users` requires `ADMIN`. `POST /api/jobs/:id/apply` requires `CANDIDATE`.
3. Define the access matrix explicitly:

   | Action | CANDIDATE | EMPLOYER | ADMIN |
   |--------|-----------|----------|-------|
   | Browse/search jobs | Yes | Yes | Yes |
   | Apply to job | Yes | No | No |
   | Create/edit/delete job | No | Yes (own) | Yes (all) |
   | View own applications | Yes | No | Yes |
   | View applications for own jobs | No | Yes | Yes |
   | Manage users | No | No | Yes |
   | View platform stats | No | No | Yes |

4. For ownership checks (e.g., an employer can only edit their own jobs), query the resource and compare `resource.userId` to `session.user.id` before allowing the mutation.
5. On the frontend, conditionally render UI elements based on the session role. Hide "Post a Job" from candidates. Hide "Apply" from employers. Show "Admin Panel" only for admins. But never rely on frontend hiding alone -- the backend must enforce the same rules.
6. Test every protected endpoint with three users (candidate, employer, admin): verify each can only access what the matrix allows, and receives 403 for everything else.

**What NOT to Do:**
- Do not rely on frontend UI hiding as a security measure. The backend must independently enforce role checks.
- Do not use a single "isAdmin" boolean. Use the full role enum for extensibility.
- Do not forget ownership checks. An employer must not be able to edit another employer's job.
- Do not return 404 when the real reason is 403. Return 403 (Forbidden) to be honest about the denial reason.
- Do not allow role escalation. A candidate must not be able to change their own role to ADMIN via an API call.

**Done Condition:** Every protected API route and Server Action checks authentication and role before executing. The access matrix is enforced: candidates cannot post jobs, employers cannot apply, only admins can manage users. Ownership checks prevent cross-user modifications. Frontend conditionally renders based on role but backend independently enforces. Tests with all three role types confirm correct access.

---

### 6. Input Validation with Zod

**Purpose:** This skill exists to validate every piece of data entering the system (request bodies, query parameters, path parameters) using Zod schemas so that invalid or malicious data never reaches the database.

**Preconditions:**
- Zod is installed as a project dependency
- The data shapes for each API endpoint are defined (what fields, what types, what constraints)

**Steps:**
1. Create Zod schemas in a dedicated directory (e.g., `lib/validations/` or `schemas/`). One file per resource. Example:
   ```ts
   // lib/validations/job.ts
   import { z } from "zod";

   export const createJobSchema = z.object({
     title: z.string().min(1, "Title is required").max(200, "Title too long"),
     description: z.string().min(10, "Description must be at least 10 characters"),
     company: z.string().min(1, "Company is required"),
     location: z.string().min(1, "Location is required"),
     salary: z.string().optional(),
     jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]),
     skills: z.array(z.string()).min(1, "At least one skill is required"),
   });

   export const jobQuerySchema = z.object({
     query: z.string().optional(),
     location: z.string().optional(),
     jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]).optional(),
     page: z.coerce.number().int().positive().default(1),
     limit: z.coerce.number().int().positive().max(100).default(20),
   });
   ```
2. Validate request bodies in `POST`/`PUT`/`PATCH` handlers using `schema.safeParse(body)`. If parsing fails, return 400 with field-level error messages.
3. Validate query parameters in `GET` handlers using `schema.safeParse(Object.fromEntries(searchParams))`.
4. Validate path parameters (e.g., confirm `id` is a valid CUID format) before using them in database queries.
5. Share Zod schemas between frontend and backend. The same schema used in the API route should be used in the React Hook Form `zodResolver` on the frontend. Keep shared schemas in a `lib/validations/` directory.
6. Test each validation: send a request with every field missing (all errors returned), send a request with each field individually invalid (specific error returned), send a valid request (passes validation).

**What NOT to Do:**
- Do not validate manually with `if` statements. Use Zod schemas for all validation.
- Do not trust that frontend validation has already checked the data. The backend must validate independently.
- Do not return raw Zod error objects to the client. Use `error.flatten().fieldErrors` for a clean structure.
- Do not allow unconstrained string lengths or array sizes. Always set `max()` limits to prevent abuse.
- Do not skip query parameter validation. Malicious query params can cause database errors or excessive resource consumption.

**Done Condition:** Every API route validates its input with a Zod schema before processing. Invalid requests return 400 with field-level error messages. Valid requests pass through to the handler. Shared schemas are used on both frontend and backend. No unvalidated input reaches the database.

---

### 7. Job CRUD Operations

**Purpose:** This skill exists to build the complete create, read, update, and delete API for job listings so that employers can manage their postings and candidates can browse them.

**Preconditions:**
- The `Job` model exists in the Prisma schema with all required fields
- API route files are created for `/api/jobs` and `/api/jobs/[id]`
- Zod validation schemas for job creation and updates are defined
- Authentication and RBAC helpers are functional

**Steps:**
1. **Create** (`POST /api/jobs`): Validate input with `createJobSchema`. Check that the user is authenticated and has `EMPLOYER` or `ADMIN` role. Create the job with `prisma.job.create()`. Associate the job with the employer's user ID. Return 201 with the created job.
2. **List** (`GET /api/jobs`): Parse and validate query parameters (search query, location, job type, page, limit) with `jobQuerySchema`. Build a Prisma `where` clause dynamically based on provided filters. Use `prisma.job.findMany()` with `skip` and `take` for pagination. Return the list, total count, current page, and total pages.
3. **Read** (`GET /api/jobs/[id]`): Validate the `id` param. Fetch with `prisma.job.findUnique()`. If not found, return 404. Return the job with related data (employer info, application count if the requester is the employer).
4. **Update** (`PUT /api/jobs/[id]`): Validate input with `updateJobSchema`. Check authentication, EMPLOYER/ADMIN role, and ownership (the employer can only update their own jobs, admins can update any). Update with `prisma.job.update()`. Return 200 with the updated job.
5. **Delete** (`DELETE /api/jobs/[id]`): Check authentication, EMPLOYER/ADMIN role, and ownership. Delete with `prisma.job.delete()` or soft-delete by setting `isActive: false`. Return 204 (no content).
6. Test all five operations: create a job as employer (201), list jobs with filters (200, correct results), read a single job (200), update the job as the owner (200), delete the job as the owner (204). Also test unauthorized access (403) and not-found cases (404).

**What NOT to Do:**
- Do not allow a candidate to create, update, or delete jobs. Enforce RBAC.
- Do not allow an employer to update or delete another employer's job (unless admin).
- Do not return all jobs without pagination. Always paginate.
- Do not expose soft-deleted jobs in list results. Filter them out with `where: { isActive: true }`.
- Do not forget to return the total count alongside paginated results. The frontend needs it for pagination controls.

**Done Condition:** All five CRUD operations work correctly and return proper status codes. Input is validated. RBAC is enforced. Ownership is checked for updates and deletes. Listing supports search, filters, and pagination with total count. Not-found and unauthorized cases return correct error responses.

---

### 8. Job Application Submission & Tracking

**Purpose:** This skill exists to let candidates apply to jobs and track their application status, and let employers view and manage applications for their job postings.

**Preconditions:**
- The `Application` model exists in the Prisma schema with relations to `User` and `Job`
- The `Job` CRUD endpoints are functional
- Authentication is working and session includes user ID and role
- File upload for resumes is available (or will be handled separately)

**Steps:**
1. **Apply** (`POST /api/jobs/[id]/apply`): Check that the user is a CANDIDATE. Validate input (optional cover letter, optional resume URL). Check that the job exists and is active. Check that the candidate has not already applied to this job (prevent duplicates). Create the application with `status: "PENDING"`. Return 201.
2. **List candidate's applications** (`GET /api/applications`): Check authentication. If CANDIDATE, return only their applications with related job details. If EMPLOYER, return applications for jobs they posted. If ADMIN, return all applications. Support filtering by `status` and pagination.
3. **View single application** (`GET /api/applications/[id]`): Check that the requester is the candidate who applied, the employer who posted the job, or an admin. Return the application with full job and candidate details.
4. **Update application status** (`PUT /api/applications/[id]`): Only EMPLOYER (who owns the job) or ADMIN can update the status. Validate that the new status is a valid `AppStatus` enum value. Update and return the application. (Optionally trigger an email notification to the candidate.)
5. **Withdraw application** (`DELETE /api/applications/[id]`): Only the CANDIDATE who applied can withdraw. Set `status: "WITHDRAWN"` (soft delete). Return 200.
6. Test the full lifecycle: candidate applies to a job (201), candidate views their applications (200, correct list), employer views applications for their job (200, correct list), employer updates status to SHORTLISTED (200), candidate withdraws (200). Also test duplicate application prevention and unauthorized access.

**What NOT to Do:**
- Do not allow duplicate applications. Check for existing application by the same candidate for the same job before creating.
- Do not allow a candidate to apply to an inactive or expired job.
- Do not let a candidate update the application status (only employers/admins can).
- Do not let an employer see applications for jobs they do not own (unless admin).
- Do not hard-delete applications. Use status-based soft deletion (WITHDRAWN) to maintain records.

**Done Condition:** Candidates can apply to active jobs (once per job). Candidates can view and withdraw their applications. Employers can view applications for their own jobs and update statuses. Admins can view and manage all applications. Duplicate applications are rejected. Inactive jobs reject applications. The full lifecycle (apply, review, shortlist, interview, offer/reject, withdraw) is supported through status updates.

---

### 9. Search & Filter API

**Purpose:** This skill exists to build a performant, flexible search and filter system for job listings that supports full-text search, multi-field filtering, sorting, and pagination.

**Preconditions:**
- The `Job` model has indexed fields for the columns that will be searched/filtered
- The `GET /api/jobs` endpoint exists
- Zod validation for query parameters is defined

**Steps:**
1. Accept query parameters: `query` (full-text search string), `location`, `jobType`, `skills`, `salaryMin`, `salaryMax`, `sortBy` (e.g., "postedAt", "title"), `sortOrder` ("asc" or "desc"), `page`, `limit`.
2. Build the Prisma `where` clause dynamically. Only add conditions for parameters that are provided:
   ```ts
   const where: Prisma.JobWhereInput = { isActive: true };
   if (query) {
     where.OR = [
       { title: { contains: query, mode: "insensitive" } },
       { description: { contains: query, mode: "insensitive" } },
       { company: { contains: query, mode: "insensitive" } },
     ];
   }
   if (location) where.location = { contains: location, mode: "insensitive" };
   if (jobType) where.jobType = jobType;
   if (skills) where.skills = { hasSome: skills.split(",") };
   ```
3. Apply sorting: `orderBy: { [sortBy]: sortOrder }`. Default to `{ postedAt: "desc" }` (newest first).
4. Apply pagination: `skip: (page - 1) * limit`, `take: limit`. Also run `prisma.job.count({ where })` to get the total count.
5. Return the response in the format: `{ data: jobs, meta: { total, page, limit, totalPages } }`.
6. For advanced full-text search: consider using PostgreSQL's built-in `tsvector`/`tsquery` via Prisma raw queries if simple `contains` is too slow at scale.
7. Test: search with a keyword (returns matching jobs), filter by location (returns only that location), combine search + filter (both applied), paginate through results (page 1, page 2, etc.), sort by different fields, and confirm empty results return an empty array with `total: 0`.

**What NOT to Do:**
- Do not load all jobs into memory and filter in JavaScript. All filtering and pagination must happen at the database level.
- Do not ignore case sensitivity. Use `mode: "insensitive"` for text searches.
- Do not return results without a total count. The frontend cannot build pagination without it.
- Do not allow unbounded `limit` values. Cap at 100 to prevent excessive database load.
- Do not build a single monolithic query. Build the `where` clause incrementally so that unused filters add zero overhead.

**Done Condition:** The search endpoint supports full-text search across title, description, and company. Filters narrow results by location, job type, skills, and salary range. Results are sorted by the requested field. Pagination returns the correct page of results with total count. Combining search, filters, and pagination works correctly. Empty results return a valid empty response.

---

### 10. File Upload (Resume Handling)

**Purpose:** This skill exists to allow candidates to upload resumes and other documents securely, store them reliably, and serve them to authorized users.

**Preconditions:**
- A cloud storage service is configured (AWS S3, Azure Blob Storage, or local file system for development)
- Environment variables for storage credentials are set
- The `Application` model has a `resumeUrl` field

**Steps:**
1. Create `POST /api/upload/resume` endpoint. Accept `multipart/form-data` with a single file field.
2. Validate the file before processing:
   - File type: allow only PDF, DOC, DOCX (check both the extension and the MIME type)
   - File size: maximum 5MB
   - Return 400 with a descriptive error if validation fails
3. Generate a unique file name: `{userId}-{timestamp}-{originalName}` to prevent collisions.
4. Upload to cloud storage:
   ```ts
   // For AWS S3
   const command = new PutObjectCommand({
     Bucket: process.env.S3_BUCKET,
     Key: `resumes/${uniqueFileName}`,
     Body: fileBuffer,
     ContentType: file.type,
   });
   await s3Client.send(command);
   ```
5. Store the file URL (or key) in the database on the `Application` or `User` record.
6. For retrieval, generate a signed URL with a short expiration (e.g., 15 minutes) so that only authorized users can download the file. Create `GET /api/upload/resume/[id]` that checks authorization (only the candidate, the job's employer, or an admin) and returns a redirect to the signed URL.
7. Test: upload a valid PDF (201, URL returned), upload a 10MB file (400, size error), upload a .exe file (400, type error), retrieve the file as the authorized user (200, file downloads), retrieve as an unauthorized user (403).

**What NOT to Do:**
- Do not accept any file type. Whitelist only PDF, DOC, and DOCX.
- Do not skip file size validation. Allowing large uploads can exhaust server memory and storage.
- Do not serve files directly from a public storage URL without authorization checks. Use signed URLs with short expiration.
- Do not store files on the server's local filesystem in production. Use cloud storage.
- Do not trust the file extension alone. Check the MIME type as well.

**Done Condition:** Candidates can upload PDF/DOC/DOCX resumes up to 5MB. Files are stored in cloud storage with unique names. Uploaded file URLs are saved to the database. Authorized users can download files via signed URLs. Unauthorized users are rejected. Invalid file types and oversized files are rejected with descriptive error messages.

---

### 11. Email Notifications

**Purpose:** This skill exists to send transactional emails to users when key events occur (registration confirmation, application received, status change) so that users stay informed without manually checking the platform.

**Preconditions:**
- An email service provider is configured (SendGrid, Resend, or AWS SES)
- API key or SMTP credentials are stored in environment variables
- Email templates are defined for each notification type
- The React Email library (optional) is installed for building HTML email templates

**Steps:**
1. Create an email utility module (`lib/email.ts`) that wraps the email provider's SDK. Expose a single function:
   ```ts
   export async function sendEmail({
     to, subject, html, text
   }: EmailParams): Promise<{ success: boolean; error?: string }> {
     try {
       await emailClient.send({ from: process.env.EMAIL_FROM, to, subject, html, text });
       return { success: true };
     } catch (error) {
       console.error("Email send failed:", error);
       return { success: false, error: "Failed to send email" };
     }
   }
   ```
2. Define email templates for each notification:
   - **Welcome email:** Sent after registration. Subject: "Welcome to JTLD Consulting Inc Platform"
   - **Application received:** Sent to candidate after applying. Subject: "Application Received - {jobTitle}"
   - **Application status update:** Sent to candidate when employer changes status. Subject: "Application Update - {jobTitle}"
   - **New application alert:** Sent to employer when a candidate applies. Subject: "New Application for {jobTitle}"
3. Trigger emails at the right points in the code: call `sendEmail()` after the database operation succeeds (not before). Make email sending non-blocking: do not `await` if the API response does not depend on the email result. Use `void sendEmail(...)` or a background queue.
4. Include both HTML and plain text versions of every email for maximum compatibility.
5. Add a `sentEmails` log or audit record for debugging. Store the recipient, subject, template name, and timestamp.
6. Test: register a user and verify the welcome email arrives, apply to a job and verify both candidate and employer get their respective emails, update an application status and verify the candidate is notified. Check spam folders.

**What NOT to Do:**
- Do not block the API response waiting for the email to send. Email delivery can take seconds and should not delay the user.
- Do not send emails before the database operation succeeds. If the DB write fails, the email should not go out.
- Do not hardcode the sender email address. Use an environment variable.
- Do not send emails without a plain text fallback. Some email clients do not render HTML.
- Do not send emails in development/testing to real addresses. Use a test mode or an email sandbox (Mailtrap, Ethereal).

**Done Condition:** Emails are sent for registration, application submission, and application status changes. The email utility handles failures gracefully without crashing the API. Both HTML and plain text versions are sent. Emails do not block API responses. No emails are sent when the corresponding database operation fails. Development mode uses a sandbox or test provider.

---

### 12. Middleware & Route Protection

**Purpose:** This skill exists to intercept requests at the middleware level to enforce authentication, redirect unauthenticated users, add security headers, and handle cross-cutting concerns before requests reach route handlers.

**Preconditions:**
- NextAuth.js is configured and providing sessions
- The route protection requirements are defined (which routes are public, which require auth, which require specific roles)

**Steps:**
1. Create `middleware.ts` in the project root (not inside `/app`). Export a `middleware` function and a `config` object with a `matcher` that specifies which routes the middleware applies to:
   ```ts
   import { withAuth } from "next-auth/middleware";

   export default withAuth({
     callbacks: {
       authorized: ({ token, req }) => {
         const path = req.nextUrl.pathname;
         // Public routes - allow everyone
         if (path.startsWith("/api/jobs") && req.method === "GET") return true;
         if (path === "/" || path.startsWith("/auth")) return true;
         // Protected routes - require token
         return !!token;
       },
     },
   });

   export const config = {
     matcher: ["/dashboard/:path*", "/api/jobs/:path*", "/api/applications/:path*", "/api/admin/:path*"],
   };
   ```
2. For role-based middleware (e.g., admin routes), check `token.role` inside the `authorized` callback. Redirect unauthorized users to a 403 page or the login page.
3. Add security headers in the middleware response: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
4. Implement rate limiting at the middleware level for API routes: track request counts per IP using an in-memory store or Redis. Return 429 (Too Many Requests) when the limit is exceeded.
5. Test: access a protected page while logged out (redirected to login), access an admin page as a candidate (redirected or 403), access a public page while logged out (allowed), make excessive API calls (rate limited after threshold).

**What NOT to Do:**
- Do not put `middleware.ts` inside the `/app` directory. It must be at the project root.
- Do not make the middleware matcher too broad (e.g., matching all routes `/:path*`). This adds latency to every request including static assets.
- Do not perform heavy operations (database queries, external API calls) in middleware. Keep it fast.
- Do not rely solely on middleware for authorization. API routes must also check auth independently as a defense-in-depth measure.
- Do not block static asset requests (`/_next/`, `/favicon.ico`) with auth checks.

**Done Condition:** Middleware intercepts requests to protected routes and redirects unauthenticated users to login. Role-based restrictions prevent unauthorized access to admin routes. Security headers are added to all responses. Rate limiting returns 429 for excessive requests. Public routes remain accessible without authentication. Static assets are not blocked.

---

### 13. Caching, Rate Limiting & Performance

**Purpose:** This skill exists to make API endpoints fast and resilient by caching frequent queries, limiting abusive request rates, and optimizing database access patterns.

**Preconditions:**
- Redis is available (or an in-memory cache for development)
- The API endpoints are functional and returning correct data
- Baseline response times have been measured

**Steps:**
1. Identify cacheable endpoints: `GET /api/jobs` (job listings change infrequently), `GET /api/jobs/[id]` (individual job details), `GET /api/admin/stats` (platform statistics). These can be cached for 30-60 seconds.
2. Implement caching with Redis or Next.js built-in caching:
   ```ts
   // Using Next.js fetch caching
   const jobs = await fetch(`${baseUrl}/api/jobs`, {
     next: { revalidate: 60 }, // Cache for 60 seconds
   });

   // Or using Redis directly
   const cacheKey = `jobs:${query}:${page}`;
   const cached = await redis.get(cacheKey);
   if (cached) return JSON.parse(cached);
   const jobs = await prisma.job.findMany(/* ... */);
   await redis.set(cacheKey, JSON.stringify(jobs), "EX", 60);
   ```
3. Invalidate the cache when data changes: after a job is created, updated, or deleted, clear the relevant cache keys.
4. Implement rate limiting per IP address:
   - Public endpoints (job listing): 100 requests per minute
   - Authenticated endpoints: 60 requests per minute
   - Auth endpoints (login, register): 10 requests per minute (brute-force protection)
5. Optimize database queries: use `select` to fetch only needed fields, use `include` sparingly (only when related data is needed), add database indexes for frequently queried columns (see Database Developer skillset).
6. Measure response times before and after optimization. Target: p95 response time < 200ms for cached endpoints, < 500ms for uncached endpoints.

**What NOT to Do:**
- Do not cache user-specific data with shared cache keys. Include the user ID in the cache key for personalized responses.
- Do not cache responses that include sensitive data (e.g., full user profiles) without proper key isolation.
- Do not set cache TTL too high. Stale data is worse than a slightly slower response.
- Do not skip cache invalidation. Creating a new job must clear the job list cache.
- Do not rate limit health check or static asset endpoints.

**Done Condition:** Frequently accessed endpoints return cached data within 50ms for cache hits. Cache is invalidated when underlying data changes. Rate limiting prevents abuse: 429 responses are returned when limits are exceeded. Database queries are optimized with appropriate `select` and `include` clauses. p95 response time meets the target for both cached and uncached endpoints.

---

### 14. Admin API Endpoints

**Purpose:** This skill exists to build the administrative API endpoints that allow platform admins to manage users, view statistics, and oversee all platform activity.

**Preconditions:**
- RBAC is implemented and the `ADMIN` role is enforced
- The `User`, `Job`, and `Application` models are all in the Prisma schema
- Middleware protects `/api/admin/*` routes

**Steps:**
1. **List users** (`GET /api/admin/users`): Check ADMIN role. Accept query params for search (by name or email), filter by role, and pagination. Return a list of users with their role, registration date, and activity counts (number of jobs posted or applications submitted). Never return password hashes.
2. **Get platform statistics** (`GET /api/admin/stats`): Check ADMIN role. Return aggregate data:
   ```ts
   const stats = {
     totalUsers: await prisma.user.count(),
     totalCandidates: await prisma.user.count({ where: { role: "CANDIDATE" } }),
     totalEmployers: await prisma.user.count({ where: { role: "EMPLOYER" } }),
     totalJobs: await prisma.job.count({ where: { isActive: true } }),
     totalApplications: await prisma.application.count(),
     applicationsByStatus: await prisma.application.groupBy({
       by: ["status"],
       _count: true,
     }),
     recentJobs: await prisma.job.findMany({
       take: 5, orderBy: { postedAt: "desc" },
     }),
   };
   ```
3. **Update user role** (`PUT /api/admin/users/[id]`): Check ADMIN role. Validate new role. Prevent an admin from removing their own admin role (to avoid lockout). Update and return the user.
4. **Deactivate user** (`PUT /api/admin/users/[id]/deactivate`): Check ADMIN role. Set user as inactive (soft delete). Deactivate all their active jobs if they are an employer. Return confirmation.
5. **View any resource** (`GET /api/admin/jobs`, `GET /api/admin/applications`): Provide admin-specific list endpoints that return all resources regardless of ownership, with additional metadata (user details, timestamps).
6. Test: access admin endpoints as a candidate (403), access as admin (200 with correct data), verify statistics are accurate by comparing with known data, update a user's role and confirm the change persists.

**What NOT to Do:**
- Do not return password hashes in user listings. Exclude `passwordHash` from all responses.
- Do not allow an admin to delete their own admin role. This prevents admin lockout.
- Do not expose admin endpoints without RBAC checks. Every admin endpoint must verify the session has `role: "ADMIN"`.
- Do not run aggregate queries without caching. Stats queries can be expensive; cache them for 5-10 minutes.
- Do not build admin endpoints that modify data without audit logging. Record who changed what and when.

**Done Condition:** All admin endpoints require `ADMIN` role and reject other roles with 403. User listing supports search, filter, and pagination without exposing password hashes. Platform statistics return accurate aggregate data. User role updates work with self-demotion protection. All admin actions are testable and return correct responses.

---

## API Endpoints Reference

```
POST   /api/auth/register     - User registration
POST   /api/auth/login         - User login (handled by NextAuth.js)
GET    /api/jobs               - List jobs (with search/filter/pagination)
GET    /api/jobs/:id           - Get job details
POST   /api/jobs               - Create job (employer only)
PUT    /api/jobs/:id           - Update job (employer/owner or admin)
DELETE /api/jobs/:id           - Delete job (employer/owner or admin)
POST   /api/jobs/:id/apply     - Apply to job (candidate only)
GET    /api/applications       - List applications (role-dependent)
GET    /api/applications/:id   - Get application details (authorized users)
PUT    /api/applications/:id   - Update application status (employer/admin)
DELETE /api/applications/:id   - Withdraw application (candidate only)
GET    /api/profile            - Get current user profile
PUT    /api/profile            - Update current user profile
POST   /api/upload/resume      - Upload resume file
GET    /api/upload/resume/:id  - Download resume (authorized users)
GET    /api/admin/users        - Admin: list/search users
PUT    /api/admin/users/:id    - Admin: update user role
GET    /api/admin/stats        - Admin: platform statistics
GET    /api/admin/jobs         - Admin: list all jobs
GET    /api/admin/applications - Admin: list all applications
```

---

## Learning Resources

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Zod Documentation](https://zod.dev)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)

## Tools

- Postman or Thunder Client (API testing)
- Prisma Studio (database GUI)
- VS Code REST Client extension
- Node.js debugger
- Morgan or Pino (request logging)
