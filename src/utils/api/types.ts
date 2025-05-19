export type Headers = {
  [key: string]: string;
};

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Connection = {
  method: HttpMethods;
  endpoint: string;
  payload?: any;
};

export type RequestOptions = {
  connection: Connection;
  headers?: Headers;
  token?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response = {
  data: any | null;
  error: any | null;
  status: number | null;
};