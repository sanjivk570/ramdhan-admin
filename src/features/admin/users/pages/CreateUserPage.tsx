import { useNavigate } from "react-router-dom";
//import type { AxiosError } from "axios";

import UserForm from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";

import type {
    UserFormData,
    EditUserFormData,
} from "../validation/user.schema";
import type { CreateUserPayload } from "../types/user";

import { ROUTES } from "@/app/router/route-paths";

import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";
import { notification } from "@/lib/notification";

import { useRoles } from "@/features/admin/roles/hooks/useRoles";


// interface ApiErrorResponse {
//     message?: string;

//     errors?: Record<
//         string,
//         string[] | string
//     >;
// }

export default function CreateUserPage() {
    const navigate = useNavigate();

    const createUser = useCreateUser();

    const {
        data: rolesResponse,
        isLoading: rolesLoading,
    } = useRoles({
        page: 1,
        per_page: 100,
    });

    const roles = rolesResponse?.data ?? [];


    const handleSubmit = async (
        data: UserFormData | EditUserFormData
    ) => {
        const payload: CreateUserPayload = {
            first_name: data.first_name,

            last_name:
                data.last_name?.trim() || undefined,

            email: data.email,

            mobile:
                data.mobile?.trim() || undefined,

            country_code:
                data.country_code || undefined,

            password: data.password as string,

            password_confirmation:
                data.password_confirmation as string,

            role: data.role,

            is_active: data.is_active,
        };

        // await createUser.mutateAsync(payload);

        // navigate(ROUTES.USERS);

        try {
            await createUser.mutateAsync(
                payload
            );

            notification.success(
                "User created successfully.",
                "The user account has been created."
            );

            navigate(ROUTES.USERS);

        } catch {
            notification.error(
                "Unable to create user.",
                "Please check the form and try again."
            );
        }
    };

    // const error =
    //     createUser.error as
    //     AxiosError<ApiErrorResponse> | null;

    

    return (
        <div className="space-y-6">

            {/* Page Header */}

            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create User
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Create a new user account.
                </p>
            </div>

            {/* Form */}

            <UserForm
                onSubmit={handleSubmit}

                loading={
                    createUser.isPending
                }

                roles={
                    roles.map((role) => ({
                        label:
                            role.display_name ||
                            role.name,

                        // IMPORTANT:
                        // API expects role NAME
                        value:
                            role.name,
                    }))
                }

                rolesLoading={rolesLoading}

                // serverErrors={
                //     error?.response?.data?.errors ?? {}
                // }
                serverErrors={
                    getApiFieldErrors(createUser.error)
                }

                serverMessage={
                    getApiErrorMessage(createUser.error)
                }

                onCancel={() =>
                    navigate(ROUTES.USERS)
                }
            />

        </div>
    );
}