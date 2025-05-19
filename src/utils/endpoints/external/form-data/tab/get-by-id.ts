import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_FORM_DATA_TAB_BY_ID = (
  id: number,
  userId: number,
): Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.FORM_DATA_TAB}?userId=${userId}`,
  };
};

export default GET_FORM_DATA_TAB_BY_ID;