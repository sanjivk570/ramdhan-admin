import axios from "axios";

export interface ApiErrorResponse {
    message?: string;

    errors?: Record<
        string,
        string[] | string
    >;
}

export function getApiError(
    error: unknown
): ApiErrorResponse {
    // No error yet
    if (!error) {
        return {};
    }

    // Axios error
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data ?? {};
    }

    // Normal JavaScript Error
    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    return {};
}

export function getApiFieldErrors(
    error: unknown
): Record<string, string[] | string> {
    return getApiError(error).errors ?? {};
}

export function getApiErrorMessage(
    error: unknown
): string | undefined {
    return getApiError(error).message;
}