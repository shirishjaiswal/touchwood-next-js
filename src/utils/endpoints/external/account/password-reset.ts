import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type PASSWORD_RESET_PAYLOAD_TYPE = {
  password: string;
  confirmPassword: string;
  token: string;
};
const PASSWORD_RESET = (payload: PASSWORD_RESET_PAYLOAD_TYPE) : Connection => {
  console.log(`${PrefixEndpoint.ACCOUNT}/password-reset/?token=${payload.token}`);
  return {
    method: "POST",
    endpoint: `${PrefixEndpoint.ACCOUNT}/password-reset?token=${payload.token}`,
    payload: {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    },
  };
};

export default PASSWORD_RESET;