import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID = (
	accessModifierId: number,
	page: number = 0,
	size: number = 10
): Connection => {
	return {
		method: "GET",
		endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}/access-modifier/${accessModifierId}?page=${page}&size=${size}`,
	};
};

export default GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID;
