import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

export type DELETE_EMAIL_TEMPLATE_PAYLOAD = {
	templateId: number;
	userId: number;
};

const DELETE_EMAIL_TEMPLATE_BY_ID = (
	payload: DELETE_EMAIL_TEMPLATE_PAYLOAD
): Connection => {
	return {
		method: "DELETE",
		endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}/${payload.templateId}?userId=${payload.userId}`,
	};
};

export default DELETE_EMAIL_TEMPLATE_BY_ID;
