import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { getSupportTicketsTableColumns } from "./SupportTickets.Config";
import type { SupportTicketsTableProps } from "./SupportTickets.types";

const SupportTicketsTable: React.FC<SupportTicketsTableProps> = ({
    ticketsListData,
    togglingTicketId,
    onToggleResolved,
    totalCount,
    pageCount,
    page,
    pageSize,
    onPaginationChange,
}) => {
    return (
        <ChartCard
            title="Escalated Tickets"
            subtitle="Support requests the Customer Query agent couldn't resolve on its own"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="support-tickets-list"
                data={ticketsListData}
                columns={getSupportTicketsTableColumns({
                    togglingTicketId,
                    onToggleResolved,
                })}
                pageCount={pageCount}
                totalCount={totalCount}
                initialState={{
                    pagination: { pageIndex: page - 1, pageSize },
                }}
                features={{
                    rowSelection: false,
                    pagination: true,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: false,
                }}
                callbacks={{
                    onPaginationChange,
                }}
            />
        </ChartCard>
    );
};

export default SupportTicketsTable;
