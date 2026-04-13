import { AppDataSnapshot } from "@/lib/types";
import { initialAppData } from "@/lib/mock-data";

const STORAGE_KEY = "guttrigger-demo-store";
const SESSION_KEY = "guttrigger-demo-session";

export function loadLocalSnapshot(): AppDataSnapshot {
  if (typeof window === "undefined") {
    return initialAppData;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppData));
    return initialAppData;
  }

  try {
    return JSON.parse(raw) as AppDataSnapshot;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppData));
    return initialAppData;
  }
}

export function saveLocalSnapshot(snapshot: AppDataSnapshot) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function loadDemoSession() {
  if (typeof window === "undefined") {
    return { authenticated: false };
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return { authenticated: false };
  }

  try {
    return JSON.parse(raw) as { authenticated: boolean };
  } catch {
    return { authenticated: false };
  }
}

export function saveDemoSession(session: { authenticated: boolean }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function resetDemoData() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppData));
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ authenticated: false }));
}
