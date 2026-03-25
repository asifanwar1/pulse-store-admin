import React from "react";

import reviewerIcon from "@/assets/icons/reviewer-icon.svg";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import CustomToggle from "@/components/shared/CustomToggle/CustomToggle";
import { CustomAvatar } from "../CustomAvatar";
import { getInitials } from "@/utils/nameutils";
import { StarRating } from "../StarRating";
import { CustomText } from "../CustomText";

export type TReviewModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reviewerName?: string;
    reviewerAvatar?: string;
    revieweeName?: string;
    reviewDate?: string;
    reviewText?: string;
    rating?: number;
    status?: "Hide" | "Unhide";
    onStatusToggle?: () => void;
    avatarClass?: string;
    projectId?: number;
};

const ReviewModal: React.FC<TReviewModalProps> = ({
    open,
    onOpenChange,
    reviewerName,
    reviewerAvatar,
    revieweeName,
    reviewDate,
    reviewText,
    rating,
    status,
    avatarClass,
    projectId,
    onStatusToggle
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-white border-muted p-0 rounded-xl w-[550px]"
                showCloseButton={false}
                onInteractOutside={() => onOpenChange(false)}
            >
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xl font-medium text-app-primary">
                        <div className="flex items-center gap-2">
                            <img src={reviewerIcon} alt="reviewer" />
                            <CustomText
                                text={revieweeName}
                                className="text-[18px] font-semibold text-app-primary"
                                maxLength={30}
                                tooltipClass="max-w-xs break-words cursor-pointer bg-app-branding text-white border border-muted/30 rounded-md"
                            />
                        </div>
                        <div className="text-[#515665] text-sm font-medium">
                            Project # {projectId}
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-2 flex flex-col sm:flex-row gap-4 text-center lg:text-left">
                    <CustomAvatar
                        src={reviewerAvatar}
                        initials={getInitials(reviewerName ?? "")}
                        className={`!w-15 !h-15 rounded-full object-cover border-2 border-white shadow-lg m-auto ${avatarClass}`}
                        textClass="text-xl"
                    />

                    <div className="flex-1 flex flex-col gap-1 m-auto">
                        <div className="text-[16px] font-semibold text-base text-gray-800 ">
                            {reviewerName}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={rating ?? 0} size="md" className="mt-1" />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2 min-w-[120px]">
                        <div className="text-gray-400 text-sm">{reviewDate}</div>
                        <CustomToggle
                            value={status === "Hide" ? "inactive" : "active"}
                            onChange={onStatusToggle}
                            onLabel="Hide"
                            offLabel="Unhide"
                            className="w-[5.3rem] h-8"
                            onCircleClass="-ml-5"
                            offCircleClass="-ml-5"
                        />
                    </div>
                </div>
                <DialogDescription asChild>
                    <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed break-words">
                        {reviewText}
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
