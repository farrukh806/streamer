// fetch helper methods to handle api calls
import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";
import type { IApiResponse } from "../types/api";

export class FetchHelper {
    static async get<T>(url: string, options?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await axiosInstance.get(url, options);
        if (!response.status) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
    }

    static async post<T>(url: string, data: any, options?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await axiosInstance.post(url, data, options);
        if (!response.status) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
    }

    static async put<T>(url: string, data: any, options?: AxiosRequestConfig): Promise<IApiResponse<T>> {
        const response = await axiosInstance.put(url, data, options);
        if (!response.status) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
    }
}