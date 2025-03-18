import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_ENDPOINT?.replace(/\/$/, "") || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

