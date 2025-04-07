import { Connection } from "@/utils/api/types";

export type GET_ID_BY_TOKEN_PAYLOAD = {
  token: string
}
const GET_ID_BY_TOKEN = (payload: GET_ID_BY_TOKEN_PAYLOAD): Connection => {
  return {
    method: "GET",
    endpoint: `/api/auth-tokens/token`,
    payload: payload
  };
};

export default GET_ID_BY_TOKEN;