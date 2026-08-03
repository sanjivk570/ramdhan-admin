// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//     return (
//         <aside className="w-64 border-r bg-white">

//             <div className="border-b p-5 text-xl font-bold">
//                 RamDhan
//             </div>

//             <nav className="p-3 space-y-2">

//                 <NavLink to="/">
//                     Dashboard
//                 </NavLink>

//                 <br />

//                 <NavLink to="/users">
//                     Users
//                 </NavLink>

//                 <br />

//                 <NavLink to="/roles">
//                     Roles
//                 </NavLink>

//                 <br />

//                 <NavLink to="/permissions">
//                     Permissions
//                 </NavLink>

//             </nav>

//         </aside>
//     );
// }


import { ScrollArea } from "@/components/ui/scroll-area";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import { sidebarItems } from "@/config/sidebar";

export default function Sidebar() {
    return (
        <aside className="hidden w-64 border-r bg-background lg:block">

            <Logo />

            <ScrollArea className="h-[calc(100vh-64px)]">

                <nav className="space-y-1 p-4">

                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.url}
                            item={item}
                        />
                    ))}

                </nav>

            </ScrollArea>

        </aside>
    );
}