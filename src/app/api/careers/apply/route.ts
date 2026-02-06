import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name = data.get("name") as string | null;
    const email = data.get("email") as string | null;
    const phone = data.get("phone") as string | null;
    const linkedin = data.get("linkedin") as string | null;
    const area = data.get("area") as string | null;
    const message = data.get("message") as string | null;
    const resume = data.get("resume") as File | null;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !area?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and area of interest are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate resume
    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "Please attach a resume." },
        { status: 400 }
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (resume.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Resume must be under 5 MB." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document." },
        { status: 400 }
      );
    }

    // ── Process the application ──────────────────────────────────
    // In production, this would:
    //  1. Upload resume to S3 (AWS_S3_BUCKET)
    //  2. Store application in the database
    //  3. Send confirmation email via SendGrid
    //  4. Notify the talent team
    //
    // For now, log the submission details.
    console.log("New application received:", {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "—",
      linkedin: linkedin?.trim() || "—",
      area: area.trim(),
      message: message?.trim() || "—",
      resumeName: resume.name,
      resumeSize: `${(resume.size / 1024).toFixed(1)} KB`,
      resumeType: resume.type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
