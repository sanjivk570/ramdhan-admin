import { useMutation, useQueryClient } from "@tanstack/react-query";

import { purchaseService } from "../services/purchase.service";

import { QUERY_KEYS } from "@/constants/query-keys";

function invalidate(
    queryClient: ReturnType<typeof useQueryClient>,
    keys: string[]
) {
    keys.forEach((key) => {
        queryClient.invalidateQueries({
            queryKey: [key],
        });
    });
}

export function useSubmitPurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.submitOrder(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.PURCHASE_ORDERS,
            ]),
    });
}

export function useApprovePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.approveOrder(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.PURCHASE_ORDERS,
            ]),
    });
}

export function useCancelPurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.cancelOrder(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.PURCHASE_ORDERS,
            ]),
    });
}

export function usePostGoodsReceipt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.postGoodsReceipt(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.GOODS_RECEIPTS,
            ]),
    });
}

export function useVoidGoodsReceipt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.voidGoodsReceipt(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.GOODS_RECEIPTS,
            ]),
    });
}

export function usePostPurchaseInvoice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.postInvoice(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.PURCHASE_INVOICES,
            ]),
    });
}

export function usePostPurchaseReturn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            purchaseService.postReturn(uuid),
        onSuccess: () =>
            invalidate(queryClient, [
                QUERY_KEYS.PURCHASE_RETURNS,
            ]),
    });
}
