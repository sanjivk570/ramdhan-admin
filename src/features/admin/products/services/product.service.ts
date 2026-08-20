import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type {
    CreateProductPayload,
    Product,
    ProductListParams,
    UpdateProductPayload,
    ProductVariant,
    ProductVariantPayload,
} from "../types/product";

export const productService = {
    list(params: ProductListParams) {
        return axiosClient.get<PaginatedResponse<Product>>(
            ENDPOINTS.products.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Product>>(
            ENDPOINTS.products.details(uuid)
        );
    },

    create(data: CreateProductPayload) {
        return axiosClient.post<ApiResponse<Product>>(
            ENDPOINTS.products.create,
            data
        );
    },

    update(uuid: string, data: UpdateProductPayload) {
        return axiosClient.put<ApiResponse<Product>>(
            ENDPOINTS.products.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.products.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.post(
            ENDPOINTS.products.restore(uuid)
        );
    },

    forceDelete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.products.forceDelete(uuid)
        );
    },

    updateStatus(uuid: string, status: boolean) {
        return axiosClient.patch(
            ENDPOINTS.products.status(uuid),
            { status }
        );
    },

    variants(productUuid: string) {
        return axiosClient.get<ApiResponse<ProductVariant[]>>(
            ENDPOINTS.products.variants.list(productUuid)
        );
    },

    variantDetails(productUuid: string, variantUuid: string) {
        return axiosClient.get<ApiResponse<ProductVariant>>(
            ENDPOINTS.products.variants.details(productUuid, variantUuid)
        );
    },

    createVariant(productUuid: string, data: ProductVariantPayload) {
        return axiosClient.post<ApiResponse<ProductVariant>>(
            ENDPOINTS.products.variants.create(productUuid),
            data
        );
    },

    updateVariant(
        productUuid: string,
        variantUuid: string,
        data: ProductVariantPayload
    ) {
        return axiosClient.put<ApiResponse<ProductVariant>>(
            ENDPOINTS.products.variants.update(productUuid, variantUuid),
            data
        );
    },

    deleteVariant(productUuid: string, variantUuid: string) {
        return axiosClient.delete(
            ENDPOINTS.products.variants.delete(productUuid, variantUuid)
        );
    },

    setDefaultVariant(productUuid: string, variantUuid: string) {
        return axiosClient.patch(
            ENDPOINTS.products.variants.setDefault(productUuid, variantUuid)
        );
    },
};
