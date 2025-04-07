import { Connection } from "@/utils/api/types";

export type VALIDATE_AND_DELETE_TOKEN_PAYLOAD = {
  token: string;
  email: string;
}

const VALIDATE_AND_DELETE_TOKEN = (payload: VALIDATE_AND_DELETE_TOKEN_PAYLOAD): Connection => {
  return {
    method: "GET",
    endpoint: `/api/auth-tokens/validate-and-delete`,
    payload: payload
  };
};

export default VALIDATE_AND_DELETE_TOKEN;