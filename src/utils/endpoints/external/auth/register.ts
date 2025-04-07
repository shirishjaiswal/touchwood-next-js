import Role from "@/lib/types/role";
import { Connection } from "@/utils/api/types";

export type REGISTER_PAYLOAD_TYPE = {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  password: string;
};

const REGISTER = (payload: REGISTER_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/user/register",
    payload: payload,
  };
};

export default REGISTER;  