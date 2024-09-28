import { $http } from "./xhr";

export const ApiV1AuthRegister = async (data: any) => await $http.post("/v1/auth/register", data);
export const ApiV1AuthLogin = async (data: any) => await $http.post("/v1/auth/login", data);
