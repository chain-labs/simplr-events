import axios from "axios";

import { envVars } from "./envVars";

const api = axios.create({
  baseURL: envVars.apiEndpoint,
  timeout: 10000,
  headers: {
    "X-Custom-Auth": "simplr-events-website",
  },
});

// Add response interceptor to handle cancellations gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      console.log("Request cancelled");
      return Promise.reject({ isCancelled: true });
    }
    return Promise.reject(error);
  }
);

export default api;
