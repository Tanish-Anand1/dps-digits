import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsEvents } from "@/lib/analyticsStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");

  // Admin secret passcode
  const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "digits2026admin";

  if (passcode !== ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const events = getAnalyticsEvents();

  // Calculate summary metrics
  const totalClicks = events.length;

  const uniqueIPs = new Set(events.map((e) => e.ip)).size;

  const deviceCounts = {
    Desktop: 0,
    Mobile: 0,
    Tablet: 0,
    Unknown: 0,
  };

  events.forEach((e) => {
    deviceCounts[e.deviceType] = (deviceCounts[e.deviceType] || 0) + 1;
  });

  return NextResponse.json({
    metrics: {
      totalClicks,
      uniqueIPs,
      deviceCounts,
    },
    events,
  });
}
