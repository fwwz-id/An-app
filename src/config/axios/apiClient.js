import axios from "axios";

// const url = "http://localhost:8000/api/v1";
const url = "/api/v1";

function apiClient() {
    const axiosInstance = axios.create({
        //baseURL: "https://tahfidz-db.herokuapp.com/api/v1", // prod
        baseURL: url,
        responseType: "json",
        withCredentials: true,
    });

    return axiosInstance;
}

export const api = apiClient();
