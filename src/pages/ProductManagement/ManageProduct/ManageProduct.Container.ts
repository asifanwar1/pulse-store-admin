import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCategoriesPaginated } from "@/hooks/api/categories.queries";
import { useMediaUpload } from "@/hooks/api/media.queries";
import {
    useCreateProduct,
    useGetProduct,
    useUpdateProduct,
} from "@/hooks/api/products.queries";
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
    INITIAL_PRODUCT_VALUES,
    ManageProductSchema,
    type ManageProductFormValues,
} from "./ManageProduct.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { showToast } from "@/lib/toast";
import { getAddProductFormConfig } from "./ManageProduct.config";

const buildProductPayload = (
    values: ManageProductFormValues,
    uploadedMedia: Array<{ id: string; url: string }>,
) => ({
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
});

export const useManageProduct = ({
    mode = ACTION_MODES.ADD,
}: formModesType) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const formRef = useRef<FormBuilderRef<ManageProductFormValues>>(null);
    const [categorySearch, setCategorySearch] = useState("");

    const { data: product, isLoading: isProductLoading } = useGetProduct(
        Number(id),
    );
    const { mutateAsync: createProduct, isPending: isCreatingProduct } =
        useCreateProduct();

    const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
        useUpdateProduct();

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

    const isSubmitting =
        isMediaLoading || isCreatingProduct || isUpdatingProduct;
    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: String(category.id),
    }));
    const formConfig = getAddProductFormConfig({
        categoryOptions,
        hasMoreCategories: !!hasNextPage,
        isFetchingMoreCategories: isFetchingNextPage,
        isCategoriesLoading,
        onCategorySearch: setCategorySearch,
        onCategoryScroll: hasNextPage ? () => fetchNextPage() : undefined,
    });

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

            const payload = buildProductPayload(values, uploadedMedia);

            if (mode === ACTION_MODES.ADD) {
                await createProduct(payload, {
                    onSuccess: () => {
                        showToast.success("Product created successfully");
                        navigate(APP_ROUTES.PRODUCTS);
                    },
                });
            } else {
                await updateProduct(
                    { id: Number(id), body: payload },
                    {
                        onSuccess: () => {
                            showToast.success("Product updated successfully");
                            navigate(APP_ROUTES.PRODUCTS);
                        },
                    },
                );
            }
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    };

    const isUpdateMode = mode === ACTION_MODES.UPDATE;

    const productFormDefaultValues =
        isUpdateMode && product
            ? {
                  name: product.name ?? "",
                  sku: product.sku ?? "",
                  brand: product.brand ?? "",
                  category: String(product.category_id ?? ""),
                  status: product.status ?? "",
                  price: product.retail_price ?? "",
                  costPrice: product.cost_price ?? "",
                  stock: String(product.stock_quantity ?? 0),
                  description: product.description ?? "",
                  tags: product.tags ?? [],
                  images: [],
              }
            : INITIAL_PRODUCT_VALUES;

    return {
        formRef,
        formConfig,
        ManageProductSchema,
        isSubmitting,
        isProductLoading,
        productFormDefaultValues,
        handleCancel,
        handleSubmit,
    };
};
