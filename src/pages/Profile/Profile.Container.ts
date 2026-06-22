import { useRef, useState } from "react";
import { useGetUserById, useUpdateMe } from "@/hooks/api/user.queries";
import { useStore } from "@/store";
import { formatAddress } from "@/utils/stringUtils";
import { useNavigate } from "react-router-dom";
import type { FormBuilderRef } from "@/components/custom/Form";
import type { IResetPasswordFormValues } from "../Authentication/types";
import { useResetPassword } from "@/hooks/api/auth.queries";
import type { TResetPasswordApiBody } from "@/api/services/auth/auth.request.types";
import { showToast } from "@/lib/toast";
import type { UserModel } from "@/api/models/user.model";
import type { ProfileFormValues } from "./ProfileSchema";

const mapProfileDetailsToFormDefaults = (
    profileData: UserModel,
): ProfileFormValues => {
    return {
        fullName: profileData?.fullName ?? "",
        phone: profileData?.phoneNumber ?? "",
        street_address: profileData?.address?.street_address ?? "",
        city: profileData?.address?.city ?? "",
        zipCode: profileData?.address?.zipCode ?? "",
        state: profileData?.address?.state ?? "",
        country: profileData?.address?.country ?? "",
    };
};

export const useProfile = () => {
    const navigate = useNavigate();
    const state = useStore((state) => {
        return state;
    });
    const formRef = useRef<FormBuilderRef<IResetPasswordFormValues> | null>(
        null,
    );
    const profileFormRef = useRef<FormBuilderRef<ProfileFormValues> | null>(
        null,
    );
    const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

    const { data: profile, isLoading: isProfileLoading } = useGetUserById(
        state.user?.id,
    );

    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const { mutateAsync: updateProfile, isPending: isProfileSubmitting } =
        useUpdateMe();

    const handleNavigateBack = () => navigate(-1);

    const address = formatAddress(profile?.address!);

    const onSubmit = async (data: IResetPasswordFormValues) => {
        const payload: TResetPasswordApiBody = {
            token: state.token ?? "",
            password: data.password,
        };
        await resetPassword(payload);
        showToast.success("Password reset successfully");
    };

    const handleProfileModalOpen = () => setProfileModalOpen(true);
    const handleProfileModalClose = () => setProfileModalOpen(false);

    const INITIAL_PROFILE_DATA = mapProfileDetailsToFormDefaults(profile!) || {
        fullName: "",
        phone: "",
        street_address: "",
        city: "",
        zipCode: "",
        state: "",
        country: "",
    };

    const handleProfileSubmit = async (values: ProfileFormValues) => {
        const payload = {
            fullName: values.fullName,
            Phone: values.phone,
            street_address: values.street_address,
            city: values.city,
            zipCode: values.zipCode,
            state: values.state,
            country: values.country,
        };

        await updateProfile(payload, {
            onSuccess: () => {
                handleProfileModalClose();
            },
        });
    };

    return {
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
        handleProfileSubmit,
        handleNavigateBack,
        handleProfileModalOpen,
        handleProfileModalClose,
    };
};
