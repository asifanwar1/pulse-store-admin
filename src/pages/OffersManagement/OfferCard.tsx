import {
    BadgePercent,
    Boxes,
    Calendar,
    Layers,
    Pencil,
    Power,
    Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateTime.utils";
import {
    OfferStatusWithHelpers,
    type OfferStatusType,
} from "@/constants/offer-status.constants";
import { OfferScope } from "@/constants/offer-scope.constants";
import type { OfferCardProps } from "./OffersManagement.types";

const MAX_VISIBLE_CATEGORIES = 3;

const OfferCard: React.FC<OfferCardProps> = ({
    offer,
    onEdit,
    onDelete,
    onToggleActive,
    isTogglingActive = false,
}) => {
    const visibleCategories = offer.categories.slice(0, MAX_VISIBLE_CATEGORIES);
    const hiddenCategoriesCount =
        offer.categories.length - visibleCategories.length;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card transition-transform duration-200 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-pulse-green/5 blur-2xl" />

            <div className="relative flex items-center justify-between gap-3 border-b border-pulse-cream-dark p-5 pb-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pulse-green text-white shadow-sm">
                        <BadgePercent className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-pulse-green-dark">
                            {offer.name}
                        </h3>
                        <span
                            className={cn(
                                "mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                OfferStatusWithHelpers.getLabelClass(
                                    offer.status as OfferStatusType,
                                ),
                            )}
                        >
                            {OfferStatusWithHelpers.getDisplayTextKey(
                                offer.status as OfferStatusType,
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <button
                        type="button"
                        onClick={() => onToggleActive(offer)}
                        disabled={isTogglingActive}
                        className={cn(
                            "rounded-full p-2 transition-colors hover:bg-white disabled:opacity-50",
                            offer.is_active
                                ? "text-pulse-green hover:text-pulse-green-dark"
                                : "text-gray-400 hover:text-pulse-green-dark",
                        )}
                        aria-label={
                            offer.is_active
                                ? `Disable ${offer.name}`
                                : `Enable ${offer.name}`
                        }
                        title={offer.is_active ? "Disable offer" : "Enable offer"}
                    >
                        <Power className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onEdit(offer)}
                        className="rounded-full p-2 text-pulse-green transition-colors hover:bg-white hover:text-pulse-green-dark"
                        aria-label={`Edit ${offer.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(offer)}
                        className="rounded-full p-2 text-red-500 transition-colors hover:bg-white hover:text-red-600"
                        aria-label={`Delete ${offer.name}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="relative flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-end justify-between gap-3">
                    <p
                        className={cn(
                            "line-clamp-2 text-sm leading-6 text-pulse-green",
                            !offer.description && "italic text-pulse-green/70",
                        )}
                    >
                        {offer.description || "No description added yet."}
                    </p>
                    <span className="shrink-0 rounded-2xl bg-pulse-green px-3 py-1.5 text-lg font-bold text-white">
                        {parseFloat(offer.discount_percentage)}% OFF
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-pulse-green">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>
                        {formatDate(offer.start_date)} &ndash;{" "}
                        {formatDate(offer.end_date)}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 border-t border-pulse-cream-dark pt-4">
                    {offer.scope === OfferScope.ALL_CATEGORIES ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-pulse-green-dark">
                            <Layers className="h-3.5 w-3.5" />
                            All Products
                        </span>
                    ) : (
                        <>
                            {visibleCategories.map((category) => (
                                <span
                                    key={category.id}
                                    className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-pulse-green-dark"
                                >
                                    {category.name}
                                </span>
                            ))}
                            {hiddenCategoriesCount > 0 && (
                                <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-pulse-green-dark">
                                    +{hiddenCategoriesCount} more
                                </span>
                            )}
                            {offer.included_products.length > 0 && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-pulse-green-dark">
                                    <Boxes className="h-3.5 w-3.5" />+
                                    {offer.included_products.length} products
                                </span>
                            )}
                        </>
                    )}
                    {offer.excluded_products.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                            Excludes {offer.excluded_products.length} product
                            {offer.excluded_products.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
