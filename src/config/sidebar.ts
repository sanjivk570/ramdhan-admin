import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Package,
    FolderTree,
    Boxes,
} from "lucide-react";

export interface SidebarItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

export const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Roles",
        url: "/roles",
        icon: ShieldCheck,
    },
    {
        title: "Categories",
        url: "/categories",
        icon: FolderTree,
    },
    {
        title: "Products",
        url: "/products",
        icon: Boxes,
    },
    {
        title: "Attributes",
        url: "/attributes",
        icon: Boxes,
    },
    {
        title: "Units",
        url: "/units",
        icon: Boxes,
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: Package,
    },
    {
        title: "Tax Classes",
        url: "/tax-classes",
        icon: Boxes,
    },
    {
        title: "Tax Rates",
        url: "/tax-Rates",
        icon: Package,
    },
];