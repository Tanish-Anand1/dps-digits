import fs from "fs";
import path from "path";

export interface AnalyticsEvent {
  id: string;
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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

// In-memory fallback in case filesystem is read-only
let memoryEvents: AnalyticsEvent[] = [];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
  } catch {
    // Memory fallback
  }
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
  ensureDataFile();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fallback to memory
  }
  return memoryEvents;
}

export function logAnalyticsEvent(eventData: Omit<AnalyticsEvent, "id" | "timestamp" | "deviceType" | "os" | "browser">): AnalyticsEvent {
  ensureDataFile();

  const { deviceType, os, browser } = parseUserAgent(eventData.userAgent);

  const newEvent: AnalyticsEvent = {
    id: "evt_" + Math.random().toString(36).substring(2, 10),
    timestamp: new Date().toISOString(),
    ...eventData,
    deviceType,
    os,
    browser,
  };

  const existing = getAnalyticsEvents();
  existing.unshift(newEvent); // Latest events first

  // Keep max 2000 events to manage file size
  const trimmed = existing.slice(0, 2000);
  memoryEvents = trimmed;

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
  } catch {
    // Memory fallback
  }

  return newEvent;
}
