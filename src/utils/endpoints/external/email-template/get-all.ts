import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_EMAIL_TEMPLATE = (): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}/all`,
  };
};

export default GET_ALL_EMAIL_TEMPLATE;