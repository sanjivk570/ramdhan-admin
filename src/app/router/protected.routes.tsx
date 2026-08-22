
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

//For Admin Orders
import OrderListPage from "@/features/admin/orders/pages/OrderListPage";
import OrderDetailsPage from "@/features/admin/orders/pages/OrderDetailsPage";

//For Admin Coupons
import CouponListPage from "@/features/admin/coupons/pages/CouponListPage";
import CreateCouponPage from "@/features/admin/coupons/pages/CreateCouponPage";
import EditCouponPage from "@/features/admin/coupons/pages/EditCouponPage";

//For Admin Returns
import ReturnListPage from "@/features/admin/returns/pages/ReturnListPage";
import ReturnDetailsPage from "@/features/admin/returns/pages/ReturnDetailsPage";

//For Admin Shipments
import ShipmentListPage from "@/features/admin/shipments/pages/ShipmentListPage";
import CreateShipmentPage from "@/features/admin/shipments/pages/CreateShipmentPage";

//For Admin Invoices
import InvoiceListPage from "@/features/admin/invoices/pages/InvoiceListPage";
import InvoiceDetailsPage from "@/features/admin/invoices/pages/InvoiceDetailsPage";

//For Admin Payments
import PaymentListPage from "@/features/admin/payments/pages/PaymentListPage";

//For Admin Carts
import CartListPage from "@/features/admin/carts/pages/CartListPage";
import CartDetailsPage from "@/features/admin/carts/pages/CartDetailsPage";

//For Admin Wishlists
import WishlistListPage from "@/features/admin/wishlists/pages/WishlistListPage";

//For Purchase
import PurchaseOrderListPage from "@/features/admin/purchases/pages/PurchaseOrderListPage";
import GoodsReceiptListPage from "@/features/admin/purchases/pages/GoodsReceiptListPage";
import PurchaseInvoiceListPage from "@/features/admin/purchases/pages/PurchaseInvoiceListPage";
import PurchasePaymentListPage from "@/features/admin/purchases/pages/PurchasePaymentListPage";
import PurchaseReturnListPage from "@/features/admin/purchases/pages/PurchaseReturnListPage";

//For Customers
import CustomerListPage from "@/features/admin/customers/pages/CustomerListPage";
import CustomerDetailsPage from "@/features/admin/customers/pages/CustomerDetailsPage";
import CustomerFormPage from "@/features/admin/customers/pages/CustomerFormPage";

//For Addresses
import AddressListPage from "@/features/admin/addresses/pages/AddressListPage";

//For Suppliers
import SupplierListPage from "@/features/admin/suppliers/pages/SupplierListPage";
import SupplierDetailsPage from "@/features/admin/suppliers/pages/SupplierDetailsPage";
import SupplierFormPage from "@/features/admin/suppliers/pages/SupplierFormPage";

//For Shipping
import ShippingZoneListPage from "@/features/admin/shipping/pages/ShippingZoneListPage";
import ShippingMethodListPage from "@/features/admin/shipping/pages/ShippingMethodListPage";
import ShippingRateListPage from "@/features/admin/shipping/pages/ShippingRateListPage";

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

    //For Admin Orders
    {
        path: ROUTES.ORDERS,
        element: <OrderListPage />,
    },
    {
        path: ROUTES.ORDERS + "/:uuid",
        element: <OrderDetailsPage />,
    },

    //For Admin Coupons
    {
        path: ROUTES.COUPONS,
        element: <CouponListPage />,
    },
    {
        path: ROUTES.COUPONS + "/create",
        element: <CreateCouponPage />,
    },
    {
        path: ROUTES.COUPONS + "/:uuid/edit",
        element: <EditCouponPage />,
    },

    //For Admin Returns
    {
        path: ROUTES.RETURNS,
        element: <ReturnListPage />,
    },
    {
        path: ROUTES.RETURNS + "/:uuid",
        element: <ReturnDetailsPage />,
    },

    //For Admin Shipments
    {
        path: ROUTES.SHIPMENTS,
        element: <ShipmentListPage />,
    },
    {
        path: ROUTES.SHIPMENTS + "/create",
        element: <CreateShipmentPage />,
    },

    //For Admin Invoices
    {
        path: ROUTES.INVOICES,
        element: <InvoiceListPage />,
    },
    {
        path: ROUTES.INVOICES + "/:uuid",
        element: <InvoiceDetailsPage />,
    },

    //For Admin Payments
    {
        path: ROUTES.PAYMENTS,
        element: <PaymentListPage />,
    },

    //For Admin Carts
    {
        path: ROUTES.CARTS,
        element: <CartListPage />,
    },
    {
        path: ROUTES.CARTS + "/:uuid",
        element: <CartDetailsPage />,
    },

    //For Admin Wishlists
    {
        path: ROUTES.WISHLISTS,
        element: <WishlistListPage />,
    },

    //For Purchase
    {
        path: ROUTES.PURCHASE_ORDERS,
        element: <PurchaseOrderListPage />,
    },
    {
        path: ROUTES.GOODS_RECEIPTS,
        element: <GoodsReceiptListPage />,
    },
    {
        path: ROUTES.PURCHASE_INVOICES,
        element: <PurchaseInvoiceListPage />,
    },
    {
        path: ROUTES.PURCHASE_PAYMENTS,
        element: <PurchasePaymentListPage />,
    },
        {
        path: ROUTES.PURCHASE_RETURNS,
        element: <PurchaseReturnListPage />,
    },

    //For Customers
    {
        path: ROUTES.CUSTOMERS,
        element: <CustomerListPage />,
    },
    {
        path: ROUTES.CUSTOMERS + "/create",
        element: <CustomerFormPage />,
    },
    {
        path: ROUTES.CUSTOMERS + "/:uuid",
        element: <CustomerDetailsPage />,
    },
    {
        path: ROUTES.CUSTOMERS + "/:uuid/edit",
        element: <CustomerFormPage />,
    },

    //For Addresses
    {
        path: ROUTES.ADDRESSES,
        element: <AddressListPage />,
    },

        //For Suppliers
    {
        path: ROUTES.SUPPLIERS,
        element: <SupplierListPage />,
    },
    {
        path: ROUTES.SUPPLIERS + "/create",
        element: <SupplierFormPage />,
    },
    {
        path: ROUTES.SUPPLIERS + "/:uuid",
        element: <SupplierDetailsPage />,
    },
    {
        path: ROUTES.SUPPLIERS + "/:uuid/edit",
        element: <SupplierFormPage />,
    },

    //For Shipping
    {
        path: ROUTES.SHIPPING_ZONES,
        element: <ShippingZoneListPage />,
    },
    {
        path: ROUTES.SHIPPING_METHODS,
        element: <ShippingMethodListPage />,
    },
    {
        path: ROUTES.SHIPPING_RATES,
        element: <ShippingRateListPage />,
    },
];