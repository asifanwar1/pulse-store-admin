import { showToast } from "./toast";
import { HTTP_STATUS } from "@/constants/api.constants";
import { APP_ROUTES } from "@/routes/appRoutes";
import { store } from "@/store";
import {
    GENERIC_ERROR_MESSAGE,
    NETWORK_ERROR_MESSAGE,
    UNAUTHORIZED_ERROR_MESSAGE,
} from "@/constants/Validation-messages.constants";

type TBackendErrorData = {
    Message?: string;
    detail?: string | Array<{ msg?: string }>;
    error?: Record<string, string>;
};

const extractErrorMessage = (
    data: TBackendErrorData | undefined,
    fallbackMessage: string,
): string => {
    if (!data) return fallbackMessage;

    if (typeof data.detail === "string" && data.detail) {
        return data.detail;
    }

    if (Array.isArray(data.detail)) {
        const messages = data.detail
            .map((item) => item?.msg)
            .filter((msg): msg is string => Boolean(msg));
        if (messages.length) return messages.join(", ");
    }

    return data.Message || fallbackMessage;
};

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
                data?: TBackendErrorData;
            };
        };
        status = axiosError.response?.status;
        errorMessage = extractErrorMessage(
            axiosError.response?.data,
            fallbackMessage,
        );

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
