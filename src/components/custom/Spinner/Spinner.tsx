import React from "react";

const DEFAULT_SPINNER_SIZE = 5;
const DEFAULT_SPINNER_COLOR = "black";

type spinnerProps = {
    size?: number;
    color?: string;
};

const Spinner: React.FC<spinnerProps> = (props) => {
    const { size = DEFAULT_SPINNER_SIZE, color = DEFAULT_SPINNER_COLOR } = props;
    return (
        <div
            className={`w-${size} h-${size} rounded-full border-[3px] border-${color} border-l-black/0 animate-spin `}
        ></div>
    );
};

export default Spinner;
