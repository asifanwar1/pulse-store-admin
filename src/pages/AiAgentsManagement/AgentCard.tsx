import { Bot, Pencil, Power } from "lucide-react";

import { cn } from "@/lib/utils";
import { AI_AGENT_META } from "@/constants/ai-agent.constants";
import type { AgentCardProps } from "./AiAgentsManagement.types";

const AgentCard: React.FC<AgentCardProps> = ({
    agent,
    onEdit,
    onToggleActive,
    isTogglingActive = false,
}) => {
    const meta = AI_AGENT_META[agent.agent_key];
    const Icon = meta?.icon ?? Bot;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-pulse-green">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-pulse-green-dark">
                                {agent.display_name}
                            </h3>
                            <span className="text-xs text-pulse-green/70">
                                {agent.agent_key}
                            </span>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            onClick={() => onToggleActive(agent)}
                            disabled={isTogglingActive}
                            className={cn(
                                "rounded-full p-2 transition-colors hover:bg-white disabled:opacity-50",
                                agent.is_enabled
                                    ? "text-pulse-green hover:text-pulse-green-dark"
                                    : "text-gray-400 hover:text-pulse-green-dark",
                            )}
                            aria-label={
                                agent.is_enabled
                                    ? `Disable ${agent.display_name}`
                                    : `Enable ${agent.display_name}`
                            }
                            title={
                                agent.is_enabled
                                    ? "Disable agent"
                                    : "Enable agent"
                            }
                        >
                            <Power className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onEdit(agent)}
                            className="rounded-full p-2 text-pulse-green transition-colors hover:bg-white hover:text-pulse-green-dark"
                            aria-label={`Edit ${agent.display_name}`}
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <p className="text-sm text-pulse-green/80">
                    {meta?.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-pulse-green">
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 font-semibold",
                            agent.is_enabled
                                ? "bg-pulse-green/70 text-white"
                                : "bg-gray-200 text-gray-500",
                        )}
                    >
                        {agent.is_enabled ? "Enabled" : "Disabled"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-pulse-green-dark">
                        Model: {agent.model_name || "Default"}
                    </span>
                    {agent.system_prompt_override && (
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 font-medium text-pulse-green-dark">
                            Custom prompt
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgentCard;
