import axiosClient from "@/lib/axios";

export async function pingApi() {
    return axiosClient.get("/profile");
}