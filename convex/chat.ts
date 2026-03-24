import { httpAction } from "./_generated/server";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, convertToModelMessages } from "ai";

// Use OpenAI-compatible provider which targets /chat/completions
// (not the Responses API that Convex's @ai-sdk/openai v3 uses by default)
const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://yawol.tech",
    "X-Title": "Yawol AI Operative",
  },
});

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handleChat = httpAction(async (_ctx, request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  let messages: any[];
  try {
    const body = await request.json();
    messages = body.messages ?? [];
    console.log("Chat request received", { messageCount: messages.length });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  try {
    // Normalize messages. The v6 SDK expects m.parts, v3 uses m.content.
    const safeMessages = messages.map(m => {
      if (m.parts) return m;
      return { ...m, parts: [{ type: "text", text: m.content || "" }] };
    });

    const modelMessages = await convertToModelMessages(safeMessages);

    const result = streamText({
      model: openrouter("nvidia/nemotron-3-super-120b-a12b:free"),
      system:
        "You are Yawol's AI Operative — a knowledgeable assistant for Yawol Technologies hardware store. Be helpful, concise, and professional.",
      messages: modelMessages,
    });

    const response = result.toUIMessageStreamResponse();
    const headers = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => headers.set(k, v));
    return new Response(response.body, { status: response.status, headers });
  } catch (err: any) {
    console.error("Chat streamText error:", err?.message ?? err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
});
