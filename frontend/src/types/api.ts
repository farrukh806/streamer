import type { AxiosError } from "axios";

export interface IApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface IApiError extends AxiosError<{ message: string }> { }