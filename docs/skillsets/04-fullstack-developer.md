# Full-Stack Developer

## Role Overview

The Full-Stack Developer combines frontend, backend, and database skills to build end-to-end features for the JTLD Consulting Inc platform. This role is especially critical for small teams or solo developers who need to handle the entire application stack.

## Priority

**Critical** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Next.js | Full-stack React framework |
| TypeScript | Type-safe code across the stack |
| React | Frontend UI components |
| Tailwind CSS | Styling |
| Prisma | Database ORM |
| PostgreSQL | Relational database |
| NextAuth.js | Authentication |
| Zod | Validation |
| Vercel | Deployment platform |

---

## Skills

### 1. Project Architecture and File Organization

**Purpose:** This skill exists to establish and maintain a consistent, scalable project structure so that every file has a predictable location and every developer knows where to find and place code.

**Preconditions:**
- Next.js project initialized with `create-next-app` using the App Router
- TypeScript configured (`tsconfig.json` present and valid)
- Tailwind CSS installed and configured (`tailwind.config.ts` present)
- Prisma initialized (`prisma/schema.prisma` present)
- Git repository initialized with a `.gitignore` covering `node_modules`, `.env`, `.next`

**Steps:**
1. Verify the `app/` directory uses Next.js App Router conventions: `layout.tsx` at the root, route groups in parentheses (e.g., `(auth)`, `(dashboard)`), and `page.tsx` for each route.
2. Create a `src/components/` directory with subdirectories: `ui/` for primitives (Button, Input, Card), `forms/` for form components, `layout/` for structural components (Header, Sidebar, Footer).
3. Create a `src/lib/` directory for shared utilities: `db.ts` (Prisma client singleton), `auth.ts` (NextAuth configuration), `validations/` (Zod schemas), `utils.ts` (helper functions).
4. Create a `src/types/` directory with `index.ts` exporting shared TypeScript interfaces and types used across frontend and backend.
5. Create a `src/hooks/` directory for custom React hooks.
6. Create a `src/services/` directory for API client functions that call backend endpoints.
7. Verify `prisma/schema.prisma` contains the data source, generator, and at least one model.
8. Add a `src/constants/` directory for application-wide constants (roles, statuses, config values).
9. Confirm that every directory has an `index.ts` barrel export where appropriate.
10. Run `npx tsc --noEmit` to confirm TypeScript compiles without errors.

**What NOT to Do:**
- Do not scatter utility functions across component files; centralize them in `src/lib/`.
- Do not create deeply nested directories beyond three levels without justification.
- Do not place API-only code (e.g., database queries) inside component files.
- Do not duplicate type definitions; define once in `src/types/` and import everywhere.
- Do not skip the Prisma client singleton pattern; instantiating multiple clients causes connection pool exhaustion.

**Done Condition:** All directories listed above exist. `npx tsc --noEmit` passes with zero errors. Every import path resolves correctly. A new developer can open the project and locate any file type (component, API route, type, utility, schema) within 10 seconds by following the directory convention.

---

### 2. Shared Type Definitions Across Frontend and Backend

**Purpose:** This skill exists to ensure that data shapes are defined once in TypeScript and reused across API routes, server components, client components, and validation schemas so that a field name change breaks at compile time, not at runtime.

**Preconditions:**
- Project architecture established (Skill 1 completed).
- `src/types/` directory exists.
- Prisma schema defines at least one model (e.g., `User`, `Job`, `Application`).
- Zod is installed (`npm list zod` returns a version).

**Steps:**
1. Run `npx prisma generate` to produce the Prisma Client types.
2. In `src/types/index.ts`, import Prisma-generated types and re-export them as the canonical data shapes. Example:
   ```typescript
   import type { User, Job, Application } from "@prisma/client";
   export type { User, Job, Application };
   ```
3. Define derived types for API responses that omit sensitive fields:
   ```typescript
   export type SafeUser = Omit<User, "hashedPassword">;
   ```
4. Define request payload types that match Zod validation schemas:
   ```typescript
   export type CreateJobInput = z.infer<typeof createJobSchema>;
   ```
5. For each Zod validation schema in `src/lib/validations/`, confirm it produces a type that matches the corresponding Prisma model fields (minus auto-generated fields like `id`, `createdAt`, `updatedAt`).
6. In every API route handler, annotate the request body with the correct input type and the response with the correct output type.
7. In every component that fetches data, annotate the state or props with the correct shared type.
8. Run `npx tsc --noEmit` to confirm no type mismatches exist.

**What NOT to Do:**
- Do not define the same type shape in two different files.
- Do not use `any` or `unknown` as a substitute for a proper shared type.
- Do not manually write types that duplicate Prisma-generated types; derive from them.
- Do not skip the Zod-to-TypeScript inference step; hand-written types drift from validation schemas.

**Done Condition:** Every API route, server component, and client component references types from `src/types/`. `npx tsc --noEmit` passes. Changing a field name in `prisma/schema.prisma`, regenerating, and running `tsc` surfaces every location that needs updating.

---

### 3. Next.js Server Components for Data Fetching

**Purpose:** This skill exists to fetch data on the server using React Server Components so that database queries never reach the browser, pages load with data already rendered, and bundle size stays small.

**Preconditions:**
- Project uses Next.js 14+ with the App Router.
- Prisma client singleton exists at `src/lib/db.ts`.
- At least one Prisma model is defined and migrated.
- Shared types are defined (Skill 2 completed).

**Steps:**
1. In the target `page.tsx` file (e.g., `app/jobs/page.tsx`), confirm the file does NOT include `"use client"` at the top. It must be a Server Component by default.
2. Import the Prisma client from `src/lib/db.ts`.
3. Write an `async` component function that directly calls `prisma.job.findMany()` (or the relevant query) inside the component body.
4. Apply query filters, pagination (`skip`, `take`), sorting (`orderBy`), and field selection (`select` or `include`) in the Prisma call.
5. Type the query result with the shared type from `src/types/`.
6. Render the data directly in JSX. Pass data to child components via props.
7. Wrap the component in a `<Suspense>` boundary in the parent layout or page, providing a fallback loading skeleton.
8. If the page needs search params, accept them via the `searchParams` prop and use them to filter the Prisma query.
9. Confirm that no client-side `fetch` or `useEffect` is used for the initial data load.
10. Test by running `npm run dev`, navigating to the page, and verifying data appears without a loading flash (data is server-rendered in the HTML).

**What NOT to Do:**
- Do not add `"use client"` to a page that only fetches and displays data.
- Do not use `useEffect` + `fetch` for data that can be loaded on the server.
- Do not pass the Prisma client to client components.
- Do not forget the `<Suspense>` boundary; without it, the entire page blocks on the slowest query.
- Do not expose raw database errors to the client; catch errors and return user-friendly messages.

**Done Condition:** The page renders with data visible in the initial HTML response (view source confirms data is present). No client-side fetch calls for the initial load. `<Suspense>` fallback displays briefly during navigation. TypeScript compiles without errors.

---

### 4. Client Components for Interactivity

**Purpose:** This skill exists to build interactive UI elements (forms, modals, toggles, real-time filters) that require browser APIs, event handlers, or React state, while keeping the client bundle as small as possible.

**Preconditions:**
- Server Components handle data fetching (Skill 3 completed).
- Shared types exist for any data the component receives as props.
- Tailwind CSS is configured for styling.

**Steps:**
1. Create the component file with `"use client"` as the very first line.
2. Import only what is needed: React hooks (`useState`, `useEffect`, etc.), shared types, UI primitives.
3. Define the component props interface explicitly, referencing shared types from `src/types/`.
4. Implement the interactive behavior: event handlers, state management, controlled form inputs.
5. Use Tailwind CSS classes for all styling. Do not use inline `style` objects unless dynamically computed.
6. For forms, integrate Zod validation on the client side before submission:
   ```typescript
   const result = schema.safeParse(formData);
   if (!result.success) {
     setErrors(result.error.flatten().fieldErrors);
     return;
   }
   ```
7. Handle loading states during async operations (show spinner, disable submit button).
8. Handle error states with user-visible messages.
9. Keep the component focused: one responsibility per component. If it exceeds 150 lines, extract sub-components.
10. Test interactivity manually: submit forms, trigger modals, toggle states. Confirm no console errors.

**What NOT to Do:**
- Do not add `"use client"` to components that do not use hooks, event handlers, or browser APIs.
- Do not import server-only modules (like Prisma or `fs`) in client components.
- Do not store sensitive data (tokens, API keys) in client component state.
- Do not skip validation on the client; relying only on server validation creates a poor user experience.
- Do not use `document` or `window` without guarding for SSR (`typeof window !== "undefined"`).

**Done Condition:** The component renders without errors in the browser. All interactive features (clicks, inputs, submissions) work as intended. No TypeScript errors. No console warnings about hydration mismatches. The component does not import any server-only code.

---

### 5. Server Actions for Form Mutations

**Purpose:** This skill exists to handle form submissions and data mutations using Next.js Server Actions, eliminating the need for manual API route creation for simple create/update/delete operations.

**Preconditions:**
- Next.js 14+ with App Router.
- Prisma client singleton configured.
- Zod validation schemas defined for the relevant data.
- The form UI component exists (Skill 4 completed).

**Steps:**
1. Create a file `app/<feature>/actions.ts` with `"use server"` at the top.
2. Define an async function for each mutation (e.g., `createJob`, `updateJob`, `deleteJob`).
3. Accept `FormData` or a typed object as the parameter.
4. Validate the input using the Zod schema:
   ```typescript
   "use server";
   import { createJobSchema } from "@/lib/validations/job";
   import { prisma } from "@/lib/db";

   export async function createJob(formData: FormData) {
     const raw = Object.fromEntries(formData);
     const validated = createJobSchema.safeParse(raw);
     if (!validated.success) {
       return { error: validated.error.flatten().fieldErrors };
     }
     const job = await prisma.job.create({ data: validated.data });
     revalidatePath("/jobs");
     return { success: true, job };
   }
   ```
5. Perform the database operation (Prisma create, update, or delete).
6. Call `revalidatePath()` or `revalidateTag()` to refresh cached data on the affected pages.
7. Return a structured result: `{ success: true, data }` or `{ error: ... }`.
8. In the client component, call the action via `useFormState` or directly invoke the imported function.
9. Handle the returned result in the UI: show success toast or display field-level errors.
10. Test the full flow: fill form, submit, confirm database record created, confirm page refreshes with new data.

**What NOT to Do:**
- Do not skip server-side validation; client validation can be bypassed.
- Do not forget `revalidatePath`; without it, the UI shows stale data.
- Do not throw unhandled errors in server actions; always return structured error objects.
- Do not perform authorization checks only on the client; verify the user session inside the server action.
- Do not use server actions for read operations; use Server Components for data fetching.

**Done Condition:** The form submits successfully. The database record is created/updated/deleted. The page re-renders with updated data. Invalid input shows field-level error messages. Unauthorized users receive an error, not a crash. No TypeScript errors.

---

### 6. API Route Handlers for External Integrations

**Purpose:** This skill exists to build REST API endpoints in Next.js for use cases that Server Actions cannot handle: webhook receivers, third-party API callbacks, mobile app endpoints, and the ML microservice integration.

**Preconditions:**
- Project architecture established (Skill 1 completed).
- Shared types and Zod schemas defined (Skill 2 completed).
- Prisma client configured.
- NextAuth.js configured for session-based authentication.

**Steps:**
1. Create the route file at `app/api/<resource>/route.ts`.
2. Export named functions matching HTTP methods: `GET`, `POST`, `PUT`, `DELETE`.
3. For protected endpoints, retrieve the session using `getServerSession(authOptions)` and return `401` if absent.
4. Parse and validate the request body using Zod:
   ```typescript
   export async function POST(request: Request) {
     const session = await getServerSession(authOptions);
     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

     const body = await request.json();
     const validated = createJobSchema.safeParse(body);
     if (!validated.success) {
       return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
     }

     const job = await prisma.job.create({ data: validated.data });
     return NextResponse.json(job, { status: 201 });
   }
   ```
5. Return proper HTTP status codes: `200` success, `201` created, `400` validation error, `401` unauthorized, `404` not found, `500` server error.
6. For GET endpoints with pagination, read `searchParams` from the request URL and apply `skip`/`take` to the Prisma query.
7. For endpoints that communicate with the FastAPI ML microservice, use `fetch` with the `ML_SERVICE_URL` environment variable, include a timeout, and handle service-unavailable gracefully.
8. Add try/catch around all database and external service calls; never let raw errors reach the response.
9. Test each endpoint with Postman or `curl`: verify correct status codes, response shapes, and error cases.

**What NOT to Do:**
- Do not expose database IDs or internal error stack traces in API responses.
- Do not skip authentication on endpoints that modify data.
- Do not hardcode the ML microservice URL; use environment variables.
- Do not assume the ML microservice is always available; implement fallback behavior.
- Do not return `200` for error conditions; use the correct HTTP status code.

**Done Condition:** Each endpoint returns correct data for valid requests, correct errors for invalid requests, and `401` for unauthenticated requests. Postman/curl tests pass for every method. The ML microservice integration returns results or a graceful fallback. No TypeScript errors.

---

### 7. Middleware for Auth Guards and Redirects

**Purpose:** This skill exists to enforce authentication and role-based access at the routing level using Next.js middleware so that unauthenticated users cannot reach protected pages and role-restricted routes are enforced before the page even begins to render.

**Preconditions:**
- NextAuth.js configured with at least one provider.
- User roles defined in the Prisma schema (e.g., `CANDIDATE`, `EMPLOYER`, `ADMIN`).
- Protected and public routes identified.

**Steps:**
1. Create `middleware.ts` in the project root (not inside `app/`).
2. Import `withAuth` from `next-auth/middleware` or implement custom logic using `getToken`.
3. Define a `config.matcher` array listing the route patterns that require middleware:
   ```typescript
   export const config = {
     matcher: ["/dashboard/:path*", "/admin/:path*", "/api/protected/:path*"]
   };
   ```
4. In the middleware function, check for a valid session token.
5. If no token, redirect to `/login` with a `callbackUrl` query parameter set to the originally requested path.
6. If the route requires a specific role (e.g., `/admin` requires `ADMIN`), check the token's role claim and redirect to `/unauthorized` if the role does not match.
7. For API routes in the matcher, return `401 JSON` instead of redirecting.
8. Test each scenario: unauthenticated user hits protected page (should redirect to login), authenticated user with wrong role hits admin page (should redirect to unauthorized), authenticated user with correct role (should proceed).

**What NOT to Do:**
- Do not place `middleware.ts` inside the `app/` directory; Next.js only recognizes it at the project root.
- Do not match all routes (`/(.*)`) in the matcher; this breaks public pages and static assets.
- Do not rely solely on middleware for authorization; also check permissions in API routes and server actions.
- Do not forget to handle API routes differently from page routes (JSON error vs redirect).

**Done Condition:** Unauthenticated requests to protected pages redirect to `/login`. Authenticated requests with insufficient roles redirect to `/unauthorized`. API routes return `401` JSON. Public pages remain accessible without a session. Middleware does not intercept static assets or `_next` paths.

---

### 8. End-to-End Feature Development

**Purpose:** This skill exists to build a complete feature from database schema to deployed UI, following the standard development flow, so that every layer of the stack is consistent and the feature works as a unified whole.

**Preconditions:**
- All previous skills (1-7) are understood and the corresponding infrastructure is in place.
- A feature specification exists describing what the feature does, who uses it, and what data it involves.
- The development environment is running (`npm run dev` works, database is accessible).

**Steps:**
1. **Design the database schema.** Add or modify Prisma models in `prisma/schema.prisma`. Define fields, types, relations, indexes, and constraints.
2. **Run the migration.** Execute `npx prisma migrate dev --name <descriptive_name>`. Confirm the migration SQL is correct. Run `npx prisma generate` to update the client.
3. **Define shared types.** Add or update types in `src/types/` derived from the new Prisma models.
4. **Create Zod validation schemas.** Add schemas in `src/lib/validations/` for every input the feature accepts.
5. **Build the API layer.** Create Server Actions in `app/<feature>/actions.ts` for form mutations. Create API Route Handlers in `app/api/<resource>/route.ts` if external access is needed.
6. **Build the server component page.** Create `app/<feature>/page.tsx` as a Server Component that fetches and displays data.
7. **Build client components.** Create interactive elements (forms, filters, modals) as Client Components with `"use client"`.
8. **Connect UI to backend.** Wire forms to Server Actions. Wire dynamic data to API routes via fetch or SWR.
9. **Add loading states.** Implement `loading.tsx` for route-level loading. Add `<Suspense>` boundaries for component-level loading. Add skeleton UIs.
10. **Add error handling.** Implement `error.tsx` for route-level errors. Add try/catch in API routes and server actions. Display user-friendly error messages.
11. **Write tests.** Unit test validation schemas. Integration test API routes. Component test critical UI flows.
12. **Code review.** Submit a pull request. Verify TypeScript compiles, tests pass, and the feature works end-to-end in the development environment.
13. **Deploy.** Push to the deployment branch. Verify the feature works in the deployed environment.

**What NOT to Do:**
- Do not skip the migration step; making schema changes without migrations leads to drift between environments.
- Do not build the UI before the API; the data contract must be defined first.
- Do not skip loading and error states; incomplete UIs ship broken experiences.
- Do not deploy without testing the full user flow in the development environment.
- Do not merge without a passing TypeScript compilation and test suite.

**Done Condition:** The Prisma migration is applied. The API returns correct data. The UI renders the feature, handles loading, handles errors, and submits forms successfully. TypeScript compiles. Tests pass. The feature is deployed and verified in the production environment.

---

### 9. Environment Configuration and Management

**Purpose:** This skill exists to manage environment-specific configuration (development, staging, production) so that secrets are never committed, services connect to the correct endpoints, and environment parity is maintained.

**Preconditions:**
- `.gitignore` includes `.env`, `.env.local`, `.env.production.local`.
- A `.env.example` file exists documenting all required variables (without real values).

**Steps:**
1. Define all environment variables in `.env.example` with placeholder values and comments explaining each:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/jtld_dev"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

   # ML Microservice
   ML_SERVICE_URL="http://localhost:8000"
   ```
2. Create `.env.local` for local development with real values. Never commit this file.
3. Access variables in server-side code via `process.env.VARIABLE_NAME`.
4. For client-side variables, prefix with `NEXT_PUBLIC_` and access via `process.env.NEXT_PUBLIC_VARIABLE_NAME`.
5. Validate required environment variables at application startup in `src/lib/env.ts` using Zod:
   ```typescript
   const envSchema = z.object({
     DATABASE_URL: z.string().url(),
     NEXTAUTH_SECRET: z.string().min(1),
     ML_SERVICE_URL: z.string().url(),
   });
   export const env = envSchema.parse(process.env);
   ```
6. In the Vercel dashboard (or equivalent), set production and preview environment variables.
7. Confirm no secrets are exposed in client-side bundles by searching the built output for known secret substrings.

**What NOT to Do:**
- Do not commit `.env` or `.env.local` files to git.
- Do not prefix secret values with `NEXT_PUBLIC_`; this exposes them to the browser.
- Do not hardcode connection strings or API keys anywhere in source code.
- Do not assume environment variables exist at runtime without validation.
- Do not use the same `NEXTAUTH_SECRET` across environments.

**Done Condition:** `.env.example` documents every required variable. `.env.local` is gitignored and contains working values. The application starts without missing variable errors. No secrets appear in the client-side bundle. Production environment variables are set in the hosting platform.

---

### 10. Deployment and CI/CD

**Purpose:** This skill exists to deploy the JTLD Consulting Inc platform to production and set up automated checks so that every push is built, tested, and deployed without manual intervention.

**Preconditions:**
- Application builds successfully locally (`npm run build` exits with code 0).
- All tests pass locally (`npm test` exits with code 0).
- Environment variables configured in the hosting platform (Vercel).
- Database is accessible from the hosting platform (Supabase, Neon, or Railway).

**Steps:**
1. Connect the Git repository to Vercel via the Vercel dashboard or `vercel link`.
2. Configure the build command (`npm run build`), output directory (`.next`), and install command (`npm install`).
3. Set environment variables in Vercel for production and preview environments.
4. Set up a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every pull request:
   - Install dependencies.
   - Run `npx tsc --noEmit`.
   - Run `npm run lint`.
   - Run `npm test`.
   - Run `npm run build`.
5. Configure Vercel preview deployments for pull request branches.
6. Configure the production deployment to trigger on merge to `main`.
7. Run `npx prisma migrate deploy` as part of the build or as a pre-deploy hook to apply pending migrations.
8. Set up error tracking (Sentry): install the SDK, configure the DSN environment variable, and verify errors appear in the Sentry dashboard.
9. Configure a custom domain in Vercel: add the domain, update DNS records (A record or CNAME), and verify SSL certificate provisioning.
10. Perform a smoke test on the production URL: confirm the homepage loads, authentication works, and at least one database-backed page renders data.

**What NOT to Do:**
- Do not deploy without running `npm run build` locally first to catch errors before CI.
- Do not skip database migrations in the deployment process.
- Do not store production secrets in the repository, CI configuration files, or logs.
- Do not deploy directly from a feature branch to production; merge to `main` first.
- Do not ignore Sentry errors after deployment; they indicate real user issues.

**Done Condition:** The application is live at the production URL. HTTPS is active. The CI pipeline runs on every pull request and blocks merging on failure. Database migrations are applied automatically. Error tracking captures and reports exceptions. Preview deployments work for pull request branches.

---

### 11. Debugging Across the Stack

**Purpose:** This skill exists to systematically diagnose and fix bugs that span the frontend, backend, and database layers, so that issues are resolved at the root cause rather than patched at the symptom.

**Preconditions:**
- Development environment is running.
- Browser DevTools, React Developer Tools, and Prisma Studio are available.
- The bug is reproducible or there is a clear error message/stack trace.

**Steps:**
1. **Reproduce the bug.** Follow exact steps to trigger the issue. Note the URL, user state, and input data.
2. **Check the browser console.** Look for JavaScript errors, failed network requests (4xx, 5xx), and hydration mismatches.
3. **Check the server terminal.** Look for unhandled exceptions, Prisma query errors, or TypeScript runtime errors in the Next.js dev server output.
4. **Inspect the network request.** In the browser Network tab, examine the request payload, response body, status code, and headers for the failing API call.
5. **Trace the data flow.** Follow the data from the UI component, through the API route or Server Action, into the Prisma query, and back. Identify where the expected data diverges from the actual data.
6. **Check the database.** Open Prisma Studio (`npx prisma studio`) and inspect the relevant records. Verify data exists and fields have expected values.
7. **Add targeted logging.** Place `console.log` statements at the boundary between layers (before/after API call, before/after Prisma query) to narrow down the failure point.
8. **Fix the root cause.** Apply the fix at the layer where the bug originates, not at the layer where the symptom appears.
9. **Verify the fix.** Reproduce the original steps and confirm the bug no longer occurs.
10. **Remove debug logging.** Delete all `console.log` statements added during debugging before committing.

**What NOT to Do:**
- Do not guess at the cause and apply a fix without reproducing the bug.
- Do not fix the symptom (e.g., adding a null check) without understanding why the value is null.
- Do not leave `console.log` debug statements in committed code.
- Do not modify the database directly to fix data issues; fix the code that created the bad data.
- Do not ignore intermittent bugs; they indicate race conditions or timing issues that will worsen.

**Done Condition:** The bug no longer reproduces. The fix addresses the root cause. No debug logging remains in the code. TypeScript compiles. Existing tests still pass. If applicable, a new test covers the bug scenario.

---

### 12. Performance Profiling and Optimization

**Purpose:** This skill exists to identify and eliminate performance bottlenecks in the frontend render cycle, backend API response times, and database query execution so that pages load in under 2 seconds and API responses return in under 500ms.

**Preconditions:**
- The application is functional and features are complete enough to measure.
- Lighthouse (in Chrome DevTools) and React Developer Tools Profiler are available.
- Prisma query logging is enabled (`log: ["query"]` in the Prisma client config).

**Steps:**
1. Run Lighthouse on key pages (homepage, job listing, dashboard). Record the Performance score, Largest Contentful Paint (LCP), and Total Blocking Time (TBT).
2. Open the React Profiler and record a render cycle. Identify components that re-render unnecessarily or take more than 16ms to render.
3. Apply memoization where needed: `React.memo` for expensive components, `useMemo` for expensive computations, `useCallback` for handler functions passed as props.
4. Inspect Prisma query logs. Identify N+1 queries (many individual queries where one batched query would suffice). Fix by using `include` or `select` in the Prisma query.
5. Add database indexes for columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses. Apply via a Prisma migration.
6. Implement pagination for list pages. Never fetch all records; use `skip`/`take` with a maximum page size.
7. Add caching where appropriate: Next.js `revalidate` for ISR pages, `unstable_cache` for expensive server-side computations.
8. Optimize images using `next/image` with `width`, `height`, and `priority` props for above-the-fold images.
9. Re-run Lighthouse and compare scores to the initial baseline.
10. Set performance budgets: LCP under 2.5s, TBT under 200ms, API responses under 500ms.

**What NOT to Do:**
- Do not optimize before measuring; premature optimization wastes time on non-bottlenecks.
- Do not add `React.memo` to every component; only memoize components that provably re-render unnecessarily.
- Do not fetch unlimited records from the database; always enforce pagination limits.
- Do not assume caching is correct by default; verify that stale data is revalidated when underlying data changes.
- Do not ignore database query performance; a slow query on a frequently accessed page degrades the entire application.

**Done Condition:** Lighthouse Performance score is above 90 for key pages. No N+1 queries exist. All list endpoints are paginated. LCP is under 2.5 seconds. API response times are under 500ms for standard operations. Performance measurements are documented for comparison in future optimizations.

---

## Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn) (official tutorial)
- [The Odin Project - Full Stack JavaScript](https://www.theodinproject.com/)
- [Full Stack Open](https://fullstackopen.com/en/)
- [Prisma with Next.js Guide](https://www.prisma.io/nextjs)
- [Vercel Documentation](https://vercel.com/docs)

## Tools

- VS Code with full-stack extensions
- Postman (API testing)
- Prisma Studio (database management)
- React Developer Tools
- Git and GitHub
- Vercel CLI
- Chrome DevTools
