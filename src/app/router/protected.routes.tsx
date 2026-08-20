
//For Dashboard Section
import DashboardPage from "@/features/admin/dashboard/pages/DashboardPage";

//For Role section
import UserListPage from "@/features/admin/users/pages/UserListPage";
import CreateUserPage from "@/features/admin/users/pages/CreateUserPage";
import EditUserPage from "@/features/admin/users/pages/EditUserPage";
import UserDetailsPage from "@/features/admin/users/pages/UserDetailsPage";

//For Role section
import RoleListPage from "@/features/admin/roles/pages/RoleListPage";
import CreateRolePage from "@/features/admin/roles/pages/CreateRolePage";
import RoleDetailsPage from "@/features/admin/roles/pages/RoleDetailsPage";
import EditRolePage from "@/features/admin/roles/pages/EditRolePage";

//For Role section
import CategoryListPage from "@/features/admin/categories/pages/CategoryListPage";
import CreateCategoryPage from "@/features/admin/categories/pages/CreateCategoryPage";
import EditCategoryPage from "@/features/admin/categories/pages/EditCategoryPage";
import CategoryDetailPage from "@/features/admin/categories/pages/CategoryDetailPage";

//For product section
import ProductListPage from "@/features/admin/products/pages/ProductListPage";
import CreateProductPage from "@/features/admin/products/pages/CreateProductPage";
import EditProductPage from "@/features/admin/products/pages/EditProductPage";
import ProductDetailsPage from "@/features/admin/products/pages/ProductDetailsPage";

import CreateProductVariantPage from "@/features/admin/products/pages/CreateProductVariantPage";
import EditProductVariantPage from "@/features/admin/products/pages/EditProductVariantPage";

//For inventory
import InventoryListPage from "@/features/admin/inventory/pages/InventoryListPage";
import InventoryDetailsPage from "@/features/admin/inventory/pages/InventoryDetailsPage";

//For unit
import UnitListPage from "@/features/admin/units/pages/UnitListPage";
import CreateUnitPage from "@/features/admin/units/pages/CreateUnitPage";
import EditUnitPage from "@/features/admin/units/pages/EditUnitPage";
import UnitDetailsPage from "@/features/admin/units/pages/UnitDetailsPage";

//For tax
import TaxClassListPage from "@/features/admin/tax/tax-classes/pages/TaxClassListPage";
import TaxClassFormPage from "@/features/admin/tax/tax-classes/pages/TaxClassFormPage";
import TaxClassDetailsPage from "@/features/admin/tax/tax-classes/pages/TaxClassDetailsPage";
//import TaxClassFormPage from "@/features/admin/tax/tax-classes/pages/TaxClassFormPage";
import TaxRateListPage from "@/features/admin/tax/tax-rates/pages/TaxRateListPage";
import TaxRateFormPage from "@/features/admin/tax/tax-rates/pages/TaxRateFormPage";
import TaxRateDetailsPage from "@/features/admin/tax/tax-rates/pages/TaxRateDetailsPage";
//import TaxRateFormPage from "@/features/admin/tax/tax-rates/pages/TaxRateFormPage";

//For Product attribute
import AttributeListPage from "@/features/admin/attributes/pages/AttributeListPage";
import AttributeFormPage from "@/features/admin/attributes/pages/AttributeFormPage";
import AttributeDetailsPage from "@/features/admin/attributes/pages/AttributeDetailsPage";

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
        path: ROUTES.PRODUCTS+ "/:uuid/edit/:variantUuid",
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

    //For Unit
    {
        path: ROUTES.UNITS,
        element: <UnitListPage />,
    },
    {
        path: ROUTES.UNITS+ "/create",
        element: <CreateUnitPage />,
    },
    {
        path: ROUTES.UNITS+ "/:uuid",
        element: <UnitDetailsPage />,
    }, 
    {
        path: ROUTES.UNITS+ "/:uuid/edit",
        element: <EditUnitPage />,
    },

    //For tax classes
    {
        path: ROUTES.TAX_CLASSES,
        element: <TaxClassListPage />,
    },
    {
        path: ROUTES.TAX_CLASSES+ "/create",
        element: <TaxClassFormPage />,
    },
    {
        path: ROUTES.TAX_CLASSES+ "/:uuid",
        element: <TaxClassDetailsPage />,
    }, 
    {
        path: ROUTES.TAX_CLASSES+ "/:uuid/edit",
        element: <TaxClassFormPage />,
    },
    //For tax rates
    {
        path: ROUTES.TAX_RATES,
        element: <TaxRateListPage />,
    },
    {
        path: ROUTES.TAX_RATES+ "/create",
        element: <TaxRateFormPage />,
    },
    {
        path: ROUTES.TAX_RATES+ "/:uuid",
        element: <TaxRateDetailsPage />,
    }, 
    {
        path: ROUTES.TAX_RATES+ "/:uuid/edit",
        element: <TaxRateFormPage />,
    },

    //For product attribute
    {
        path: ROUTES.ATTRIBUTES,
        element: <AttributeListPage />,
    },
    {
        path: ROUTES.ATTRIBUTES+ "/create",
        element: <AttributeFormPage />,
    },
    {
        path: ROUTES.ATTRIBUTES+ "/:uuid",
        element: <AttributeDetailsPage />,
    }, 
    {
        path: ROUTES.ATTRIBUTES+ "/:uuid/edit",
        element: <AttributeFormPage />,
    },
    
];