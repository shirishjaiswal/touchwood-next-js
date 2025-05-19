import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_FORM_DATA_GROUP = (): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.FORM_DATA_GROUP}`,
  };
};

export default GET_ALL_FORM_DATA_GROUP;