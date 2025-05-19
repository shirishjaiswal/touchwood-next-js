import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const DELETE_ACCESS_MODIFIER_BY_ID = (accessModifierId: number) : Connection => {
  return {
    method: "DELETE",
    endpoint: `${PrefixEndpoint.DATA_ACCESS_MODIFIER}/${accessModifierId}`,
  };
};

export default DELETE_ACCESS_MODIFIER_BY_ID;