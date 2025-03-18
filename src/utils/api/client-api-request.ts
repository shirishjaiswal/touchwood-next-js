"use client";

import axiosInstance from "@/utils/api/axios-instance";
import konsole from "@/utils/logging/konsole";
import { Headers, RequestOptions, Response } from "@/utils/api/types";

/* Centralized client-side API request function using Axios. */
const clientApiRequest = async ({
  connection,
  headers = {},
  token,
}: RequestOptions): Promise<Response> => {
  try {
    // Check for API base URL
    const CLIENT_DOMAIN = process.env.NEXT_PUBLIC_NEXT_DOMAIN?.replace(/\/$/, "");

    if (!CLIENT_DOMAIN) throw new Error("Client API endpoint is missing in environment variables");

    const CLIENT_ENDPOINT = `${CLIENT_DOMAIN}/${connection.endpoint.replace(/^\//, "")}`;

    // Set request headers
    const finalHeaders: Headers = {
      ...headers,
    };

    // Ensure correct Content-Type
    if (!finalHeaders["Content-Type"] && !(connection.payload instanceof FormData)) {
      finalHeaders["Content-Type"] = "application/json";
    }

    // Set Authorization header if token exists
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;

    konsole.log("Client API Request Config:", {
      method: connection.method,
      url: CLIENT_ENDPOINT,
      headers: finalHeaders,
      data: connection?.payload,
    });

    // Make API request using centralized Axios instance
    const response = await axiosInstance.request({
      method: connection.method,
      url: CLIENT_ENDPOINT,
      headers: finalHeaders,
      data: connection?.payload,
    });

    return { data: response.data ?? null, error: null };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    konsole.error("Client API Request Error:", error?.message || error);

    return {
      data: null,
      error: error?.response?.data?.message || error?.message || "Request failed",
    };
  }
};

export default clientApiRequest;
