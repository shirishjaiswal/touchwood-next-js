import { Connection } from "@/utils/api/types";

type UPDATE_ACCESS_MODIFIER_PAYLOAD = {
  id: number;
  value: string;
};

const UPDATE_ACCESS_MODIFIER_BY_ID = (payload: UPDATE_ACCESS_MODIFIER_PAYLOAD) : Connection => {
  return {
    method: "PUT",
    endpoint: `/api/accessModifier/${payload.id}`,
    payload: payload,
  };
};

export default UPDATE_ACCESS_MODIFIER_BY_ID;