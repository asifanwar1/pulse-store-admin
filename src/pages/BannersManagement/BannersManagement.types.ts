import type { TBannerResponse } from "@/api/services/banners/banners.response.types";

export type BannerCardProps = {
    banner: TBannerResponse;
    onEdit: (banner: TBannerResponse) => void;
    onDelete: (banner: TBannerResponse) => void;
    onToggleActive: (banner: TBannerResponse) => void;
    isTogglingActive?: boolean;
};
