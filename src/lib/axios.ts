import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_AI_BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  withCredentials: true,
});
