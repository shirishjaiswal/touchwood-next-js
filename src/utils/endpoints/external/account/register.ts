import Role from "@/lib/types/role";
import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type REGISTER_PAYLOAD_TYPE = {
  firstName: string;
  lastName: string;
  email: string;
  accountRoles: Role[];
  password: string;
};

const REGISTER = (payload: REGISTER_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: `${PrefixEndpoint.ACCOUNT}/register`,
    payload: payload,
  };
};

export default REGISTER;  