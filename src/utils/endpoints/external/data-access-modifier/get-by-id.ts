import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ACCESS_MODIFIER_BY_ID = (accessModifierId: number) : Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.DATA_ACCESS_MODIFIER}/${accessModifierId}`,
  };
};

export default GET_ACCESS_MODIFIER_BY_ID;