import axios from "axios";
import { config } from "process";

import { envVars } from "./envVars";

const api = axios.create({
  baseURL: envVars.apiEndpoint,
  timeout: 10000,
  headers: {
    "X-Custom-Auth": "simplr-events-website",
  },
});

export default api;
