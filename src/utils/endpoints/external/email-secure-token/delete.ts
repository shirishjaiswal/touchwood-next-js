import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID = (userId: number): Connection => {
  return {
    method: "DELETE",
    endpoint: `${PrefixEndpoint.USER_EMAIL_CONFIG_KEY}${userId}`,
  };
};

export default DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID;