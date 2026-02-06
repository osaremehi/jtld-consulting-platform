/**
 * Application-wide constants.
 */

export const APP_NAME = "JTLD Consulting Inc";
export const APP_DOMAIN = "jtldinc.com";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jtldinc.com";

// ── Pagination defaults ──────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ── File upload limits (bytes) ───────────────────────────────
export const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024; // 25MB

// ── Allowed file types ───────────────────────────────────────
export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export const ALLOWED_AVATAR_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

// ── Auth ─────────────────────────────────────────────────────
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
export const SESSION_MAX_AGE = 30 * 60; // 30 minutes
export const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
export const MAX_JOB_ALERTS = 10;

// ── Job posting ──────────────────────────────────────────────
export const DEFAULT_JOB_EXPIRY_DAYS = 30;
export const NEW_JOB_BADGE_HOURS = 48;

// ── Matching ─────────────────────────────────────────────────
export const MATCH_WEIGHTS = {
  skills: 0.4,
  experience: 0.2,
  location: 0.15,
  rate: 0.15,
  arrangement: 0.1,
} as const;
