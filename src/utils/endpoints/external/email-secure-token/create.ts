import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD= {
  emailPassword: string;
  userId: number;
}

const CREATE_USER_EMAIL_SECURE_TOKEN = (payload: CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD): Connection => {
  return {
    method: "POST",
    endpoint: `${PrefixEndpoint.USER_EMAIL_CONFIG_KEY}`,
    payload: payload,
  };
};

export default CREATE_USER_EMAIL_SECURE_TOKEN;