import { NextResponse } from "next/server";

/**
 * Cron: Send timesheet submission reminders
 * Schedule: Every Friday at 10:00 AM UTC
 *
 * Notifies active contractors who haven't submitted their
 * timesheet for the current week.
 */
export async function GET() {
  try {
    // TODO: Replace with actual implementation
    // const currentWeekStart = getWeekStart(new Date());
    //
    // const contractorsWithoutTimesheets = await prisma.contract.findMany({
    //   where: {
    //     status: "ACTIVE",
    //     timesheets: {
    //       none: {
    //         weekStarting: currentWeekStart,
    //       },
    //     },
    //   },
    //   include: {
    //     candidate: { include: { user: true } },
    //   },
    // });
    //
    // for (const contract of contractorsWithoutTimesheets) {
    //   await emailQueue.add("timesheet-reminder", {
    //     to: contract.candidate.user.email,
    //     template: "timesheet-reminder",
    //     data: {
    //       userName: contract.candidate.user.firstName,
    //       weekStarting: currentWeekStart,
    //       contractId: contract.id,
    //     },
    //   });
    // }

    return NextResponse.json({
      success: true,
      message: "Timesheet reminders processed",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron: timesheet-reminders failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to send timesheet reminders" },
      { status: 500 }
    );
  }
}
