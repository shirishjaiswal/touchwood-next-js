import { Connection } from "@/utils/api/types";

export type CREATE_ACCESS_MODIFIER_PAYLOAD = {
  value: string;
}

const CREATE_ACCESS_MODIFIER = (payload: CREATE_ACCESS_MODIFIER_PAYLOAD) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/accessModifier",
    payload: payload,
  };
};

export default CREATE_ACCESS_MODIFIER;