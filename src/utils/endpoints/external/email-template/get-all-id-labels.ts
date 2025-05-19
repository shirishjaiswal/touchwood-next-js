import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_EMAILS_TEMPLATE_ID_LABEL = (): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}/id-label`,
  };
};

export default GET_ALL_EMAILS_TEMPLATE_ID_LABEL;