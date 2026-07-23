import { NextRequest, NextResponse } from "next/server";
import { blockIP, unblockIP, getBlockedIPs } from "@/lib/analyticsStore";

export async function POST(req: NextRequest) {
  try {
    const { passcode, ip, action } = await req.json().catch(() => ({}));
    const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "digits2026admin";

    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!ip) {
      return NextResponse.json({ error: "IP address is required" }, { status: 400 });
    }

    let updatedList: string[] = [];
    if (action === "UNBLOCK") {
      updatedList = unblockIP(ip);
    } else {
      updatedList = blockIP(ip);
    }

    return NextResponse.json({ success: true, action, ip, blockedIPs: updatedList });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");
  const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "digits2026admin";

  if (passcode !== ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  return NextResponse.json({ blockedIPs: getBlockedIPs() });
}
