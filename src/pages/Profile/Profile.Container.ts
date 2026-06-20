import { useGetMe } from "@/hooks/api/auth.queries";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading: isProfileLoading } = useGetMe();

    const handleNavigateBack = () => navigate(-1);

    return { profile, isProfileLoading, handleNavigateBack };
};
