
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

//For product section
import ProductListPage from "@/features/products/pages/ProductListPage";
import CreateProductPage from "@/features/products/pages/CreateProductPage";
import EditProductPage from "@/features/products/pages/EditProductPage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";

import CreateProductVariantPage from "@/features/products/pages/CreateProductVariantPage";
import EditProductVariantPage from "@/features/products/pages/EditProductVariantPage";

//For inventory
import InventoryListPage from "@/features/inventory/pages/InventoryListPage";
import InventoryDetailsPage from "@/features/inventory/pages/InventoryDetailsPage";

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


    //For product
    {
        path: ROUTES.PRODUCTS,
        element: <ProductListPage />,
    },
    {
        path: ROUTES.PRODUCTS+ "/create",
        element: <CreateProductPage />,
    },
    {
        path: ROUTES.PRODUCTS+ "/:uuid/edit",
        element: <EditProductPage />,
    },
    {
        path: ROUTES.PRODUCTS+ "/:uuid",
        element: <ProductDetailsPage />,
    },

    //For product variants
    // {
    //     path: ROUTES.PRODUCT_VARIANTS+ "/create",
    //     element: <CreateProductVariantPage />,
    // },
    {
        path: ROUTES.PRODUCTS+ "/:uuid/variants/create",
        element: <CreateProductVariantPage />,
    },
    {
        path: ROUTES.PRODUCT_VARIANTS+ "/:uuid/edit/:variantUuid",
        element: <EditProductVariantPage />,
    },

    //For Inventory
    {
        path: ROUTES.INVENTORY,
        element: <InventoryListPage />,
    },
    {
        path: ROUTES.INVENTORY+ "/:uuid",
        element: <InventoryDetailsPage />,
    }, 
];