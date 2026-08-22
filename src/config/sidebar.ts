import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Package,
    FolderTree,
    Boxes,
    ShoppingCart,
    Tag,
    Undo2,
    Truck,
    FileText,
    CreditCard,
    Heart,
    ClipboardList,
    PackageCheck,
    ReceiptText,
    Banknote,
    PackageX,
    UserRound,
    MapPin,
    Building2,
} from "lucide-react";

import { ROUTES } from "@/app/router/route-paths";

export interface SidebarItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

export const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        url: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        url: ROUTES.USERS,
        icon: Users,
    },
    {
        title: "Roles",
        url: ROUTES.ROLES,
        icon: ShieldCheck,
    },
    {
        title: "Categories",
        url: ROUTES.CATEGORIES,
        icon: FolderTree,
    },
    {
        title: "Products",
        url: ROUTES.PRODUCTS,
        icon: Boxes,
    },
    // {
    //     title: "Product Variants",
    //     url: ROUTES.PRODUCT_VARIANTS,
    //     icon: Boxes,
    // },
    {
        title: "Attributes",
        url: ROUTES.ATTRIBUTES,
        icon: Boxes,
    },
    {
        title: "Units",
        url: ROUTES.UNITS,
        icon: Boxes,
    },
    {
        title: "Inventory",
        url: ROUTES.INVENTORY,
        icon: Package,
    },
    {
        title: "Tax Classes",
        url: ROUTES.TAX_CLASSES,
        icon: Boxes,
    },
    {
        title: "Tax Rates",
        url: ROUTES.TAX_RATES,
        icon: Package,
    },
    {
        title: "Orders",
        url: ROUTES.ORDERS,
        icon: ShoppingCart,
    },
    {
        title: "Promotions",
        url: ROUTES.COUPONS,
        icon: Tag,
    },
    {
        title: "Sale Returns",
        url: ROUTES.RETURNS,
        icon: Undo2,
    },
    {
        title: "Shipments",
        url: ROUTES.SHIPMENTS,
        icon: Truck,
    },
    {
        title: "Sale Invoices",
        url: ROUTES.INVOICES,
        icon: FileText,
    },
    {
        title: "Payments",
        url: ROUTES.PAYMENTS,
        icon: CreditCard,
    },
    {
        title: "Carts",
        url: ROUTES.CARTS,
        icon: ShoppingCart,
    },
    {
        title: "Wishlists",
        url: ROUTES.WISHLISTS,
        icon: Heart,
    },
    {
        title: "Purchase Orders",
        url: ROUTES.PURCHASE_ORDERS,
        icon: ClipboardList,
    },
    {
        title: "Goods Receipts",
        url: ROUTES.GOODS_RECEIPTS,
        icon: PackageCheck,
    },
    {
        title: "Purchase Invoices",
        url: ROUTES.PURCHASE_INVOICES,
        icon: ReceiptText,
    },
    {
        title: "Purchase Payments",
        url: ROUTES.PURCHASE_PAYMENTS,
        icon: Banknote,
    },
    {
        title: "Purchase Returns",
        url: ROUTES.PURCHASE_RETURNS,
        icon: PackageX,
    },
    {
        title: "Customers",
        url: ROUTES.CUSTOMERS,
        icon: UserRound,
    },
    {
        title: "Addresses",
        url: ROUTES.ADDRESSES,
        icon: MapPin,
    },
        {
        title: "Suppliers",
        url: ROUTES.SUPPLIERS,
        icon: Building2,
    },
    {
        title: "Shipping Zones",
        url: ROUTES.SHIPPING_ZONES,
        icon: Truck,
    },
    {
        title: "Shipping Methods",
        url: ROUTES.SHIPPING_METHODS,
        icon: Truck,
    },
    {
        title: "Shipping Rates",
        url: ROUTES.SHIPPING_RATES,
        icon: Truck,
    },
];