import { Connection } from "@/utils/api/types";
import { REGISTER_PAYLOAD_TYPE } from "../auth/register";

const UPDATE_USER_ACCOUNT = (payload: REGISTER_PAYLOAD_TYPE): Connection => {
  return {
    method: "PUT",
    endpoint: `/api/users/${payload.id}`,
    payload: payload,
  };
};

export default UPDATE_USER_ACCOUNT;