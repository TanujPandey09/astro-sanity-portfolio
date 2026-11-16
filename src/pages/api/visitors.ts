import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const prerender = false;

interface VisitorState {
  totalVisits: number;
  sessions: Record<string, number>;
}

const STORE_NAME = "portfolio-metrics";
const BLOB_KEY = "visitor-stats";
const ACTIVE_TTL_MS = 90_000;
const LOCAL_CACHE_PATH = path.resolve(process.cwd(), ".astro", "visitor-metrics.json");

let memoryState: VisitorState = {
  totalVisits: 0,
  sessions: {},
};

function sanitizeState(raw: unknown): VisitorState {
  const input = (raw && typeof raw === "object" ? raw : {}) as Partial<VisitorState>;
  const totalVisits = typeof input.totalVisits === "number" && Number.isFinite(input.totalVisits) && input.totalVisits >= 0
    ? Math.floor(input.totalVisits)
    : 0;
  const sessions: Record<string, number> = {};
  if (input.sessions && typeof input.sessions === "object") {
    for (const [sid, ts] of Object.entries(input.sessions)) {
      if (typeof ts === "number" && Number.isFinite(ts) && /^[a-zA-Z0-9_-]{4,64}$/.test(sid)) {
        sessions[sid] = ts;
      }
    }
  }
  return { totalVisits, sessions };
}

function pruneExpiredSessions(state: VisitorState, now: number): VisitorState {
  const activeSessions: Record<string, number> = {};
  for (const [sid, lastSeen] of Object.entries(state.sessions)) {
    if (now - lastSeen <= ACTIVE_TTL_MS) {
      activeSessions[sid] = lastSeen;
    }
  }
  return {
    totalVisits: state.totalVisits,
    sessions: activeSessions,
  };
}

async function loadState(): Promise<VisitorState> {
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const data = await store.get(BLOB_KEY, { type: "json" });
    if (data) {
      const parsed = sanitizeState(data);
      memoryState = parsed;
      return parsed;
    }
    return { totalVisits: 0, sessions: {} };
  } catch {
    // Local dev fallback when Netlify Blobs runtime context is not injected
    try {
      const raw = await readFile(LOCAL_CACHE_PATH, "utf-8");
      const parsed = sanitizeState(JSON.parse(raw));
      memoryState = parsed;
      return parsed;
    } catch {
      return sanitizeState(memoryState);
    }
  }
}

async function saveState(state: VisitorState): Promise<void> {
  memoryState = state;
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    await store.setJSON(BLOB_KEY, state);
    return;
  } catch {
    try {
      await mkdir(path.dirname(LOCAL_CACHE_PATH), { recursive: true });
      await writeFile(LOCAL_CACHE_PATH, JSON.stringify(state), "utf-8");
    } catch {
      // Read-only fallback preserves in-memory counts safely
    }
  }
}

function toJsonResponse(state: VisitorState, status = 200): Response {
  const active = Object.keys(state.sessions).length;
  return new Response(
    JSON.stringify({
      active,
      total: state.totalVisits,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export const GET: APIRoute = async () => {
  const now = Date.now();
  const state = pruneExpiredSessions(await loadState(), now);
  return toJsonResponse(state);
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const rawId = typeof body?.sessionId === "string" ? body.sessionId.trim() : "";
    const sessionId = /^[a-zA-Z0-9_-]{4,64}$/.test(rawId) ? rawId : "";
    const action = body?.action === "leave" ? "leave" : "heartbeat";
    const isNewSession = body?.isNewSession === true;

    const now = Date.now();
    const state = pruneExpiredSessions(await loadState(), now);

    if (sessionId) {
      if (action === "leave") {
        delete state.sessions[sessionId];
      } else {
        if (isNewSession && !(sessionId in state.sessions)) {
          state.totalVisits += 1;
        } else if (state.totalVisits === 0) {
          state.totalVisits = 1;
        }
        state.sessions[sessionId] = now;
      }
      await saveState(state);
    }

    return toJsonResponse(state);
  } catch {
    return toJsonResponse(memoryState);
  }
};

