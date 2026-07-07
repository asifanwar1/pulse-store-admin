import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCategoriesPaginated } from "@/hooks/api/categories.queries";
import { useGetProductsPaginated } from "@/hooks/api/products.queries";
import {
    useCreateOffer,
    useGetOffer,
    useUpdateOffer,
} from "@/hooks/api/offers.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import type { TCreateOfferBody } from "@/api/services/offers/offers.request.types";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import {
    INITIAL_OFFER_VALUES,
    ManageOfferSchema,
    type ManageOfferFormValues,
} from "./ManageOffer.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { showToast } from "@/lib/toast";
import { getManageOfferFormConfig } from "./ManageOffer.config";
import {
    OfferScope,
    OFFER_SCOPE_OPTIONS,
} from "@/constants/offer-scope.constants";
import { resolveOptionValue } from "@/utils/selectOption.utils";

const startOfDayISOString = (date: Date) => {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value.toISOString();
};

const endOfDayISOString = (date: Date) => {
    const value = new Date(date);
    value.setHours(23, 59, 59, 999);
    return value.toISOString();
};

const buildOfferPayload = (
    values: ManageOfferFormValues,
): TCreateOfferBody => {
    const isSpecificScope = values.scope === OfferScope.SPECIFIC_CATEGORIES;

    return {
        name: values.name,
        description: values.description || null,
        discount_percentage: Number(values.discountPercentage),
        scope: values.scope as TCreateOfferBody["scope"],
        start_date: startOfDayISOString(values.startDate),
        end_date: endOfDayISOString(values.endDate),
        is_active: values.isActive,
        category_ids: isSpecificScope
            ? values.categoryIds.map((option) => Number(option.value))
            : [],
        included_product_ids: isSpecificScope
            ? values.includedProductIds.map((option) => Number(option.value))
            : [],
        excluded_product_ids: values.excludedProductIds.map((option) =>
            Number(option.value),
        ),
    };
};

export const useManageOffer = ({ mode = ACTION_MODES.ADD }: formModesType) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const formRef = useRef<FormBuilderRef<ManageOfferFormValues>>(null);
    const [categorySearch, setCategorySearch] = useState("");
    const [productSearch, setProductSearch] = useState("");

    const { data: offer, isLoading: isOfferLoading } = useGetOffer(
        Number(id),
    );
    const { mutateAsync: createOffer, isPending: isCreatingOffer } =
        useCreateOffer();
    const { mutateAsync: updateOffer, isPending: isUpdatingOffer } =
        useUpdateOffer();

    const {
        data: categories = [],
        fetchNextPage: fetchNextCategoriesPage,
        hasNextPage: hasMoreCategories,
        isFetchingNextPage: isFetchingMoreCategories,
        isPending: isCategoriesLoading,
    } = useGetCategoriesPaginated({ search: categorySearch, limit: 20 });

    const {
        data: products = [],
        fetchNextPage: fetchNextProductsPage,
        hasNextPage: hasMoreProducts,
        isFetchingNextPage: isFetchingMoreProducts,
        isPending: isProductsLoading,
    } = useGetProductsPaginated({ search: productSearch, limit: 20 });

    const isLoading = isOfferLoading || isCategoriesLoading;
    const isSubmitting = isCreatingOffer || isUpdatingOffer;

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: String(category.id),
    }));

    const productOptions = products.map((product) => ({
        label: product.name,
        value: String(product.id),
    }));

    const formConfig = getManageOfferFormConfig({
        categoryOptions,
        hasMoreCategories: !!hasMoreCategories,
        isFetchingMoreCategories,
        isCategoriesLoading,
        onCategorySearch: setCategorySearch,
        onCategoryScroll: hasMoreCategories
            ? () => fetchNextCategoriesPage()
            : undefined,
        productOptions,
        hasMoreProducts: !!hasMoreProducts,
        isFetchingMoreProducts,
        isProductsLoading,
        onProductSearch: setProductSearch,
        onProductScroll: hasMoreProducts
            ? () => fetchNextProductsPage()
            : undefined,
    });

    const handleCancel = () => navigate(-1);

    const handleSubmit = async (values: ManageOfferFormValues) => {
        const payload = buildOfferPayload(values);

        try {
            if (mode === ACTION_MODES.ADD) {
                await createOffer(payload, {
                    onSuccess: () => {
                        showToast.success("Offer created successfully");
                        navigate(APP_ROUTES.OFFERS);
                    },
                });
            } else {
                await updateOffer(
                    { id: Number(id), body: payload },
                    {
                        onSuccess: () => {
                            showToast.success("Offer updated successfully");
                            navigate(APP_ROUTES.OFFERS);
                        },
                    },
                );
            }
        } catch (error) {
            console.error("Failed to save offer:", error);
        }
    };

    const isUpdateMode = mode === ACTION_MODES.UPDATE;

    const offerFormDefaultValues =
        isUpdateMode && offer
            ? {
                  name: offer.name ?? "",
                  description: offer.description ?? "",
                  discountPercentage: offer.discount_percentage ?? "",
                  scope: resolveOptionValue(OFFER_SCOPE_OPTIONS, offer.scope),
                  categoryIds: offer.categories.map((category) => ({
                      label: category.name,
                      value: String(category.id),
                  })),
                  includedProductIds: offer.included_products.map(
                      (product) => ({
                          label: product.name,
                          value: String(product.id),
                      }),
                  ),
                  excludedProductIds: offer.excluded_products.map(
                      (product) => ({
                          label: product.name,
                          value: String(product.id),
                      }),
                  ),
                  startDate: new Date(offer.start_date),
                  endDate: new Date(offer.end_date),
                  isActive: offer.is_active,
              }
            : INITIAL_OFFER_VALUES;

    return {
        formRef,
        formConfig,
        ManageOfferSchema,
        isSubmitting,
        isLoading,
        offerFormDefaultValues,
        handleCancel,
        handleSubmit,
    };
};
