import { Menu, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserMenu from "./UserMenu";

import MobileSidebar from "./MobileSidebar";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 bg-slate-300">

            {/* Left */}

            <div className="flex items-center gap-4">

                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button> */}

                <MobileSidebar />

                {/* <h2 className="text-xl font-semibold">
                    Dashboard
                </h2> */}

                <Breadcrumbs />

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Bell className="h-5 w-5" />
                </Button>

                <UserMenu />

            </div>

        </header>
    );
}