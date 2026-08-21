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

    products: {
        list: "/products",
        details: (uuid: string) => `/products/${uuid}`,
        create: "/products",
        update: (uuid: string) =>  `/products/${uuid}`,
        delete: (uuid: string) => `/products/${uuid}`,
        restore: (uuid: string) => `/products/${uuid}/restore`,
        status: (uuid: string) => `/products/${uuid}/status`,
        forceDelete: (uuid: string) => `/products/${uuid}/force`,

        variants: {
            list: (uuid: string) => `/products/${uuid}/variants`,
            details: (uuid: string, variantUuid: string) => `/products/${uuid}/variants/${variantUuid}`,
            create: (uuid: string) => `/products/${uuid}/variants`,
            update: (uuid: string, variantUuid: string) => `/products/${uuid}/variants/${variantUuid}`,
            delete: (uuid: string, variantUuid: string) => `/products/${uuid}/variants/${variantUuid}`,
            //restore: (uuid: string, vuuid: string) => `/products/${uuid}/variants/${vuuid}/restore`,
            //status: (uuid: string, vuuid: string) => `/products/${uuid}/variants/${vuuid}/status`,
            setDefault: (uuid: string, variantUuid: string) => `/products/${uuid}/variants/${variantUuid}/default`,
        },

    },

    // attributes: {
    //     list: "/attributes",
    //     details: (uuid: string) => `/attributes/${uuid}`,
    //     create: "/attributes",
    //     update: (uuid: string) =>  `/attributes/${uuid}`,
    //     delete: (uuid: string) => `/attributes/${uuid}`,
    //     restore: (uuid: string) => `/attributes/${uuid}/restore`,
    //     //status: (uuid: string) => `/categories/${uuid}/status`,
    // },

    inventory: {
        list: "/inventory",
        details: (uuid: string) => `/inventory/${uuid}`,
        stockIn: (uuid: string) => `/inventory/${uuid}/stock-in`,
        stockOut: (uuid: string) => `/inventory/${uuid}/stock-out`,
        adjustment: (uuid: string) => `/inventory/${uuid}/adjust`,
        transactions: (uuid: string) => `/inventory/${uuid}/transactions`,
    },

    // units: {
    //     list: "/units",
    // },
    // taxClasses: {
    //     list: "/tax-classes",
    // },

    media: {
        list: "/media",
        create: "/media",
        details: (uuid: string) => `/media/${uuid}`,
        update: (uuid: string) => `/media/${uuid}`,
        delete: (uuid: string) => `/media/${uuid}`,
        restore: (uuid: string) => `/media/${uuid}/restore`,
        forceDelete: (uuid: string) => `/media/${uuid}/force`,
        primary: (uuid: string) => `/media/${uuid}/primary`,
    },
    units: {
        list: "/units",
        details: (uuid: string) => `/units/${uuid}`,
        create: "/units",
        update: (uuid: string) =>`/units/${uuid}`,
        delete: (uuid: string) => `/units/${uuid}`,
        restore: (uuid: string) => `/units/${uuid}/restore`,
        status: (uuid: string) => `/units/${uuid}/status`,
    },

    taxClasses: {
        list: "/tax-classes",
        details: (uuid: string) => `/tax-classes/${uuid}`,
        create: "/tax-classes",
        update: (uuid: string) => `/tax-classes/${uuid}`,
        delete: (uuid: string) => `/tax-classes/${uuid}`,
        restore: (uuid: string) => `/tax-classes/${uuid}/restore`,
        status: (uuid: string) => `/tax-classes/${uuid}/status`,
    },

    taxRates: {
        list: "/tax-rates",
        details: (uuid: string) => `/tax-rates/${uuid}`,
        create: "/tax-rates",
        update: (uuid: string) => `/tax-rates/${uuid}`,
        delete: (uuid: string) => `/tax-rates/${uuid}`,
        restore: (uuid: string) => `/tax-rates/${uuid}/restore`,
        status: (uuid: string) => `/tax-rates/${uuid}/status`,
    },

    attributes:{
        list:"/attributes",
        details:(uuid:string)=>`/attributes/${uuid}`,
        create:"/attributes",
        update:(uuid:string)=>`/attributes/${uuid}`,
        delete:(uuid:string)=>`/attributes/${uuid}`,
        restore:(uuid:string)=>`/attributes/${uuid}/restore`,
        values:{
            create:(attributeUuid:string)=>`/attributes/${attributeUuid}/values`,
            details:(attributeUuid:string,valueUuid:string)=>`/attributes/${attributeUuid}/values/${valueUuid}`,
            delete:(attributeUuid:string,valueUuid:string)=>`/attributes/${attributeUuid}/values/${valueUuid}`,
            restore:(attributeUuid:string,valueUuid:string)=>`/attributes/${attributeUuid}/values/${valueUuid}/restore`
        }
    },

    // E-commerce / Admin
    orders: {
        list: "/admin/orders",
        details: (uuid: string) => `/admin/orders/${uuid}`,
        updateStatus: (uuid: string) => `/admin/orders/${uuid}/status`,
    },

    coupons: {
        list: "/admin/coupons",
        create: "/admin/coupons",
        details: (uuid: string) => `/admin/coupons/${uuid}`,
        update: (uuid: string) => `/admin/coupons/${uuid}`,
        delete: (uuid: string) => `/admin/coupons/${uuid}`,
    },

    returns: {
        list: "/admin/returns",
        details: (uuid: string) => `/admin/returns/${uuid}`,
        process: (uuid: string) => `/admin/returns/${uuid}/process`,
    },

    shipments: {
        list: "/admin/shipments",
        create: "/admin/shipments",
        ship: (uuid: string) => `/admin/shipments/${uuid}/ship`,
    },

    invoices: {
        list: "/admin/invoices",
        generate: (orderUuid: string) => `/admin/invoices/orders/${orderUuid}/generate`,
    },

    payments: {
        transactions: "/admin/payments/transactions",
        refund: (orderUuid: string) => `/admin/payments/orders/${orderUuid}/refund`,
    },

    carts: {
        list: "/admin/carts",
        details: (uuid: string) => `/admin/carts/${uuid}`,
    },

    wishlists: {
        list: "/admin/wishlists",
    },

} as const;