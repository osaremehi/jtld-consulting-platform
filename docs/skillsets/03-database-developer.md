# Database Developer / Database Administrator (DBA)

## Role Overview

The Database Developer / DBA is responsible for designing, implementing, and maintaining the database systems that store all platform data including user profiles, job listings, applications, and transactions.

## Priority

**Critical** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| PostgreSQL | Primary relational database |
| Prisma ORM | Database toolkit and query builder |
| Prisma Migrate | Schema migrations and versioning |
| Prisma Studio | Visual database management GUI |
| SQL | Direct database queries and optimization |
| Redis | Caching and session storage |

## Required Skills

### Database Fundamentals

- Relational database concepts (tables, rows, columns)
- Primary keys, foreign keys, and relationships
- One-to-one, one-to-many, many-to-many relationships
- Data types (text, integer, boolean, timestamp, enum, JSON)
- Database normalization (1NF, 2NF, 3NF)
- ACID properties (Atomicity, Consistency, Isolation, Durability)

### PostgreSQL

- Installation and configuration
- User and role management
- Database creation and management
- psql command-line interface
- pgAdmin GUI tool
- JSON/JSONB column types
- Full-text search with tsvector
- Array and composite types
- Views and materialized views
- Stored procedures and functions

### Prisma ORM

- Schema definition language (schema.prisma)
- Model definitions and field types
- Relations (one-to-one, one-to-many, many-to-many)
- Enums and custom types
- Prisma Migrate for schema changes
- Prisma Client for queries
- Prisma Studio for visual data management
- Seeding scripts for development data
- Raw SQL queries when needed

### Schema Design

- Entity-relationship diagrams (ERD)
- Table design and normalization
- Index design for query performance
- Enum usage for fixed value sets
- Soft deletes vs hard deletes
- Audit trails (createdAt, updatedAt, deletedAt)
- UUID vs auto-increment for primary keys

### Query Optimization

- EXPLAIN and EXPLAIN ANALYZE
- Index types (B-tree, Hash, GIN, GiST)
- Composite indexes for multi-column queries
- Query plan analysis
- N+1 query problem and solutions
- Connection pooling (PgBouncer, Prisma connection pool)
- Slow query identification and optimization

### Data Integrity

- Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)
- Foreign key constraints and cascade rules
- Transaction management
- Data validation at database level
- Concurrent access handling
- Optimistic vs pessimistic locking

### Backup & Recovery

- Automated backup strategies
- Point-in-time recovery
- pg_dump and pg_restore
- Replication setup
- Disaster recovery planning

### Security

- Role-based database access
- Row-level security (RLS)
- Encrypted connections (SSL/TLS)
- Sensitive data encryption at rest
- SQL injection prevention
- Audit logging

## Database Schema for This Project

```prisma
// Core models needed for the JTLD Consulting Inc platform

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  role          UserRole
  firstName     String
  lastName      String
  phone         String?
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Job {
  id            String    @id @default(cuid())
  title         String
  description   String
  company       String
  location      String
  salary        String?
  jobType       JobType
  skills        String[]
  postedAt      DateTime  @default(now())
  expiresAt     DateTime?
  isActive      Boolean   @default(true)
}

model Application {
  id            String    @id @default(cuid())
  status        AppStatus @default(PENDING)
  coverLetter   String?
  resumeUrl     String?
  appliedAt     DateTime  @default(now())
}

enum UserRole {
  CANDIDATE
  EMPLOYER
  ADMIN
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  FREELANCE
  INTERNSHIP
}

enum AppStatus {
  PENDING
  REVIEWED
  SHORTLISTED
  INTERVIEW
  OFFERED
  REJECTED
  WITHDRAWN
}
```

## Key Responsibilities in This Project

1. Design the complete database schema for the platform
2. Set up PostgreSQL locally and in production
3. Create Prisma schema with all models and relations
4. Write and manage database migrations
5. Create seed scripts with sample data
6. Optimize queries for job search and filtering
7. Implement full-text search for job listings
8. Set up database backups and recovery
9. Monitor and optimize database performance
10. Ensure data integrity and security

## Learning Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Database Design Guide](https://www.postgresql.org/docs/current/ddl.html)

## Tools

- pgAdmin 4 (PostgreSQL GUI)
- Prisma Studio (visual database editor)
- DBeaver (universal database tool)
- DataGrip (JetBrains database IDE)
- dbdiagram.io (ERD design tool)
