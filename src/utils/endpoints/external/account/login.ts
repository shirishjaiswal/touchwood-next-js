import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type LOGIN_PAYLOAD_TYPE = {
  email: string;
  password: string;
  token?: string | null;
}

const LOGIN = (payload: LOGIN_PAYLOAD_TYPE) : Connection => {
  let endpoint = `${PrefixEndpoint.ACCOUNT}/login`;
  if (payload.token) {
    endpoint = `${PrefixEndpoint.ACCOUNT}/login?token=${payload.token}`;
  }

  return {
    method: "POST",
    endpoint: endpoint,
    payload: {
      "email": payload.email,
      "password": payload.password,
    },
  };
};

export default LOGIN;