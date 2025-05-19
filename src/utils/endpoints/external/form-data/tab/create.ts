import { Server_FormDataTab_Write } from "@/lib/types/form-data/tab";
import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const CREATE_FORM_DATA_TAB = (
  payload: Server_FormDataTab_Write,
  userId: number
): Connection => {
  return {
    method: "POST",
    endpoint: `${PrefixEndpoint.FORM_DATA_TAB}`,
    payload: payload,
  };
};

export default CREATE_FORM_DATA_TAB;