import { ScrollArea } from "@/components/ui/scroll-area";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import { sidebarItems } from "@/config/sidebar";

export default function Sidebar() {
    return (
        <aside className="hidden w-64 border-r bg-background lg:block bg-slate-950">

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