import { BadgePercent, Plus } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import FilterBar from "@/components/custom/FilterBar";
import Pagination from "@/components/custom/Pagination";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import OfferCard from "./OfferCard";
import { DeleteOfferModal } from "./OffersManagement.Modals";
import OffersManagementSkeleton from "./OffersManagementSkeleton";
import { useOffersManagement } from "./OffersManagement.Container";

const MIN_VALUE = 0;

const OffersManagement = () => {
    const {
        offers,
        offersTotalCount,
        isOffersLoading,
        isDeleting,
        isUpdating,
        togglingOfferId,
        page,
        pageSize,
        filterItems,
        isDeleteModalOpen,
        selectedOffer,
        setPage,
        setPageSize,
        navigateToAddOffer,
        navigateToEditOffer,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteConfirm,
        handleToggleActive,
    } = useOffersManagement();

    return (
        <>
            <div className="flex min-h-0 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1">
                        <FilterBar items={filterItems} />
                    </div>
                    <Button
                        onClick={navigateToAddOffer}
                        startIcon={<Plus className="h-4 w-4" />}
                    >
                        Add New Offer
                    </Button>
                </div>

                {isOffersLoading && <OffersManagementSkeleton />}

                {!isOffersLoading && offersTotalCount > MIN_VALUE && (
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {offers.map((offer) => (
                                <OfferCard
                                    key={offer.id}
                                    offer={offer}
                                    onEdit={navigateToEditOffer}
                                    onDelete={openDeleteModal}
                                    onToggleActive={handleToggleActive}
                                    isTogglingActive={
                                        isUpdating &&
                                        togglingOfferId === offer.id
                                    }
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-start md:justify-end">
                            <Pagination
                                page={page}
                                pageSize={pageSize}
                                total={offersTotalCount}
                                onPageChange={setPage}
                                onPageSizeChange={setPageSize}
                                hidePageButtons={true}
                            />
                        </div>
                    </div>
                )}

                {!isOffersLoading && offersTotalCount === MIN_VALUE && (
                    <div className="rounded-2xl border border-dashed border-pulse-cream-dark bg-pulse-cream-dark/20 shadow-dash-card">
                        <Empty className="border-0">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <BadgePercent className="h-5 w-5" />
                                </EmptyMedia>
                                <EmptyTitle>No offers yet</EmptyTitle>
                                <EmptyDescription>
                                    Create a promotional offer to start
                                    discounting products for customers.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button
                                    onClick={navigateToAddOffer}
                                    startIcon={<Plus className="h-4 w-4" />}
                                >
                                    Create An Offer
                                </Button>
                            </EmptyContent>
                        </Empty>
                    </div>
                )}
            </div>

            <DeleteOfferModal
                open={isDeleteModalOpen}
                offerName={selectedOffer?.name}
                isDeleting={isDeleting}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default OffersManagement;
