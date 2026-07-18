# AI Agents — Integration Notes (Admin Dashboard)

**Backend status:** shipped (2026-07-19) · **Frontend status:** not started
**Scope here:** agent management (enable/disable, edit prompt/model), the Product Listing chat, and the support-ticket queue.

The FastAPI backend for three AI assistants — Product Listing, Order Tracking, Customer Query — is live at `/api/v1/ai-agents`. This doc covers everything the **admin dashboard** needs to build against it.

## At a glance — who builds what

| Capability | Admin Dashboard | Customer Web | Mobile App |
|---|---|---|---|
| Manage agents (enable/disable, edit model & prompt) | **Build** | — | — |
| Chat — Product Listing (draft-then-confirm) | **Build** | — | — |
| Chat — Order Tracking | Optional | Build | Build |
| Chat — Customer Query (support) | Optional | Build | Build |
| View & resolve escalated support tickets | **Build** | — | — |

"Optional" = the backend allows admins to use these too (e.g. a support rep checking a customer's order mid-call), but nothing requires it — skip unless it's actually wanted for launch.

---

## Shared foundation (same for every client)

### Endpoints

| Method & path | Who | Purpose |
|---|---|---|
| `GET /ai-agents/` | Admin | List the 3 agent configs |
| `PATCH /ai-agents/{agent_key}` | Admin | Edit `model_name` / `system_prompt_override` |
| `PATCH /ai-agents/{agent_key}/status` | Admin | `{ is_enabled }` — the on/off switch |
| `POST /ai-agents/{agent_key}/chat` | Signed-in user | `{ message, conversation_id? }` → SSE stream |
| `GET /ai-agents/tickets` | Admin | List escalated support tickets |
| `PATCH /ai-agents/tickets/{id}/status` | Admin | `{ is_resolved }` |

All paths are relative to `/api/v1/ai-agents`. `agent_key` is one of `product_listing`, `order_tracking`, `customer_query`.

### Auth — nothing to change

The existing interceptor sets `config.headers.Authorization = token` (raw value, no `Bearer ` prefix). The backend accepts both a raw token and a `Bearer <token>`-prefixed one, so this works against these endpoints unmodified.

### The chat stream

The chat endpoint doesn't return JSON — it returns `text/event-stream`. Send the first message with no `conversation_id`; the stream's `done` event returns one, which you pass on every later message in that thread to keep the agent's memory of the conversation.

```
POST /api/v1/ai-agents/order_tracking/chat
{ "message": "where's order 4821?" }

→ data: {"type": "delta", "text": "Let "}
  data: {"type": "delta", "text": "me check"}
  data: {"type": "delta", "text": "... it's out for delivery."}
  data: {"type": "done", "conversation_id": 57}
```

> **The one genuinely new pattern.** No SSE/WebSocket/`EventSource` code exists anywhere in this repo today (confirmed by direct inspection, not an assumption). It also can't be the browser's built-in `EventSource` class — that only supports `GET` with no custom body or auth header, and this endpoint needs both. You need a small `fetch` + manual stream-reader: read the response body, split on blank lines, strip the `data: ` prefix, `JSON.parse` the rest. About 20 lines — see below.

### Errors you'll see

| Status | When |
|---|---|
| 401 | Not signed in / expired token — same as every other endpoint |
| 403 | `"Admin access required"` (non-admin hit `product_listing`) or `"The <Agent> is currently disabled"` (admin turned it off) |
| 404 | `"Unknown agent '…'"` — typo'd `agent_key` |

---

## What ships here

- An **AI Agents** screen: list the 3 agents, toggle enabled, edit model/prompt.
- A **Product Listing** chat: admin describes a product, the agent drafts it, admin confirms before it's actually created.
- A **support tickets** screen: list escalations from the Customer Query agent, mark resolved.

## Where it plugs in

- **Copy the Banners pattern exactly** for the on/off toggle — `src/pages/BannersManagement/` (card grid + a `Power`-icon toggle button + a `useUpdateBannerStatus`-style mutation) is the same shape as "list 3 agents, flip a switch."
- **Copy the Reviews pattern** for tickets — `src/pages/ReviewsManagement/ReviewsManagement.Config.tsx`'s `DataTable` + inline toggle-cell is the same shape as "tabular list with a resolve action per row."
- New service + hooks: `src/api/services/aiAgents/` (mirroring `banners/`) and `src/hooks/api/aiAgents.queries.ts` for the plain-JSON endpoints (config list/update/status, tickets list/status) — normal React Query, no streaming involved.
- New route(s) in `appRoutes.ts` / `routes.tsx` + a menu entry in `layouts/menu.config.ts`.
- **Decide what to do with `src/pages/Chats/Chats.tsx`.** It's currently a "Coming Soon!" stub wired to a `chats` service whose types import a module that doesn't exist — dead code, not a working reference. Either delete it or replace it outright with the new Product Listing chat; don't try to repurpose its internals.

## The new part: streaming the chat

The existing `axiosInstance` / `request()` wrapper can't stream. Chat needs its own function, called once for that one endpoint:

```ts
// src/api/services/aiAgents/streamChat.ts
export async function streamAgentChat(
  agentKey: string,
  body: { message: string; conversation_id?: number },
  onDelta: (text: string) => void,
) {
  const res = await fetch(`${Config.API_URL}/ai-agents/${agentKey}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: useStore.getState().token!,
    },
    body: JSON.stringify(body),
  });
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let conversationId: number | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      const event = JSON.parse(chunk.replace(/^data: /, ""));
      if (event.type === "delta") onDelta(event.text);
      if (event.type === "done") conversationId = event.conversation_id;
    }
  }
  return conversationId;
}
```

## Checklist

- [ ] Confirm an LLM provider & API key are set on the backend before building the chat UI — until then, every chat call ends in an error event (fine for testing the plumbing, not for a demo)
- [ ] `src/api/services/aiAgents/` + `src/hooks/api/aiAgents.queries.ts` for config & tickets
- [ ] Agent Management screen (Banners pattern)
- [ ] Support Tickets screen (Reviews pattern)
- [ ] `streamAgentChat()` util + Product Listing chat screen
- [ ] Delete or replace the dead `Chats.tsx` stub

## Open questions (not just for this app)

- **LLM provider & API key** — not yet chosen on the backend.
- **Does Admin need Order Tracking / Customer Query chat too?** Backend allows it; nobody's confirmed it's needed day one.
- **Transcript viewing for admins** — no "read a customer's past chat" endpoint exists yet. Only build a screen for this if support staff will actually need to audit conversations.
- **Mobile push notifications** — not this app's concern, but relevant if "ticket resolved" needs to reach the mobile app while closed.

## Suggested order

Agent management first — it's a straight copy of the Banners pattern and gives everyone a way to turn agents on/off while the other two apps build their chat UIs. Tickets screen and Product Listing chat can follow once a provider key is set.
