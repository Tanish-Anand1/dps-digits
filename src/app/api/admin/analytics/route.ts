import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsEvents, getGroupedDevices, getGroupedIPVisitors, getBlockedIPs } from "@/lib/analyticsStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");
  const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "digits2026admin";

  if (passcode !== ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const rawEvents = getAnalyticsEvents();
  const events = rawEvents.filter((e) => !e.ip.includes("127.0.0.1") && !e.ip.includes("::1"));

  const totalHits = events.length;

  const groupedDevices = getGroupedDevices();
  const groupedVisitors = getGroupedIPVisitors();

  const uniqueDeviceCount = groupedDevices.length;
  const uniqueIPs = groupedVisitors.length;

  const deviceCounts = {
    Desktop: 0,
    Mobile: 0,
    Tablet: 0,
    Unknown: 0,
  };

  events.forEach((e) => {
    deviceCounts[e.deviceType] = (deviceCounts[e.deviceType] || 0) + 1;
  });

  const blockedIPs = getBlockedIPs();

  return NextResponse.json({
    metrics: {
      totalHits,
      uniqueDeviceCount,
      uniqueIPs,
      deviceCounts,
      blockedIPCount: blockedIPs.length,
    },
    groupedDevices,
    groupedVisitors,
    events,
    blockedIPs,
  });
}
