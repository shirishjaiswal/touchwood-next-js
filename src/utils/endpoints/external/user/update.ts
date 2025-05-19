import { Connection } from "@/utils/api/types";
import { REGISTER_PAYLOAD_TYPE } from "@/utils/endpoints/external/account/register";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const UPDATE_USER_ACCOUNT = (payload: REGISTER_PAYLOAD_TYPE): Connection => {
	return {
		method: "PUT",
		endpoint: `${PrefixEndpoint.ACCOUNT}/${payload}`,
		payload: payload,
	};
};

export default UPDATE_USER_ACCOUNT;
