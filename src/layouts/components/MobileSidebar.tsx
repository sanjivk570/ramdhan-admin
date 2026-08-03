import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "@/config/sidebar";

export default function MobileSidebar() {
    return (
        <Sheet>
            {/* <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger> */}

            <SheetTrigger
                className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-0">
                <Logo />

                <nav className="space-y-1 p-4">
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.url}
                            item={item}
                        />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}