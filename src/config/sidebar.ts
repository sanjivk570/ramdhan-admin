import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Package,
    FolderTree,
    Boxes,
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
];