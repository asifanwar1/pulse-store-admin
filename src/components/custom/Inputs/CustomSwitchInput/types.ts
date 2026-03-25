export interface CustomSwitchInputProps {
    label?: string;
    activeLabel?: string;
    isChecked?: boolean | number;
    size?: "small" | "large" | "";
    error?: string;
    onClick?: () => void;
}
