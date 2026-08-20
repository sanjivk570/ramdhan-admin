const ADMIN_PREFIX = '/admin';
export const ROUTES = {
    LOGIN: `${ADMIN_PREFIX}/login`,
    FORGOT_PASSWORD: `${ADMIN_PREFIX}/forgot-password`,
    RESET_PASSWORD: "/reset-password",
    DASHBOARD: `${ADMIN_PREFIX}`,
    PROFILE: `${ADMIN_PREFIX}/profile`,
    USERS: `${ADMIN_PREFIX}/users`,
    ROLES: `${ADMIN_PREFIX}/roles`,
    PERMISSIONS: `${ADMIN_PREFIX}/permissions`,
    CATEGORIES: `${ADMIN_PREFIX}/categories`,
    PRODUCTS: `${ADMIN_PREFIX}/products`,
    PRODUCT_VARIANTS: `${ADMIN_PREFIX}/product-variants`,
    UNITS: `${ADMIN_PREFIX}/units`,
    INVENTORY: `${ADMIN_PREFIX}/inventory`,
    TAX_CLASSES: `${ADMIN_PREFIX}/tax-classes`,
    TAX_RATES: `${ADMIN_PREFIX}/tax-rates`,
    ATTRIBUTES: `${ADMIN_PREFIX}/attributes`
} as const;