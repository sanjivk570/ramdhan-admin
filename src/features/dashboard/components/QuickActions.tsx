import {
    UserPlus,
    Users,
    ShieldPlus,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ROUTES } from "../../../app/router/route-paths";

interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
}

const actions: QuickAction[] = [
    {
        title: "Create User",
        description: "Create a new user account",
        href: `${ROUTES.USERS}/create`,
        icon: UserPlus,
    },
    {
        title: "Manage Users",
        description: "View and manage all users",
        href: ROUTES.USERS,
        icon: Users,
    },
    {
        title: "Create Role",
        description: "Create a new system role",
        href: `${ROUTES.ROLES}/create`,
        icon: ShieldPlus,
    },
    {
        title: "Manage Roles",
        description: "Manage roles and permissions",
        href: ROUTES.ROLES,
        icon: ShieldCheck,
    },
];

export default function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold">
                    Quick Actions
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Quickly access common administration tasks.
                </p>
            </CardHeader>

            <CardContent>
                <div className="
                    grid
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">
                    {actions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
                                key={action.title}
                                to={action.href}
                                className="
                                    group
                                    rounded-lg
                                    border
                                    bg-card
                                    p-4
                                    transition-colors
                                    hover:bg-muted/50
                                "
                            >
                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-3
                                ">
                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                    ">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <ArrowRight
                                        className="
                                            h-4
                                            w-4
                                            text-muted-foreground
                                            transition-transform
                                            group-hover:translate-x-1
                                            group-hover:text-foreground
                                        "
                                    />
                                </div>

                                <div className="mt-4">
                                    <h3 className="
                                        text-sm
                                        font-semibold
                                    ">
                                        {action.title}
                                    </h3>

                                    <p className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-muted-foreground
                                    ">
                                        {action.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}