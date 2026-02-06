# DevOps / Cloud Engineer

## Role Overview

The DevOps/Cloud Engineer is responsible for deployment, infrastructure, CI/CD pipelines, monitoring, and ensuring the JTLD Consulting Inc platform runs reliably and scales effectively in production.

## Priority

**High** - Phase 2

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Vercel | Primary hosting for Next.js |
| AWS / Azure | Cloud infrastructure |
| Docker | Containerization |
| GitHub Actions | CI/CD pipelines |
| Terraform | Infrastructure as Code |
| Nginx | Reverse proxy and load balancing |
| Datadog / New Relic | Monitoring and APM |
| Sentry | Error tracking |

---

## Skills

---

### 1. Vercel Deployment and Configuration

**Purpose:** This skill exists to deploy and manage the JTLD Consulting Inc Next.js application on Vercel, including environment configuration, custom domains, edge functions, and preview deployments.

**Preconditions:**
- A Vercel account linked to the JTLD Consulting Inc GitHub organization.
- The Next.js application repository exists on GitHub with a valid `next.config.js`.
- Environment variables for the application are documented (database URL, NextAuth secret, S3 keys, etc.).
- DNS provider access (Cloudflare) is available for custom domain setup.

**Steps:**
1. Link the GitHub repository to a new Vercel project via `vercel link` or the Vercel dashboard.
2. Configure all required environment variables in the Vercel project settings for each environment (Development, Preview, Production). Variables include `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `S3_BUCKET_NAME`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, and any third-party API keys.
3. Set the build command to `next build` and the output directory to `.next`. Confirm the framework preset is detected as Next.js.
4. Configure the custom domain (e.g., `app.jtldconsulting.com`) in Vercel project settings. Add the required CNAME or A record in Cloudflare DNS. Wait for DNS propagation and verify SSL certificate issuance.
5. Enable automatic preview deployments for all pull requests. Confirm each PR generates a unique preview URL.
6. Configure edge functions for geolocation-based routing or middleware by ensuring the `middleware.ts` file is present at the project root.
7. Enable Vercel Analytics and Speed Insights in the project dashboard to track Core Web Vitals.
8. Test a production deployment by merging a commit to `main` and verifying the live URL loads correctly, all API routes respond, and the database connection is active.

**What NOT to Do:**
- Do not hardcode environment variables in source code or `next.config.js`. All secrets must live in Vercel environment settings.
- Do not skip testing preview deployments; a broken preview pipeline means broken PR reviews.
- Do not configure DNS records without first verifying the correct record type (CNAME vs A) required by Vercel.
- Do not assume Vercel auto-detects all settings correctly; always verify build command, install command, and root directory.

**Done Condition:** The production URL serves the application over HTTPS with a valid SSL certificate. All environment variables are set and working. Preview deployments generate for every PR. Vercel Analytics is collecting data. The custom domain resolves correctly.

---

### 2. AWS Services Configuration (S3, SES, CloudFront)

**Purpose:** This skill exists to provision and configure supplementary AWS services used by the JTLD Consulting Inc platform, specifically S3 for resume/file storage, SES for transactional email, and CloudFront as a CDN backup or asset delivery layer.

**Preconditions:**
- An AWS account with billing alerts configured.
- IAM user or role with programmatic access and least-privilege policies for S3, SES, and CloudFront.
- AWS CLI installed and configured with the appropriate credentials profile.
- The application codebase has an S3 upload utility or is ready to integrate one.

**Steps:**
1. Create an S3 bucket with a descriptive name (e.g., `jtld-platform-uploads-prod`). Set the region to the closest region to the primary user base (e.g., `us-east-1` or `ca-central-1`).
2. Configure the bucket policy to block all public access. Enable server-side encryption (SSE-S3 or SSE-KMS). Enable versioning for accidental deletion recovery.
3. Set up a bucket lifecycle policy: transition objects older than 90 days to S3 Infrequent Access; delete incomplete multipart uploads after 7 days.
4. Create an IAM policy that grants `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, and `s3:ListBucket` only on the specific bucket ARN. Attach this policy to a dedicated IAM user or role for the application.
5. Generate pre-signed URLs in the application for secure, time-limited file access. Test uploading a file, retrieving it via pre-signed URL, and confirming the URL expires.
6. For SES: verify the sending domain (e.g., `jtldconsulting.com`) by adding the required TXT and DKIM records to Cloudflare DNS. Request production access (move out of SES sandbox) by submitting a sending limit increase request.
7. Configure SES email templates for transactional emails (application confirmation, password reset, employer notifications).
8. For CloudFront (if needed): create a distribution pointing to the S3 bucket origin. Restrict bucket access to the CloudFront Origin Access Identity (OAI). Set cache behaviors and TTLs for static assets.
9. Store all AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`) in Vercel environment variables and locally in `.env.local`.

**What NOT to Do:**
- Do not make S3 buckets publicly accessible. All file access must go through pre-signed URLs or CloudFront with OAI.
- Do not use root AWS account credentials. Always use IAM users or roles with minimal required permissions.
- Do not skip enabling bucket versioning; accidental deletion of resumes is unrecoverable without it.
- Do not store AWS credentials in the repository or Dockerfile. They belong in environment variables only.
- Do not send emails from SES sandbox in production; always confirm production access is granted first.

**Done Condition:** S3 bucket exists, is encrypted, has versioning enabled, and blocks public access. The application can upload files and generate working pre-signed URLs. SES domain is verified and out of sandbox. IAM credentials are scoped to minimum required permissions. All credentials are stored in environment variables, not in code.

---

### 3. Docker Containerization

**Purpose:** This skill exists to containerize services that run outside Vercel (e.g., the ML/FastAPI service, background workers, local development environment) so they are portable, reproducible, and deployable to any container host.

**Preconditions:**
- Docker Desktop is installed and running.
- The service to be containerized has a clear entry point (e.g., `python main.py`, `node worker.js`).
- A `.dockerignore` file template is available to exclude `node_modules`, `.env`, `.git`, and build artifacts.

**Steps:**
1. Create a `Dockerfile` using multi-stage builds. Stage 1 (`builder`): install dependencies and compile/build. Stage 2 (`runner`): copy only the built output and production dependencies into a slim base image (e.g., `node:20-alpine` or `python:3.11-slim`).
2. Create a `.dockerignore` file that excludes `node_modules`, `.next`, `.git`, `.env*`, `*.md`, and any test directories.
3. Build the image locally: `docker build -t jtld-<service-name>:latest .` Verify the image size is reasonable (under 500MB for Node.js services, under 300MB for Python services).
4. Run the container locally: `docker run -p <host-port>:<container-port> --env-file .env.local jtld-<service-name>:latest`. Verify the service starts, responds to health check endpoints, and connects to external dependencies.
5. Create a `docker-compose.yml` for the full local development stack. Include services for: the Next.js app (optional, `next dev` is often faster), PostgreSQL (`postgres:16-alpine`), Redis (`redis:7-alpine`), and any ML/worker services. Map volumes for hot-reloading source code.
6. Test the full stack with `docker-compose up`. Verify all services can communicate (app can reach database and Redis, workers can reach the database).
7. Push the production image to a container registry (GitHub Container Registry, AWS ECR, or Docker Hub): `docker tag jtld-<service-name>:latest ghcr.io/jtld/<service-name>:latest && docker push ghcr.io/jtld/<service-name>:latest`.
8. Document the image tag convention: `<service-name>:<git-sha-short>` for traceability and `<service-name>:latest` for convenience.

**What NOT to Do:**
- Do not use `latest` as the only tag in production deployments. Always tag with a Git SHA or version number for rollback capability.
- Do not copy `.env` files into the Docker image. Pass environment variables at runtime via `--env-file` or orchestrator secrets.
- Do not run containers as root. Add a `USER` directive in the Dockerfile to run as a non-root user.
- Do not skip the multi-stage build; single-stage builds with dev dependencies inflate image size and attack surface.
- Do not assume `docker-compose up` means production-ready. Compose is for local development only.

**Done Condition:** A Dockerfile exists and builds successfully. The image runs locally and passes a health check. `docker-compose.yml` brings up the full local dev stack (Postgres, Redis, app, workers). Images are pushed to the container registry with proper tagging.

---

### 4. CI/CD Pipeline with GitHub Actions

**Purpose:** This skill exists to automate linting, testing, building, database migration, and deployment of the JTLD Consulting Inc platform on every push and pull request, eliminating manual deployment and catching regressions early.

**Preconditions:**
- The GitHub repository has branch protection enabled on `main` (require PR, require status checks).
- Vercel is linked to the repository for deployment.
- All required secrets are stored in GitHub repository secrets: `DATABASE_URL`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `SENTRY_AUTH_TOKEN`.
- The project has working lint, type-check, and test scripts in `package.json`.

**Steps:**
1. Create `.github/workflows/ci.yml` with a trigger on `push` to `main` and `pull_request` to `main`.
2. Define the `test` job:
   ```yaml
   name: Deploy JTLD Consulting Inc Platform

   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         - run: npm run type-check
         - run: npm run test -- --ci --coverage
   ```
3. Add a `preview` job that runs on `pull_request` events only. This job triggers a Vercel preview deployment via `vercel deploy --prebuilt` or relies on the Vercel GitHub integration. After the preview URL is ready, run E2E tests (Playwright or Cypress) against it.
4. Add a `deploy` job that runs on `push` to `main` only, depends on the `test` job passing, and:
   - Runs `npx prisma migrate deploy` against the production database.
   - Triggers the Vercel production deployment.
   - Waits for the deployment URL to return a 200 status (health check).
   - Posts a notification to the team Slack/Discord channel on success or failure.
5. Configure build caching: cache `node_modules` via `actions/cache` keyed on `package-lock.json` hash. Cache the `.next/cache` directory for faster Next.js incremental builds.
6. Add a `security` job that runs `npm audit --audit-level=high` and fails the pipeline if high or critical vulnerabilities are found.
7. Set up required status checks in the GitHub branch protection rules so that PRs cannot be merged unless `test` and `security` jobs pass.

**What NOT to Do:**
- Do not allow direct pushes to `main` that bypass CI. Branch protection must enforce status checks.
- Do not store secrets in the workflow YAML file. Use GitHub encrypted secrets and reference them via `${{ secrets.SECRET_NAME }}`.
- Do not skip database migrations before deployment. A schema mismatch will crash the application.
- Do not run E2E tests against production. Always use a preview or staging environment.
- Do not ignore flaky tests; fix or quarantine them immediately so the pipeline remains trustworthy.

**Done Condition:** Every push to `main` triggers lint, type-check, unit tests, database migration, and production deployment automatically. Every PR triggers a preview deployment with E2E tests. Failed checks block merging. Pipeline completes in under 10 minutes. Secrets are never exposed in logs.

---

### 5. Infrastructure as Code with Terraform

**Purpose:** This skill exists to define all cloud infrastructure (databases, storage, networking, IAM) as version-controlled Terraform configuration so environments are reproducible, auditable, and teardown-safe.

**Preconditions:**
- Terraform CLI is installed (v1.5+).
- A Terraform state backend is configured (e.g., S3 bucket + DynamoDB for state locking, or Terraform Cloud).
- Cloud provider credentials are available (AWS access keys or Azure service principal).
- A clear list of resources to provision exists (from the architecture diagram).

**Steps:**
1. Initialize the Terraform project structure:
   ```
   infrastructure/
     main.tf          # provider config, backend config
     variables.tf     # input variables (region, env name, etc.)
     outputs.tf       # output values (DB URL, bucket name, etc.)
     environments/
       dev.tfvars
       staging.tfvars
       prod.tfvars
     modules/
       database/       # PostgreSQL (RDS or equivalent)
       storage/        # S3 bucket
       networking/     # VPC, subnets, security groups
       monitoring/     # CloudWatch alarms, Sentry DSN
   ```
2. Write the `database` module: provision a managed PostgreSQL instance (AWS RDS or equivalent), configure security group to allow connections only from the application's IP/VPC, enable automated backups with a 7-day retention, enable encryption at rest.
3. Write the `storage` module: provision the S3 bucket with encryption, versioning, lifecycle rules, and a restricted IAM policy (as described in Skill 2).
4. Write the `networking` module (if not using Vercel exclusively): provision a VPC with public and private subnets, NAT gateway, and security groups.
5. Run `terraform plan -var-file=environments/dev.tfvars` and review the plan output line by line. Confirm no unintended resource creation or destruction.
6. Apply to the dev environment first: `terraform apply -var-file=environments/dev.tfvars`. Verify all resources are created and accessible.
7. Repeat the plan-and-apply cycle for staging, then production.
8. Store the Terraform state file remotely (S3 + DynamoDB locking or Terraform Cloud). Never commit `terraform.tfstate` to the repository.
9. Add a `terraform plan` step to the CI/CD pipeline that runs on PRs touching `infrastructure/` files, so infrastructure changes are reviewed before apply.

**What NOT to Do:**
- Do not run `terraform apply` without reviewing `terraform plan` output first. Blindly applying can destroy production resources.
- Do not commit `terraform.tfstate` or `.tfstate.backup` files to the repository. They contain secrets and resource IDs.
- Do not hardcode credentials in `.tf` files. Use environment variables or a secrets manager.
- Do not provision resources in production without testing the same configuration in dev and staging first.
- Do not skip state locking. Concurrent applies without locking corrupt state.

**Done Condition:** All cloud resources (database, S3, networking, IAM) are defined in Terraform modules. State is stored remotely with locking. `terraform plan` produces no unexpected changes when run against each environment. Infrastructure changes are reviewed via CI before apply. Environments (dev, staging, prod) can be created or destroyed reproducibly.

---

### 6. Monitoring and Observability

**Purpose:** This skill exists to ensure that the JTLD Consulting Inc platform's health, performance, and errors are continuously tracked so that issues are detected and resolved before users are impacted.

**Preconditions:**
- Sentry account created with a project for the Next.js application.
- An APM tool account exists (Datadog, New Relic, or Vercel Analytics as a baseline).
- Application logging outputs structured JSON (not unstructured `console.log`).
- Alert notification channels are configured (email, Slack, PagerDuty).

**Steps:**
1. Install and configure Sentry in the Next.js application:
   - Run `npx @sentry/wizard@latest -i nextjs`.
   - Verify `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts` are created.
   - Set `SENTRY_DSN` and `SENTRY_AUTH_TOKEN` in Vercel environment variables.
   - Test by throwing a deliberate error in a test route and confirming it appears in the Sentry dashboard.
2. Set up uptime monitoring: configure an external monitor (Uptime Robot, Better Uptime, or Vercel's built-in checks) to ping the `/api/health` endpoint every 60 seconds. Alert on 2 consecutive failures.
3. Create a `/api/health` endpoint that checks: application responds (200 OK), database connection is alive (run a `SELECT 1` query via Prisma), Redis is reachable (if applicable). Return `503` if any check fails.
4. Configure APM (Application Performance Monitoring):
   - If using Vercel Analytics: enable it in the Vercel dashboard and add `<Analytics />` component to the root layout.
   - If using Datadog/New Relic: install the agent, configure the API key, and verify traces appear for API route invocations.
5. Set up database monitoring: enable slow query logging on the managed PostgreSQL instance (log queries > 500ms). Use PgHero or the database provider's dashboard to monitor query performance, connection count, and disk usage.
6. Create alert rules:
   - Error rate exceeds 1% of requests in a 5-minute window.
   - P95 response time exceeds 2 seconds.
   - Database connection pool utilization exceeds 80%.
   - Disk usage exceeds 80%.
   - Uptime check fails for 2+ minutes.
7. Build a dashboard (in Sentry, Datadog, or Grafana) showing: request rate, error rate, P50/P95/P99 latency, active database connections, and deployment markers.
8. Document the on-call runbook: who to contact, how to access logs, how to roll back a deployment, how to restart services.

**What NOT to Do:**
- Do not rely solely on user-reported errors. Automated monitoring must detect issues independently.
- Do not set alert thresholds too low (alert fatigue) or too high (miss real incidents). Tune thresholds based on baseline metrics after 1 week of data.
- Do not log sensitive data (passwords, tokens, PII) in application logs. Sanitize log output.
- Do not skip the health check endpoint; without it, uptime monitors cannot distinguish between app-down and network issues.
- Do not assume "no errors in Sentry" means the app is healthy. Monitor latency and throughput, not just errors.

**Done Condition:** Sentry captures and reports application errors with source maps. Uptime monitoring pings the health endpoint every 60 seconds and alerts on failure. APM tracks request latency and throughput. Database monitoring is active with slow query logging. Alert rules are configured and tested (trigger a test alert to verify delivery). A dashboard exists showing key metrics. The on-call runbook is documented and accessible to the team.

---

### 7. Database Operations

**Purpose:** This skill exists to manage the production PostgreSQL database lifecycle, including hosting setup, backups, connection pooling, migrations, read replicas, and performance monitoring, so that data is safe, available, and performant.

**Preconditions:**
- A managed PostgreSQL provider is selected (Supabase, Neon, or AWS RDS).
- Prisma is the ORM in use with a `schema.prisma` file defining all models.
- The `DATABASE_URL` connection string is stored securely in environment variables.
- A backup storage location exists (S3 bucket or provider-managed).

**Steps:**
1. Provision the managed PostgreSQL instance on the selected provider. Choose the appropriate plan/tier: development (free tier for dev/staging), production (paid tier with guaranteed uptime, automated backups, and connection pooling).
2. Configure connection pooling: if using Supabase, use the PgBouncer-enabled connection string. If using Neon, use the pooled connection endpoint. Set the pool size to match the expected concurrent connections (start with 10 for serverless, adjust based on monitoring).
3. Set up automated backups: enable point-in-time recovery (PITR) if the provider supports it. Ensure daily automated snapshots with a minimum 7-day retention. Test restoring from a backup to a separate instance to verify backup integrity.
4. Configure the database connection in the application:
   - Use `DATABASE_URL` for Prisma client connections.
   - Use `DIRECT_URL` (non-pooled) for Prisma migrations (migrations require a direct connection, not a pooled one).
   - Configure Prisma connection pool timeout and pool size in `schema.prisma` or via environment variables.
5. Implement the migration workflow:
   - Development: `npx prisma migrate dev --name <description>` to create and apply migrations locally.
   - Production: `npx prisma migrate deploy` in the CI/CD pipeline (never `migrate dev` in production).
   - Always review the generated SQL in `prisma/migrations/` before committing.
6. Set up a read replica (if the provider supports it and read traffic justifies it). Configure the application to route read-heavy queries (search, listing, reporting) to the replica connection string.
7. Monitor database health: track active connections, query latency (P50/P95), disk usage, and replication lag (if replicas exist). Set up alerts for connection pool exhaustion (>80% utilization) and disk usage (>80%).
8. Create a runbook for common database operations: how to run an emergency migration, how to restore from backup, how to scale up the instance, how to kill long-running queries.

**What NOT to Do:**
- Do not run `prisma migrate dev` against production. Only `prisma migrate deploy` is safe for production.
- Do not skip backup restoration testing. An untested backup is not a backup.
- Do not use the direct (non-pooled) connection string for application runtime queries in a serverless environment. Connection exhaustion will occur.
- Do not grant the application database user superuser privileges. Use a role with only the permissions required (SELECT, INSERT, UPDATE, DELETE on application tables).
- Do not make schema changes directly in the database console. All changes must go through Prisma migrations for traceability.

**Done Condition:** The managed PostgreSQL instance is running with connection pooling enabled. Automated backups are configured and a test restore has been performed. Prisma migrations deploy successfully in the CI/CD pipeline. Connection strings are configured correctly (pooled for runtime, direct for migrations). Monitoring and alerts are active for connections, query latency, and disk usage. The database operations runbook is written and accessible.

---

### 8. Networking and SSL/TLS

**Purpose:** This skill exists to configure DNS, SSL certificates, CDN caching, DDoS protection, and load balancing so that the platform is fast, secure, and resilient to network-level threats.

**Preconditions:**
- A domain name is registered and DNS is managed via Cloudflare.
- The application is deployed on Vercel (which handles SSL automatically for Vercel-managed domains).
- Cloudflare account exists with the domain added.

**Steps:**
1. Configure DNS records in Cloudflare:
   - `A` or `CNAME` record for the root domain pointing to Vercel.
   - `CNAME` record for `www` subdomain pointing to Vercel.
   - `MX` records for email (if using custom email).
   - `TXT` records for SPF, DKIM, and DMARC (email authentication).
2. Enable Cloudflare proxy (orange cloud) on the DNS records to activate CDN caching and DDoS protection. Set SSL mode to "Full (Strict)" to enforce encryption between Cloudflare and Vercel.
3. Configure Cloudflare page rules or cache rules:
   - Cache static assets (`/_next/static/*`) with a long TTL (1 year, since Next.js uses content hashing).
   - Bypass cache for API routes (`/api/*`).
   - Bypass cache for authentication pages (`/login`, `/register`).
4. Enable Cloudflare WAF (Web Application Firewall) with the OWASP Core Rule Set. Review and tune rules to avoid false positives on legitimate API requests.
5. Configure Cloudflare rate limiting: set a threshold (e.g., 100 requests per minute per IP) on sensitive endpoints (`/api/auth/*`, `/api/upload/*`). Return `429 Too Many Requests` when exceeded.
6. Set up Cloudflare DDoS protection: enable "Under Attack Mode" as a manual toggle for emergencies. Configure automatic DDoS mitigation rules.
7. Verify SSL: run an SSL Labs test (`ssllabs.com/ssltest`) against the domain. Confirm an A or A+ rating. Verify HSTS headers are present.
8. Configure HTTPS redirect: ensure all HTTP requests are redirected to HTTPS (Cloudflare "Always Use HTTPS" setting + Vercel forces HTTPS by default).

**What NOT to Do:**
- Do not set Cloudflare SSL mode to "Flexible." This creates an unencrypted connection between Cloudflare and the origin, which is insecure.
- Do not cache API responses or authenticated pages. Only cache truly static assets.
- Do not disable the Cloudflare proxy (gray cloud) for production DNS records unless debugging a specific issue, and re-enable it immediately after.
- Do not set rate limits too aggressively on public-facing pages; legitimate crawlers and users will be blocked.
- Do not skip email authentication records (SPF, DKIM, DMARC). Without them, transactional emails land in spam.

**Done Condition:** DNS resolves correctly for all configured subdomains. SSL Labs test returns A or A+ rating. Cloudflare proxy is active with CDN caching for static assets. WAF is enabled with OWASP rules. Rate limiting is active on sensitive endpoints. DDoS protection is enabled. All HTTP traffic redirects to HTTPS. Email authentication DNS records are in place.

---

### 9. Scaling and Performance Optimization

**Purpose:** This skill exists to ensure the JTLD Consulting Inc platform can handle increased traffic and data volume without degradation, by implementing caching, queue-based processing, auto-scaling, and performance tuning.

**Preconditions:**
- The application is deployed and baseline performance metrics are collected (request rate, P95 latency, database query times).
- Redis is available (Upstash, ElastiCache, or self-hosted) for caching and queue management.
- Monitoring and alerting are in place (Skill 6 completed).
- Load testing tools are available (k6, Artillery, or Apache JMeter).

**Steps:**
1. Implement Redis caching for frequently accessed, rarely changing data:
   - Cache job listings for 5 minutes (key: `jobs:list:<page>:<filters-hash>`).
   - Cache company profiles for 15 minutes (key: `company:<id>`).
   - Cache skill/category taxonomy for 1 hour (key: `taxonomy:skills`).
   - Use cache invalidation on write: when a job is created/updated/deleted, invalidate the relevant cache keys.
2. Configure CDN caching (Cloudflare + Vercel):
   - Set `Cache-Control: public, max-age=31536000, immutable` on Next.js static assets (`/_next/static/`).
   - Use `stale-while-revalidate` for ISR (Incremental Static Regeneration) pages.
   - Set `Cache-Control: no-store` on API responses containing user-specific data.
3. Implement queue-based processing for heavy tasks:
   - Use Bull or BullMQ with Redis for background jobs.
   - Queue: resume parsing (PDF extraction, ML scoring).
   - Queue: email sending (batch notifications, digest emails).
   - Queue: search index updates (reindex after job/profile changes).
   - Configure retry logic: 3 retries with exponential backoff (1s, 4s, 16s).
4. Optimize database queries:
   - Add indexes on frequently queried columns: `Job.status`, `Job.createdAt`, `Application.userId`, `Application.jobId`, `User.email`.
   - Use Prisma `select` and `include` to fetch only required fields (avoid `SELECT *`).
   - Implement cursor-based pagination for large result sets (not offset-based).
   - Use database connection pooling (already configured in Skill 7).
5. Run load tests:
   - Simulate 100 concurrent users browsing jobs, 50 submitting applications, 20 employers posting jobs.
   - Identify bottlenecks: if P95 latency exceeds 2 seconds, profile the slow endpoints.
   - Test with 2x and 5x expected traffic to find the breaking point.
6. Configure auto-scaling (if running containerized services outside Vercel):
   - Set CPU-based auto-scaling: scale up at 70% CPU utilization, scale down at 30%.
   - Set minimum 2 instances for redundancy, maximum 10 for cost control.
   - For Vercel serverless functions: ensure function timeout is set appropriately (default 10s, increase to 30s for heavy operations).
7. Implement rate limiting at the application level:
   - Use `next-rate-limit` or a custom Redis-based rate limiter.
   - Auth endpoints: 5 requests per minute per IP.
   - API endpoints: 60 requests per minute per authenticated user.
   - File upload: 10 requests per hour per user.

**What NOT to Do:**
- Do not cache user-specific or authenticated data in a shared cache without proper key scoping. This causes data leakage between users.
- Do not skip cache invalidation. Stale data (e.g., a deleted job still showing) erodes user trust.
- Do not use offset-based pagination for large datasets. Performance degrades linearly with offset size.
- Do not load-test production without warning the team and having a rollback plan. Use staging or a dedicated load-test environment.
- Do not over-provision infrastructure preemptively. Scale based on actual metrics, not guesses.

**Done Condition:** Redis caching is implemented for job listings, company profiles, and taxonomy data with proper invalidation. Background job queues are processing resume parsing, emails, and index updates with retry logic. Database queries are optimized with indexes and cursor-based pagination. Load tests have been run and the platform handles 2x expected traffic within latency targets (P95 < 2 seconds). Rate limiting is active on all sensitive endpoints. Auto-scaling rules are configured for containerized services.

---

## Infrastructure Architecture

```
                    Cloudflare (CDN + DDoS)
                           |
                      Vercel Edge
                           |
                    Next.js Application
                    /      |       \
              PostgreSQL  Redis   S3 (files)
              (Supabase)  (cache) (resumes)
                           |
                    ML Service (FastAPI)
                    (Docker on AWS/Railway)
```

## Learning Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials)
- [The DevOps Handbook](https://itrevolution.com/product/the-devops-handbook-second-edition/)

## Tools

- GitHub Actions (CI/CD)
- Vercel CLI (deployment)
- Docker Desktop (containers)
- Terraform (infrastructure)
- Sentry (error tracking)
- Uptime Robot (monitoring)
- PgHero (database monitoring)
