import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SidebarItem as Item } from "@/config/sidebar";

interface Props {
    item: Item;
}

export default function SidebarItem({ item }: Props) {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.url}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                )
            }
        >
            <Icon className="h-5 w-5" />
            <span>{item.title}</span>
        </NavLink>
    );
}