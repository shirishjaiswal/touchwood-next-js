import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_FORM_DATA_GROUP_BY_ID = (
  id: number,
): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.FORM_DATA_GROUP}/${id}`,
  };
};

export default GET_FORM_DATA_GROUP_BY_ID;