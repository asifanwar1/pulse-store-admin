import React from "react";
import { useProfile } from "./Profile.Container";
import { ArrowLeft, Mail, MapPin, PenSquare, Phone, User } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import ProfileSkeleton from "./Profile.Skeleton";
import { CustomAvatar } from "@/components/custom/CustomAvatar";
import { getInitialsFromName } from "@/utils/common.utils";
import { StatChipCard } from "@/components/custom/CustomCards";
import { FormBuilder } from "@/components/custom/Form";
import type { IResetPasswordFormValues } from "../Authentication/types";
import {
    RESET_PASSWORD_FORM_CONFIG,
    RESET_PASSWORD_FORM_INITIAL_VALUES,
} from "../Authentication";
import { RESET_PASSWORD_FORM_SCHEMA } from "../Authentication/forms/validationSchemas";
import ProfileFormModal from "./ProfileFormModal";

const Profile: React.FC = () => {
    const {
        INITIAL_PROFILE_DATA,
        profile,
        address,
        formRef,
        isProfileLoading,
        isPending,
        profileFormRef,
        profileModalOpen,
        isProfileSubmitting,
        onSubmit,
        handleNavigateBack,
        handleProfileSubmit,
        handleProfileModalOpen,
        handleProfileModalClose,
    } = useProfile();

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

            <div className="relative bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex items-center justify-center">
                    <CustomAvatar
                        initials={getInitialsFromName(profile.fullName!)}
                        className="!w-20 !h-20 bg-white"
                        textClass="text-pulse-green"
                    />
                </div>
                <div className="absolute top-4 right-4">
                    <Button
                        onClick={handleProfileModalOpen}
                        variant="default"
                        size="sm"
                    >
                        <PenSquare className="w-4 h-4" />
                        Edit
                    </Button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <StatChipCard
                        icon={<User className="w-4 h-4" />}
                        label="Name"
                        value={profile.fullName!}
                    />
                    <StatChipCard
                        icon={<Mail className="w-4 h-4" />}
                        label="E-Mail"
                        value={profile.email}
                    />
                    <StatChipCard
                        icon={<MapPin className="w-4 h-4" />}
                        label="Address"
                        value={address}
                    />
                    <StatChipCard
                        icon={<Phone className="w-4 h-4" />}
                        label="Phone Number"
                        value={profile.phoneNumber!}
                    />
                </div>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <h3 className="text-pulse-green-dark mb-3">Change Password</h3>
                <FormBuilder<IResetPasswordFormValues>
                    ref={formRef}
                    defaultValues={RESET_PASSWORD_FORM_INITIAL_VALUES}
                    config={RESET_PASSWORD_FORM_CONFIG}
                    schema={RESET_PASSWORD_FORM_SCHEMA}
                    onSubmit={onSubmit}
                    className="space-y-5"
                >
                    <div className="flex flex-col mt-4">
                        <Button type="submit" isLoading={isPending}>
                            Change Password
                        </Button>
                    </div>
                </FormBuilder>
            </div>

            <ProfileFormModal
                open={profileModalOpen}
                isSubmitting={isProfileSubmitting}
                initialValues={INITIAL_PROFILE_DATA}
                formRef={profileFormRef}
                onClose={handleProfileModalClose}
                onSubmit={handleProfileSubmit}
            />
        </div>
    );
};

export default Profile;
