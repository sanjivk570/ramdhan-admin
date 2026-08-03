// import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// import { ROUTES } from "./route-paths";

// export const protectedRoutes = [
//     {
//         path: ROUTES.DASHBOARD,
//         element: <DashboardPage />,
//     },
// ];

import UserListPage from "@/features/users/pages/UserListPage";
//import CreateUserPage from "@/features/users/pages/CreateUserPage";
//import EditUserPage from "@/features/users/pages/EditUserPage";
//import UserDetailsPage from "@/features/users/pages/UserDetailsPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

import { ROUTES } from "./route-paths";

export const protectedRoutes = [
    {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
    },

    {
        path: ROUTES.USERS,
        element: <UserListPage />,
    },

    // {
    //     path: ROUTES.USERS + "/create",
    //     element: <CreateUserPage />,
    // },

    // {
    //     path: ROUTES.USERS + "/:uuid",
    //     element: <UserDetailsPage />,
    // },

    // {
    //     path: ROUTES.USERS + "/:uuid/edit",
    //     element: <EditUserPage />,
    // },
];