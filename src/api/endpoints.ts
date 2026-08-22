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
        details: (uuid: string) => `/admin/shipments/${uuid}`,
        update: (uuid: string) => `/admin/shipments/${uuid}`,
        ship: (uuid: string) => `/admin/shipments/${uuid}/ship`,
    },

    invoices: {
        list: "/admin/invoices",
        details: (uuid: string) => `/admin/invoices/${uuid}`,
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

    // Customers / Addresses / Suppliers
    customers: {
        list: "/customers",
        details: (uuid: string) => `/customers/${uuid}`,
        create: "/customers",
        update: (uuid: string) => `/customers/${uuid}`,
        delete: (uuid: string) => `/customers/${uuid}`,
        restore: (uuid: string) => `/customers/${uuid}/restore`,
        status: (uuid: string) => `/customers/${uuid}/status`,
    },

    // addresses: {
    //     list: "/customer/addresses",
    //     details: (uuid: string) => `/customer/addresses/${uuid}`,
    //     create: "/customer/addresses",
    //     update: (uuid: string) => `/customer/addresses/${uuid}`,
    //     delete: (uuid: string) => `/customer/addresses/${uuid}`,
    //     setDefault: (uuid: string) => `/customer/addresses/${uuid}/default`,
    // },

    suppliers: {
        list: "/suppliers",
        details: (uuid: string) => `/suppliers/${uuid}`,
        create: "/suppliers",
        update: (uuid: string) => `/suppliers/${uuid}`,
        delete: (uuid: string) => `/suppliers/${uuid}`,
        restore: (uuid: string) => `/suppliers/${uuid}/restore`,
        status: (uuid: string) => `/suppliers/${uuid}/status`,
        users: {
            list: (uuid: string) => `/suppliers/${uuid}/users`,
            details: (uuid: string, userUuid: string) =>
                `/suppliers/${uuid}/users/${userUuid}`,
            create: (uuid: string) => `/suppliers/${uuid}/users`,
            update: (uuid: string, userUuid: string) =>
                `/suppliers/${uuid}/users/${userUuid}`,
            delete: (uuid: string, userUuid: string) =>
                `/suppliers/${uuid}/users/${userUuid}`,
            status: (uuid: string, userUuid: string) =>
                `/suppliers/${uuid}/users/${userUuid}/status`,
            restore: (uuid: string, userUuid: string) =>
                `/suppliers/${uuid}/users/${userUuid}/restore`,
        },
    },

    // Purchase / Back office
    purchaseOrders: {
        list: "/purchase-orders",
        details: (uuid: string) => `/purchase-orders/${uuid}`,
        create: "/purchase-orders",
        update: (uuid: string) => `/purchase-orders/${uuid}`,
        submit: (uuid: string) => `/purchase-orders/${uuid}/submit`,
        approve: (uuid: string) => `/purchase-orders/${uuid}/approve`,
        cancel: (uuid: string) => `/purchase-orders/${uuid}/cancel`,
    },

    goodsReceipts: {
        list: "/goods-receipts",
        details: (uuid: string) => `/goods-receipts/${uuid}`,
        create: "/goods-receipts",
        post: (uuid: string) => `/goods-receipts/${uuid}/post`,
        void: (uuid: string) => `/goods-receipts/${uuid}/void`,
    },

    purchaseInvoices: {
        list: "/purchase-invoices",
        details: (uuid: string) => `/purchase-invoices/${uuid}`,
        create: "/purchase-invoices",
        post: (uuid: string) => `/purchase-invoices/${uuid}/post`,
    },

    purchasePayments: {
        list: "/purchase-payments",
        details: (uuid: string) => `/purchase-payments/${uuid}`,
        create: "/purchase-payments",
    },

         purchaseReturns: {
        list: "/purchase-returns",
        details: (uuid: string) => `/purchase-returns/${uuid}`,
        create: "/purchase-returns",
        post: (uuid: string) => `/purchase-returns/${uuid}/post`,
    },

    // Shipping Admin — zones, methods, rates
    shippingZones: {
        list: "/admin/shipping/zones",
        details: (uuid: string) => `/admin/shipping/zones/${uuid}`,
        create: "/admin/shipping/zones",
        update: (uuid: string) => `/admin/shipping/zones/${uuid}`,
        delete: (uuid: string) => `/admin/shipping/zones/${uuid}`,
        status: (uuid: string) => `/admin/shipping/zones/${uuid}/status`,
    },

    shippingMethods: {
        list: "/admin/shipping/methods",
        details: (uuid: string) => `/admin/shipping/methods/${uuid}`,
        create: "/admin/shipping/methods",
        update: (uuid: string) => `/admin/shipping/methods/${uuid}`,
        delete: (uuid: string) => `/admin/shipping/methods/${uuid}`,
        status: (uuid: string) => `/admin/shipping/methods/${uuid}/status`,
    },

    shippingRates: {
        list: "/admin/shipping/rates",
        create: "/admin/shipping/rates",
        update: (uuid: string) => `/admin/shipping/rates/${uuid}`,
        delete: (uuid: string) => `/admin/shipping/rates/${uuid}`,
    },

} as const;