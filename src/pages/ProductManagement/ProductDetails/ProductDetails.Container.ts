import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "@/hooks/api/products.queries";
import { APP_ROUTES } from "@/routes/appRoutes";

export const useProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading: isProductLoading } = useGetProduct(
        Number(id),
    );

    const handleNavigateBack = () => navigate(APP_ROUTES.PRODUCTS);

    return { product, isProductLoading, handleNavigateBack };
};
