export type SearchInputProps = {
    onSearch: (next: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
    size?: "sm" | "md" | "lg";
    label?: string;
    labelClass?: string;
    labelRequired?: boolean;
    labelRequiredClass?: string;
};
