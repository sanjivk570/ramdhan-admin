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
        activate: (uuid: string) => `/users/${uuid}/activate`,
        deactivate: (uuid: string) => `/users/${uuid}/deactivate`,
    },

    roles: {
        list: "/roles",
        create: "/roles",
    },

    permissions: {
        list: "/permissions",
    },
} as const;