import { Send } from "lucide-react";

import ChartCard from "@/components/custom/CustomCards/ChartCard";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import FileUploader from "@/components/custom/Inputs/FileUploader/FileUploader";
import { cn } from "@/lib/utils";
import { AI_AGENT_META } from "@/constants/ai-agent.constants";
import { useAiAgentChat } from "./AiAgentChat.Container";

const AiAgentChat = () => {
    const {
        agentKeys,
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
    } = useAiAgentChat();

    return (
        <div className="flex min-h-0 flex-col gap-4 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2">
                {agentKeys.map((key) => {
                    const meta = AI_AGENT_META[key];
                    const Icon = meta.icon;
                    const config = agentConfigs.find(
                        (agent) => agent.agent_key === key,
                    );
                    const isActive = key === activeAgentKey;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActiveAgentKey(key)}
                            className={cn(
                                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "border-pulse-green bg-pulse-green text-white"
                                    : "border-pulse-cream-dark bg-white text-pulse-green-dark hover:bg-pulse-cream-dark/40",
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {meta.label}
                            {config && !config.is_enabled && (
                                <span
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full",
                                        isActive ? "bg-white" : "bg-red-400",
                                    )}
                                    aria-label="disabled"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <ChartCard
                title={`${activeMeta.label} Assistant`}
                subtitle={activeMeta.description}
                className="h-[calc(100vh-260px)] bg-pulse-cream-dark/40 border-pulse-cream-dark shadow-dash-card"
                bodyClassName="flex flex-1 min-h-0 flex-col p-0"
            >
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                    {activeConversation.messages.length === 0 && (
                        <div className="flex h-full items-center justify-center text-center text-sm text-pulse-green/60">
                            Start a conversation with the {activeMeta.label}{" "}
                            assistant.
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {activeConversation.messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex",
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start",
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                                        message.role === "user" &&
                                            "bg-pulse-green text-white",
                                        message.role === "assistant" &&
                                            "border border-pulse-cream-dark bg-white text-pulse-green-dark",
                                        message.role === "error" &&
                                            "border border-red-200 bg-red-50 text-red-600",
                                    )}
                                >
                                    {message.media &&
                                        message.media.length > 0 && (
                                            <div className="mb-2 flex flex-wrap gap-2">
                                                {message.media.map((item) => (
                                                    <img
                                                        key={item.id}
                                                        src={item.url}
                                                        alt={
                                                            item.file_name ??
                                                            "Attached image"
                                                        }
                                                        className="h-16 w-16 rounded-lg object-cover"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    {message.text ||
                                        (message.role === "assistant" && (
                                            <span className="inline-flex items-center gap-1 text-pulse-green/50">
                                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.15s]" />
                                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.3s]" />
                                            </span>
                                        ))}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="border-t border-pulse-cream-dark p-4">
                    {isDisabled && (
                        <p className="mb-2 text-xs font-medium text-red-500">
                            The {activeAgentConfig?.display_name ?? "assistant"}{" "}
                            is currently disabled by an admin.
                        </p>
                    )}
                    {supportsImages && (
                        <FileUploader
                            value={activeConversation.attachments}
                            onChange={(files) =>
                                setAttachments(activeAgentKey, files)
                            }
                            disabled={isDisabled || isAgentsLoading || isBusy}
                            accept="image/*"
                            maxFiles={6}
                            previewSize="sm"
                            placeholder="Attach product images"
                            containerClass="mb-2"
                        />
                    )}
                    <div className="flex flex-wrap items-center gap-3">
                        <textarea
                            value={activeConversation.draft}
                            onChange={(event) =>
                                setDraft(activeAgentKey, event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            disabled={isDisabled || isAgentsLoading}
                            placeholder={
                                isDisabled
                                    ? "This assistant is disabled"
                                    : "Type a message..."
                            }
                            rows={2}
                            className="flex-1 resize-none rounded-xl border border-pulse-cream-dark bg-white px-3 py-2 text-sm text-pulse-green-dark placeholder:text-pulse-green/50 focus:outline-none focus:ring-1 focus:ring-pulse-green disabled:opacity-50"
                        />
                        <CustomButton
                            onClick={handleSendMessage}
                            disabled={
                                isDisabled ||
                                isAgentsLoading ||
                                (!activeConversation.draft.trim() &&
                                    !activeConversation.attachments.length) ||
                                isBusy
                            }
                            isLoading={isBusy}
                            startIcon={<Send className="h-4 w-4" />}
                            className="py-6.5 rounded-md"
                        >
                            Send
                        </CustomButton>
                    </div>
                </div>
            </ChartCard>
        </div>
    );
};

export default AiAgentChat;
