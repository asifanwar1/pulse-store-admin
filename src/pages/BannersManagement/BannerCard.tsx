import { Calendar, ImageOff, Link2, Pencil, Power, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateTime.utils";
import { BannerPlacementWithHelpers } from "@/constants/banner-placement.constants";
import { BannerLinkTypeWithHelpers } from "@/constants/banner-link-type.constants";
import type { BannerCardProps } from "./BannersManagement.types";

const BannerCard: React.FC<BannerCardProps> = ({
    banner,
    onEdit,
    onDelete,
    onToggleActive,
    isTogglingActive = false,
}) => {
    const hasSchedule = Boolean(banner.start_date || banner.end_date);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 shadow-dash-card transition-transform duration-200 hover:-translate-y-0.5">
            <div className="relative aspect-[3/1] w-full overflow-hidden bg-white">
                {banner.image_url ? (
                    <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-pulse-green/40">
                        <ImageOff className="h-6 w-6" />
                    </div>
                )}
                {!banner.is_active && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-pulse-green-dark">
                            Inactive
                        </span>
                    </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-pulse-green-dark">
                    {BannerPlacementWithHelpers.getDisplayTextKey(
                        banner.placement,
                    ) || banner.placement}
                </span>
                <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-pulse-green-dark">
                    Pos {banner.position}
                </span>
            </div>

            <div className="relative flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-base font-semibold text-pulse-green-dark">
                        {banner.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            onClick={() => onToggleActive(banner)}
                            disabled={isTogglingActive}
                            className={cn(
                                "rounded-full p-2 transition-colors hover:bg-white disabled:opacity-50",
                                banner.is_active
                                    ? "text-pulse-green hover:text-pulse-green-dark"
                                    : "text-gray-400 hover:text-pulse-green-dark",
                            )}
                            aria-label={
                                banner.is_active
                                    ? `Disable ${banner.title}`
                                    : `Enable ${banner.title}`
                            }
                            title={
                                banner.is_active
                                    ? "Disable banner"
                                    : "Enable banner"
                            }
                        >
                            <Power className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onEdit(banner)}
                            className="rounded-full p-2 text-pulse-green transition-colors hover:bg-white hover:text-pulse-green-dark"
                            aria-label={`Edit ${banner.title}`}
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(banner)}
                            className="rounded-full p-2 text-red-500 transition-colors hover:bg-white hover:text-red-600"
                            aria-label={`Delete ${banner.title}`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-pulse-green">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-pulse-green-dark">
                        <Link2 className="h-3.5 w-3.5" />
                        {BannerLinkTypeWithHelpers.getDisplayTextKey(
                            banner.link_type,
                        ) || banner.link_type}
                        {banner.link_value ? `: ${banner.link_value}` : ""}
                    </span>
                    {hasSchedule && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-pulse-green-dark">
                            <Calendar className="h-3.5 w-3.5" />
                            {banner.start_date
                                ? formatDate(banner.start_date)
                                : "Always"}
                            {" – "}
                            {banner.end_date
                                ? formatDate(banner.end_date)
                                : "No expiry"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BannerCard;
