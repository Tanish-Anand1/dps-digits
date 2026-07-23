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

    const isIgnoredHeader = req.headers.get("x-ignore-analytics") === "true" || body.ignore === true;

    // EXCLUDE THIS PC / LOCALHOST DEVELOPER ENVIRONMENT
    if (ip === "::1" || ip === "127.0.0.1" || ip.includes("127.0.0.1") || isIgnoredHeader) {
      return NextResponse.json({ success: true, ignored: true, reason: "Localhost / Developer PC Excluded" });
    }

    const userAgent = req.headers.get("user-agent") || "Unknown User-Agent";

    const event = logAnalyticsEvent({
      visitorId: body.visitorId || "vid_unknown",
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
