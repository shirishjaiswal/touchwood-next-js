import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type CREATE_ACCESS_MODIFIER_PAYLOAD = {
	value: string;
};

const CREATE_DATA_ACCESS_MODIFIER = (
	payload: CREATE_ACCESS_MODIFIER_PAYLOAD
): Connection => {
	return {
		method: "POST",
		endpoint: `${PrefixEndpoint.DATA_ACCESS_MODIFIER}`,
		payload: payload,
	};
};

export default CREATE_DATA_ACCESS_MODIFIER;
