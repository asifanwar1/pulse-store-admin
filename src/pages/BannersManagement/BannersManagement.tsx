import { Image, Plus } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import FilterBar from "@/components/custom/FilterBar";
import Pagination from "@/components/custom/Pagination";

import BannerCard from "./BannerCard";
import { DeleteBannerModal } from "./BannersManagement.Modals";
import BannersManagementSkeleton from "./BannersManagementSkeleton";
import { useBannersManagement } from "./BannersManagement.Container";
import EmptyState from "@/components/custom/EmptyState/EmptyState";

const MIN_VALUE = 0;

const BannersManagement = () => {
    const {
        banners,
        bannersTotalCount,
        isBannersLoading,
        isDeleting,
        isUpdating,
        togglingBannerId,
        page,
        pageSize,
        filterItems,
        isDeleteModalOpen,
        selectedBanner,
        setPage,
        setPageSize,
        navigateToAddBanner,
        navigateToEditBanner,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteConfirm,
        handleToggleActive,
    } = useBannersManagement();

    return (
        <>
            <div className="flex min-h-0 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1">
                        <FilterBar items={filterItems} />
                    </div>
                    <Button
                        onClick={navigateToAddBanner}
                        startIcon={<Plus className="h-4 w-4" />}
                    >
                        Add New Banner
                    </Button>
                </div>

                {isBannersLoading && <BannersManagementSkeleton />}

                {!isBannersLoading && bannersTotalCount > MIN_VALUE && (
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {banners.map((banner) => (
                                <BannerCard
                                    key={banner.id}
                                    banner={banner}
                                    onEdit={navigateToEditBanner}
                                    onDelete={openDeleteModal}
                                    onToggleActive={handleToggleActive}
                                    isTogglingActive={
                                        isUpdating &&
                                        togglingBannerId === banner.id
                                    }
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-start md:justify-end">
                            <Pagination
                                page={page}
                                pageSize={pageSize}
                                total={bannersTotalCount}
                                onPageChange={setPage}
                                onPageSizeChange={setPageSize}
                            />
                        </div>
                    </div>
                )}

                {!isBannersLoading && bannersTotalCount === MIN_VALUE && (
                    <div className="rounded-2xl border border-dashed border-pulse-cream-dark bg-pulse-cream-dark/20 shadow-dash-card">
                        <EmptyState
                            icon={<Image className="h-5 w-5" />}
                            title="No banners yet"
                            description="Design a promo banner in the editor to start showcasing it on the storefront."
                            actionLabel="Create A Banner"
                            onAction={navigateToAddBanner}
                            actionIcon={<Plus className="h-4 w-4" />}
                        />
                    </div>
                )}
            </div>

            <DeleteBannerModal
                open={isDeleteModalOpen}
                bannerTitle={selectedBanner?.title}
                isDeleting={isDeleting}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default BannersManagement;
