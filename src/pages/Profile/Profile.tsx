import React from "react";
import { useProfile } from "./Profile.Container";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import ProfileSkeleton from "./Profile.Skeleton";
import { CustomAvatar } from "@/components/custom/CustomAvatar";
import { getInitialsFromName } from "@/utils/common.utils";

const Profile: React.FC = () => {
    const { profile, isProfileLoading, handleNavigateBack } = useProfile();

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
                        textClass="!w-10 !h-10"
                    />
                    <div className="flex flex-col gap-4">
                        <div>{profile.fullName}</div>
                        <div>{profile.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
