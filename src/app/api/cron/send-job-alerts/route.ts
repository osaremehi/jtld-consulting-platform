import { NextResponse } from "next/server";

/**
 * Cron: Send daily job alert emails
 * Schedule: Daily at 8:00 AM UTC
 *
 * Finds active job alerts with frequency=DAILY,
 * matches them against new jobs posted since lastSentAt,
 * and queues notification emails.
 */
export async function GET() {
  try {
    // TODO: Replace with actual implementation once database + email are set up
    // const alerts = await prisma.jobAlert.findMany({
    //   where: {
    //     isActive: true,
    //     frequency: "DAILY",
    //   },
    //   include: { user: true },
    // });
    //
    // for (const alert of alerts) {
    //   const matchingJobs = await findMatchingJobs(alert.searchCriteria, alert.lastSentAt);
    //   if (matchingJobs.length > 0) {
    //     await emailQueue.add("job-alert", {
    //       to: alert.user.email,
    //       template: "job-alert",
    //       data: { jobs: matchingJobs, alertId: alert.id },
    //     });
    //     await prisma.jobAlert.update({
    //       where: { id: alert.id },
    //       data: { lastSentAt: new Date() },
    //     });
    //   }
    // }

    return NextResponse.json({
      success: true,
      message: "Job alerts processed",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron: send-job-alerts failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to send job alerts" },
      { status: 500 }
    );
  }
}
