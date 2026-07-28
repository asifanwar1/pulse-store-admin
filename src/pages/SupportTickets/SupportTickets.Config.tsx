import {
    AlertCircle,
    CheckCircle2,
    Circle,
    Percent,
    Ticket,
} from "lucide-react";

import type { TSupportTicketResponse } from "@/api/services/aiAgents/aiAgents.response.types";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { getFormattedDate } from "@/utils/dateTime.utils";

export const SUPPORT_TICKET_STAT_CONFIG = [
    {
        key: "totalTickets" as const,
        title: "Total Tickets",
        icon: <Ticket className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All time tickets",
        suffix: "",
    },
    {
        key: "resolvedTickets" as const,
        title: "Resolved Tickets",
        icon: <CheckCircle2 className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Closed and handled",
        suffix: "",
    },
    {
        key: "unresolvedTickets" as const,
        title: "Unresolved Tickets",
        icon: <AlertCircle className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Still open",
        suffix: "",
    },
    {
        key: "resolutionRate" as const,
        title: "Resolution Rate",
        icon: <Percent className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Resolved of all tickets",
        suffix: "%",
    },
] as const;

type SupportTicketsTableColumnsParams = {
    togglingTicketId: number | null;
    onToggleResolved: (ticket: TSupportTicketResponse) => void;
};

export const getSupportTicketsTableColumns = ({
    togglingTicketId,
    onToggleResolved,
}: SupportTicketsTableColumnsParams): TDataColumnDef<TSupportTicketResponse>[] => [
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        meta: {
            label: "ID",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "user_id",
        accessorKey: "user_id",
        header: "User Id",
        meta: {
            label: "User Id",
            cellRenderer: (value) => (
                <span className="text-xs font-medium text-pulse-green-dark whitespace-nowrap">
                    User #{value as number}
                </span>
            ),
        },
    },
    {
        id: "subject",
        accessorKey: "subject",
        header: "Subject",
        meta: {
            label: "Subject",
            cellRenderer: (value) => (
                <span className="block max-w-[220px] truncate text-xs font-medium text-pulse-green-dark">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "message",
        accessorKey: "message",
        header: "Message",
        meta: {
            label: "Message",
            cellRenderer: (value) => (
                <span
                    title={value as string}
                    className="block max-w-xs truncate text-xs text-pulse-green-dark"
                >
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: "Date",
        meta: {
            label: "Date",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {getFormattedDate(value as string)}
                </span>
            ),
        },
    },
    {
        id: "is_resolved",
        accessorKey: "is_resolved",
        header: "Status",
        meta: {
            label: "Status",
            align: "center",
            cellRenderer: (_value, row) => {
                const ticket = row.original;
                const isToggling = togglingTicketId === ticket.id;

                return (
                    <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs",
                                ticket.is_resolved
                                    ? "bg-pulse-green/10 text-pulse-green-dark"
                                    : "bg-amber-100 text-amber-700",
                            )}
                        >
                            {ticket.is_resolved ? "Resolved" : "Open"}
                        </span>
                        <button
                            type="button"
                            onClick={() => onToggleResolved(ticket)}
                            disabled={isToggling}
                            className={cn(
                                "rounded-full p-1.5 transition-colors hover:bg-white disabled:opacity-50",
                                ticket.is_resolved
                                    ? "text-pulse-green hover:text-pulse-green-dark"
                                    : "text-gray-400 hover:text-pulse-green-dark",
                            )}
                            aria-label={
                                ticket.is_resolved
                                    ? `Reopen ticket #${ticket.id}`
                                    : `Resolve ticket #${ticket.id}`
                            }
                            title={
                                ticket.is_resolved
                                    ? "Reopen ticket"
                                    : "Mark resolved"
                            }
                        >
                            {ticket.is_resolved ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <Circle className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                );
            },
        },
    },
];
