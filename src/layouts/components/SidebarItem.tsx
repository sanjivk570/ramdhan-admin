// import { NavLink } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import type { SidebarItem as Item } from "@/config/sidebar";

// interface Props {
//     item: Item;
// }

// export default function SidebarItem({ item }: Props) {
//     const Icon = item.icon;

//     return (
//         <NavLink
//             to={item.url}
//             className={({ isActive }) =>
//                 cn(
//                     "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                     isActive
//                         // ? "bg-primary text-primary-foreground"
//                         // : "hover:bg-muted"
//                         ? "bg-blue-600 text-white"
//                         : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 )
//             }
//         >
//             <Icon className="h-5 w-5" />
//             <span>{item.title}</span>
//         </NavLink>
//     );
// }

// import { NavLink } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { ROUTES } from "@/app/router/route-paths";
// import type { SidebarItem as Item } from "@/config/sidebar";

// interface Props {
//     item: Item;
// }

// export default function SidebarItem({ item }: Props) {
//     const Icon = item.icon;

//     const isDashboard = item.url === ROUTES.DASHBOARD;

//     return (
//         <NavLink
//             to={item.url}
//             end={isDashboard}
//             className={({ isActive }) =>
//                 cn(
//                     "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                     isActive
//                         ? "bg-blue-600 text-white"
//                         : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 )
//             }
//         >
//             <Icon className="h-5 w-5" />
//             <span>{item.title}</span>
//         </NavLink>
//     );
// }


import { ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/app/router/route-paths";

import type {
    SidebarItem as Item,
    SidebarGroup,
    SidebarMenuItem,
} from "@/config/sidebar";

interface Props {
    item: SidebarMenuItem;
}

function isSidebarGroup(item: SidebarMenuItem): item is SidebarGroup {
    return "children" in item;
}

export default function SidebarItem({ item }: Props) {
    if (isSidebarGroup(item)) {
        return <SidebarGroupItem group={item} />;
    }

    return <SidebarLinkItem item={item} />;
}

/**
 * Normal sidebar link
 */
function SidebarLinkItem({ item }: { item: Item }) {
    const Icon = item.icon;

    const isDashboard = item.url === ROUTES.DASHBOARD;

    return (
        <NavLink
            to={item.url}
            end={isDashboard}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2",
                    "text-sm font-medium transition-colors",
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )
            }
        >
            <Icon className="h-5 w-5 shrink-0" />

            <span>{item.title}</span>
        </NavLink>
    );
}

/**
 * Sidebar submenu/group
 */
function SidebarGroupItem({ group }: { group: SidebarGroup }) {
    const location = useLocation();

    const GroupIcon = group.icon;

    /**
     * Check if any child route is currently active.
     */
    const isGroupActive = group.children.some((child) =>
        location.pathname === child.url ||
        location.pathname.startsWith(`${child.url}/`)
    );

    return (
        <Collapsible defaultOpen={isGroupActive}>
            <CollapsibleTrigger
                className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2",
                    "text-sm font-medium transition-colors",
                    isGroupActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
            >
                <GroupIcon className="h-5 w-5 shrink-0" />

                <span className="flex-1 text-left">
                    {group.title}
                </span>

                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform",
                        isGroupActive && "rotate-180"
                    )}
                />
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {group.children.map((child) => (
                        <NavLink
                            key={child.url}
                            to={child.url}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2",
                                    "text-sm transition-colors",
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )
                            }
                        >
                            <child.icon className="h-4 w-4 shrink-0" />

                            <span>{child.title}</span>
                        </NavLink>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}