import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    PurchaseOrder,
    PurchaseOrderListParams,
    GoodsReceipt,
    GoodsReceiptListParams,
    PurchaseInvoice,
    PurchaseInvoiceListParams,
    PurchasePayment,
    PurchasePaymentListParams,
    PurchaseReturn,
    PurchaseReturnListParams,
} from "../types/purchase";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const purchaseService = {
    /* ---------------- Purchase Orders ---------------- */

    listOrders(params: PurchaseOrderListParams) {
        return axiosClient.get<PaginatedResponse<PurchaseOrder>>(
            ENDPOINTS.purchaseOrders.list,
            { params }
        );
    },

    orderDetails(uuid: string) {
        return axiosClient.get<ApiResponse<PurchaseOrder>>(
            ENDPOINTS.purchaseOrders.details(uuid)
        );
    },

    submitOrder(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.purchaseOrders.submit(uuid)
        );
    },

    approveOrder(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.purchaseOrders.approve(uuid)
        );
    },

    cancelOrder(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.purchaseOrders.cancel(uuid)
        );
    },

    /* ---------------- Goods Receipts ---------------- */

    listGoodsReceipts(params: GoodsReceiptListParams) {
        return axiosClient.get<PaginatedResponse<GoodsReceipt>>(
            ENDPOINTS.goodsReceipts.list,
            { params }
        );
    },

    postGoodsReceipt(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.goodsReceipts.post(uuid)
        );
    },

    voidGoodsReceipt(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.goodsReceipts.void(uuid)
        );
    },

    /* ---------------- Purchase Invoices ---------------- */

    listInvoices(params: PurchaseInvoiceListParams) {
        return axiosClient.get<PaginatedResponse<PurchaseInvoice>>(
            ENDPOINTS.purchaseInvoices.list,
            { params }
        );
    },

    postInvoice(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.purchaseInvoices.post(uuid)
        );
    },

    /* ---------------- Purchase Payments ---------------- */

    listPayments(params: PurchasePaymentListParams) {
        return axiosClient.get<PaginatedResponse<PurchasePayment>>(
            ENDPOINTS.purchasePayments.list,
            { params }
        );
    },

    /* ---------------- Purchase Returns ---------------- */

    listReturns(params: PurchaseReturnListParams) {
        return axiosClient.get<PaginatedResponse<PurchaseReturn>>(
            ENDPOINTS.purchaseReturns.list,
            { params }
        );
    },

    postReturn(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.purchaseReturns.post(uuid)
        );
    },
};
