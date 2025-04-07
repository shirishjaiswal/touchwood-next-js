import { Connection } from "@/utils/api/types";

export type CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD= {
  emailPassword: string;
  userId: number;
}

const CREATE_USER_EMAIL_SECURE_TOKEN = (payload: CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD): Connection => {
  return {
    method: "POST",
    endpoint: "/api/user-email-credentials",
    payload: payload,
  };
};

export default CREATE_USER_EMAIL_SECURE_TOKEN;