import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useDeleteBanner,
    useGetBanners,
    useUpdateBannerStatus,
} from "@/hooks/api/banners.queries";
import type { TBannerResponse } from "@/api/services/banners/banners.response.types";
import { BANNER_PLACEMENT_OPTIONS } from "@/constants/banner-placement.constants";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { showToast } from "@/lib/toast";
import type { FilterItem } from "@/components/custom/FilterBar";

const BANNER_STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
];

export const useBannersManagement = () => {
    const navigate = useNavigate();

    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [placement, setPlacement] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] =
        useState<TBannerResponse | null>(null);
    const [togglingBannerId, setTogglingBannerId] = useState<number | null>(
        null,
    );

    const {
        data: banners,
        count: bannersTotalCount,
        isPending: isBannersLoading,
        page,
        setPage,
    } = useGetBanners({
        page: 1,
        limit: pageSize,
        placement: placement as never,
        is_active: status === null ? null : status === "ACTIVE",
    });

    const { mutateAsync: deleteBanner, isPending: isDeleting } =
        useDeleteBanner();
    const { mutateAsync: updateBannerStatus, isPending: isUpdating } =
        useUpdateBannerStatus();

    const navigateToAddBanner = () => navigate(APP_ROUTES.BANNERS_ADD);

    const navigateToEditBanner = (banner: TBannerResponse) =>
        navigate(
            getRouteWithId({ route: APP_ROUTES.BANNERS_UPDATE, id: banner.id }),
        );

    const openDeleteModal = (banner: TBannerResponse) => {
        setSelectedBanner(banner);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (isDeleting) return;
        setIsDeleteModalOpen(false);
        setSelectedBanner(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedBanner) return;

        try {
            await deleteBanner(selectedBanner.id);
            showToast.success("Banner deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedBanner(null);
        } catch (error) {
            console.error("Failed to delete banner:", error);
            showToast.error("Failed to delete banner");
        }
    };

    const handleToggleActive = async (banner: TBannerResponse) => {
        setTogglingBannerId(banner.id);
        try {
            await updateBannerStatus({
                id: banner.id,
                body: { is_active: !banner.is_active },
            });
            showToast.success(
                banner.is_active
                    ? "Banner disabled successfully"
                    : "Banner enabled successfully",
            );
        } catch (error) {
            console.error("Failed to update banner status:", error);
            showToast.error("Failed to update banner status");
        } finally {
            setTogglingBannerId(null);
        }
    };

    const filterItems: FilterItem[] = [
        {
            type: "select",
            key: "placement",
            placeholder: "All Placements",
            value: placement
                ? BANNER_PLACEMENT_OPTIONS.find(
                      (opt) => opt.value === placement,
                  )
                : null,
            options: BANNER_PLACEMENT_OPTIONS,
            onChange: (value) =>
                setPlacement(
                    value && !Array.isArray(value) ? value.value : null,
                ),
            clearable: true,
        },
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value: status
                ? BANNER_STATUS_OPTIONS.find((opt) => opt.value === status)
                : null,
            options: BANNER_STATUS_OPTIONS,
            onChange: (value) =>
                setStatus(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
    ];

    return {
        banners: banners ?? [],
        bannersTotalCount: bannersTotalCount ?? 0,
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
    };
};
