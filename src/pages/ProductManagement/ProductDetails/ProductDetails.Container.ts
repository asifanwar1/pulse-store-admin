import { useNavigate, useParams } from "react-router-dom";
import {
    useGetProduct,
    useGetProductCustomerReviews,
    useGetProductMonthlySales,
} from "@/hooks/api/products.queries";
import { APP_ROUTES } from "@/routes/appRoutes";

export const useProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading: isProductLoading } = useGetProduct(
        Number(id),
    );

    const { data: productMonthlySales, isLoading: isMonthlySalesLoading } =
        useGetProductMonthlySales(Number(id));
    const { data: customerReviews, isLoading: isCustomerReviewsLoading } =
        useGetProductCustomerReviews(Number(id));

    const isLoading =
        isProductLoading || isMonthlySalesLoading || isCustomerReviewsLoading;

    const handleNavigateBack = () => navigate(APP_ROUTES.PRODUCTS);

    return {
        product,
        isProductLoading,
        productMonthlySales,
        customerReviews,
        isLoading,
        handleNavigateBack,
    };
};
