import axios from "axios";

export const $http = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 15000,
    headers: {
        Authorization: "Bearer eyhGzi......",
    },
});
