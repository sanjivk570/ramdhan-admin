export const ENDPOINTS = {
    auth: {
        login: "/login",
        logout: "/logout",
        profile: "/profile",
        forgotPassword: "/forgot-password",
        resetPassword: "/reset-password",
        changePassword: "/change-password",
    },

    users: {
        list: "/users",
        create: "/users",
        update: (uuid: string) => `/users/${uuid}`,
        details: (uuid: string) => `/users/${uuid}`,
        delete: (uuid: string) => `/users/${uuid}`,
        restore: (uuid: string) => `/users/${uuid}/restore`,
        status: (uuid: string) => `/users/${uuid}/status`,
    },

    roles: {
        list: "/roles",
        create: "/roles",
        details: (id: number) => `/roles/${id}`,
        update: (id: number) => `/roles/${id}`,
        delete: (id: number) => `/roles/${id}`,
        permissions: (id: number) => `/roles/${id}/permissions`,
    },

    permissions: {
        list: "/permissions",
    },

    dashboard: {
        index: "/dashboard",
    },

    categories: {
        list: "/categories",
        details: (uuid: string) => `/categories/${uuid}`,
        create: "/categories",
        update: (uuid: string) =>  `/categories/${uuid}`,
        delete: (uuid: string) => `/categories/${uuid}`,
        restore: (uuid: string) => `/categories/${uuid}/restore`,
        status: (uuid: string) => `/categories/${uuid}/status`,
    },

} as const;