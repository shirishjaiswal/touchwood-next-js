import { Connection } from "@/utils/api/types";

const DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID = (userId: number): Connection => {
  return {
    method: "DELETE",
    endpoint: `/api/user-email-credentials/${userId}`,
  };
};

export default DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID;