import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_USER_ACCOUNT_BY_EMAIL = (email: string): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.USER}/email/${email}`,
  };
};

export default GET_USER_ACCOUNT_BY_EMAIL;