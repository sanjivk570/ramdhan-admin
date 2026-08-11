// import axiosClient from "@/api/axios";
// import { ENDPOINTS } from "@/api/endpoints";

// export interface AttributeValueOption {
//     uuid: string;
//     value: string;
//     display_value?: string | null;
//     attribute?: {
//         uuid: string;
//         name: string;
//     };
// }

// export const attributeService = {
//     values() {
//         return axiosClient.get<any>(ENDPOINTS.attributes.list);
//     },
// };


import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

export interface AttributeValueOption {
    uuid: string;
    value: string;
    display_value?: string | null;
    attribute?: {
        uuid: string;
        name: string;
    };
}

export const attributeService = {
    list(params: Record<string, unknown> = {}) {
        return axiosClient.get<any>(ENDPOINTS.attributes.list, {
            params,
        });
    },

    details(uuid: string) {
        return axiosClient.get<any>(ENDPOINTS.attributes.details(uuid));
    },
};
