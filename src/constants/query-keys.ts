// export const QUERY_KEYS = {
//     PROFILE: ["profile"],
//     USERS: ["users"],
//     USER: (uuid: string) => ["user", uuid],
//     ROLES: ["roles"],
//     ROLE: (uuid: string) => ["role", uuid],
//     PERMISSIONS: ["permissions"],
// } as const;

export const QUERY_KEYS = {
    USERS: "users",
    ROLES: "roles",
    PERMISSIONS: "permissions",
    DASHBOARD: "dashboard",
    CATEGORIES: "categories",
    PRODUCTS: "products",

    INVENTORY: "inventory",
    MEDIA: "media",
} as const;