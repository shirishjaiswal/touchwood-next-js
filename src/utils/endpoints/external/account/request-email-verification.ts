import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const REQUEST_EMAIL_VERIFICATION = (email: string) : Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.ACCOUNT}/request-email-verification/${email}`,
  };
};

export default REQUEST_EMAIL_VERIFICATION;  