import { NextResponse } from "next/server";

interface HealthCheck {
  status: "up" | "down";
  latencyMs?: number;
  message?: string;
}

interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  uptime: number;
  checks: Record<string, HealthCheck>;
}

const startTime = Date.now();

export async function GET() {
  const checks: Record<string, HealthCheck> = {};

  // App check — always up if this route is responding
  checks.app = { status: "up", latencyMs: 0 };

  // Database — will be wired once Prisma is installed
  checks.database = {
    status: process.env.DATABASE_URL ? "up" : "down",
    message: process.env.DATABASE_URL ? "Configured" : "Not configured",
  };

  // Redis check — will be enabled once Redis is configured
  if (process.env.REDIS_URL) {
    checks.redis = { status: "up", message: "Configured" };
  } else {
    checks.redis = { status: "down", message: "Not configured" };
  }

  // Determine overall status
  const criticalChecks = [checks.app];
  const allCriticalUp = criticalChecks.every((c) => c.status === "up");

  const response: HealthResponse = {
    status: allCriticalUp ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    checks,
  };

  return NextResponse.json(response, {
    status: allCriticalUp ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
