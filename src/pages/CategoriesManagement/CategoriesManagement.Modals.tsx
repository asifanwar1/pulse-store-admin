import type { ChangeEvent, FormEvent } from "react";

import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { Input } from "@/components/custom/Input";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import FileUploader from "@/components/custom/Inputs/FileUploader";
import type { FileUploaderValue } from "@/components/custom/Inputs/FileUploader";
import { Trash2 } from "lucide-react";

export type TCategoryFormValues = {
    name: string;
    description: string;
    image: FileUploaderValue[];
};

type TCategoryFormErrors = Partial<Record<keyof TCategoryFormValues, string>>;

type TCategoryFormModalProps = {
    open: boolean;
    mode: "add" | "edit";
    values: TCategoryFormValues;
    errors: TCategoryFormErrors;
    isSubmitting: boolean;
    onClose: () => void;
    onChange: <K extends keyof TCategoryFormValues>(
        field: K,
        value: TCategoryFormValues[K],
    ) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type TDeleteCategoryModalProps = {
    open: boolean;
    categoryName?: string;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const CategoryFormModal = ({
    open,
    mode,
    values,
    errors,
    isSubmitting,
    onClose,
    onChange,
    onSubmit,
}: TCategoryFormModalProps) => {
    const title = mode === "add" ? "Add New Category" : "Edit Category";

    const footer = (
        <div className="flex w-full justify-end gap-3">
            <CustomButton
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Cancel
            </CustomButton>
            <CustomButton
                type="submit"
                form="category-form"
                isLoading={isSubmitting}
            >
                {mode === "add" ? "Create Category" : "Save Changes"}
            </CustomButton>
        </div>
    );

    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title={title}
            size="md"
            footer={footer}
            showCloseButton
            closeOnOverlayClick={!isSubmitting}
            closeOnEscape={!isSubmitting}
            contentClassName="px-8 py-2"
            titleClassName="text-pulse-green-dark"
        >
            <form
                id="category-form"
                onSubmit={onSubmit}
                className="flex flex-col gap-1"
            >
                <Input
                    label="Category Name"
                    required
                    value={values.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange("name", event.target.value)
                    }
                    placeholder="e.g. Electronics"
                    error={errors.name}
                    labelClass="font-normal"
                />
                <TextareaInput
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        onChange("description", event.target.value)
                    }
                    placeholder="Add a short category description"
                    error={errors.description}
                    labelClass="font-normal"
                    rows={4}
                    maxLength={240}
                    showCharacterCount
                    containerClasses="mt-1"
                    textareaClasses="min-h-[120px]"
                />
                <FileUploader
                    name="image"
                    label="Category Image"
                    value={values.image}
                    onChange={(files) => onChange("image", files)}
                    multiple={false}
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    previewSize="md"
                    placeholder="Drag & drop an image here, or click to browse"
                    error={errors.image}
                    labelClass="font-normal mt-1"
                />
            </form>
        </CustomModal>
    );
};

export const DeleteCategoryModal = ({
    open,
    categoryName,
    isDeleting,
    onClose,
    onConfirm,
}: TDeleteCategoryModalProps) => {
    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
            closeOnOverlayClick={!isDeleting}
            closeOnEscape={!isDeleting}
            contentClassName="p-6 text-center"
            headerClassName="hidden"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Trash2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-pulse-green-dark">
                        Delete Category
                    </h3>
                    <p className="text-sm text-pulse-green">
                        {categoryName
                            ? `Are you sure you want to delete "${categoryName}"?`
                            : "Are you sure you want to delete this category?"}
                    </p>
                </div>
                <div className="flex w-full gap-3 pt-2">
                    <CustomButton
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        onClick={onConfirm}
                        isLoading={isDeleting}
                        disabled={isDeleting}
                        className="mt-0 flex-1 bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </CustomButton>
                </div>
            </div>
        </CustomModal>
    );
};
