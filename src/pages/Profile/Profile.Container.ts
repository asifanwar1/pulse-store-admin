import { useGetUserById } from "@/hooks/api/user.queries";
import { useStore } from "@/store";
import { formatAddress } from "@/utils/stringUtils";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
    const navigate = useNavigate();
    const user = useStore((state) => {
        return state.user;
    });
    const { data: profile, isLoading: isProfileLoading } = useGetUserById(
        user?.id,
    );

    const handleNavigateBack = () => navigate(-1);

    const address = formatAddress(profile?.address!);

    return { profile, address, isProfileLoading, handleNavigateBack };
};
