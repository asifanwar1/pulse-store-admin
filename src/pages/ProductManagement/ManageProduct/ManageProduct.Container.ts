import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetCategoriesPaginated } from "@/hooks/api/categories.queries";
import { useMediaUpload } from "@/hooks/api/media.queries";
import { useCreateProduct } from "@/hooks/api/products.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import type {
    TProductCategory,
    TProductStatus,
} from "@/api/services/products/products.request.types";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import {
    ManageProductSchema,
    type ManageProductFormValues,
} from "./ManageProduct.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { showToast } from "@/lib/toast";
import { getAddProductFormConfig } from "./ManageProduct.config";

export const useManageProduct = ({
    mode = ACTION_MODES.ADD,
}: formModesType) => {
    const navigate = useNavigate();
    const formRef = useRef<FormBuilderRef<ManageProductFormValues>>(null);
    const [categorySearch, setCategorySearch] = useState("");
    const { mutateAsync: createProduct, isPending: isCreatingProduct } =
        useCreateProduct();
    const { handleMultipleFileUpload, isMediaLoading } = useMediaUpload();
    const {
        data: categories = [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending: isCategoriesLoading,
    } = useGetCategoriesPaginated({
        search: categorySearch,
        limit: 20,
    });

    const isSubmitting = isMediaLoading || isCreatingProduct;
    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                label: category.name,
                value: String(category.id),
            })),
        [categories],
    );
    const formConfig = useMemo(
        () =>
            getAddProductFormConfig({
                categoryOptions,
                onCategorySearch: setCategorySearch,
                onCategoryScroll: hasNextPage ? () => fetchNextPage() : undefined,
                hasMoreCategories: !!hasNextPage,
                isFetchingMoreCategories: isFetchingNextPage,
                isCategoriesLoading,
            }),
        [
            categoryOptions,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            isCategoriesLoading,
        ],
    );

    const handleCancel = () => {
        navigate(APP_ROUTES.PRODUCTS);
    };

    const handleSubmit = async (values: ManageProductFormValues) => {
        try {
            const uploadedMedia = await handleMultipleFileUpload(
                values.images,
                {
                    returnFullResponse: true,
                    folder: "products",
                },
            );

            await createProduct(
                {
                    name: values.name,
                    sku: values.sku,
                    brand: values.brand,
                    description: values.description,
                    retail_price: Number(values.price),
                    cost_price: Number(values.costPrice),
                    stock_quantity: parseInt(values.stock, 10),
                    tags: values.tags || [],
                    media: uploadedMedia.map((item) => ({
                        id: item.id,
                        url: item.url,
                    })),
                    category: values.category as TProductCategory,
                    status: values.status as TProductStatus,
                },
                {
                    onSuccess: () => {
                        showToast.success(
                            mode === ACTION_MODES.ADD
                                ? "Product created successfully"
                                : "Product saved successfully",
                        );
                        navigate(APP_ROUTES.PRODUCTS);
                    },
                },
            );
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    };

    return {
        formRef,
        formConfig,
        ManageProductSchema,
        isSubmitting,
        handleCancel,
        handleSubmit,
    };
};
