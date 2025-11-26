// fetch helper methods to handle api calls
import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

export class FetchHelper {
    static async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.get(url, options);
        if (!response.status) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
    }
}