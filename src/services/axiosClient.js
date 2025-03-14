import axios from "axios";
import toast from "react-hot-toast";

// const baseURL = "http://localhost:4000/";
const baseURL = "https://api.sharedri.com/";
// const baseURL = "https://development-api.nisaiji.com/";

export const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const data = response?.data;
    if (data?.status === "ok") {
      return data;
    }

    if (data?.status == "error") {
      return Promise.reject(data?.message);
    }
  },
  async (error) => {
    if (
      error?.response?.data?.statusCode === 500 &&
      error?.response?.data?.message === "jwt expired"
    ) {
      localStorage.removeItem("access_token");
      window.location.replace("/login", "_self");
      toast.error(error?.response?.data?.message);
      return;
    }
    if (error?.message === "Network Error") {
      return toast.error("Check your internet connectivity");
    }
    return Promise.reject(error?.response?.data?.message);
  }
);
