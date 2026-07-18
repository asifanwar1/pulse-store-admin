import { useState } from "react";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetSupportTickets,
    useUpdateTicketStatus,
} from "@/hooks/api/aiAgents.queries";
import type { TSupportTicketResponse } from "@/api/services/aiAgents/aiAgents.response.types";
import type { FilterItem } from "@/components/custom/FilterBar";
import { showToast } from "@/lib/toast";

const STATUS_FILTER_OPTIONS = [
    { value: "false", label: "Open" },
    { value: "true", label: "Resolved" },
];

export const useSupportTickets = () => {
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const [isResolved, setIsResolved] = useState<boolean | null>(null);
    const [togglingTicketId, setTogglingTicketId] = useState<number | null>(
        null,
    );

    const {
        data: tickets,
        count: ticketsTotalCount,
        isPending: isTicketsLoading,
        page,
        setPage,
    } = useGetSupportTickets({
        page: 1,
        limit: pageSize,
        is_resolved: isResolved ?? undefined,
    });

    const { mutateAsync: updateTicketStatus } = useUpdateTicketStatus();

    const handleToggleResolved = async (ticket: TSupportTicketResponse) => {
        setTogglingTicketId(ticket.id);
        try {
            await updateTicketStatus({
                id: ticket.id,
                body: { is_resolved: !ticket.is_resolved },
            });
            showToast.success(
                ticket.is_resolved
                    ? "Ticket reopened"
                    : "Ticket marked as resolved",
            );
        } catch (error) {
            console.error("Failed to update ticket status:", error);
            showToast.error("Failed to update ticket status");
        } finally {
            setTogglingTicketId(null);
        }
    };

    const filterItems: FilterItem[] = [
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value:
                isResolved === null
                    ? null
                    : STATUS_FILTER_OPTIONS.find(
                          (opt) => opt.value === String(isResolved),
                      ) ?? null,
            options: STATUS_FILTER_OPTIONS,
            onChange: (value) =>
                setIsResolved(
                    value && !Array.isArray(value)
                        ? value.value === "true"
                        : null,
                ),
            clearable: true,
        },
    ];

    return {
        tickets: tickets ?? [],
        ticketsTotalCount: ticketsTotalCount ?? 0,
        isTicketsLoading,
        togglingTicketId,
        page,
        pageSize,
        filterItems,
        setPage,
        setPageSize,
        handleToggleResolved,
    };
};
