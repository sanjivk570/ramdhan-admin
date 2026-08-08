import {
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import DashboardStats from "../components/DashboardStats";
import UserGrowthChart from "../components/UserGrowthChart";
import RecentUsers from "../components/RecentUsers";

import {
    useDashboard,
} from "../hooks/useDashboard";

import {
    useState,
} from "react";

import QuickActions
    from "../components/QuickActions";

export default function DashboardPage() {

    const [days, setDays] = useState(7);

    const {
        data,
        isLoading,
        isFetching,
        refetch,
        isError,
    } = useDashboard(days);

    if (isLoading) {
        return (
            <div className="space-y-6">

                <div>
                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Loading dashboard...
                    </p>
                </div>

                <div className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-5
                ">

                    {Array.from({
                        length: 5,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                h-32
                                animate-pulse
                                rounded-xl
                                border
                                bg-muted/30
                            "
                        />

                    ))}

                </div>

            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="space-y-6">

                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Unable to load dashboard data.
                    </p>

                </div>

                <div className="
                    rounded-xl
                    border
                    border-destructive/30
                    bg-destructive/5
                    p-6
                ">

                    <p className="
                        text-sm
                        text-destructive
                    ">
                        Something went wrong while loading
                        the dashboard.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => refetch()}
                    >
                        Try Again
                    </Button>

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Overview of your application and user activity.
                    </p>

                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <Select
                        value={String(days)}
                        onValueChange={(value) =>
                            setDays(
                                Number(value)
                            )
                        }
                    >

                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="7">
                                Last 7 days
                            </SelectItem>

                            <SelectItem value="30">
                                Last 30 days
                            </SelectItem>

                            <SelectItem value="90">
                                Last 90 days
                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={isFetching}
                        onClick={() => refetch()}
                    >
                        <RefreshCw
                            className={
                                isFetching
                                    ? "h-4 w-4 animate-spin"
                                    : "h-4 w-4"
                            }
                        />
                    </Button>

                </div>

            </div>

            {/* Statistics */}

            <DashboardStats
                overview={
                    data.data.overview
                }
                newUsers={
                    data.data
                        .user_statistics
                        .new_users
                }
            />

            {/* Charts */}

            <div className="
                grid
                gap-6
                lg:grid-cols-1
            ">

                <UserGrowthChart
                    data={
                        data.data
                            .user_growth
                    }
                />

            </div>

            {/* Recent Users */}

            <RecentUsers
                users={
                    data.data
                        .recent_users
                }
            />

            {/* Quick Actions */}

            <QuickActions />

        </div>
    );
}