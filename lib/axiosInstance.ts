import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // ✅ allow cookies
});

export default axiosInstance;
