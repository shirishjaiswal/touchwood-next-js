import { Connection } from "@/utils/api/types";

const GET_ACCESS_MODIFIER_BY_ID = (accessModifierId: number) : Connection => {
  return {
    method: "GET",
    endpoint: `/api/accessModifier/${accessModifierId}`,
  };
};

export default GET_ACCESS_MODIFIER_BY_ID;