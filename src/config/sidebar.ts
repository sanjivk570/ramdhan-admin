import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Package,
    FolderTree,
    Boxes,
    ShoppingCart,
    Tag,
    Undo2,
    Truck,
    FileText,
    CreditCard,
    Heart,
} from "lucide-react";

import { ROUTES } from "@/app/router/route-paths";

export interface SidebarItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

export const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        url: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        url: ROUTES.USERS,
        icon: Users,
    },
    {
        title: "Roles",
        url: ROUTES.ROLES,
        icon: ShieldCheck,
    },
    {
        title: "Categories",
        url: ROUTES.CATEGORIES,
        icon: FolderTree,
    },
    {
        title: "Products",
        url: ROUTES.PRODUCTS,
        icon: Boxes,
    },
    // {
    //     title: "Product Variants",
    //     url: ROUTES.PRODUCT_VARIANTS,
    //     icon: Boxes,
    // },
    {
        title: "Attributes",
        url: ROUTES.ATTRIBUTES,
        icon: Boxes,
    },
    {
        title: "Units",
        url: ROUTES.UNITS,
        icon: Boxes,
    },
    {
        title: "Inventory",
        url: ROUTES.INVENTORY,
        icon: Package,
    },
    {
        title: "Tax Classes",
        url: ROUTES.TAX_CLASSES,
        icon: Boxes,
    },
    {
        title: "Tax Rates",
        url: ROUTES.TAX_RATES,
        icon: Package,
    },
    {
        title: "Orders",
        url: ROUTES.ORDERS,
        icon: ShoppingCart,
    },
    {
        title: "Coupons",
        url: ROUTES.COUPONS,
        icon: Tag,
    },
    {
        title: "Returns",
        url: ROUTES.RETURNS,
        icon: Undo2,
    },
    {
        title: "Shipments",
        url: ROUTES.SHIPMENTS,
        icon: Truck,
    },
    {
        title: "Invoices",
        url: ROUTES.INVOICES,
        icon: FileText,
    },
    {
        title: "Payments",
        url: ROUTES.PAYMENTS,
        icon: CreditCard,
    },
    {
        title: "Carts",
        url: ROUTES.CARTS,
        icon: ShoppingCart,
    },
    {
        title: "Wishlists",
        url: ROUTES.WISHLISTS,
        icon: Heart,
    },
];