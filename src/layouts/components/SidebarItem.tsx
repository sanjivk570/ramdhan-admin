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

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/app/router/route-paths";
import type { SidebarItem as Item } from "@/config/sidebar";

interface Props {
    item: Item;
}

export default function SidebarItem({ item }: Props) {
    const Icon = item.icon;

    const isDashboard = item.url === ROUTES.DASHBOARD;

    return (
        <NavLink
            to={item.url}
            end={isDashboard}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )
            }
        >
            <Icon className="h-5 w-5" />
            <span>{item.title}</span>
        </NavLink>
    );
}