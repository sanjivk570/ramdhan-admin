import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Check,
    Search,
    Shield,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Checkbox,
} from "@/components/ui/checkbox";

import {
    usePermissions,
} from "@/features/admin/permissions/hooks/usePermissions";

import {
    useRolePermissions,
} from "../hooks/useRolePermissions";

import {
    useUpdateRolePermissions,
} from "../hooks/useUpdateRolePermissions";

interface RolePermissionsProps {
    roleId: number;
    disabled?: boolean;
}

interface PermissionResponse {
    success?: boolean;
    message?: string;
    data?: string[];
    errors?: unknown;
    meta?: unknown;
}

export default function RolePermissions({
    roleId,
    disabled = false,
}: RolePermissionsProps) {

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        selectedPermissions,
        setSelectedPermissions,
    ] = useState<string[]>([]);

    const {
        data: permissions = [],
        isLoading: permissionsLoading,
    } = usePermissions();

    const {
        data: assignedPermissionsResponse,
        isLoading: assignedLoading,
    } = useRolePermissions(roleId);

    const updatePermissions =
        useUpdateRolePermissions(roleId);

    /*
     * Normalize assigned permissions.
     *
     * API response:
     *
     * {
     *     success: true,
     *     data: [
     *         "user.update",
     *         "user.create"
     *     ]
     * }
     *
     * We only need the data array.
     */
    const assignedPermissions = useMemo(() => {

        if (
            Array.isArray(
                assignedPermissionsResponse
            )
        ) {
            return assignedPermissionsResponse;
        }

        if (
            assignedPermissionsResponse &&
            typeof assignedPermissionsResponse === "object" &&
            "data" in assignedPermissionsResponse
        ) {

            const response =
                assignedPermissionsResponse as PermissionResponse;

            return Array.isArray(response.data)
                ? response.data
                : [];
        }

        return [];

    }, [
        assignedPermissionsResponse,
    ]);

    /*
     * Initialize selected permissions
     * from assigned permissions API.
     */
    useEffect(() => {

        setSelectedPermissions(
            assignedPermissions
        );

    }, [
        assignedPermissions,
    ]);

    /*
     * Filter permissions by search.
     */
    const filteredPermissions =
        useMemo(() => {

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            if (!keyword) {
                return permissions;
            }

            return permissions.filter(
                (permission) =>
                    permission.name
                        .toLowerCase()
                        .includes(keyword) ||

                    permission.display_name
                        .toLowerCase()
                        .includes(keyword) ||

                    permission.module
                        .toLowerCase()
                        .includes(keyword)
            );

        }, [
            permissions,
            search,
        ]);

    /*
     * Group permissions by module.
     */
    const groupedPermissions =
        useMemo(() => {

            return filteredPermissions.reduce(
                (
                    groups,
                    permission
                ) => {

                    const module =
                        permission.module ||
                        "other";

                    if (!groups[module]) {
                        groups[module] = [];
                    }

                    groups[module].push(
                        permission
                    );

                    return groups;

                },
                {} as Record<
                    string,
                    typeof permissions
                >
            );

        }, [
            filteredPermissions,
        ]);

    /*
     * Toggle individual permission.
     */
    const togglePermission = (
        permissionName: string
    ) => {

        setSelectedPermissions(
            (current) => {

                if (
                    current.includes(
                        permissionName
                    )
                ) {

                    return current.filter(
                        (permission) =>
                            permission !==
                            permissionName
                    );
                }

                return [
                    ...current,
                    permissionName,
                ];
            }
        );
    };

    /*
     * Select / deselect module.
     */
    const toggleModule = (
        modulePermissions: string[]
    ) => {

        setSelectedPermissions(
            (current) => {

                const allSelected =
                    modulePermissions.every(
                        (permission) =>
                            current.includes(
                                permission
                            )
                    );

                if (allSelected) {

                    return current.filter(
                        (permission) =>
                            !modulePermissions.includes(
                                permission
                            )
                    );
                }

                return Array.from(
                    new Set([
                        ...current,
                        ...modulePermissions,
                    ])
                );
            }
        );
    };

    /*
     * Select / deselect all.
     */
    const toggleAll = () => {

        const allPermissionNames =
            permissions.map(
                (permission) =>
                    permission.name
            );

        const allSelected =
            allPermissionNames.length > 0 &&
            allPermissionNames.every(
                (permission) =>
                    selectedPermissions.includes(
                        permission
                    )
            );

        if (allSelected) {

            setSelectedPermissions([]);

        } else {

            setSelectedPermissions(
                allPermissionNames
            );
        }
    };

    /*
     * Save permissions.
     *
     * API expects:
     *
     * {
     *     "permissions": [
     *         "user.view",
     *         "user.create"
     *     ]
     * }
     */
    const handleSave = async () => {

        await updatePermissions.mutateAsync(
            selectedPermissions
        );
    };

    const loading =
        permissionsLoading ||
        assignedLoading;

    const allPermissionNames =
        permissions.map(
            (permission) =>
                permission.name
        );

    const allSelected =
        allPermissionNames.length > 0 &&
        allPermissionNames.every(
            (permission) =>
                selectedPermissions.includes(
                    permission
                )
        );

    return (

        <div className="
            overflow-hidden
            rounded-xl
            border
            bg-card
            shadow-sm
        ">

            {/* Header */}

            <div className="
                border-b
                bg-muted/20
                px-6
                py-4
            ">

                <div className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-primary/10
                        ">

                            <Shield className="
                                h-4
                                w-4
                                text-primary
                            " />

                        </div>

                        <div>

                            <h2 className="font-semibold">
                                Permissions
                            </h2>

                            <p className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            ">
                                Manage permissions assigned to this role.
                            </p>

                        </div>

                    </div>

                    <Badge variant="outline">

                        {selectedPermissions.length}
                        {" "}
                        Selected

                    </Badge>

                </div>

            </div>

            {/* Toolbar */}

            <div className="
                flex
                flex-col
                gap-3
                border-b
                p-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div className="
                    relative
                    w-full
                    sm:max-w-sm
                ">

                    <Search className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-muted-foreground
                    " />

                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search permissions..."
                        className="pl-9"
                    />

                </div>

                <Button
                    type="button"
                    variant="outline"
                    disabled={
                        disabled ||
                        loading ||
                        permissions.length === 0
                    }
                    onClick={toggleAll}
                >

                    {allSelected
                        ? "Deselect All"
                        : "Select All"}

                </Button>

            </div>

            {/* Content */}

            <div className="p-6">

                {loading ? (

                    <div className="
                        py-12
                        text-center
                        text-sm
                        text-muted-foreground
                    ">
                        Loading permissions...
                    </div>

                ) : Object.keys(
                    groupedPermissions
                ).length === 0 ? (

                    <div className="
                        rounded-lg
                        border
                        border-dashed
                        p-10
                        text-center
                    ">

                        <p className="text-sm font-medium">
                            No permissions found
                        </p>

                        <p className="
                            mt-1
                            text-xs
                            text-muted-foreground
                        ">
                            Try changing your search.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-8">

                        {Object.entries(
                            groupedPermissions
                        ).map(
                            ([
                                module,
                                modulePermissions,
                            ]) => {

                                const names =
                                    modulePermissions.map(
                                        (permission) =>
                                            permission.name
                                    );

                                const moduleSelected =
                                    names.length > 0 &&
                                    names.every(
                                        (name) =>
                                            selectedPermissions.includes(
                                                name
                                            )
                                    );

                                return (

                                    <div
                                        key={module}
                                        className="space-y-4"
                                    >

                                        {/* Module Header */}

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <div>

                                                <h3 className="
                                                    text-sm
                                                    font-semibold
                                                    capitalize
                                                ">
                                                    {module}
                                                </h3>

                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-muted-foreground
                                                ">
                                                    {
                                                        modulePermissions.length
                                                    }
                                                    {" "}
                                                    permissions
                                                </p>

                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                disabled={
                                                    disabled ||
                                                    loading
                                                }
                                                onClick={() =>
                                                    toggleModule(
                                                        names
                                                    )
                                                }
                                            >

                                                {moduleSelected
                                                    ? "Deselect All"
                                                    : "Select All"}

                                            </Button>

                                        </div>

                                        {/* Permissions */}

                                        <div className="
                                            grid
                                            gap-3
                                            sm:grid-cols-2
                                            lg:grid-cols-3
                                        ">

                                            {modulePermissions.map(
                                                (
                                                    permission
                                                ) => {

                                                    const checked =
                                                        selectedPermissions.includes(
                                                            permission.name
                                                        );

                                                    return (

                                                        <label
                                                            key={
                                                                permission.id
                                                            }
                                                            className={`
                                                                flex
                                                                cursor-pointer
                                                                items-start
                                                                gap-3
                                                                rounded-lg
                                                                border
                                                                p-4
                                                                transition-colors
                                                                hover:bg-muted/40
                                                                ${
                                                                    checked
                                                                        ? "border-primary/40 bg-primary/5"
                                                                        : ""
                                                                }
                                                            `}
                                                        >

                                                            <Checkbox
                                                                checked={
                                                                    checked
                                                                }
                                                                disabled={
                                                                    disabled ||
                                                                    loading
                                                                }
                                                                onCheckedChange={() =>
                                                                    togglePermission(
                                                                        permission.name
                                                                    )
                                                                }
                                                            />

                                                            <div className="min-w-0">

                                                                <p className="
                                                                    text-sm
                                                                    font-medium
                                                                ">
                                                                    {
                                                                        permission.display_name
                                                                    }
                                                                </p>

                                                                <p className="
                                                                    mt-1
                                                                    truncate
                                                                    text-xs
                                                                    text-muted-foreground
                                                                ">
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </p>

                                                                {permission.description && (

                                                                    <p className="
                                                                        mt-2
                                                                        text-xs
                                                                        text-muted-foreground
                                                                    ">
                                                                        {
                                                                            permission.description
                                                                        }
                                                                    </p>

                                                                )}

                                                            </div>

                                                        </label>

                                                    );
                                                }
                                            )}

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                )}

            </div>

            {/* Footer */}

            <div className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                bg-muted/10
                px-6
                py-4
            ">

                <Button
                    type="button"
                    disabled={
                        updatePermissions.isPending ||
                        loading ||
                        disabled
                    }
                    onClick={
                        handleSave
                    }
                >

                    {updatePermissions.isPending
                        ? "Saving..."
                        : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Save Permissions
                            </>
                        )}

                </Button>

            </div>

        </div>
    );
}