import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Pencil, Shield, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useRole } from "../hooks/useRole";
import { useRolePermissions } from "../hooks/useRolePermissions";

import { ROUTES } from "@/app/router/route-paths";

interface RolePermissionsResponse {
  success?: boolean;
  message?: string;
  data?: string[];
  errors?: unknown;
  meta?: unknown;
}

export default function RoleDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const roleId = Number(id);

  const { data: role, isLoading: roleLoading } = useRole(roleId);

  const { data: permissionsResponse, isLoading: permissionsLoading } =
    useRolePermissions(roleId);

  /*
   * Normalize API response.
   */
  const permissions: string[] = Array.isArray(permissionsResponse)
    ? permissionsResponse
    : permissionsResponse &&
      typeof permissionsResponse === "object" &&
      "data" in permissionsResponse &&
      Array.isArray((permissionsResponse as RolePermissionsResponse).data)
    ? (permissionsResponse as RolePermissionsResponse).data ?? []
    : [];

  /*
   * Group permissions by module.
   *
   * Example:
   *
   * user.view
   * user.create
   * user.update
   *
   * becomes:
   *
   * Users
   *   View
   *   Create
   *   Update
   */
  const groupedPermissions = permissions.reduce((groups, permission) => {
    const parts = permission.split(".");

    const module = parts.length > 1 ? parts[0] : "general";

    const action = parts.length > 1 ? parts.slice(1).join(".") : permission;

    if (!groups[module]) {
      groups[module] = [];
    }

    groups[module].push(action);

    return groups;
  }, {} as Record<string, string[]>);

  /*
   * Format module name.
   *
   * product_variant -> Product Variant
   * user -> User
   */
  const formatLabel = (value: string) => {
    return value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /*
   * Format permission action.
   *
   * view -> View
   * create -> Create
   * update -> Update
   * delete -> Delete
   */
  const formatAction = (value: string) => {
    return value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (roleLoading) {
    return (
      <div
        className="
                flex
                min-h-[300px]
                items-center
                justify-center
                text-sm
                text-muted-foreground
            "
      >
        Loading role...
      </div>
    );
  }

  if (!role) {
    return (
      <div
        className="
                rounded-xl
                border
                bg-card
                p-8
                text-center
            "
      >
        <h2 className="text-lg font-semibold">Role not found</h2>

        <p
          className="
                    mt-1
                    text-sm
                    text-muted-foreground
                "
        >
          The requested role could not be found.
        </p>

        <Button className="mt-4" onClick={() => navigate(ROUTES.ROLES)}>
          Back to Roles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}

      <div
        className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            "
      >
        <div
          className="
                    flex
                    items-center
                    gap-3
                "
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(ROUTES.ROLES)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1
              className="
                            text-2xl
                            font-semibold
                            tracking-tight
                        "
            >
              {role.display_name}
            </h1>

            <p
              className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
            >
              View role information and assigned permissions.
            </p>
          </div>
        </div>

        <div
          className="
                    flex
                    items-center
                    gap-2
                "
        >
          <Button variant="outline" onClick={() => navigate(ROUTES.ROLES)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={() => navigate(`${ROUTES.ROLES}/${role.id}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Role Information */}

      <div
        className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            "
      >
        <div
          className="
                    border-b
                    bg-muted/20
                    px-5
                    py-3.5
                "
        >
          <h2 className="text-sm font-semibold">Role Information</h2>
        </div>

        <div
          className="
                    grid
                    gap-x-8
                    gap-y-5
                    p-5
                    md:grid-cols-2
                "
        >
          {/* Display Name */}

          <div>
            <p
              className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
            >
              Display Name
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {role.display_name}
            </p>
          </div>

          {/* Role Name */}

          <div>
            <p
              className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
            >
              Role Name
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {role.name}
            </p>
          </div>

          {/* Guard */}

          <div>
            <p
              className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
            >
              Guard
            </p>

            <Badge variant="outline" className="mt-1.5">
              {role.guard_name}
            </Badge>
          </div>

          {/* System Role */}

          <div>
            <p
              className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
            >
              Role Type
            </p>

            <Badge
              variant={role.is_system ? "default" : "secondary"}
              className="mt-1.5"
            >
              {role.is_system ? "System" : "Custom"}
            </Badge>
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <p
              className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        "
            >
              Description
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
            >
              {role.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      {/* Permissions */}

      <div
        className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            "
      >
        {/* Permission Header */}

        <div
          className="
                    flex
                    items-center
                    justify-between
                    border-b
                    bg-muted/20
                    px-5
                    py-3.5
                "
        >
          <div
            className="
                        flex
                        items-center
                        gap-3
                    "
          >
            <div
              className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-50
                            dark:bg-blue-950/40
                        "
            >
              <Shield
                className="
                                h-4
                                w-4
                                text-blue-600
                                dark:text-blue-400
                            "
              />
            </div>

            <div>
              <h2
                className="
                                text-sm
                                font-semibold
                            "
              >
                Permissions
              </h2>

              <p
                className="
                                mt-0.5
                                text-xs
                                text-muted-foreground
                            "
              >
                Permissions assigned to this role.
              </p>
            </div>
          </div>

          <Badge variant="secondary">{permissions.length} Permissions</Badge>
        </div>

        {/* Permission Content */}

        <div className="p-4">
          {permissionsLoading ? (
            <div
              className="
                            py-10
                            text-center
                            text-sm
                            text-muted-foreground
                        "
            >
              Loading permissions...
            </div>
          ) : permissions.length === 0 ? (
            <div
              className="
                            rounded-lg
                            border
                            border-dashed
                            p-8
                            text-center
                        "
            >
              <p
                className="
                                text-sm
                                font-medium
                            "
              >
                No permissions assigned
              </p>

              <p
                className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            "
              >
                This role currently has no permissions.
              </p>
            </div>
          ) : (
            <div
              className="
                            grid
                            gap-3
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
            >
              {Object.entries(groupedPermissions).map(([module, actions]) => (
                <div
                  key={module}
                  className="
                                            overflow-hidden
                                            rounded-lg
                                            border
                                            bg-background
                                        "
                >
                  {/* Module */}

                  <div
                    className="
                                            border-b
                                            bg-muted/30
                                            px-4
                                            py-2.5
                                        "
                  >
                    <div
                      className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                    >
                      <h3
                        className="
                                                    text-sm
                                                    font-semibold
                                                "
                      >
                        {formatLabel(module)}
                      </h3>

                      <Badge
                        variant="outline"
                        className="
                                                        h-5
                                                        px-1.5
                                                        text-[10px]
                                                    "
                      >
                        {actions.length}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}

                  <div
                    className="
                                            flex
                                            flex-wrap
                                            gap-1.5
                                            p-3
                                        "
                  >
                    {actions.map((action) => (
                      <Badge
                        key={action}
                        variant="secondary"
                        className="
                                                            rounded-md
                                                            bg-blue-50
                                                            px-2
                                                            py-1
                                                            text-[11px]
                                                            font-medium
                                                            text-blue-700
                                                            hover:bg-blue-50
                                                            dark:bg-blue-950/40
                                                            dark:text-blue-300
                                                            dark:hover:bg-blue-950/40
                                                        "
                      >
                        <Check
                          className="
                                                            mr-1
                                                            h-3
                                                            w-3
                                                        "
                        />

                        {formatAction(action)}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
