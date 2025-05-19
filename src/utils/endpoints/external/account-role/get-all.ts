import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_ACCOUNT_ROLES = (): Connection => {
	return {
		method: "GET",
		endpoint: `${PrefixEndpoint.ACCOUNT_ROLE}`,
	};
};

export default GET_ALL_ACCOUNT_ROLES;
