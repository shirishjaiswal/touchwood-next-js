import { Connection } from "@/utils/api/types";

export type GENERATE_NEW_TOKEN_PAYLOAD = {
  email: string;
}

const GENERATE_NEW_TOKEN = (payload: GENERATE_NEW_TOKEN_PAYLOAD): Connection => {
  return {
    method: "POST",
    endpoint: `/api/auth-tokens/generate/${payload.email}`,
    payload: payload,
  };
};

export default GENERATE_NEW_TOKEN;