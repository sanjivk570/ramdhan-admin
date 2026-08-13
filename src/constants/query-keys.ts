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
    UNITS: "units",
    TAX_CLASSES: "tax-classes",
    TAX_RATES: "tax-rates",
} as const;