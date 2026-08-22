import { useQuery } from "@tanstack/react-query";

import { purchaseService } from "../services/purchase.service";
import type {
    PurchaseOrderListParams,
    GoodsReceiptListParams,
    PurchaseInvoiceListParams,
    PurchasePaymentListParams,
    PurchaseReturnListParams,
} from "../types/purchase";

import { QUERY_KEYS } from "@/constants/query-keys";

export function usePurchaseOrders(params: PurchaseOrderListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PURCHASE_ORDERS, params],
        queryFn: async () => {
            const response =
                await purchaseService.listOrders(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useGoodsReceipts(params: GoodsReceiptListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.GOODS_RECEIPTS, params],
        queryFn: async () => {
            const response =
                await purchaseService.listGoodsReceipts(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function usePurchaseInvoices(params: PurchaseInvoiceListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PURCHASE_INVOICES, params],
        queryFn: async () => {
            const response =
                await purchaseService.listInvoices(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function usePurchasePayments(params: PurchasePaymentListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PURCHASE_PAYMENTS, params],
        queryFn: async () => {
            const response =
                await purchaseService.listPayments(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function usePurchaseReturns(params: PurchaseReturnListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PURCHASE_RETURNS, params],
        queryFn: async () => {
            const response =
                await purchaseService.listReturns(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
