import type { CheckboxProps } from "./types";

const Checkbox = ({
    id,
    title,
    checked,
    onChange,
    withMargin = true,
    classes = "",
    inputClasses = "",
    isDisabled = false
}: CheckboxProps) => {
    return (
        <div className={`flex items-center space-x-2 ${withMargin ? "mb-3" : ""} ${classes}`}>
            <input
                type="checkbox"
                id={id}
                className={`${inputClasses}`}
                onChange={onChange}
                checked={checked}
                disabled={isDisabled}
            />
            <label htmlFor={id} className="cursor-pointer text-sm">
                {title}
            </label>
        </div>
    );
};

export default Checkbox;
