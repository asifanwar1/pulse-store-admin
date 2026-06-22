import { useGetUserById } from "@/hooks/api/user.queries";
import { useStore } from "@/store";
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

    return { profile, isProfileLoading, handleNavigateBack };
};
