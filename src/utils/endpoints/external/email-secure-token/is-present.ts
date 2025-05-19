import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const IS_USER_EMAIL_SECURE_TOKEN_PRESENT = (userId: number): Connection => {
  return {
    method: "GET",
    endpoint:  `${PrefixEndpoint.USER_EMAIL_CONFIG_KEY}/is-present/${userId}`,
  };
};

export default IS_USER_EMAIL_SECURE_TOKEN_PRESENT;