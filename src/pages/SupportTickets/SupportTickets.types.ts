import type { TSupportTicketResponse } from "@/api/services/aiAgents/aiAgents.response.types";

export type SupportTicketsTableProps = {
    ticketsListData: TSupportTicketResponse[];
    togglingTicketId: number | null;
    onToggleResolved: (ticket: TSupportTicketResponse) => void;
};
