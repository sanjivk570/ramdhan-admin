import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type {
    DashboardUser,
} from "../types/dashboard";

import { formatDateTime } from "@/lib/date";

interface RecentUsersProps {
    users: DashboardUser[];
}

export default function RecentUsers({
    users,
}: RecentUsersProps) {

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Recent Users
                </CardTitle>

                <CardDescription>
                    Latest users registered in the system.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {users.length === 0 ? (

                    <div className="
                        py-8
                        text-center
                        text-sm
                        text-muted-foreground
                    ">
                        No users found.
                    </div>

                ) : (

                    <div className="space-y-4">

                        {users.map((user) => (

                            <div
                                key={user.uuid}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    rounded-lg
                                    border
                                    p-4
                                "
                            >

                                <div className="
                                    min-w-0
                                ">

                                    <p className="
                                        truncate
                                        font-medium
                                    ">
                                        {user.full_name}
                                    </p>

                                    <p className="
                                        truncate
                                        text-sm
                                        text-muted-foreground
                                    ">
                                        {user.email}
                                    </p>

                                </div>

                                <div className="
                                    flex
                                    shrink-0
                                    flex-col
                                    items-end
                                    gap-1
                                ">

                                    <Badge
                                        variant={
                                            user.status
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {user.status
                                            ? "Active"
                                            : "Inactive"}
                                    </Badge>

                                    <span className="
                                        text-xs
                                        text-muted-foreground
                                    ">
                                        {formatDateTime(
                                            user.created_at
                                        )}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </CardContent>

        </Card>
    );
}