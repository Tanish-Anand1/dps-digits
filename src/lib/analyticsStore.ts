import fs from "fs";
import path from "path";

export interface AnalyticsEvent {
  id: string;
  visitorId: string;
  isNewDevice: boolean;
  timestamp: string;
  ip: string;
  userAgent: string;
  deviceType: "Desktop" | "Mobile" | "Tablet" | "Unknown";
  os: string;
  browser: string;
  path: string;
  action: string;
  linkText?: string;
}

export interface GroupedDeviceVisitor {
  visitorId: string;
  ip: string;
  deviceType: AnalyticsEvent["deviceType"];
  os: string;
  browser: string;
  userAgent: string;
  totalVisits: number;
  firstSeen: string;
  lastSeen: string;
  isBlocked: boolean;
  history: AnalyticsEvent[];
}

export interface GroupedIPVisitor {
  ip: string;
  visitorId: string;
  deviceType: AnalyticsEvent["deviceType"];
  os: string;
  browser: string;
  userAgent: string;
  totalVisits: number;
  firstSeen: string;
  lastSeen: string;
  isBlocked: boolean;
  devices: string[];
  history: AnalyticsEvent[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");
const BLOCKED_IPS_FILE = path.join(DATA_DIR, "blocked_ips.json");

let memoryEvents: AnalyticsEvent[] = [];
let memoryBlockedIPs: string[] = [];

function ensureDataFiles() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(BLOCKED_IPS_FILE)) {
      fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify([], null, 2));
    }
  } catch {
    // Memory fallback
  }
}

export function getBlockedIPs(): string[] {
  ensureDataFiles();
  try {
    if (fs.existsSync(BLOCKED_IPS_FILE)) {
      const data = fs.readFileSync(BLOCKED_IPS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fallback
  }
  return memoryBlockedIPs;
}

export function isIPBlocked(ip: string): boolean {
  const blockedList = getBlockedIPs();
  const cleanIP = ip.split(" ")[0].trim();
  return blockedList.includes(cleanIP) || blockedList.includes(ip);
}

export function blockIP(ip: string): string[] {
  ensureDataFiles();
  const cleanIP = ip.split(" ")[0].trim();
  const blocked = getBlockedIPs();
  if (!blocked.includes(cleanIP)) {
    blocked.push(cleanIP);
    memoryBlockedIPs = blocked;
    try {
      fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify(blocked, null, 2));
    } catch {
      // Memory fallback
    }
  }
  return blocked;
}

export function unblockIP(ip: string): string[] {
  ensureDataFiles();
  const cleanIP = ip.split(" ")[0].trim();
  const blocked = getBlockedIPs().filter((b) => b !== cleanIP && b !== ip);
  memoryBlockedIPs = blocked;
  try {
    fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify(blocked, null, 2));
  } catch {
    // Memory fallback
  }
  return blocked;
}

export function parseUserAgent(ua: string): { deviceType: AnalyticsEvent["deviceType"]; os: string; browser: string } {
  let deviceType: AnalyticsEvent["deviceType"] = "Desktop";
  if (/mobile/i.test(ua)) deviceType = "Mobile";
  else if (/ipad|tablet|playbook|silk/i.test(ua)) deviceType = "Tablet";

  let os = "Unknown OS";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os/i.test(ua)) os = "macOS";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "Unknown Browser";
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/opera|opr/i.test(ua)) browser = "Opera";

  return { deviceType, os, browser };
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  ensureDataFiles();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Memory fallback
  }
  return memoryEvents;
}

export function logAnalyticsEvent(
  eventData: Omit<AnalyticsEvent, "id" | "isNewDevice" | "timestamp" | "deviceType" | "os" | "browser">
): AnalyticsEvent | null {
  ensureDataFiles();

  const existing = getAnalyticsEvents();
  const now = Date.now();

  const isDuplicate = existing.some((e) => {
    const timeDiff = now - new Date(e.timestamp).getTime();
    return (
      timeDiff < 8000 &&
      e.ip === eventData.ip &&
      e.visitorId === eventData.visitorId &&
      e.action === eventData.action &&
      e.path === eventData.path
    );
  });

  if (isDuplicate) {
    return null;
  }

  const isNewDevice = !existing.some((e) => e.visitorId === eventData.visitorId || (e.ip === eventData.ip && e.userAgent === eventData.userAgent));
  const { deviceType, os, browser } = parseUserAgent(eventData.userAgent);

  const newEvent: AnalyticsEvent = {
    id: "evt_" + Math.random().toString(36).substring(2, 10),
    isNewDevice,
    timestamp: new Date().toISOString(),
    ...eventData,
    visitorId: eventData.visitorId || "vid_unknown",
    deviceType,
    os,
    browser,
  };

  existing.unshift(newEvent);

  const trimmed = existing.slice(0, 2000);
  memoryEvents = trimmed;

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
  } catch {
    // Memory fallback
  }

  return newEvent;
}

// 1. GROUP BY UNIQUE DEVICE (VISITOR ID & HARDWARE FINGERPRINT)
export function getGroupedDevices(): GroupedDeviceVisitor[] {
  const events = getAnalyticsEvents().filter((e) => !e.ip.includes("127.0.0.1") && !e.ip.includes("::1"));
  const blockedList = getBlockedIPs();

  const deviceMap = new Map<string, GroupedDeviceVisitor>();

  events.forEach((evt) => {
    // Unique device key: visitorId or IP+userAgent
    const key = evt.visitorId && evt.visitorId !== "vid_unknown" ? evt.visitorId : `${evt.ip}_${evt.userAgent}`;

    if (!deviceMap.has(key)) {
      deviceMap.set(key, {
        visitorId: evt.visitorId,
        ip: evt.ip,
        deviceType: evt.deviceType,
        os: evt.os,
        browser: evt.browser,
        userAgent: evt.userAgent,
        totalVisits: 0,
        firstSeen: evt.timestamp,
        lastSeen: evt.timestamp,
        isBlocked: blockedList.includes(evt.ip),
        history: [],
      });
    }

    const device = deviceMap.get(key)!;
    device.totalVisits += 1;
    device.history.push(evt);
    if (new Date(evt.timestamp) > new Date(device.lastSeen)) {
      device.lastSeen = evt.timestamp;
    }
    if (new Date(evt.timestamp) < new Date(device.firstSeen)) {
      device.firstSeen = evt.timestamp;
    }
  });

  return Array.from(deviceMap.values()).sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
}

// 2. GROUP BY NETWORK IP ADDRESS
export function getGroupedIPVisitors(): GroupedIPVisitor[] {
  const events = getAnalyticsEvents().filter((e) => !e.ip.includes("127.0.0.1") && !e.ip.includes("::1"));
  const blockedList = getBlockedIPs();

  const groupsMap = new Map<string, GroupedIPVisitor>();

  events.forEach((evt) => {
    const key = evt.ip;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        ip: evt.ip,
        visitorId: evt.visitorId,
        deviceType: evt.deviceType,
        os: evt.os,
        browser: evt.browser,
        userAgent: evt.userAgent,
        totalVisits: 0,
        firstSeen: evt.timestamp,
        lastSeen: evt.timestamp,
        isBlocked: blockedList.includes(evt.ip),
        devices: [],
        history: [],
      });
    }

    const group = groupsMap.get(key)!;
    group.totalVisits += 1;
    group.history.push(evt);
    if (evt.visitorId && !group.devices.includes(evt.visitorId)) {
      group.devices.push(evt.visitorId);
    }
    if (new Date(evt.timestamp) > new Date(group.lastSeen)) {
      group.lastSeen = evt.timestamp;
    }
    if (new Date(evt.timestamp) < new Date(group.firstSeen)) {
      group.firstSeen = evt.timestamp;
    }
  });

  return Array.from(groupsMap.values()).sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
}
