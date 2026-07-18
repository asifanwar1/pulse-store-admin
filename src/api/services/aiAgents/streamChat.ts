import Config from "@/Config";
import { useStore } from "@/store/store";
import type { TAgentKey, TChatBody } from "./aiAgents.request.types";

export type TAgentChatEvent =
    | { type: "delta"; text: string }
    | { type: "done"; conversation_id: number }
    | { type: "error"; message: string };

type TStreamAgentChatArgs = {
    agentKey: TAgentKey;
    body: TChatBody;
    onDelta: (text: string) => void;
    signal?: AbortSignal;
};

const extractDetailMessage = (data: unknown, fallback: string): string => {
    if (!data || typeof data !== "object") return fallback;
    const detail = (data as { detail?: unknown }).detail;

    if (typeof detail === "string" && detail) return detail;

    if (Array.isArray(detail)) {
        const messages = detail
            .map((item) => (item as { msg?: string })?.msg)
            .filter((msg): msg is string => Boolean(msg));
        if (messages.length) return messages.join(", ");
    }

    return fallback;
};

export const streamAgentChat = async ({
    agentKey,
    body,
    onDelta,
    signal,
}: TStreamAgentChatArgs): Promise<{ conversationId?: number }> => {
    const res = await fetch(`${Config.API_URL}/ai-agents/${agentKey}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: useStore.getState().token ?? "",
        },
        body: JSON.stringify(body),
        signal,
    });

    if (!res.ok || !res.body) {
        const fallback = `Request failed with status ${res.status}`;
        let message = fallback;
        try {
            message = extractDetailMessage(await res.json(), fallback);
        } catch {
            // non-JSON error body — keep the generic message
        }
        throw new Error(message);
    }

    const reader = res.body.getReader();
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
            const raw = chunk.replace(/^data: /, "").trim();
            if (!raw) continue;

            const event = JSON.parse(raw) as TAgentChatEvent;
            if (event.type === "delta") onDelta(event.text);
            if (event.type === "done") conversationId = event.conversation_id;
            if (event.type === "error") throw new Error(event.message);
        }
    }

    return { conversationId };
};
