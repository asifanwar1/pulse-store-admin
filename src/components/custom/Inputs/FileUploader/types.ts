export interface FileUploaderProps {
    // React Hook Form controller props
    value?: File[] | string;
    onChange?: (files: File[]) => void;
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
    file: File;
    previewUrl: string | null; // null for non-image files
    id: string;
}
