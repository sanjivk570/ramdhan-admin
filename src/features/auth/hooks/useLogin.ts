import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/app/router/route-paths";

export function useLogin() {
    const navigate = useNavigate();

    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: authService.login,

        onSuccess: (response) => {
            const { token, user } = response.data.data;

            setAuth(token, user);

            toast.success("Login successful");

            navigate(ROUTES.DASHBOARD);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Invalid credentials"
            );
        },
    });
}