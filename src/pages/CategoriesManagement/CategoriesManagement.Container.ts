import { useState, type FormEvent } from "react";
import { useQueryState } from "nuqs";

import {
    useCreateCategory,
    useDeleteCategory,
    useGetCategories,
    useUpdateCategory,
} from "@/hooks/api/categories.queries";
import { useMediaUpload } from "@/hooks/api/media.queries";
import { showToast } from "@/lib/toast";
import type {
    TCategoryImage,
    TCategoryResponse,
} from "@/api/services/categories/categories.response";
import type { TCategoryFormValues } from "./CategoriesManagement.Modals";
import type { FileUploaderValue } from "@/components/custom/Inputs/FileUploader";
import Config from "@/Config";
import { withPageReset } from "@/hooks/useTablePagination";

type TCategoryFormErrors = Partial<Record<keyof TCategoryFormValues, string>>;

const INITIAL_FORM_VALUES: TCategoryFormValues = {
    name: "",
    description: "",
    image: [],
};

const isFile = (item: FileUploaderValue): item is File =>
    item instanceof File;

export const getCategoryInitials = (name: string) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
};

export const useCategoriesManagement = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"add" | "edit">("add");
    const [selectedCategory, setSelectedCategory] =
        useState<TCategoryResponse | null>(null);
    const [formValues, setFormValues] =
        useState<TCategoryFormValues>(INITIAL_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<TCategoryFormErrors>({});
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });

    const {
        data: categories,
        count: categoriesTotalCount,
        isPending: isCategoriesLoading,
        page,
        setPage,
    } = useGetCategories({
        search,
        limit: pageSize,
    });
    const { mutateAsync: createCategory, isPending: isCreating } =
        useCreateCategory();
    const { mutateAsync: updateCategory, isPending: isUpdating } =
        useUpdateCategory();
    const { mutateAsync: deleteCategory, isPending: isDeleting } =
        useDeleteCategory();
    const { handleSingleFileUpload, isMediaLoading } = useMediaUpload();

    const isFormSubmitting = isCreating || isUpdating || isMediaLoading;

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
            image: category.image
                ? [
                      {
                          id: category.image.id,
                          url: category.image.url,
                          file_name: category.image.file_name ?? undefined,
                      },
                  ]
                : [],
        });
        setFormErrors({});
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (category: TCategoryResponse) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleFormChange = <K extends keyof TCategoryFormValues>(
        field: K,
        value: TCategoryFormValues[K],
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

        try {
            const imageItem = formValues.image[0];
            let image: TCategoryImage | null = null;

            if (imageItem) {
                if (isFile(imageItem)) {
                    const uploaded = await handleSingleFileUpload(imageItem, {
                        folder: "categories",
                    });
                    image = {
                        id: uploaded.id,
                        url: uploaded.url,
                        file_name: uploaded.file_name,
                    };
                } else {
                    image = {
                        id: imageItem.id,
                        url: imageItem.url,
                        file_name: imageItem.file_name ?? null,
                    };
                }
            }

            const payload = {
                name: formValues.name.trim(),
                description: formValues.description.trim() || null,
                image,
            };

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

    const setSearch = withPageReset(setSearchRaw, setPage);
    const setPageSize = withPageReset(setPageSizeRaw, setPage);

    const filterItems = [
        {
            type: "search",
            key: "search",
            placeholder: "Search..",
            onSearch: setSearch,
            // label: "Search Properties",
            clearable: true,
        } as const,
    ];

    return {
        categories,
        categoriesTotalCount,
        formMode,
        formValues,
        formErrors,
        selectedCategory,
        isCategoriesLoading,
        isFormModalOpen,
        isDeleteModalOpen,
        isFormSubmitting,
        isDeleting,
        page,
        pageSize,
        filterItems,
        setSearch,
        setPageSize,
        setPage,
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
