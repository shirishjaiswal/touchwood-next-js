import { Server_FormDataGroup_Write } from "@/lib/types/form-data/group";
import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const CREATE_FORM_DATA_GROUP = (
  payload: Server_FormDataGroup_Write,
  userId: number
): Connection => {
  return {
    method: "POST",
    endpoint: `${PrefixEndpoint.FORM_DATA_GROUP}`,
    payload: payload,
  };
};

export default CREATE_FORM_DATA_GROUP;