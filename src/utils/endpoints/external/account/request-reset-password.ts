import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const REQUEST_RESET_PASSWORD = (email: string) : Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.ACCOUNT}/request-password-reset/${email}`,
  };
};

export default REQUEST_RESET_PASSWORD;  