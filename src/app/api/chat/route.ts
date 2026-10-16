import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/portfolio-knowledge";

/*
 * ── Rate Limiter ──
 * Per-process in-memory limiter.  Honest caveat: in a multi-instance
 * serverless deployment every cold-start gets its own counter, so this
 * is best-effort, not globally precise.  Good enough for a personal
 * portfolio without adding paid infrastructure or a database.
 */
const hits = new Map<string, { n: number; reset: number }>();
const MAX_RPM = 15;
const WINDOW = 60_000;

function allowed(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW });
    return true;
  }
  if (rec.n >= MAX_RPM) return false;
  rec.n++;
  return true;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ── Validation helpers ── */
const MAX_MESSAGES = 16;
const MAX_MSG_LEN = 2000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

interface IncomingMessage {
  role: string;
  content: string;
}

function validateBody(body: unknown): IncomingMessage[] {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0)
    throw new Error("Empty messages");
  if (messages.length > MAX_MESSAGES) throw new Error("Too many messages");

  for (const m of messages) {
    if (
      !m ||
      typeof m !== "object" ||
      typeof m.role !== "string" ||
      typeof m.content !== "string"
    )
      throw new Error("Invalid message format");
    if (!ALLOWED_ROLES.has(m.role)) throw new Error("Invalid role");
    if (m.content.length > MAX_MSG_LEN) throw new Error("Message too long");
  }
  return messages as IncomingMessage[];
}

/* ── Route handler ── */
// Currently active Gemini model with free tier support (gemini-2.0-flash was retired June 1, 2026)
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

export async function POST(request: Request) {
  /* 1. API key guard */
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "AI service is not configured. Reach Amrit directly via the contact section.",
      },
      { status: 503 },
    );
  }

  /* 2. Rate limit */
  if (!allowed(clientIp(request))) {
    return Response.json(
      { error: "Too many requests — slow down a little and try again." },
      { status: 429 },
    );
  }

  /* 3. Parse & validate */
  let messages: IncomingMessage[];
  try {
    const raw = await request.json();
    messages = validateBody(raw);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }

  /* 4. Build Gemini request */
  const ai = new GoogleGenAI({ apiKey });

  const contents = messages.map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("model" as const),
    parts: [{ text: m.content }],
  }));

  /* 5. Stream response (with at most 1 bounded retry for transient provider failures before streaming begins) */
  const requestStream = () =>
    ai.models.generateContentStream({
      model: MODEL,
      config: {
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: 1024,
        temperature: 0.8,
        topP: 0.92,
      },
      contents,
    });

  let response: Awaited<ReturnType<typeof requestStream>>;
  try {
    try {
      response = await requestStream();
    } catch (initialErr: unknown) {
      const status =
        initialErr && typeof initialErr === "object" && "status" in initialErr && typeof initialErr.status === "number"
          ? initialErr.status
          : 0;
      const msg = initialErr instanceof Error ? initialErr.message : "";

      // Transient provider failures: 503 (high demand / unavailable), 500, 504, or network drops
      const isTransient =
        status === 503 ||
        status === 500 ||
        status === 504 ||
        msg.includes("fetch failed") ||
        msg.includes("ECONNRESET") ||
        msg.includes("ETIMEDOUT");

      // Do NOT retry invalid requests (400), authentication failures (401/403), or quota exhaustion (429)
      if (isTransient) {
        console.warn(`[chat] Transient provider failure (HTTP ${status || "network"}), attempting 1 bounded retry in 600ms...`);
        await new Promise((resolve) => setTimeout(resolve, 600));
        response = await requestStream();
      } else {
        throw initialErr;
      }
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          // If stream breaks mid-transmission, close stream cleanly without retry
          const status = (err && typeof err === "object" && "status" in err) ? err.status : "unknown";
          console.error(`[chat] Streaming aborted mid-chunk: status ${status}`);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const status = (err && typeof err === "object" && "status" in err && typeof err.status === "number")
      ? err.status
      : 502;
    const rawMsg = err instanceof Error ? err.message : "";

    // Safe sanitized server-side diagnostic log (never logs API keys or raw payloads)
    console.error(`[chat] Gemini provider error: HTTP ${status} (type: ${err instanceof Error ? err.name : typeof err})`);

    // Distinguish provider failure categories
    if (status === 401 || status === 403 || rawMsg.includes("API_KEY_INVALID") || rawMsg.includes("UNAUTHENTICATED")) {
      return Response.json(
        { error: "AI authentication error. Please verify GEMINI_API_KEY in environment settings." },
        { status: 401 },
      );
    }

    if (status === 404 || rawMsg.includes("NOT_FOUND")) {
      return Response.json(
        { error: "Configured AI model is currently unavailable from the provider." },
        { status: 404 },
      );
    }

    if (status === 429 || rawMsg.includes("quota") || rawMsg.includes("RESOURCE_EXHAUSTED")) {
      return Response.json(
        { error: "AI quota exceeded. Try again in a moment or contact Amrit directly." },
        { status: 429 },
      );
    }

    if (status === 503 || rawMsg.includes("UNAVAILABLE") || rawMsg.includes("high demand")) {
      return Response.json(
        { error: "AI service is currently experiencing high demand. Please try again shortly." },
        { status: 503 },
      );
    }

    if (status === 400 || rawMsg.includes("INVALID_ARGUMENT")) {
      return Response.json(
        { error: "Invalid request to AI service. Please try rephrasing your question." },
        { status: 400 },
      );
    }

    return Response.json(
      { error: "AI service temporarily unavailable. Contact Amrit directly via the form below." },
      { status: 502 },
    );
  }
}
