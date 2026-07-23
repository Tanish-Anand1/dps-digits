import { NextRequest, NextResponse } from "next/server";
import { logAnalyticsEvent } from "@/lib/analyticsStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Extract client IP address from proxy/Vercel/nginx headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    let ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || (req as unknown as { ip?: string }).ip || "127.0.0.1";

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "127.0.0.1 (Localhost)";
    }

    const userAgent = req.headers.get("user-agent") || "Unknown User-Agent";

    const event = logAnalyticsEvent({
      ip,
      userAgent,
      path: body.path || "/",
      action: body.action || "PAGE_VIEW",
      linkText: body.linkText || undefined,
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
