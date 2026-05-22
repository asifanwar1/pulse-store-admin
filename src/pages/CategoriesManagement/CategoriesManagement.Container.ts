import { useMemo, useState, type FormEvent } from "react";

import {
    useCreateCategory,
    useDeleteCategory,
    useGetCategories,
    useUpdateCategory,
} from "@/hooks/api/categories.queries";
import { showToast } from "@/lib/toast";
import type { TCategoryResponse } from "@/api/services/categories/categories.response";
import type { TCategoryFormValues } from "./CategoriesManagement.Modals";

type TCategoryFormErrors = Partial<Record<keyof TCategoryFormValues, string>>;

const INITIAL_FORM_VALUES: TCategoryFormValues = {
    name: "",
    description: "",
};

export const getCategoryInitials = (name: string) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
};

export const useCategoriesManagement = () => {
    const { data, isPending: isCategoriesLoading } = useGetCategories({
        page: 1,
        limit: 100,
    });
    const { mutateAsync: createCategory, isPending: isCreating } =
        useCreateCategory();
    const { mutateAsync: updateCategory, isPending: isUpdating } =
        useUpdateCategory();
    const { mutateAsync: deleteCategory, isPending: isDeleting } =
        useDeleteCategory();

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"add" | "edit">("add");
    const [selectedCategory, setSelectedCategory] =
        useState<TCategoryResponse | null>(null);
    const [formValues, setFormValues] =
        useState<TCategoryFormValues>(INITIAL_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<TCategoryFormErrors>({});

    const categories = data?.data || [];
    const categoriesCount = data?.count ?? categories.length;
    const isFormSubmitting = isCreating || isUpdating;

    const summary = useMemo(
        () => ({
            total: categoriesCount,
            described: categories.filter((item) => !!item.description?.trim())
                .length,
        }),
        [categories, categoriesCount],
    );

    const resetForm = () => {
        setFormValues(INITIAL_FORM_VALUES);
        setFormErrors({});
        setSelectedCategory(null);
    };

    const closeFormModal = () => {
        if (isFormSubmitting) return;
        setIsFormModalOpen(false);
        resetForm();
    };

    const closeDeleteModal = () => {
        if (isDeleting) return;
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
    };

    const openAddModal = () => {
        setFormMode("add");
        setFormValues(INITIAL_FORM_VALUES);
        setFormErrors({});
        setSelectedCategory(null);
        setIsFormModalOpen(true);
    };

    const openEditModal = (category: TCategoryResponse) => {
        setFormMode("edit");
        setSelectedCategory(category);
        setFormValues({
            name: category.name,
            description: category.description || "",
        });
        setFormErrors({});
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (category: TCategoryResponse) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleFormChange = (
        field: keyof TCategoryFormValues,
        value: string,
    ) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const validateForm = () => {
        const trimmedName = formValues.name.trim();
        const trimmedDescription = formValues.description.trim();
        const nextErrors: TCategoryFormErrors = {};

        if (!trimmedName) {
            nextErrors.name = "Category name is required";
        } else if (trimmedName.length > 100) {
            nextErrors.name = "Category name must be 100 characters or fewer";
        }

        if (trimmedDescription.length > 240) {
            nextErrors.description =
                "Description must be 240 characters or fewer";
        }

        setFormErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            name: formValues.name.trim(),
            description: formValues.description.trim() || null,
        };

        try {
            if (formMode === "add") {
                await createCategory(payload);
                showToast.success("Category created successfully");
            } else if (selectedCategory) {
                await updateCategory({
                    id: selectedCategory.id,
                    body: payload,
                });
                showToast.success("Category updated successfully");
            }

            setIsFormModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Failed to save category:", error);
            showToast.error("Failed to save category");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedCategory) return;

        try {
            await deleteCategory(selectedCategory.id);
            showToast.success("Category deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
        } catch (error) {
            console.error("Failed to delete category:", error);
            showToast.error("Failed to delete category");
        }
    };

    return {
        categories,
        categoriesCount,
        summary,
        formMode,
        formValues,
        formErrors,
        selectedCategory,
        isCategoriesLoading,
        isFormModalOpen,
        isDeleteModalOpen,
        isFormSubmitting,
        isDeleting,
        openAddModal,
        openEditModal,
        openDeleteModal,
        closeFormModal,
        closeDeleteModal,
        handleFormChange,
        handleFormSubmit,
        handleDeleteConfirm,
    };
};
