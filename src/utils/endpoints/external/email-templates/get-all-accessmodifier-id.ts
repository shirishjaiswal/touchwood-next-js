import { Connection } from "@/utils/api/types";

const GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID = (
	accessModifierId: number,
	page: number = 0,
	size: number = 10
): Connection => {
	return {
		method: "GET",
		endpoint: `/api/email-templates/access-modifier/${accessModifierId}?page=${page}&size=${size}`,
	};
};

export default GET_ALL_EMAILS_TEMPLATE_BY_ACCESSMODIFIER_ID;
