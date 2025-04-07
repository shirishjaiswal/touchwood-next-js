import { Connection } from "@/utils/api/types";

const IS_USER_EMAIL_SECURE_TOKEN_PRESENT = (userId: number): Connection => {
  return {
    method: "GET",
    endpoint: `/api/user-email-credentials/is-present/${userId}`,
  };
};

export default IS_USER_EMAIL_SECURE_TOKEN_PRESENT;