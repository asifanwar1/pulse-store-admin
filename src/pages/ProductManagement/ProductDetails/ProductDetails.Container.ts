import { useNavigate, useParams } from "react-router-dom";
import {
    useGetProduct,
    useGetProductCustomerReviews,
    useGetProductMonthlySales,
    useUpdateProduct,
} from "@/hooks/api/products.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { ProductStatus } from "@/constants/product-status.constants";
import type { TProductStatus } from "@/api/services/products/products.request.types";

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

    const { mutateAsync: updateProduct, isPending: isUpdatingProductStatus } =
        useUpdateProduct();

    const isLoading =
        isProductLoading || isMonthlySalesLoading || isCustomerReviewsLoading;

    const handleNavigateBack = () => navigate(APP_ROUTES.PRODUCTS);

    const handleNavigateToEdit = () =>
        navigate(
            getRouteWithId({
                id: Number(id),
                route: APP_ROUTES.PRODUCTS_UPDATE,
            }),
        );

    const handleMarkAsActiveInactive = async () => {
        if (!product || !id) return;

        const newStatus =
            product.status === ProductStatus.ACTIVE
                ? ProductStatus.INACTIVE
                : ProductStatus.ACTIVE;

        await updateProduct({
            id: Number(id),
            body: { status: newStatus as TProductStatus },
        });
    };

    return {
        product,
        isProductLoading,
        productMonthlySales,
        customerReviews,
        isLoading,
        isUpdatingProductStatus,
        handleNavigateBack,
        handleNavigateToEdit,
        handleMarkAsActiveInactive,
    };
};
