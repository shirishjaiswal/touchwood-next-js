import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const DELETE_FORM_DATA_GROUP = (
  id: number,
  userId: number,
): Connection => {
  return {
    method: "DELETE",
    endpoint: `${PrefixEndpoint.FORM_DATA_GROUP}/${id}?userId=${userId}`,
  };
};

export default DELETE_FORM_DATA_GROUP;