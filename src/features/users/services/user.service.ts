// import axiosClient from "@/lib/axios";
// import { API } from "@/constants/api";

// export const userService = {
//     getAll(params?: Record<string, unknown>) {
//         return axiosClient.get(API.USERS, { params });
//     },

//     get(uuid: string) {
//         return axiosClient.get(`${API.USERS}/${uuid}`);
//     },
// };

// import { axios } from "@/api/axios";

// import { ENDPOINTS } from "@/api/endpoints";

// export const userService = {

//     list(params?: any) {
//         return axios.get(ENDPOINTS.users.list, {
//             params,
//         });
//     },

//     details(uuid: string) {
//         return axios.get(
//             ENDPOINTS.users.details(uuid)
//         );
//     },

//     create(data: any) {
//         return axios.post(
//             ENDPOINTS.users.create,
//             data
//         );
//     },

//     update(uuid: string, data: any) {
//         return axios.put(
//             ENDPOINTS.users.update(uuid),
//             data
//         );
//     },

//     delete(uuid: string) {
//         return axios.delete(
//             ENDPOINTS.users.delete(uuid)
//         );
//     },

//     restore(uuid: string) {
//         return axios.patch(
//             ENDPOINTS.users.restore(uuid)
//         );
//     },

//     activate(uuid: string) {
//         return axios.patch(
//             ENDPOINTS.users.activate(uuid)
//         );
//     },

//     deactivate(uuid: string) {
//         return axios.patch(
//             ENDPOINTS.users.deactivate(uuid)
//         );
//     },
// };


import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type { User, UserListParams } from "../types/user";
import type { PaginatedResponse } from "@/types/api";

export const userService = {
    list(params: UserListParams) {
        return axiosClient.get<PaginatedResponse<User>>(
            ENDPOINTS.users.list,
            {
                params,
            }
        );
    },

    details(uuid: string) {
        return axiosClient.get(
            ENDPOINTS.users.details(uuid)
        );
    },

    create(data: unknown) {
        return axiosClient.post(
            ENDPOINTS.users.create,
            data
        );
    },

    update(uuid: string, data: unknown) {
        return axiosClient.put(
            ENDPOINTS.users.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.users.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.restore(uuid)
        );
    },

    activate(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.activate(uuid)
        );
    },

    deactivate(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.deactivate(uuid)
        );
    },
};