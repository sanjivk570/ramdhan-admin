import type {
    DataTableConfig,
    DataTableFilter,
    ExportColumn,
} from "@/components/data-table";

import {
    getPurchaseOrderColumns,
    type PurchaseOrderColumnActions,
} from "../columns/purchase-order-columns";
import {
    getGoodsReceiptColumns,
    type GoodsReceiptColumnActions,
} from "../columns/goods-receipt-columns";
import {
    getPurchaseInvoiceColumns,
    type PurchaseInvoiceColumnActions,
} from "../columns/purchase-invoice-columns";
import { getPurchasePaymentColumns } from "../columns/purchase-payment-columns";
import {
    getPurchaseReturnColumns,
    type PurchaseReturnColumnActions,
} from "../columns/purchase-return-columns";

import type {
    PurchaseOrder,
    GoodsReceipt,
    PurchaseInvoice,
    PurchasePayment,
    PurchaseReturn,
} from "../types/purchase";

/* ----------------------------- Filters ----------------------------- */

export const purchaseOrderFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Submitted", value: "submitted" },
            { label: "Approved", value: "approved" },
            { label: "Cancelled", value: "cancelled" },
        ],
    },
    {
        key: "supplier_id",
        label: "Supplier ID",
        type: "text",
    },
    {
        key: "from_date",
        label: "From Date",
        type: "date",
    },
    {
        key: "to_date",
        label: "To Date",
        type: "date",
    },
];

export const goodsReceiptFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Posted", value: "posted" },
            { label: "Void", value: "void" },
        ],
    },
    {
        key: "supplier_id",
        label: "Supplier ID",
        type: "text",
    },
    {
        key: "purchase_order_id",
        label: "Purchase Order ID",
        type: "text",
    },
];

export const purchaseInvoiceFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Posted", value: "posted" },
        ],
    },
    {
        key: "supplier_id",
        label: "Supplier ID",
        type: "text",
    },
    {
        key: "from_date",
        label: "From Date",
        type: "date",
    },
    {
        key: "to_date",
        label: "To Date",
        type: "date",
    },
];

export const purchasePaymentFilters: DataTableFilter[] = [
    {
        key: "payment_method",
        label: "Method",
        type: "select",
        options: [
            { label: "Bank Transfer", value: "bank_transfer" },
            { label: "Cash", value: "cash" },
            { label: "Cheque", value: "cheque" },
            { label: "UPI", value: "upi" },
        ],
    },
    {
        key: "supplier_id",
        label: "Supplier ID",
        type: "text",
    },
    {
        key: "invoice_uuid",
        label: "Invoice UUID",
        type: "text",
    },
];

export const purchaseReturnFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Posted", value: "posted" },
        ],
    },
    {
        key: "supplier_id",
        label: "Supplier ID",
        type: "text",
    },
];

/* ------------------------- Table Configs --------------------------- */

export function purchaseOrderTableConfig(
    actions: PurchaseOrderColumnActions
): DataTableConfig<PurchaseOrder> {
    return {
        title: "Purchase Orders",
        storageKey: "purchase-orders",
        searchPlaceholder: "Search purchase orders...",
        columns: getPurchaseOrderColumns(actions),
        filters: purchaseOrderFilters,
    };
}

export function goodsReceiptTableConfig(
    actions: GoodsReceiptColumnActions
): DataTableConfig<GoodsReceipt> {
    return {
        title: "Goods Receipts",
        storageKey: "goods-receipts",
        searchPlaceholder: "Search goods receipts by GRN...",
        columns: getGoodsReceiptColumns(actions),
        filters: goodsReceiptFilters,
    };
}

export function purchaseInvoiceTableConfig(
    actions: PurchaseInvoiceColumnActions
): DataTableConfig<PurchaseInvoice> {
    return {
        title: "Purchase Invoices",
        storageKey: "purchase-invoices",
        searchPlaceholder: "Search purchase invoices...",
        columns: getPurchaseInvoiceColumns(actions),
        filters: purchaseInvoiceFilters,
        exportColumns: [
            {
                key: "supplier_invoice_number",
                label: "Invoice #",
            },
            {
                key: "supplier_name",
                label: "Supplier",
            },
            {
                key: "status",
                label: "Status",
            },
            {
                key: "grand_total",
                label: "Total",
            },
            {
                key: "due_date",
                label: "Due Date",
            },
        ] as unknown as ExportColumn<PurchaseInvoice>[],
    };
}

export function purchasePaymentTableConfig(): DataTableConfig<PurchasePayment> {
    return {
        title: "Purchase Payments",
        storageKey: "purchase-payments",
        searchPlaceholder: "Search purchase payments...",
        columns: getPurchasePaymentColumns(),
        filters: purchasePaymentFilters,
    };
}

export function purchaseReturnTableConfig(
    actions: PurchaseReturnColumnActions
): DataTableConfig<PurchaseReturn> {
    return {
        title: "Purchase Returns",
        storageKey: "purchase-returns",
        searchPlaceholder: "Search purchase returns...",
        columns: getPurchaseReturnColumns(actions),
        filters: purchaseReturnFilters,
    };
}
