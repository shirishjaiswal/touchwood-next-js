import { Connection } from "@/utils/api/types";
import { LOGIN_PAYLOAD_TYPE } from "@/utils/endpoints/types/auth/login";

const LOGIN = (payload: LOGIN_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/auth/login",
    payload: {
      "username": payload.username,
      "password": payload.password
    },
  };
};

export default LOGIN;