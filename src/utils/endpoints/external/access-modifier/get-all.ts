import { Connection } from "@/utils/api/types";

const GET_ALL_ACCESS_MODIFIERS = () : Connection => {
  return {
    method: "GET",
    endpoint: `/api/accessModifier`,
  };
};

export default GET_ALL_ACCESS_MODIFIERS;