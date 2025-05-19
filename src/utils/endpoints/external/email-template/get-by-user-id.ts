import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

const GET_ALL_EMAIL_TEMPLATE_BY_USER_ID = (
	userId: number,
	page: number = 0,
	size: number = 10,
	accessModifierId?: number
): Connection => {
	let endpoint;
	if (accessModifierId === undefined) {
		endpoint = `${PrefixEndpoint.EMAIL_TEMPLATE}/user/${userId}?page=${page}&size=${size}`;
	} else {
		endpoint = `${PrefixEndpoint.EMAIL_TEMPLATE}/user/${userId}?accessModifierId=${accessModifierId}&page=${page}&size=${size}`;
	}
	return {
		method: "GET",
		endpoint: endpoint,
	};
};

export default GET_ALL_EMAIL_TEMPLATE_BY_USER_ID;
