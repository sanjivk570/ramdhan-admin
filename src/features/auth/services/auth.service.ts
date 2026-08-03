import axiosClient from "@/lib/axios";
import { API } from "@/constants/api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authService = {
    login(payload: LoginRequest) {
        return axiosClient.post<LoginResponse>(API.LOGIN, payload);
    },

    logout() {
        return axiosClient.post(API.LOGOUT);
    },

    profile() {
        return axiosClient.get(API.PROFILE);
    },
};