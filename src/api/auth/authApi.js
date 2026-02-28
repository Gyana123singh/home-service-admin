import axiosInstance from "../axiosInstance";

export const authApi = {
  login: (data) => axiosInstance.post("/login", data),
};
