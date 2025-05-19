import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_ACCESS_MODIFIERS = () : Connection => {
  return {
    method: "GET",
    endpoint: `${PrefixEndpoint.DATA_ACCESS_MODIFIER}`,
  };
};

export default GET_ALL_ACCESS_MODIFIERS;