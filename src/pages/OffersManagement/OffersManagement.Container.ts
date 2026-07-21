import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useDeleteOffer,
    useGetOffers,
    useUpdateOffer,
} from "@/hooks/api/offers.queries";
import type { TOfferResponse } from "@/api/services/offers/offers.response.types";
import { OFFER_SCOPE_OPTIONS } from "@/constants/offer-scope.constants";
import { OFFER_STATUS_OPTIONS } from "@/constants/offer-status.constants";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { showToast } from "@/lib/toast";
import type { FilterItem } from "@/components/custom/FilterBar";
import { withPageReset } from "@/hooks/useTablePagination";

export const useOffersManagement = () => {
    const navigate = useNavigate();

    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [scope, setScopeRaw] = useState<string | null>(null);
    const [status, setStatusRaw] = useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<TOfferResponse | null>(
        null,
    );
    const [togglingOfferId, setTogglingOfferId] = useState<number | null>(null);

    const {
        data: offers,
        count: offersTotalCount,
        isPending: isOffersLoading,
        page,
        setPage,
    } = useGetOffers({
        search,
        limit: pageSize,
        scope: scope as never,
        status: status as never,
    });

    const { mutateAsync: deleteOffer, isPending: isDeleting } =
        useDeleteOffer();
    const { mutateAsync: updateOffer, isPending: isUpdating } =
        useUpdateOffer();

    const navigateToAddOffer = () => navigate(APP_ROUTES.OFFERS_ADD);

    const navigateToEditOffer = (offer: TOfferResponse) =>
        navigate(
            getRouteWithId({ route: APP_ROUTES.OFFERS_UPDATE, id: offer.id }),
        );

    const openDeleteModal = (offer: TOfferResponse) => {
        setSelectedOffer(offer);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (isDeleting) return;
        setIsDeleteModalOpen(false);
        setSelectedOffer(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedOffer) return;

        try {
            await deleteOffer(selectedOffer.id);
            showToast.success("Offer deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedOffer(null);
        } catch (error) {
            console.error("Failed to delete offer:", error);
            showToast.error("Failed to delete offer");
        }
    };

    const handleToggleActive = async (offer: TOfferResponse) => {
        setTogglingOfferId(offer.id);
        try {
            await updateOffer({
                id: offer.id,
                body: { is_active: !offer.is_active },
            });
            showToast.success(
                offer.is_active
                    ? "Offer disabled successfully"
                    : "Offer enabled successfully",
            );
        } catch (error) {
            console.error("Failed to update offer status:", error);
            showToast.error("Failed to update offer status");
        } finally {
            setTogglingOfferId(null);
        }
    };

    const setSearch = withPageReset(setSearchRaw, setPage);
    const setPageSize = withPageReset(setPageSizeRaw, setPage);
    const setScope = withPageReset(setScopeRaw, setPage);
    const setStatus = withPageReset(setStatusRaw, setPage);

    const filterItems: FilterItem[] = [
        {
            type: "search",
            key: "search",
            placeholder: "Search offers...",
            onSearch: setSearch,
        },
        {
            type: "select",
            key: "scope",
            placeholder: "All Scopes",
            value: scope
                ? OFFER_SCOPE_OPTIONS.find((opt) => opt.value === scope)
                : null,
            options: OFFER_SCOPE_OPTIONS,
            onChange: (value) =>
                setScope(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value: status
                ? OFFER_STATUS_OPTIONS.find((opt) => opt.value === status)
                : null,
            options: OFFER_STATUS_OPTIONS,
            onChange: (value) =>
                setStatus(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
    ];

    return {
        offers: offers ?? [],
        offersTotalCount: offersTotalCount ?? 0,
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
    };
};
