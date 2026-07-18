import FilterBar from "@/components/custom/FilterBar";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import SupportTicketsTable from "./SupportTicketsTable";
import { useSupportTickets } from "./SupportTickets.container";

const SupportTickets = () => {
    const {
        tickets,
        isTicketsLoading,
        togglingTicketId,
        filterItems,
        handleToggleResolved,
    } = useSupportTickets();

    if (isTicketsLoading) {
        return <CommonSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <FilterBar items={filterItems} />

            <SupportTicketsTable
                ticketsListData={tickets ?? []}
                togglingTicketId={togglingTicketId}
                onToggleResolved={handleToggleResolved}
            />
        </div>
    );
};

export default SupportTickets;
