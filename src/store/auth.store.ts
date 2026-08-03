import { create } from "zustand";
import type { User } from "@/features/auth/types/auth";

interface AuthState {
    token: string | null;
    user: User | null;

    setAuth: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    //user: null,
    user: JSON.parse(localStorage.getItem("user") ?? "null"),

    setAuth: (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({
            token,
            user,
        });
    },

    logout: () => {
        localStorage.removeItem("token");

        set({
            token: null,
            user: null,
        });
    },
}));