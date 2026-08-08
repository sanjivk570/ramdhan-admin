import {
    Users,
    UserCheck,
    UserX,
    ShieldCheck,
    KeyRound,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    DashboardOverview,
} from "../types/dashboard";

interface DashboardStatsProps {
    overview: DashboardOverview;
    newUsers: number;
}

export default function DashboardStats({
    overview,
    newUsers,
}: DashboardStatsProps) {

    const stats = [
        {
            title: "Total Users",
            value: overview.total_users,
            icon: Users,
            description: "All registered users",
        },
        {
            title: "Active Users",
            value: overview.active_users,
            icon: UserCheck,
            description: "Currently active",
        },
        {
            title: "Inactive Users",
            value: overview.inactive_users,
            icon: UserX,
            description: "Currently inactive",
        },
        {
            title: "Total Roles",
            value: overview.total_roles,
            icon: ShieldCheck,
            description: "Configured roles",
        },
        {
            title: "Permissions",
            value: overview.total_permissions,
            icon: KeyRound,
            description: `${newUsers} new users`,
        },
    ];

    return (
        <div className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
        ">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <Card key={stat.title}>
                        <CardContent className="p-6">

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-muted-foreground
                                    ">
                                        {stat.title}
                                    </p>

                                    <p className="
                                        mt-2
                                        text-3xl
                                        font-bold
                                        tracking-tight
                                    ">
                                        {stat.value.toLocaleString()}
                                    </p>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-muted-foreground
                                    ">
                                        {stat.description}
                                    </p>

                                </div>

                                <div className="
                                    rounded-xl
                                    bg-muted
                                    p-3
                                ">

                                    <Icon className="
                                        h-5
                                        w-5
                                        text-muted-foreground
                                    " />

                                </div>

                            </div>

                        </CardContent>
                    </Card>
                );
            })}

        </div>
    );
}