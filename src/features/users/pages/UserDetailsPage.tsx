import {
    ArrowLeft,
    Pencil,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useUser } from "../hooks/useUser";

import { ROUTES } from "../../../app/router/route-paths";

import { formatDateTime } from "@/lib/date";

export default function UserDetailsPage() {

    const navigate = useNavigate();

    const { uuid } = useParams<{
        uuid: string;
    }>();

    const {
        data,
        isLoading,
        isError,
    } = useUser(
        uuid ?? ""
    );

    const user = data;

    /*
     * Loading
     */
    if (isLoading) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-semibold">
                        User Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading user information...
                    </p>
                </div>

                <div className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    shadow-sm
                ">
                    Loading...
                </div>

            </div>
        );
    }

    /*
     * Error / User not found
     */
    if (
        isError ||
        !user
    ) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-semibold">
                        User Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Unable to load user information.
                    </p>
                </div>

                <div className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    shadow-sm
                ">

                    <p className="text-sm text-destructive">
                        User not found or something went wrong.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                            navigate(
                                ROUTES.USERS
                            )
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
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
                items-center
                justify-between
                gap-4
            ">

                <div>

                    <h1 className="text-2xl font-semibold tracking-tight">
                        User Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View user account information.
                    </p>

                </div>

                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(
                                ROUTES.USERS
                            )
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `${ROUTES.USERS}/${user.uuid}/edit`
                            )
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                </div>

            </div>

            {/* User Information */}

            <div className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            ">

                <div className="
                    border-b
                    bg-muted/20
                    px-6
                    py-4
                ">

                    <h2 className="text-base font-semibold">
                        Basic Information
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        User account information.
                    </p>

                </div>

                <div className="
                    grid
                    gap-6
                    p-6
                    md:grid-cols-2
                ">

                    {/* First Name */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            First Name
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {user.first_name || "-"}
                        </p>

                    </div>

                    {/* Last Name */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Last Name
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {user.last_name || "-"}
                        </p>

                    </div>

                    {/* Email */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Email
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {user.email || "-"}
                        </p>

                    </div>

                    {/* Mobile */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Mobile
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {user.mobile || "-"}
                        </p>

                    </div>

                    {/* Status */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>

                        <div className="mt-1">

                            <Badge
                                variant={
                                    user.is_active
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </Badge>

                        </div>

                    </div>

                    {/* Role */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Role
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {user.role?.display_name ||
                                user.role?.name ||
                                "-"}
                        </p>

                    </div>

                    {/* Created */}

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Created At
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatDateTime(
                                user.created_at
                            )}
                        </p>

                    </div>

                </div>

            </div>

            {/* UUID */}

            <div className="
                rounded-xl
                border
                bg-card
                p-6
                shadow-sm
            ">

                <p className="text-sm text-muted-foreground">
                    User UUID
                </p>

                <p className="
                    mt-1
                    break-all
                    font-mono
                    text-sm
                ">
                    {user.uuid}
                </p>

            </div>

        </div>
    );
}
