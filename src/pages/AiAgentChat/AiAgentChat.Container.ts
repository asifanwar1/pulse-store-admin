import { useRef, useState } from "react";

import { streamAgentChat } from "@/api";
import { useGetAgentConfigs } from "@/hooks/api/aiAgents.queries";
import { AI_AGENT_KEYS } from "@/constants/ai-agent.constants";
import type { TAgentKey } from "@/api/services/aiAgents/aiAgents.request.types";
import { showToast } from "@/lib/toast";
import type { TAgentConversations } from "./AiAgentChat.types";

const createEmptyConversations = (): TAgentConversations => ({
    product_listing: { messages: [], draft: "" },
    order_tracking: { messages: [], draft: "" },
    customer_query: { messages: [], draft: "" },
});

export const useAiAgentChat = () => {
    const { data: agentConfigsData, isPending: isAgentsLoading } =
        useGetAgentConfigs();
    const agentConfigs = agentConfigsData?.data ?? [];

    const [activeAgentKey, setActiveAgentKey] =
        useState<TAgentKey>("product_listing");
    const [conversations, setConversations] = useState<TAgentConversations>(
        createEmptyConversations(),
    );
    const [sendingAgentKey, setSendingAgentKey] = useState<TAgentKey | null>(
        null,
    );
    const messageIdRef = useRef(0);

    const nextMessageId = () => {
        messageIdRef.current += 1;
        return `msg-${messageIdRef.current}`;
    };

    const activeAgentConfig = agentConfigs.find(
        (agent) => agent.agent_key === activeAgentKey,
    );
    const activeConversation = conversations[activeAgentKey];
    const isSendingActiveTab = sendingAgentKey === activeAgentKey;

    const updateConversation = (
        agentKey: TAgentKey,
        updater: (
            conversation: TAgentConversations[TAgentKey],
        ) => TAgentConversations[TAgentKey],
    ) => {
        setConversations((prev) => ({
            ...prev,
            [agentKey]: updater(prev[agentKey]),
        }));
    };

    const setDraft = (agentKey: TAgentKey, draft: string) => {
        updateConversation(agentKey, (conversation) => ({
            ...conversation,
            draft,
        }));
    };

    const handleSendMessage = async () => {
        const agentKey = activeAgentKey;
        const trimmed = conversations[agentKey].draft.trim();
        if (!trimmed || sendingAgentKey === agentKey) return;

        const conversationId = conversations[agentKey].conversationId;
        const assistantMessageId = nextMessageId();

        updateConversation(agentKey, (conversation) => ({
            ...conversation,
            draft: "",
            messages: [
                ...conversation.messages,
                { id: nextMessageId(), role: "user", text: trimmed },
                { id: assistantMessageId, role: "assistant", text: "" },
            ],
        }));
        setSendingAgentKey(agentKey);

        const appendDelta = (text: string) => {
            updateConversation(agentKey, (conversation) => ({
                ...conversation,
                messages: conversation.messages.map((message) =>
                    message.id === assistantMessageId
                        ? { ...message, text: message.text + text }
                        : message,
                ),
            }));
        };

        try {
            const result = await streamAgentChat({
                agentKey,
                body: { message: trimmed, conversation_id: conversationId },
                onDelta: appendDelta,
            });

            if (result.conversationId !== undefined) {
                updateConversation(agentKey, (conversation) => ({
                    ...conversation,
                    conversationId: result.conversationId,
                }));
            }
        } catch (error) {
            console.error("Agent chat failed:", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.";

            updateConversation(agentKey, (conversation) => ({
                ...conversation,
                messages: conversation.messages.map((chatMessage) =>
                    chatMessage.id === assistantMessageId
                        ? { id: chatMessage.id, role: "error", text: message }
                        : chatMessage,
                ),
            }));
            showToast.error(message);
        } finally {
            setSendingAgentKey((prev) => (prev === agentKey ? null : prev));
        }
    };

    return {
        agentKeys: AI_AGENT_KEYS,
        agentConfigs,
        isAgentsLoading,
        activeAgentKey,
        setActiveAgentKey,
        activeAgentConfig,
        activeConversation,
        isSendingActiveTab,
        setDraft,
        handleSendMessage,
    };
};
