import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "@/routes/appRoutes";
import leftArrowIcon from "@/assets/icons/arrow-left-icon.svg";

type TDataNotFoundProps = {
    title?: string;
    description?: string;
    icon?: ReactNode;
    className?: string;
    backLink?: string;
    backLinkText?: string;
    showBackLink?: boolean;
};

const DataNotFound = ({
    title = "Data Not Found",
    description = "The requested data could not be found.",
    icon,
    className = "",
    backLink = APP_ROUTES.DASHBOARD,
    backLinkText = "Back to home",
    showBackLink = true
}: TDataNotFoundProps) => {
    const navigate = useNavigate();
    return (
        <div className={`flex flex-col items-center justify-center m-auto ${className}`}>
            <div className="text-center max-w-md mx-auto p-6">
                {icon && <div className="mb-4 flex justify-center">{icon}</div>}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
            {showBackLink && (
                <button
                    onClick={() => navigate(backLink)}
                    className="inline-flex items-center gap-2 mt-4 text-app-primary hover:underline cursor-pointer"
                >
                    <img src={leftArrowIcon} alt="back" />
                    {backLinkText}
                </button>
            )}
        </div>
    );
};

export default DataNotFound;
