import { showToast } from "./toast";
import { HTTP_STATUS } from "@/constants/api.constants";
import { APP_ROUTES } from "@/routes/appRoutes";
import { store } from "@/store";
import {
    GENERIC_ERROR_MESSAGE,
    NETWORK_ERROR_MESSAGE,
    UNAUTHORIZED_ERROR_MESSAGE,
} from "@/constants/Validation-messages.constants";

const networkRequestErrorHandler = (
    error: unknown,
    fallbackMessage = GENERIC_ERROR_MESSAGE,
): void => {
    let status: number | undefined;
    let errorMessage = fallbackMessage;

    if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
            response?: {
                status: number;
                data: { Message?: string; error?: Record<string, string> };
            };
            Message: string;
        };
        status = axiosError.response?.status;
        errorMessage = axiosError.response?.data?.Message || fallbackMessage;

        if (status === HTTP_STATUS.UNAUTHORIZED) {
            store.clearAuth();
            window.location.href = APP_ROUTES.LOGIN;
            showToast.error(UNAUTHORIZED_ERROR_MESSAGE);
            return;
        }
        showToast.error(errorMessage);
    } else if (
        typeof error === "object" &&
        error !== null &&
        "request" in error
    ) {
        showToast.error(NETWORK_ERROR_MESSAGE);
    } else if (error instanceof Error) {
        showToast.error(error.message);
    } else {
        showToast.error(fallbackMessage);
    }
};
export { networkRequestErrorHandler };
