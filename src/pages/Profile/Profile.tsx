import React from "react";
import { useProfile } from "./Profile.Container";
import { ArrowLeft, MapPin } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import ProfileSkeleton from "./Profile.Skeleton";
import { CustomAvatar } from "@/components/custom/CustomAvatar";
import { getInitialsFromName } from "@/utils/common.utils";
import { StatChipCard } from "@/components/custom/CustomCards";

const Profile: React.FC = () => {
    const { profile, address, isProfileLoading, handleNavigateBack } =
        useProfile();

    if (isProfileLoading) {
        return <ProfileSkeleton />;
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Account not found
                </p>
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <CustomAvatar
                        initials={getInitialsFromName(profile.fullName!)}
                        className="!w-20 !h-20 "
                        textClass="text-pulse-green"
                    />
                    <div className="flex flex-col text-pulse-green">
                        <div>{profile.fullName}</div>
                        <div>{profile.email}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address"
                    value={address}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Total Amount"
                    value={formatNumberCurrency(
                        revenue.completed_order.total_amount,
                    )}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Revenue Amount"
                    value={formatNumberCurrency(revenue.revenue_amount)}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Profit"
                    value={formatNumberCurrency(revenue.profit)}
                />
                <StatChipCard
                    icon={<CreditCard className="w-4 h-4" />}
                    label="Payment Method"
                    value={PaymentMethodsWithHelpers.getDisplayTextKey(
                        revenue.completed_order
                            .payment_method as PaymentMethodsType,
                    )}
                />
            </div>
        </div>
    );
};

export default Profile;
