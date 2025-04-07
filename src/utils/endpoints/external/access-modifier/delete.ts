import { Connection } from "@/utils/api/types";

const DELETE_ACCESS_MODIFIER_BY_ID = (accessModifierId: number) : Connection => {
  return {
    method: "DELETE",
    endpoint: `/api/accessModifier/${accessModifierId}`,
  };
};

export default DELETE_ACCESS_MODIFIER_BY_ID;