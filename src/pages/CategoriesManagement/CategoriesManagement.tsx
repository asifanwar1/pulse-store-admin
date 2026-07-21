import CustomButton from "@/components/custom/CustomButton/CustomButton";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { FolderOpen, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import {
    getCategoryInitials,
    useCategoriesManagement,
} from "./CategoriesManagement.Container";
import {
    CategoryFormModal,
    DeleteCategoryModal,
} from "./CategoriesManagement.Modals";
import { formatDate } from "@/utils/dateTime.utils";
import CategoriesManagementSkeleton from "./CategoriesManagementSkeleton";
import FilterBar from "@/components/custom/FilterBar";
import Pagination from "@/components/custom/Pagination";

const MIN_VALUE = 0;

const CategoriesManagement = () => {
    const {
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
    } = useCategoriesManagement();

    const renderCategoryCard = (category: (typeof categories)[number]) => {
        return (
            <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-pulse-cream-dark bg-pulse-cream-dark/40 p-5 shadow-dash-card transition-transform duration-200 hover:-translate-y-0.5"
            >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-pulse-green/5 blur-2xl" />
                <div className="relative flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-sm font-semibold text-pulse-green-dark shadow-sm">
                                {category.image ? (
                                    <img
                                        src={category.image.url}
                                        alt={category.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    getCategoryInitials(category.name) || "C"
                                )}
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-lg font-semibold text-pulse-green-dark">
                                    {category.name}
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => openEditModal(category)}
                                className="rounded-full p-2 text-pulse-green transition-colors hover:bg-white hover:text-pulse-green-dark"
                                aria-label={`Edit ${category.name}`}
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => openDeleteModal(category)}
                                className="rounded-full p-2 text-red-500 transition-colors hover:bg-white hover:text-red-600"
                                aria-label={`Delete ${category.name}`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <p
                        className={cn(
                            "min-h-12 text-sm leading-6 text-pulse-green",
                            !category.description &&
                                "italic text-pulse-green/70",
                        )}
                    >
                        {category.description || "No description added yet."}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-pulse-cream-dark pt-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-pulse-green-dark">
                            <Tag className="h-3.5 w-3.5" />
                            Active category
                        </div>
                        <span className="text-xs text-pulse-green/80">
                            {formatDate(
                                category.updated_at || category.created_at,
                            )}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex min-h-0 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1">
                        <FilterBar items={filterItems} />
                    </div>
                    <CustomButton
                        onClick={openAddModal}
                        startIcon={<Plus className="h-4 w-4" />}
                    >
                        Create Category
                    </CustomButton>
                </div>

                {isCategoriesLoading && <CategoriesManagementSkeleton />}

                {!isCategoriesLoading && categoriesTotalCount > MIN_VALUE && (
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {categories.map(renderCategoryCard)}
                        </div>
                        <div className="mt-6 flex justify-start md:justify-end">
                            <Pagination
                                page={page}
                                pageSize={pageSize}
                                total={categoriesTotalCount}
                                onPageChange={setPage}
                                onPageSizeChange={setPageSize}
                            />
                        </div>
                    </div>
                )}

                {!isCategoriesLoading && categoriesTotalCount === MIN_VALUE && (
                    <div className="rounded-2xl border border-dashed border-pulse-cream-dark bg-pulse-cream-dark/20 shadow-dash-card">
                        <Empty className="border-0">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FolderOpen className="h-5 w-5" />
                                </EmptyMedia>
                                <EmptyTitle>No categories yet</EmptyTitle>
                                <EmptyDescription>
                                    Start by creating your first category so
                                    products have a clean place to belong.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <CustomButton
                                    onClick={openAddModal}
                                    startIcon={<Plus className="h-4 w-4" />}
                                >
                                    Create First Category
                                </CustomButton>
                            </EmptyContent>
                        </Empty>
                    </div>
                )}
            </div>

            <CategoryFormModal
                open={isFormModalOpen}
                mode={formMode}
                values={formValues}
                errors={formErrors}
                isSubmitting={isFormSubmitting}
                onClose={closeFormModal}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
            />

            <DeleteCategoryModal
                open={isDeleteModalOpen}
                categoryName={selectedCategory?.name}
                isDeleting={isDeleting}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default CategoriesManagement;
