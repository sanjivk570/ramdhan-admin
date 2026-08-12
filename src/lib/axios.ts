// import axios from "axios";
// import { env } from "@/config/env";

// const axiosClient = axios.create({
//     baseURL: env.API_URL,

//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// axiosClient.interceptors.response.use(
//     (response) => response,

//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");

//             window.location.href = "/login";
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosClient;


import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        Accept: "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {

    const token =
        localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    /*
     * FormData:
     *
     * Browser/Axios ko multipart boundary
     * automatically generate karne dein.
     */
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    } else {
        config.headers["Content-Type"] =
            "application/json";
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,

    (error) => {

        if (
            error.response?.status === 401
        ) {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;