import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    KeyRound,
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
        title: "Permissions",
        url: "/permissions",
        icon: KeyRound,
    },
];