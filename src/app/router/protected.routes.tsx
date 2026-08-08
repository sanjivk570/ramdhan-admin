
//For Dashboard Section
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

//For Role section
import UserListPage from "@/features/users/pages/UserListPage";
import CreateUserPage from "@/features/users/pages/CreateUserPage";
import EditUserPage from "@/features/users/pages/EditUserPage";
import UserDetailsPage from "@/features/users/pages/UserDetailsPage";

//For Role section
import RoleListPage from "@/features/roles/pages/RoleListPage";
import CreateRolePage from "@/features/roles/pages/CreateRolePage";
import RoleDetailsPage from "@/features/roles/pages/RoleDetailsPage";
import EditRolePage from "@/features/roles/pages/EditRolePage";

//For Role section
import CategoryListPage from "@/features/categories/pages/CategoryListPage";
import CreateCategoryPage from "@/features/categories/pages/CreateCategoryPage";
import EditCategoryPage from "@/features/categories/pages/EditCategoryPage";
import CategoryDetailPage from "@/features/categories/pages/CategoryDetailPage";

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
    {
        path: ROUTES.USERS + "/:uuid",
        element: <UserDetailsPage />,
    },
    {
        path: ROUTES.USERS + "/:uuid/edit",
        element: <EditUserPage />,
    },

    //For Roles
    {
        path: ROUTES.ROLES,
        element: <RoleListPage />,
    },

    {
        path: ROUTES.ROLES + "/create",
        element: <CreateRolePage />,
    },
    
    {
        path: ROUTES.ROLES + "/:id/edit",
        element: <EditRolePage />,
    },

    {
        path: ROUTES.ROLES + "/:id",
        element: <RoleDetailsPage />,
    },

    //For Category
    {
        path: ROUTES.CATEGORIES,
        element: <CategoryListPage />,
    },
    {
        path: ROUTES.CATEGORIES+ "/create",
        element: <CreateCategoryPage />,
    },
    {
        path: ROUTES.CATEGORIES+ "/:uuid/edit",
        element: <EditCategoryPage />,
    },
    {
        path: ROUTES.CATEGORIES+ "/:uuid",
        element: <CategoryDetailPage />,
    },
];