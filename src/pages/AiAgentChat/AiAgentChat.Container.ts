import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { streamAgentChat } from "@/api";
import { useGetAgentConfigs } from "@/hooks/api/aiAgents.queries";
import { useMediaUpload } from "@/hooks/api/media.queries";
import { AI_AGENT_KEYS, AI_AGENT_META } from "@/constants/ai-agent.constants";
import type { TAgentKey } from "@/api/services/aiAgents/aiAgents.request.types";
import { showToast } from "@/lib/toast";
import type { TAgentConversations } from "./AiAgentChat.types";

const createEmptyConversations = (): TAgentConversations => ({
    product_listing: { messages: [], draft: "", attachments: [] },
    order_tracking: { messages: [], draft: "", attachments: [] },
    customer_query: { messages: [], draft: "", attachments: [] },
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
    const { handleMultipleFileUpload, isMediaLoading } = useMediaUpload();
    const messageIdRef = useRef(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const nextMessageId = () => {
        messageIdRef.current += 1;
        return `msg-${messageIdRef.current}`;
    };

    const activeAgentConfig = agentConfigs.find(
        (agent) => agent.agent_key === activeAgentKey,
    );
    const activeConversation = conversations[activeAgentKey];
    const isSendingActiveTab = sendingAgentKey === activeAgentKey;
    const activeMeta = AI_AGENT_META[activeAgentKey];
    const isDisabled =
        !isAgentsLoading && activeAgentConfig?.is_enabled === false;
    const supportsImages = activeAgentKey === "product_listing";
    const isBusy = isSendingActiveTab || isMediaLoading;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeConversation.messages.length, activeAgentKey]);

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

    const setAttachments = (
        agentKey: TAgentKey,
        attachments: TAgentConversations[TAgentKey]["attachments"],
    ) => {
        updateConversation(agentKey, (conversation) => ({
            ...conversation,
            attachments,
        }));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        const agentKey = activeAgentKey;
        const trimmed = conversations[agentKey].draft.trim();
        const attachments = conversations[agentKey].attachments.filter(
            (item): item is File => item instanceof File,
        );
        if ((!trimmed && !attachments.length) || sendingAgentKey === agentKey)
            return;

        const conversationId = conversations[agentKey].conversationId;
        const userMessageId = nextMessageId();
        const assistantMessageId = nextMessageId();
        const displayText = trimmed || "Here are the product images.";
        setSendingAgentKey(agentKey);

        updateConversation(agentKey, (conversation) => ({
            ...conversation,
            draft: "",
            attachments: [],
            messages: [
                ...conversation.messages,
                { id: userMessageId, role: "user", text: displayText },
                { id: assistantMessageId, role: "assistant", text: "" },
            ],
        }));

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
            const uploadedMedia = attachments.length
                ? await handleMultipleFileUpload(attachments, {
                      returnFullResponse: true,
                      folder: "products",
                  })
                : [];
            const media = uploadedMedia.map((item) => ({
                id: item.id,
                url: item.url,
                file_name: item.file_name,
            }));

            if (media.length) {
                updateConversation(agentKey, (conversation) => ({
                    ...conversation,
                    messages: conversation.messages.map((message) =>
                        message.id === userMessageId
                            ? { ...message, media }
                            : message,
                    ),
                }));
            }

            const result = await streamAgentChat({
                agentKey,
                body: {
                    message: displayText,
                    conversation_id: conversationId,
                    media: media.length ? media : undefined,
                },
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
        activeAgentConfig,
        activeConversation,
        activeMeta,
        isDisabled,
        supportsImages,
        isBusy,
        messagesEndRef,
        setActiveAgentKey,
        setDraft,
        setAttachments,
        handleSendMessage,
        handleKeyDown,
    };
};
