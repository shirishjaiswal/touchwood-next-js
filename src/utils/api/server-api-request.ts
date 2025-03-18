'use server';

import api from '@/utils/api/axios-instance';
import { cookies } from 'next/headers';
import konsole from '@/utils/logging/konsole';
import { validateToken } from '@/lib/session/session';
import { Headers, RequestOptions, Response } from '@/utils/api/types';

/* Centralized API request function using Axios instance. */
const serverApiRequest = async ({
  connection,
  headers,
  token,
}: RequestOptions): Promise<Response> => {
  try {
    //check for server endpoint
    const SERVER_DOMAIN = process.env.SERVER_ENDPOINT?.replace(/\/$/, '');

    if (!SERVER_DOMAIN)
      throw new Error(
        `Server endpoint is missing in environment variables for requests`,
      );

    const SERVER_ENDPOINT = `${SERVER_DOMAIN}/${connection.endpoint.replace(/^\//, '')}`;

    //check for connection endpoint
    if (!connection.endpoint) throw new Error('API endpoint is required');

    if (!connection.endpoint.includes('auth') && !token) {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('session_token')?.value;
      if (await validateToken(accessToken)) token = accessToken;
    }

    //set headers
    const finalHeaders: Headers = {
      ...headers,
    };

    // check for content type
    if (!finalHeaders['Content-Type']) {
      finalHeaders['Content-Type'] = 'application/json';
    }

    // check for token
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`;

    konsole.log('🔍 API Request Config:', {
      method: connection.method,
      url: SERVER_ENDPOINT,
      headers: finalHeaders,
      data: connection.payload ?? undefined,
    });

    // sing the centralized Axios instance `api`
    const response = await api.request({
      method: connection.method,
      url: SERVER_ENDPOINT,
      headers: finalHeaders,
      data: connection.payload ?? undefined,
    });

    return { data: response.data ?? null, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('API Request Error:', error?.message || error);

    return {
      data: null,
      error:
        error?.response?.data?.message || error?.message || 'Request failed',
    };
  }
};

export default serverApiRequest;
