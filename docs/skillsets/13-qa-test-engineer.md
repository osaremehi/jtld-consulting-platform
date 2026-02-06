# QA / Test Engineer

## Role Overview

The QA/Test Engineer is responsible for ensuring the JTLD Consulting Inc platform works correctly, reliably, and meets quality standards through systematic testing at every level - from individual components to end-to-end user workflows.

## Priority

**High** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Jest | Unit and integration testing |
| React Testing Library | Component testing |
| Playwright | End-to-end browser testing |
| Cypress | Alternative E2E testing |
| MSW (Mock Service Worker) | API mocking |
| Storybook | Component visual testing |
| k6 | Performance and load testing |
| GitHub Actions | Test automation in CI/CD |

---

## Skills

---

### 1. Testing Fundamentals

**Purpose:** This skill exists to establish the foundational testing knowledge — pyramid strategy, TDD/BDD practices, coverage measurement, and regression planning — that every other QA skill depends on.

**Preconditions:**
- Access to the JTLD Consulting Inc codebase repository.
- Node.js and npm/pnpm installed locally.
- Jest, React Testing Library, and Playwright are listed in `package.json` devDependencies.
- Understanding of the application's domain: IT staffing/recruitment with candidates, employers, jobs, applications.

**Steps:**
1. Review the project test configuration files (`jest.config.ts`, `playwright.config.ts`) to confirm testing frameworks are installed and configured.
2. Map the test pyramid for this project: identify which modules need unit tests (utilities, hooks), which need integration tests (API routes, database operations), and which need E2E tests (candidate registration, job application flows).
3. For each feature under development, determine test type by asking: "Does this test a single function (unit)? A component with dependencies (integration)? A multi-page user workflow (E2E)?"
4. Apply boundary value analysis and equivalence partitioning to inputs — for example, salary fields accept positive decimals only, email fields must match a regex pattern, pagination offsets must be non-negative integers.
5. Write positive tests (valid input produces expected output) and negative tests (invalid input produces a handled error) for every feature.
6. Measure code coverage using `jest --coverage` and review the HTML report in `/coverage/lcov-report/index.html`. Record line, branch, and function coverage percentages.
7. Build a regression test suite that runs on every PR via GitHub Actions. Include smoke tests for authentication, job listing, and application submission.
8. Document any untested areas and file tickets to cover them.

**What NOT to Do:**
- Do not skip negative test cases — every input validation path must be tested.
- Do not rely solely on E2E tests for logic that can be verified with unit tests. Follow the pyramid.
- Do not treat coverage numbers as the goal — 80% coverage with poor assertions is worse than 60% coverage with strong assertions.
- Do not assume "it works on my machine" counts as tested. Tests must pass in CI.
- Do not write tests after the feature is "done" and merged. Tests accompany the feature PR.

**Done Condition:**
- A written test strategy document exists mapping every major feature to its test type (unit/integration/E2E).
- Coverage report is generated and accessible. Unit test coverage is above 80%, component test coverage is above 70%.
- Regression suite runs automatically on every PR in GitHub Actions and passes.

---

### 2. Unit Testing

**Purpose:** This skill exists to verify that individual utility functions, hooks, and pure logic modules behave correctly in isolation using Jest.

**Preconditions:**
- Jest is installed and configured (`jest.config.ts` exists, `ts-jest` or SWC transform configured).
- The `src/utils` and `src/hooks` directories contain the functions to test.
- Mock data representing real platform entities (jobs, candidates, applications) is available or can be created.

**Steps:**
1. Identify all utility functions in `src/utils/` — at minimum: `formatDate`, `formatSalary`, `validateEmail`, `skillMatcher`.
2. For each function, create a test file in the same directory with the `.test.ts` extension:
   ```
   /src
     /utils
       - formatDate.test.ts
       - formatSalary.test.ts
       - validateEmail.test.ts
       - skillMatcher.test.ts
     /hooks
       - useDebounce.test.ts
       - useSearch.test.ts
   ```
3. Write assertions using `expect()` for every expected return value. Use `test.each()` for parameterized tests when a function accepts multiple valid/invalid inputs.
4. Mock external dependencies (API calls, timers, Date objects) using `jest.fn()`, `jest.spyOn()`, and `jest.useFakeTimers()`. Never let a unit test make a real network call.
5. Test async functions with `async/await` and verify both resolved and rejected promise paths.
6. Use snapshot testing sparingly — only for stable output like formatted strings. Do not snapshot entire component trees in unit tests.
7. Run `npx jest --coverage --collectCoverageFrom='src/utils/**/*.ts'` and confirm line coverage exceeds 80%.
8. Fix any failing tests before merging. A red test is a blocker.

**What NOT to Do:**
- Do not mock the function under test — mock its dependencies, not itself.
- Do not write tests that pass regardless of the function's behavior (e.g., `expect(true).toBe(true)`).
- Do not leave `test.skip()` or `test.todo()` in merged code without a tracking issue.
- Do not hardcode dates or timestamps — use `jest.useFakeTimers()` so tests are deterministic.
- Do not test implementation details (private method calls, internal state). Test inputs and outputs.

**Done Condition:**
- Every utility function in `src/utils/` has a corresponding `.test.ts` file with at least 3 test cases (happy path, edge case, error case).
- Every custom hook in `src/hooks/` has a test file using `@testing-library/react-hooks` or `renderHook`.
- `jest --coverage` reports 80%+ line coverage for `src/utils` and `src/hooks`.
- All tests pass locally and in CI with zero failures.

---

### 3. Component Testing

**Purpose:** This skill exists to verify that React UI components render correctly, respond to user interactions, and handle loading/error states using React Testing Library.

**Preconditions:**
- React Testing Library and `@testing-library/jest-dom` are installed.
- Components to test exist in `src/components/`.
- Mock data for props (job objects, user profiles, application records) is prepared.
- MSW is configured for components that fetch data internally.

**Steps:**
1. Create test files for every user-facing component:
   ```
   /src/components
     - JobCard.test.tsx
     - SearchBar.test.tsx
     - ApplicationForm.test.tsx
     - NavigationMenu.test.tsx
     - FilterPanel.test.tsx
     - UserProfile.test.tsx
     - StatusBadge.test.tsx
   ```
2. Render each component using `render(<ComponentName {...props} />)` with realistic props derived from the Prisma schema types.
3. Query elements using accessible selectors in this priority order: `getByRole` > `getByLabelText` > `getByPlaceholderText` > `getByText` > `getByTestId`. Never use CSS selectors unless no accessible alternative exists.
4. Simulate user interactions with `userEvent.click()`, `userEvent.type()`, `userEvent.selectOptions()`. Verify that callbacks fire, state changes, and the DOM updates as expected.
5. Test form submissions: fill every field, submit, and assert that the `onSubmit` handler receives the correct data object.
6. Test conditional rendering: verify that loading spinners show while data is fetching, error messages show on failure, and empty states show when data is absent.
7. Test accessibility by integrating `jest-axe`: `expect(await axe(container)).toHaveNoViolations()`.
8. Run component tests: `npx jest --testPathPattern='src/components'` and verify coverage exceeds 70%.

**What NOT to Do:**
- Do not test internal component state directly. Test what the user sees and interacts with.
- Do not use `container.querySelector()` when an accessible query exists.
- Do not skip testing error and empty states — these are the states users hit most often.
- Do not mock React itself or override component internals with `jest.mock` on the component file.
- Do not write snapshot tests as a substitute for behavioral assertions.

**Done Condition:**
- Every component in `src/components/` has a `.test.tsx` file.
- Each test file covers: default render, user interaction, loading state, error state, and empty state where applicable.
- Zero accessibility violations reported by `jest-axe`.
- Component test coverage exceeds 70%.
- All tests pass in CI.

---

### 4. Integration Testing

**Purpose:** This skill exists to verify that API routes, database queries, authentication flows, and middleware work correctly when multiple layers interact together.

**Preconditions:**
- A test database is configured (separate from development/production). Prisma schema is migrated to the test database.
- Environment variable `DATABASE_URL` points to the test database when `NODE_ENV=test`.
- MSW or a similar tool is configured for external service mocks (Stripe, email providers).
- NextAuth.js test utilities or session mocks are available.

**Steps:**
1. Create test files for every API route:
   ```
   /src/app/api
     - jobs/route.test.ts
     - applications/route.test.ts
     - auth/register/route.test.ts
     - profile/route.test.ts
   ```
2. For each API route, test the full request-response cycle: construct a `Request` object, call the route handler, and assert the `Response` status code, headers, and JSON body.
3. Seed the test database before each test suite using Prisma Client. Clean up after each test to avoid state leakage between tests. Use `beforeEach`/`afterEach` hooks.
4. Test authentication flows: verify that unauthenticated requests return 401, unauthorized role access returns 403, and valid sessions return 200 with correct data.
5. Test request validation: send malformed JSON, missing required fields, wrong data types, and verify the route returns 400 with a descriptive error message.
6. Test error handling: simulate database failures (mock Prisma to throw), and verify the route returns 500 with a safe error message (no stack traces exposed).
7. Test middleware (rate limiting, CORS, auth guards) by sending requests that should be blocked and verifying they are.
8. Test file upload endpoints with multipart form data if applicable.
9. Run integration tests: `npx jest --testPathPattern='src/app/api'` and review results.

**What NOT to Do:**
- Do not run integration tests against the production or development database. Always use a dedicated test database.
- Do not skip database cleanup between tests — leftover data causes flaky tests.
- Do not mock the database layer in integration tests. The point is to test the real database interaction.
- Do not hardcode IDs or expect auto-increment values. Use `expect.any(String)` for generated IDs.
- Do not ignore slow tests — if an integration test takes more than 5 seconds, investigate the query.

**Done Condition:**
- Every API route in `src/app/api/` has a corresponding test file.
- Each test file covers: success path, validation errors, authentication/authorization, and server errors.
- Test database is seeded and cleaned up automatically — no manual intervention needed.
- All integration tests pass locally and in CI with zero failures.
- No flaky tests (run the suite 3 times consecutively with zero intermittent failures).

---

### 5. End-to-End (E2E) Testing

**Purpose:** This skill exists to verify that complete user workflows — spanning multiple pages, API calls, and database writes — work correctly in a real browser environment using Playwright.

**Preconditions:**
- Playwright is installed and configured (`playwright.config.ts` exists).
- The application can be started locally with `npm run dev` or a dedicated test server.
- Test database is seeded with known data (test users, test jobs, test applications).
- Test user credentials exist for each role: candidate, employer, admin.

**Steps:**
1. Create E2E test files for every critical user flow:
   ```
   /e2e
     - candidate-registration.spec.ts
     - job-search-and-apply.spec.ts
     - employer-post-job.spec.ts
     - application-tracking.spec.ts
     - login-and-logout.spec.ts
     - admin-dashboard.spec.ts
   ```
2. Use the Page Object Model pattern: create page classes in `/e2e/pages/` that encapsulate selectors and actions for each page (e.g., `LoginPage.login(email, password)`).
3. Implement the Job Search E2E scenario:
   ```
   Test: Candidate searches for jobs
   Given: A candidate is on the job listing page
   When:  They enter "React Developer" in the search bar
   Then:  Only jobs containing "React Developer" are displayed

   Test: Filter by job type
   Given: A candidate is viewing job listings
   When:  They select "Contract" from the job type filter
   Then:  Only contract positions are displayed

   Test: No results found
   Given: A candidate searches for jobs
   When:  They enter a search term with no matching jobs
   Then:  An empty state message is displayed with suggestions

   Test: Pagination
   Given: There are 50 job listings matching the search
   When:  The candidate views the first page
   Then:  10 jobs are displayed with pagination controls
   ```
4. Run tests across Chrome, Firefox, and WebKit: `npx playwright test --project=chromium --project=firefox --project=webkit`.
5. Test mobile viewports by adding a mobile project in `playwright.config.ts` with `viewport: { width: 375, height: 667 }`.
6. Use `page.route()` to intercept and mock external API calls (Stripe, email services) so E2E tests do not depend on third-party availability.
7. Capture screenshots on failure using Playwright's built-in `screenshot: 'only-on-failure'` config. Store in `/e2e/screenshots/`.
8. Enable test parallelization: `workers: process.env.CI ? 2 : 4` in `playwright.config.ts`.
9. Add E2E tests to the CI pipeline as a separate job that runs after unit/integration tests pass.

**What NOT to Do:**
- Do not use `page.waitForTimeout()` with hardcoded milliseconds. Use `page.waitForSelector()`, `page.waitForResponse()`, or `expect(locator).toBeVisible()`.
- Do not write E2E tests for logic that can be covered by unit tests. E2E tests are expensive — reserve them for multi-step user flows.
- Do not rely on auto-generated CSS class names for selectors. Use `data-testid`, ARIA roles, or text content.
- Do not skip cross-browser testing. A test that passes in Chrome but fails in Firefox is a real bug.
- Do not leave test data in the production database. E2E tests must use isolated test environments.

**Done Condition:**
- E2E test files exist for all 6 critical user flows listed above.
- Page Object Model classes exist for all major pages.
- Tests pass on Chrome, Firefox, and WebKit.
- Tests pass on mobile viewport (375px width).
- CI pipeline runs E2E tests on every PR and all pass.
- Screenshots are captured on failure and accessible in CI artifacts.

---

### 6. Performance Testing

**Purpose:** This skill exists to measure and enforce response time, throughput, and resource consumption benchmarks for the JTLD Consulting Inc platform under realistic and peak load conditions.

**Preconditions:**
- k6 is installed locally (`brew install k6` or downloaded from k6.io).
- The application is deployed to a staging environment that mirrors production infrastructure.
- Baseline metrics are established: target response times, expected concurrent users, acceptable error rates.
- Lighthouse CLI is installed for frontend performance audits.

**Steps:**
1. Write k6 load test scripts for critical API endpoints: `GET /api/jobs` (job listing), `POST /api/applications` (application submission), `GET /api/jobs/[id]` (job detail), `POST /api/auth/login` (authentication).
2. Configure k6 scenarios: ramp up from 0 to 50 virtual users over 1 minute, hold at 50 for 3 minutes, ramp down over 1 minute. Record p50, p95, and p99 response times.
3. Run `k6 run --out json=results.json load-test.js` and parse the results. Fail the test if p95 response time exceeds 500ms for any endpoint.
4. Profile database query performance: enable Prisma query logging, run the load test, and identify any query taking more than 100ms. Add indexes or optimize queries.
5. Run Lighthouse on key pages (`/`, `/jobs`, `/jobs/[id]`, `/dashboard`): `npx lighthouse http://localhost:3000/jobs --output json --output-path ./lighthouse-jobs.json`. Verify LCP < 2.5s, FID < 100ms, CLS < 0.1.
6. Test for memory leaks: monitor Node.js process memory during a sustained 10-minute load test. Memory should not grow unboundedly.
7. Document all performance benchmarks and thresholds in a `PERFORMANCE.md` file.
8. Add a lightweight smoke load test to CI that runs on every deploy to staging.

**What NOT to Do:**
- Do not run load tests against production without explicit approval and a maintenance window.
- Do not use unrealistically small payloads. Use realistic job listing data with full descriptions, multiple skills, and location objects.
- Do not ignore p99 latency — even if p50 is fast, a slow p99 means 1% of users have a terrible experience.
- Do not skip database profiling. Slow queries under load are the most common performance bottleneck.
- Do not treat Lighthouse scores as the only frontend metric. Test with real network throttling (3G, slow 4G).

**Done Condition:**
- k6 load test scripts exist for all critical API endpoints.
- p95 response time is under 500ms for all endpoints at 50 concurrent users.
- Lighthouse scores: Performance > 90, Accessibility > 90, Best Practices > 90 for all key pages.
- No memory leaks detected during 10-minute sustained load.
- Performance benchmarks are documented and baselined.

---

### 7. Security Testing

**Purpose:** This skill exists to identify and verify defenses against common web vulnerabilities (OWASP Top 10) through systematic testing of authentication, authorization, input validation, and session management.

**Preconditions:**
- Application is running in a test environment with test data.
- Test accounts exist for every role (candidate, employer, admin).
- Knowledge of the application's authentication system (NextAuth.js with sessions/JWT).
- Familiarity with OWASP Top 10 vulnerability categories.

**Steps:**
1. Test input validation on every user-facing form and API endpoint: submit SQL injection payloads (`' OR 1=1 --`), XSS payloads (`<script>alert('xss')</script>`), and oversized inputs (10MB strings). Verify all are rejected or sanitized.
2. Test authentication: verify login with wrong password returns 401 (not 200 with error in body), verify locked accounts cannot log in, verify password reset tokens expire after use.
3. Test authorization: log in as a candidate and attempt to access employer-only routes (`/api/jobs/create`), admin-only routes (`/api/admin/users`). Verify 403 responses.
4. Test CSRF protection: attempt to submit forms from a different origin. Verify the server rejects the request.
5. Test rate limiting: send 100 login attempts in 10 seconds from the same IP. Verify rate limiting kicks in and returns 429.
6. Test file upload security: upload files with double extensions (`.jpg.exe`), oversized files, and files with malicious content. Verify rejection.
7. Test session management: verify sessions expire after the configured timeout, verify logout invalidates the session server-side, verify session tokens are not exposed in URLs.
8. Run automated security scanning with `npm audit` and review all high/critical vulnerabilities.
9. Document all findings in a security test report with severity ratings.

**What NOT to Do:**
- Do not run security tests against production without authorization.
- Do not assume that client-side validation is sufficient — always test server-side validation directly via API calls.
- Do not store or log actual attack payloads in production logs.
- Do not skip testing authorization boundaries between roles. This is where the most critical vulnerabilities hide.
- Do not mark a security test as passed just because no error was thrown — verify the response explicitly rejects the malicious input.

**Done Condition:**
- All forms and API endpoints reject SQL injection, XSS, and oversized input payloads.
- Authorization is enforced: no role can access another role's restricted endpoints.
- Rate limiting is active and returns 429 after threshold is exceeded.
- `npm audit` shows zero high or critical vulnerabilities.
- Session expiration and logout invalidation work correctly.
- Security test report is written with findings and severity ratings.

---

### 8. API Testing

**Purpose:** This skill exists to verify that every REST API endpoint returns correct status codes, response formats, pagination, and error messages for all input variations.

**Preconditions:**
- API routes are implemented in `src/app/api/`.
- API documentation or route listing is available (or can be derived from the file structure).
- Test database is seeded with known data.
- Authentication tokens/sessions can be generated for test users.

**Steps:**
1. Enumerate all API endpoints by scanning `src/app/api/` directory structure. List each route with its HTTP methods (GET, POST, PUT, DELETE).
2. For each endpoint, test the success path: send a valid request with proper authentication and assert the response status (200/201), content-type (`application/json`), and body structure matches the expected schema.
3. Test request validation: send requests with missing required fields, wrong data types, extra unexpected fields. Verify 400 responses with descriptive error messages.
4. Test pagination: for list endpoints (`GET /api/jobs`), verify `page` and `limit` query parameters work, verify response includes total count, verify out-of-range pages return empty arrays (not errors).
5. Test search and filter: for endpoints that support search (`GET /api/jobs?search=react&type=CONTRACT`), verify filters are applied correctly, verify empty search returns all results, verify combined filters use AND logic.
6. Test status codes: 200 for success, 201 for creation, 400 for validation errors, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 500 for server errors.
7. Test error responses: verify error JSON includes a `message` field, verify no stack traces or internal details are leaked, verify error format is consistent across all endpoints.
8. Test rate-limited endpoints and verify 429 is returned with a `Retry-After` header.
9. Run the full API test suite and generate a coverage report.

**What NOT to Do:**
- Do not only test the happy path. Most bugs live in error handling and edge cases.
- Do not hardcode expected IDs or timestamps. Use matchers like `expect.any(String)` for dynamic values.
- Do not skip testing DELETE endpoints — verify the resource is actually removed and subsequent GET returns 404.
- Do not assume response format from documentation alone. Always assert the actual response body structure.
- Do not leave unauthenticated endpoint tests out. Verify that protected routes actually require authentication.

**Done Condition:**
- Every API route has a test file with tests for: success, validation error, auth error, not found, and server error.
- All status codes are verified (200, 201, 400, 401, 403, 404, 429, 500).
- Pagination, search, and filter tests pass for all list endpoints.
- Error responses are consistent and do not leak internal details.
- Full API test suite passes in CI with zero failures.

---

### 9. Test Automation in CI/CD

**Purpose:** This skill exists to configure GitHub Actions so that every pull request automatically runs unit, integration, and E2E tests, blocking merges on failure.

**Preconditions:**
- GitHub Actions is enabled for the repository.
- All test suites (Jest unit/integration, Playwright E2E) run successfully locally.
- Test database can be provisioned in CI (e.g., PostgreSQL service container).
- Environment variables for test configuration are stored as GitHub Secrets.

**Steps:**
1. Create `.github/workflows/test.yml` with jobs for: lint, unit tests, integration tests, E2E tests.
2. Configure the PostgreSQL service container for integration tests: use `services: postgres:` with a test database name, user, and password.
3. Set `DATABASE_URL` in the CI environment pointing to the service container.
4. Run `npx prisma migrate deploy` in CI before integration tests to set up the test schema.
5. Run unit and component tests: `npx jest --ci --coverage --testPathPattern='src/(utils|hooks|components)'`.
6. Run integration tests: `npx jest --ci --testPathPattern='src/app/api'`.
7. Run E2E tests: `npx playwright test --reporter=github` so failures appear as PR annotations.
8. Upload coverage reports and Playwright traces/screenshots as CI artifacts.
9. Configure branch protection rules: require all test jobs to pass before merging.
10. Add a test summary comment to PRs using a GitHub Action (e.g., `marocchino/sticky-pull-request-comment`).

**What NOT to Do:**
- Do not allow PRs to merge with failing tests. Branch protection must be enforced.
- Do not run E2E tests against external services — mock all third-party APIs in CI.
- Do not skip the database migration step. Tests will fail with schema errors.
- Do not use `--no-verify` to skip pre-commit hooks in CI.
- Do not store secrets (API keys, database passwords) in the workflow file. Use GitHub Secrets.

**Done Condition:**
- `.github/workflows/test.yml` exists and runs on every PR.
- All three test stages (unit, integration, E2E) run and pass in CI.
- Coverage reports are uploaded as artifacts.
- Branch protection rules require all test jobs to pass.
- A failing test blocks the PR merge.

---

## Quality Metrics

| Metric | Target |
|--------|--------|
| Unit test coverage | > 80% |
| Component test coverage | > 70% |
| E2E critical path coverage | 100% |
| Bug escape rate | < 5% |
| Build pass rate | > 95% |
| Average bug fix time | < 2 days |

## Learning Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing JavaScript (Kent C. Dodds)](https://testingjavascript.com/)
- [k6 Documentation](https://k6.io/docs/)
- [ISTQB Foundation Level](https://www.istqb.org/)

## Tools

- Jest (unit/integration testing)
- React Testing Library (component testing)
- Playwright (E2E testing)
- MSW (API mocking)
- k6 (load testing)
- Storybook (visual testing)
- Chromatic (visual regression)
- GitHub Actions (CI testing)
- SonarQube (code quality)
