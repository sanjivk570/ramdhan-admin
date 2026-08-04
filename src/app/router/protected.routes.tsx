
//For Dashboard Section
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

//For Role section
import UserListPage from "@/features/users/pages/UserListPage";
import CreateUserPage from "@/features/users/pages/CreateUserPage";
//import EditUserPage from "@/features/users/pages/EditUserPage";
//import UserDetailsPage from "@/features/users/pages/UserDetailsPage";

//For Role section
import RoleListPage from "@/features/roles/pages/RoleListPage";

import { ROUTES } from "./route-paths";

export const protectedRoutes = [
    //For Dashboard
    {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
    },

    //For Users
    {
        path: ROUTES.USERS,
        element: <UserListPage />,
    },
    {
        path: ROUTES.USERS + "/create",
        element: <CreateUserPage />,
    },
    // {
    //     path: ROUTES.USERS + "/:uuid",
    //     element: <UserDetailsPage />,
    // },
    // {
    //     path: ROUTES.USERS + "/:uuid/edit",
    //     element: <EditUserPage />,
    // },

    //For Roles
    {
        path: ROUTES.ROLES,
        element: <RoleListPage />,
    }
];