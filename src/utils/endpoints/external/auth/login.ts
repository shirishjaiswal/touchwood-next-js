import { Connection } from "@/utils/api/types";

export type LOGIN_PAYLOAD_TYPE = {
  email: string;
  password: string;
  token?: string | null;
}

const LOGIN = (payload: LOGIN_PAYLOAD_TYPE) : Connection => {
  let endpoint = "/api/user/login";
  if (payload.token) {
    endpoint = `/api/user/login?token=${payload.token}`;
  }

  console.log(endpoint);
  console.log(payload);
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