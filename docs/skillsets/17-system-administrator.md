# System Administrator

## Role Overview

The System Administrator is responsible for managing the operational infrastructure of the JTLD Consulting Inc platform, including email services, domain management, backup systems, uptime monitoring, and third-party service administration.

## Priority

**Low** - Phase 2+

## Core Technologies

| Technology | Purpose |
|------------|---------|
| SendGrid / Resend | Email service provider |
| Cloudflare | DNS, CDN, and security |
| Uptime Robot / Pingdom | Uptime monitoring |
| AWS S3 | File storage management |
| Redis | Cache and session management |
| PgBouncer | Database connection pooling |
| Cron Jobs | Scheduled task management |
| Grafana | Infrastructure dashboards |

---

## Skills

### 1. Email System Administration

**Purpose:** This skill exists to configure, secure, and maintain the email delivery pipeline for jtldconsulting.com so that every transactional and marketing email reaches the recipient's inbox reliably and is never flagged as spam.

**Preconditions:**
- Domain jtldconsulting.com is registered and DNS is accessible via Cloudflare.
- An email service provider account exists (SendGrid or Resend). API keys are generated.
- The back-end developer has provided the list of all email events the platform triggers (welcome, verification, password reset, job alerts, application confirmations, etc.).
- Access to Cloudflare DNS management dashboard.

**Steps:**
1. Log in to the email service provider (SendGrid or Resend). Verify the account is active and the sending plan covers expected volume.
2. Add and verify the sending domain jtldconsulting.com in the email provider dashboard.
3. Configure DNS email authentication records in Cloudflare:
   - Add an SPF TXT record: `v=spf1 include:sendgrid.net ~all` (adjust for the chosen provider).
   - Add DKIM CNAME records as provided by the email service provider. Verify DKIM signing is active.
   - Add a DMARC TXT record: `v=DMARC1; p=quarantine; rua=mailto:dmarc@jtldconsulting.com` (start with quarantine, move to reject after monitoring).
4. Send a test email from the provider and verify it passes SPF, DKIM, and DMARC checks using a tool like mail-tester.com or Google's email headers analyzer.
5. Configure separate sending streams: one for transactional emails (verification, password reset, application confirmations) and one for marketing emails (newsletters, job alerts, digests). This prevents marketing bounces from damaging transactional deliverability.
6. Set up bounce handling: configure the provider to automatically suppress hard bounces and process soft bounces with retry logic (3 retries over 72 hours, then suppress).
7. Set up a suppression list management process: review the suppression list weekly, remove addresses only when the recipient explicitly requests re-subscription.
8. Configure sending rate limits appropriate to the provider plan to avoid throttling.
9. Set up email delivery monitoring: configure alerts for bounce rate exceeding 2%, spam complaint rate exceeding 0.1%, and delivery rate dropping below 95%.
10. Document the complete email configuration in a runbook: provider, DNS records, sending streams, rate limits, suppression list process, and escalation contacts.

**What NOT to Do:**
- Do not send emails from the domain before SPF, DKIM, and DMARC records are verified; this will damage domain reputation from day one.
- Do not mix transactional and marketing emails on the same sending stream.
- Do not ignore bounce rates; a bounce rate above 2% will trigger provider warnings and potential suspension.
- Do not manually remove addresses from the suppression list without a documented re-subscription request.
- Do not set DMARC policy to `p=reject` on day one; start with `p=quarantine` and monitor for 30 days first.
- Do not assume the email provider handles everything; DNS records are your responsibility in Cloudflare.

**Done Condition:** SPF, DKIM, and DMARC records are live in Cloudflare DNS and passing verification. Test emails land in the inbox (not spam). Transactional and marketing sending streams are separated. Bounce handling is configured. Delivery monitoring alerts are active. A runbook document exists covering the full email configuration.

---

### 2. Domain & DNS Management

**Purpose:** This skill exists to configure and maintain all DNS records for jtldconsulting.com in Cloudflare so that the main site, API, subdomains, email, and SSL all resolve correctly and securely.

**Preconditions:**
- Domain jtldconsulting.com is registered and nameservers point to Cloudflare.
- Cloudflare account with the domain added and accessible.
- Hosting targets are known: Vercel for the Next.js application, AWS S3 for file storage, email provider for mail routing.
- SSL/TLS strategy is decided (Cloudflare Full Strict is recommended).

**Steps:**
1. Log in to Cloudflare. Verify jtldconsulting.com is active and nameservers are correctly delegated.
2. Configure the following DNS records:
   - A record or CNAME for `jtldconsulting.com` pointing to Vercel's deployment.
   - CNAME for `www.jtldconsulting.com` pointing to the same Vercel deployment.
   - CNAME for `api.jtldconsulting.com` pointing to the API hosting target (Vercel or separate service).
   - CNAME for `portal.jtldconsulting.com` if a separate user portal subdomain is used.
   - CNAME for `admin.jtldconsulting.com` if a separate admin panel subdomain is used.
   - MX records for email routing (if using a receiving email service).
   - TXT records for SPF, DKIM, DMARC (configured in Skill 1).
   - TXT record for domain verification (Google Search Console, email provider, etc.).
3. Enable Cloudflare proxy (orange cloud) on all web-facing records for CDN and WAF protection. Do not proxy MX records.
4. Set SSL/TLS mode to "Full (Strict)" in Cloudflare. Verify the origin server has a valid SSL certificate (Vercel provides this automatically).
5. Enable "Always Use HTTPS" and "Automatic HTTPS Rewrites" in Cloudflare.
6. Configure HSTS (HTTP Strict Transport Security) with a minimum max-age of 6 months.
7. Enable WHOIS privacy protection on the domain registration.
8. Set up domain auto-renewal to prevent accidental expiration.
9. Document all DNS records in a table: record type, name, value, proxy status, TTL, and purpose.
10. Test every subdomain and record using `dig` or an online DNS checker to confirm correct resolution.
11. Set a calendar reminder 30 days before domain expiry as a backup to auto-renewal.

**Infrastructure reference for DNS layout:**
```
                Internet
                   |
              Cloudflare
            (DNS + CDN + WAF)
                   |
           +-------+-------+
           |               |
        Vercel          AWS S3
      (Next.js)       (File Storage)
           |               |
     +-----+-----+        |
     |           |         |
  PostgreSQL   Redis    SendGrid
  (Supabase)  (Cache)   (Email)
     |
  PgBouncer
  (Connection Pool)
```

**What NOT to Do:**
- Do not proxy MX records through Cloudflare; this will break email delivery.
- Do not use SSL mode "Flexible"; this creates an insecure gap between Cloudflare and the origin server.
- Do not leave WHOIS privacy disabled; the registrant's personal information will be publicly exposed.
- Do not skip testing each record after creation; a typo in a CNAME will silently break the subdomain.
- Do not set TTLs below 300 seconds for production records; this increases DNS query load without benefit.
- Do not forget to document every record; undocumented DNS records become mysteries during incidents.

**Done Condition:** All DNS records are created and verified in Cloudflare. Every subdomain resolves correctly (confirmed via DNS lookup tool). SSL is set to Full Strict. HTTPS is enforced. WHOIS privacy is enabled. Auto-renewal is active. A DNS records documentation table exists. All records have been tested.

---

### 3. Backup Systems

**Purpose:** This skill exists to implement and verify automated backup procedures for the PostgreSQL database, uploaded files (S3), and platform configuration so that data can be recovered to a known good state after any failure.

**Preconditions:**
- PostgreSQL database is deployed (Supabase or self-managed).
- AWS S3 bucket for file storage is configured.
- A separate S3 bucket (or alternative storage location) is available for backup storage.
- IAM credentials with backup read/write permissions are available.
- Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are defined by stakeholders (recommended: RTO 4 hours, RPO 24 hours).

**Steps:**
1. Configure automated PostgreSQL backups:
   - Set up daily full database dumps using `pg_dump` (or Supabase's built-in backup if using Supabase).
   - If self-managed, configure WAL (Write-Ahead Log) archiving for point-in-time recovery.
   - Store backups in a dedicated S3 bucket with server-side encryption (AES-256 or AWS KMS).
   - Name backup files with a timestamp pattern: `jtld-db-backup-YYYY-MM-DD-HHmm.sql.gz`.
2. Configure S3 file storage backup:
   - Enable S3 versioning on the primary file storage bucket so deleted or overwritten files can be recovered.
   - Set up S3 cross-region replication to a backup bucket in a different AWS region.
   - Alternatively, set up a nightly sync job using `aws s3 sync` to a backup bucket.
3. Configure backup of platform configuration:
   - Back up environment variables, `.env` files (encrypted), infrastructure-as-code files, and DNS record exports.
   - Store configuration backups in a version-controlled private repository or encrypted S3 location.
4. Set up a backup retention policy:
   - Daily backups: retain for 30 days.
   - Weekly backups (Sunday): retain for 90 days.
   - Monthly backups (1st of month): retain for 1 year.
   - Configure S3 lifecycle rules to automatically delete expired backups.
5. Test backup restoration:
   - Restore the latest database backup to a test environment. Verify data integrity by running a count of key tables (users, jobs, applications) and comparing to production.
   - Restore a file from S3 versioning or the backup bucket. Verify the file is intact.
   - Document the exact restoration commands and procedures.
6. Set up backup monitoring:
   - Configure alerts if a daily backup job fails to produce a file.
   - Configure alerts if backup file size is zero or significantly smaller than the previous backup (indicating a truncated or failed dump).
7. Schedule a quarterly backup drill: perform a full restoration to a test environment and verify RTO is met.
8. Document the complete backup strategy in a runbook: backup types, schedules, retention, storage locations, restoration procedures, and responsible contacts.

**What NOT to Do:**
- Do not store backups in the same region and account as production data; a single account compromise or region outage will destroy both.
- Do not assume backups are working without testing restoration; untested backups are not backups.
- Do not store unencrypted database backups; they contain user personal data subject to PIPEDA.
- Do not skip the retention policy; unlimited backup storage will grow costs indefinitely.
- Do not rely solely on the hosting provider's automatic backups (e.g., Supabase's built-in backups); maintain an independent backup as well.
- Do not skip the quarterly drill; restoration procedures that are not practiced will fail under pressure.

**Done Condition:** Daily automated database backups are running and producing correctly-sized, encrypted files in S3. S3 file versioning or replication is active. Configuration backups are stored securely. Retention lifecycle rules are configured. At least one successful test restoration has been performed and documented. Backup monitoring alerts are active. A backup runbook exists. A quarterly drill is scheduled.

---

### 4. Monitoring & Alerting

**Purpose:** This skill exists to set up comprehensive uptime, performance, and health monitoring for every component of the JTLD Consulting Inc platform so that failures are detected and escalated before users report them.

**Preconditions:**
- The platform is deployed and accessible at jtldconsulting.com.
- An Uptime Robot or Pingdom account is created.
- A Grafana instance is available (or will be set up) for dashboards.
- Alert notification channels are defined: email addresses, Slack webhook URL, PagerDuty integration key (if applicable), SMS numbers for critical alerts.
- Health check endpoints exist in the Next.js application (e.g., `/api/health`).

**Steps:**
1. Configure uptime monitoring in Uptime Robot or Pingdom for these endpoints:
   - `https://jtldconsulting.com` (main site) -- check every 1 minute.
   - `https://api.jtldconsulting.com/health` (API health) -- check every 1 minute.
   - `https://jtldconsulting.com/api/health` (if API is on same domain) -- check every 1 minute.
   - SSL certificate expiry for jtldconsulting.com -- alert 30 days before expiry.
2. Configure response time thresholds: alert if response time exceeds 2 seconds for 3 consecutive checks.
3. Set up alert notification channels:
   - Email: send to ops@jtldconsulting.com for all alerts.
   - Slack: send to #ops-alerts channel for all alerts.
   - PagerDuty (or SMS): trigger for critical alerts only (site down for 5+ minutes).
4. Create a health check endpoint in the Next.js application (`/api/health`) that verifies:
   - Application is running (returns 200).
   - Database connection is active (runs a simple query like `SELECT 1`).
   - Redis connection is active (runs `PING`).
   - Returns a JSON response: `{ "status": "healthy", "db": "ok", "cache": "ok", "timestamp": "..." }`.
5. Set up Grafana dashboards for infrastructure metrics:
   - Database: active connections, query latency, connection pool usage (PgBouncer), disk usage.
   - Redis: memory usage, hit rate, connected clients, eviction count.
   - Application: request rate, error rate (5xx), response time p50/p95/p99.
   - Email: delivery rate, bounce rate, queue size.
6. Configure Grafana alert rules:
   - Database connections exceed 80% of pool limit.
   - Redis memory usage exceeds 80% of allocated.
   - Application error rate (5xx) exceeds 1% of requests.
   - Disk usage exceeds 80%.
7. Set up a public status page using Statuspage.io or a similar service:
   - Components: Website, API, Database, Email, File Storage.
   - Automate status updates from Uptime Robot checks where possible.
8. Write incident response procedures:
   - Severity definitions: Critical (site down), High (feature broken), Medium (degraded performance), Low (cosmetic issue).
   - For each severity, define: response time, communication plan, escalation path.
9. Document the full monitoring setup in a runbook: what is monitored, thresholds, alert channels, escalation paths, and dashboard URLs.

**Runbook template for incident response:**
```markdown
## Incident: [Title]

### Severity: [Critical / High / Medium / Low]

### Symptoms
- What does the user experience?
- What alerts triggered?

### Diagnosis Steps
1. Check service status at [URL]
2. Review logs: [command]
3. Check database connectivity: [command]

### Resolution Steps
1. Step-by-step fix instructions
2. Verification steps
3. Post-fix monitoring

### Escalation
- Contact: [Name / Team]
- Escalation time: [minutes]
```

**What NOT to Do:**
- Do not set check intervals longer than 5 minutes for production endpoints; outages should be caught within minutes, not hours.
- Do not send all alerts to PagerDuty/SMS; reserve these for critical severity only, or alert fatigue will cause real alerts to be ignored.
- Do not create dashboards without alert rules; dashboards that nobody watches are useless without automated alerts.
- Do not skip the public status page; users need a place to check service health independently.
- Do not hardcode alert thresholds without reviewing them monthly; traffic patterns change and thresholds must adapt.
- Do not leave the health check endpoint as a simple 200 return; it must actually verify database and cache connectivity to be useful.

**Done Condition:** Uptime monitoring is active for all endpoints with 1-minute check intervals. SSL expiry monitoring is configured. Response time alerts are set. All notification channels (email, Slack, PagerDuty/SMS) are configured and have been tested with a test alert. The `/api/health` endpoint exists and checks database and Redis. Grafana dashboards are live with alert rules. A public status page is operational. Incident response procedures are documented. A monitoring runbook exists.

---

### 5. Cache Management (Redis)

**Purpose:** This skill exists to configure, optimize, and maintain the Redis caching layer so that frequently accessed data is served from memory, reducing database load and improving response times across jtldconsulting.com.

**Preconditions:**
- A Redis instance is provisioned and accessible (managed service like AWS ElastiCache, Redis Cloud, or self-hosted).
- The Next.js application has a Redis client library installed (e.g., `ioredis`).
- The development team has identified cacheable data: session tokens, API responses, database query results, job listing data, user profile data.
- Redis connection credentials (host, port, password) are stored in environment variables.

**Steps:**
1. Verify Redis connectivity from the application: connect using the Redis client, run `PING`, confirm `PONG` response.
2. Configure Redis for the following cache use cases:
   - **Session caching:** Store NextAuth.js session data in Redis with a TTL matching the session expiry (e.g., 24 hours). Key pattern: `session:{sessionId}`.
   - **API response caching:** Cache expensive API responses (job search results, dashboard aggregations) with a TTL of 5-15 minutes. Key pattern: `api:{endpoint}:{queryHash}`.
   - **Database query caching:** Cache frequently-run, rarely-changing queries (list of skills, locations, job categories) with a TTL of 1 hour. Key pattern: `db:{queryName}:{paramHash}`.
   - **Static asset references:** Cache references to static content (company logos, uploaded images URLs) with a TTL of 24 hours. Key pattern: `asset:{assetId}`.
3. Implement cache invalidation for each use case:
   - Session: invalidate on logout or password change.
   - API responses: invalidate when underlying data is modified (e.g., new job posted invalidates job search cache).
   - Database queries: invalidate when the source table is updated (use event-driven invalidation or time-based expiry).
4. Set Redis `maxmemory` to 80% of available instance memory. Set `maxmemory-policy` to `allkeys-lru` (Least Recently Used eviction).
5. Configure Redis persistence (if using self-hosted): enable RDB snapshots every 15 minutes and AOF with `appendfsync everysec`.
6. Set up Redis monitoring:
   - Track memory usage, hit rate (`keyspace_hits / (keyspace_hits + keyspace_misses)`), connected clients, and eviction count.
   - Alert if memory usage exceeds 80%, hit rate drops below 70%, or evictions exceed 100/minute.
7. Implement a cache fallback strategy in the application: if Redis is unavailable, the application must fall back to direct database queries without crashing. Log the Redis failure and alert the operations team.
8. Document all key patterns, TTLs, invalidation rules, and the fallback strategy in a cache architecture document.

**What NOT to Do:**
- Do not cache user-specific sensitive data (passwords, payment info) in Redis without encryption at rest.
- Do not set TTLs to "forever" (no expiry); stale data will eventually cause bugs and memory exhaustion.
- Do not skip the fallback strategy; Redis downtime must degrade performance, not crash the application.
- Do not use generic key names like `cache:1`, `cache:2`; use namespaced, descriptive key patterns.
- Do not ignore the hit rate metric; a hit rate below 70% means the cache strategy is not providing value and needs redesign.
- Do not configure `maxmemory-policy` as `noeviction`; this will cause write errors when memory is full instead of gracefully evicting old data.

**Done Condition:** Redis is connected and responding. All four cache use cases (sessions, API responses, database queries, static assets) are configured with appropriate key patterns and TTLs. Cache invalidation logic is implemented for each use case. `maxmemory` and eviction policy are set. Monitoring and alerts are active. Fallback strategy is implemented and tested (verified by temporarily disabling Redis and confirming the application continues to function). Cache architecture document exists.

---

### 6. File Storage Management (S3)

**Purpose:** This skill exists to configure and maintain the AWS S3 file storage system used by jtldconsulting.com for resumes, profile photos, company logos, and other user-uploaded documents, ensuring secure access, cost efficiency, and proper lifecycle management.

**Preconditions:**
- An AWS account is available with S3 access.
- IAM credentials with appropriate S3 permissions are created (least privilege: only the buckets and actions needed).
- The application's file upload feature is built or specified by the development team.
- Cloudflare CDN is available for serving public static assets.

**Steps:**
1. Create the primary S3 bucket: `jtld-platform-files-prod` in the chosen AWS region (recommend `ca-central-1` for Canadian data residency).
2. Configure bucket settings:
   - Block all public access (files will be served via signed URLs or Cloudflare CDN).
   - Enable server-side encryption (SSE-S3 or SSE-KMS).
   - Enable versioning (for accidental deletion recovery).
   - Enable access logging to a separate logging bucket.
3. Create a folder structure within the bucket:
   - `resumes/{userId}/{filename}` -- candidate resumes.
   - `photos/{userId}/{filename}` -- profile photos.
   - `logos/{companyId}/{filename}` -- company logos.
   - `documents/{type}/{id}/{filename}` -- contracts, agreements, other documents.
   - `temp/{uploadId}` -- temporary upload staging area.
4. Configure IAM policies:
   - Application role: `PutObject`, `GetObject`, `DeleteObject` on `jtld-platform-files-prod/*`.
   - Backup role: `GetObject`, `ListBucket` on `jtld-platform-files-prod/*` (read-only for backups).
   - No public access policy.
5. Configure S3 lifecycle rules:
   - `temp/*`: delete objects older than 24 hours (cleanup failed uploads).
   - Move objects in `resumes/*` and `documents/*` to S3 Infrequent Access after 90 days.
   - Move objects to S3 Glacier after 365 days (if archival is needed).
6. Integrate Cloudflare CDN for public assets (company logos, public profile photos):
   - Create a public-read bucket or use signed URLs with Cloudflare Workers for authorized access.
   - Configure Cloudflare cache rules for static assets (cache for 7 days, respect `Cache-Control` headers).
7. Set up a file cleanup process for deleted accounts:
   - When a user account is deleted, queue a job to delete all files in their `resumes/{userId}/`, `photos/{userId}/`, and `documents/*/{userId}/` paths.
   - Retain files for 30 days after account deletion (grace period), then permanently delete.
8. Configure storage monitoring:
   - Track total storage size, number of objects, and monthly cost.
   - Alert if monthly storage cost exceeds the budget threshold.
   - Alert if a single upload exceeds 50MB (potential abuse or misconfiguration).
9. Document the complete S3 configuration: bucket name, region, folder structure, IAM policies, lifecycle rules, CDN integration, and cleanup procedures.

**What NOT to Do:**
- Do not enable public access on the primary file bucket; all access must be authenticated via signed URLs or IAM roles.
- Do not store files without encryption at rest; user resumes and documents contain personal data subject to PIPEDA.
- Do not skip versioning; accidental file deletion without versioning is permanent.
- Do not use a single flat folder structure; organize by user/company ID to enable efficient per-user operations (deletion, listing).
- Do not forget the temp folder cleanup lifecycle rule; abandoned uploads will accumulate and waste storage costs.
- Do not serve large files (resumes, documents) directly from S3 without a CDN or signed URL; this is both slow and insecure.

**Done Condition:** S3 bucket is created with encryption, versioning, access logging, and public access blocked. Folder structure is established. IAM policies are configured with least privilege. Lifecycle rules are active for temp cleanup, IA transition, and Glacier archival. CDN integration is working for public assets. Account deletion cleanup process is implemented. Storage monitoring and cost alerts are active. S3 configuration document exists.

---

### 7. Scheduled Jobs Management

**Purpose:** This skill exists to set up, monitor, and maintain all recurring automated tasks that keep the JTLD Consulting Inc platform healthy and operational -- from expired job cleanup to email digests to database maintenance.

**Preconditions:**
- The Next.js application (or a separate worker service) supports scheduled job execution (e.g., cron jobs via Vercel Cron, a dedicated job runner, or an external scheduler like AWS EventBridge).
- Database, email service, and S3 are configured and accessible.
- The list of required scheduled jobs is finalized (see table below).

**Steps:**
1. Implement each scheduled job from the following master table:

| Job | Frequency | Description |
|-----|-----------|-------------|
| Expire old jobs | Daily at 02:00 UTC | Mark jobs past expiry date as inactive in PostgreSQL |
| Job alert emails | Daily at 08:00 UTC | Query new jobs matching saved alerts, send via SendGrid/Resend |
| Database backup | Daily at 03:00 UTC | Full PostgreSQL dump to encrypted S3 backup bucket |
| Weekly digest | Weekly (Monday 08:00 UTC) | Email summary of new jobs to subscribed candidates |
| Analytics rollup | Daily at 04:00 UTC | Aggregate daily metrics (views, applications, signups) into summary tables |
| Cleanup temp files | Weekly (Sunday 01:00 UTC) | Remove orphaned files from S3 `temp/` older than 24 hours |
| SSL cert check | Daily at 06:00 UTC | Verify SSL certificate validity for jtldconsulting.com, alert if <30 days |
| Usage report | Monthly (1st at 09:00 UTC) | Generate platform usage report and email to stakeholders |

2. For each job, implement the following:
   - A function that performs the job logic.
   - Input validation: verify preconditions before executing (e.g., database is reachable, S3 is accessible).
   - Batch processing: if the job processes records (e.g., expiring jobs), fetch in batches of 100 to avoid memory issues and timeouts.
   - Error handling: catch and log all errors. Do not let a single record failure stop the entire batch.
   - Retry logic: for transient failures (network timeouts, rate limits), retry up to 3 times with exponential backoff.
   - Progress logging: log the start time, records processed, errors encountered, and completion time.
3. Configure the scheduler (Vercel Cron, AWS EventBridge, or system crontab) to trigger each job at the specified frequency.
4. Set up job monitoring:
   - Alert if a job does not produce a completion log within its expected runtime window.
   - Alert if a job's error count exceeds 5% of processed records.
   - Track job duration over time to detect performance degradation.
5. Implement a job history table in PostgreSQL:
   - Columns: `job_name`, `started_at`, `completed_at`, `status` (success/failure/partial), `records_processed`, `errors`, `error_details`.
   - Insert a row for every job execution.
6. Set up a Grafana dashboard panel showing job execution history, success rates, and duration trends.
7. Document each job in a runbook: what it does, when it runs, what it depends on, how to manually trigger it, and how to troubleshoot failures.

**What NOT to Do:**
- Do not process all records in a single query; use batched processing to avoid memory exhaustion and timeouts.
- Do not let a single record failure abort the entire job; log the error and continue processing remaining records.
- Do not schedule resource-intensive jobs during peak traffic hours (08:00-18:00 local time); run them in off-peak windows.
- Do not skip the job history table; without execution history, troubleshooting failures is guesswork.
- Do not hardcode job schedules in application code if the scheduler supports external configuration; use environment variables or a configuration file.
- Do not assume jobs will always succeed; every job must have retry logic and error alerting.

**Done Condition:** All eight scheduled jobs are implemented, tested, and running on their defined schedules. Each job implements batch processing, error handling, retry logic, and progress logging. The job history table exists and is populated after each execution. Job monitoring alerts are active. A Grafana dashboard panel shows job health. A runbook documents each job.

---

### 8. Server & Process Administration

**Purpose:** This skill exists to manage the underlying server processes, log rotation, resource monitoring, firewall rules, and access controls so that the platform runs securely and does not degrade from resource exhaustion or unauthorized access.

**Preconditions:**
- Server infrastructure is deployed (Vercel for the application, plus any dedicated servers for workers, Redis, or database if self-managed).
- SSH access to any self-managed servers is configured with key-based authentication.
- A process manager is chosen (pm2 for Node.js workers, systemd for system services).

**Steps:**
1. Configure process management for any self-managed Node.js worker services:
   - Set up pm2 with a `ecosystem.config.js` file defining each process: name, script path, instances (use cluster mode for CPU-bound workers), max memory restart threshold, and log file paths.
   - Configure pm2 to auto-start on server boot: `pm2 startup` and `pm2 save`.
2. Configure log management:
   - Set up log rotation using `logrotate` (Linux) or pm2's built-in log rotation module.
   - Rotate logs daily. Retain 30 days of logs. Compress rotated logs with gzip.
   - Ensure application logs, access logs, and error logs are in separate files.
3. Configure resource monitoring:
   - Monitor disk usage: alert at 80% utilization.
   - Monitor memory usage: alert at 85% utilization.
   - Monitor CPU usage: alert if sustained above 80% for 10 minutes.
   - Use Grafana dashboards (from Skill 4) to visualize these metrics.
4. Configure firewall rules (for self-managed servers):
   - Allow inbound: SSH (port 22, restricted to admin IP ranges), HTTP (80), HTTPS (443).
   - Allow inbound from known service IPs only for database port (5432) and Redis port (6379).
   - Deny all other inbound traffic.
   - Document all firewall rules in a table: port, protocol, source, destination, purpose.
5. Configure SSH security:
   - Disable password authentication; require key-based authentication only.
   - Disable root SSH login.
   - Change the default SSH port from 22 to a non-standard port (optional but recommended).
   - Set up SSH key rotation: generate new keys every 90 days.
6. Configure user and permission management:
   - Create individual user accounts for each team member who needs server access (no shared accounts).
   - Use `sudo` for privilege escalation with per-user audit logging.
   - Review and remove unused accounts quarterly.
7. Set up cron jobs for server maintenance:
   - Automated security updates (unattended-upgrades on Ubuntu/Debian).
   - Disk cleanup: remove old log archives, temp files, and package caches monthly.
8. Document the full server administration configuration in a runbook: process management, log locations, resource thresholds, firewall rules, SSH configuration, user accounts, and maintenance schedules.

**What NOT to Do:**
- Do not allow password-based SSH authentication; key-based authentication is mandatory.
- Do not run application processes as root; use a dedicated non-root user.
- Do not open database or Redis ports to the public internet; restrict to known service IPs.
- Do not use shared user accounts; every person gets their own account for audit trail.
- Do not skip log rotation; unrotated logs will fill the disk and crash the server.
- Do not ignore security updates; automate them to prevent known vulnerabilities from being exploited.

**Done Condition:** Process management is configured and auto-starts on boot. Log rotation is active. Resource monitoring alerts are configured for disk, memory, and CPU. Firewall rules are applied and documented. SSH is hardened (key-only, no root login). Individual user accounts exist for all team members. Automated security updates are enabled. Server administration runbook exists.

---

### 9. Third-Party Service Management

**Purpose:** This skill exists to track, secure, and maintain all third-party service integrations used by the JTLD Consulting Inc platform so that API keys are rotated on schedule, service health is monitored, usage stays within budget, and fallback plans exist for every critical dependency.

**Preconditions:**
- A master list of all third-party services is compiled: Cloudflare, SendGrid/Resend, AWS (S3, SES), Redis provider, Supabase/PostgreSQL provider, analytics services, payment processor (if applicable).
- API keys and credentials for each service are stored in a secrets manager or encrypted environment variables.
- Billing accounts for each service are accessible.

**Steps:**
1. Create a third-party service inventory document with the following columns for each service:
   - Service name, purpose, account owner, billing contact, plan/tier, monthly cost, API key location, SLA, support contact URL, status page URL.
2. Configure API key rotation for every service:
   - Generate new API keys every 90 days.
   - Update the keys in the secrets manager or environment variables.
   - Deploy the updated configuration.
   - Verify the application works with the new keys.
   - Revoke the old keys only after confirming the new keys are working.
   - Log the rotation date and next rotation due date in the inventory document.
3. Set up health monitoring for each third-party service:
   - Subscribe to each service's status page (Cloudflare Status, SendGrid Status, AWS Health, etc.) for email or Slack notifications.
   - Configure synthetic checks: a scheduled job that calls each service's API with a lightweight request and verifies a successful response.
   - Alert if any service health check fails for 3 consecutive checks.
4. Configure usage tracking and billing alerts:
   - For each service, identify the key usage metric (email sends, S3 storage, API calls, bandwidth).
   - Set up alerts at 80% of plan limits to avoid unexpected overages or service interruption.
   - Review monthly invoices and compare to expected costs. Alert if any service cost exceeds 120% of the expected monthly amount.
5. Define fallback plans for critical services:
   - Email: if SendGrid is down, switch to Resend (or vice versa). Pre-configure both providers so switching requires only an environment variable change.
   - CDN: if Cloudflare is down, DNS failover to direct origin (pre-configure DNS records with low TTL for this scenario).
   - Cache: if Redis is down, application falls back to direct database queries (implemented in Skill 5).
   - File storage: if S3 is degraded, serve cached versions from CDN. New uploads queue for retry.
6. Conduct a quarterly service review:
   - Review each service's uptime over the past quarter against its SLA.
   - Review costs and usage trends.
   - Evaluate if any service should be replaced with a more cost-effective or reliable alternative.
   - Update the inventory document.
7. Document the complete third-party service management process: inventory, key rotation schedule, health monitoring, billing alerts, fallback plans, and quarterly review schedule.

**What NOT to Do:**
- Do not store API keys in application source code or Git repositories; use environment variables or a secrets manager exclusively.
- Do not skip key rotation because "it's working fine"; compromised keys with no rotation policy are a ticking time bomb.
- Do not rely on a single provider for critical functionality without a fallback plan.
- Do not ignore billing alerts; unexpected cost spikes often indicate misconfiguration or abuse.
- Do not wait for users to report a third-party outage; proactive monitoring must detect it first.
- Do not assume SLAs will be met; monitor actual uptime independently and hold vendors accountable.

**Done Condition:** The third-party service inventory document is complete and covers every external service. API key rotation is scheduled (90-day cycle) with the next rotation date recorded. Health monitoring is active for all services. Billing alerts are configured at 80% of plan limits. Fallback plans are documented and pre-configured for email, CDN, cache, and file storage. A quarterly review is scheduled. The management process document exists.

---

## Learning Resources

- [Linux Administration Handbook](https://www.admin.com/)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Redis Documentation](https://redis.io/documentation)
- [Uptime Robot](https://uptimerobot.com/)

## Tools

- Cloudflare Dashboard (DNS, CDN)
- SendGrid / Resend (email)
- Uptime Robot (monitoring)
- AWS Console (S3, SES)
- Redis CLI / RedisInsight (cache management)
- pgAdmin (database management)
- Grafana (dashboards)
- PagerDuty (incident management)
- Statuspage.io (public status page)
