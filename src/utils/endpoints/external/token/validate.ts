import { Connection } from "@/utils/api/types";

export type VALIDATE_TOKEN_PAYLOAD = {
  token: string;
  email: string;
}

const VALIDATE_TOKEN = (payload: VALIDATE_TOKEN_PAYLOAD): Connection => {
  return {
    method: "GET",
    endpoint: `/api/auth-tokens/validate`,
    payload: payload
  };
};

export default VALIDATE_TOKEN;

