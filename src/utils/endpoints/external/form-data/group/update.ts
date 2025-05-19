import { FormDataGroup_UpWrite } from "@/lib/types/form-data/group";
import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const UPDATE_FORM_DATA_GROUP = (
  id: number,
  payload: FormDataGroup_UpWrite,
  userId: number,
): Connection => {
  return {
    method: "PUT",
    endpoint: `${PrefixEndpoint.FORM_DATA_GROUP}/${id}`,
    payload: payload,
  };
};

export default UPDATE_FORM_DATA_GROUP;