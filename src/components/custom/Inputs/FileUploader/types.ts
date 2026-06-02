export type ExistingFilePreview = {
    id: string;
    url: string;
    name?: string;
    file_name?: string;
    type?: string;
    size?: number;
};

export type FileUploaderValue = File | ExistingFilePreview;

export interface FileUploaderProps {
    // React Hook Form controller props
    value?: FileUploaderValue[] | string;
    onChange?: (files: FileUploaderValue[]) => void;
    onBlur?: () => void;
    name?: string;

    // Common form field props (injected by FormBuilder)
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;

    // componentProps
    multiple?: boolean;
    accept?: string;
    maxSize?: number; // bytes, default 5MB
    maxFiles?: number;
    containerClass?: string;
    labelClass?: string;
    dropzoneClass?: string;
    previewSize?: "sm" | "md" | "lg";
}

export interface FilePreviewItem {
    item: FileUploaderValue;
    name: string;
    size?: number;
    type?: string;
    previewUrl: string | null; // null for non-image files
    id: string;
    isObjectUrl: boolean;
}
