import axios from "axios";

// Get both URLs from .env
console.log(import.meta.env.VITE_API_URLS);

const urls = import.meta.env.VITE_API_URLS.split(",");

// Detect if running on localhost or mobile (same network)
const isLocal = window.location.hostname === "localhost";
const baseURL = isLocal ? urls[0] : urls[1];

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
