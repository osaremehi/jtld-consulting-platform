import { NextResponse } from "next/server";

/**
 * Cron: Deactivate expired job postings
 * Schedule: Daily at 2:00 AM UTC
 *
 * Sets isActive = false on all jobs where expiresAt < now
 */
export async function GET() {
  try {
    // TODO: Replace with Prisma query once database is set up
    // const result = await prisma.job.updateMany({
    //   where: {
    //     isActive: true,
    //     expiresAt: { lt: new Date() },
    //   },
    //   data: {
    //     isActive: false,
    //     closedAt: new Date(),
    //   },
    // });

    const result = { count: 0 };

    return NextResponse.json({
      success: true,
      message: `Deactivated ${result.count} expired jobs`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron: cleanup-expired-jobs failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to clean up expired jobs" },
      { status: 500 }
    );
  }
}
