import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import type {
    UserGrowthItem,
} from "../types/dashboard";

interface UserGrowthChartProps {
    data: UserGrowthItem[];
}

function formatDate(date: string) {
    return new Date(
        `${date}T00:00:00`
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
        }
    );
}

export default function UserGrowthChart({
    data,
}: UserGrowthChartProps) {

    const chartData = data.map((item) => ({
        ...item,
        label: formatDate(item.date),
    }));

    return (
        <Card className="h-full">

            <CardHeader>

                <CardTitle>
                    User Growth
                </CardTitle>

                <CardDescription>
                    New users registered during the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="h-[320px] w-full">

                    {chartData.length === 0 ? (

                        <div className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        ">
                            No user growth data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    name="Users"
                                    fill="currentColor"
                                    fillOpacity={0.15}
                                    stroke="currentColor"
                                    strokeWidth={2}
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </CardContent>

        </Card>
    );
}