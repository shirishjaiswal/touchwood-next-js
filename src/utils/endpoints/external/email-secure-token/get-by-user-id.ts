import { Connection } from "@/utils/api/types";

const GET_USER_EMAIL_SECURE_TOKEN = (userId: number): Connection => {
  return {
    method: "GET",
    endpoint: `/api/user-email-credentials/${userId}`,
  };
};

export default GET_USER_EMAIL_SECURE_TOKEN;