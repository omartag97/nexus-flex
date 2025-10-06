import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  params: {
    apikey: process.env.NEXT_PUBLIC_OMDB_KEY,
  },
});

export default axiosInstance;
