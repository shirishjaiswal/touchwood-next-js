import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_USER_EMAIL_SECURE_TOKEN = (userId: number): Connection => {
  return {
    method: "GET",
    endpoint:  `${PrefixEndpoint.USER_EMAIL_CONFIG_KEY}/${userId}`,
  };
};

export default GET_USER_EMAIL_SECURE_TOKEN;