import { Connection } from "@/utils/api/types";

export type DELETE_EMAIL_TEMPLATE_PAYLOAD = {
	templateId: number;
	userId: number;
};

const DELETE_EMAIL_TEMPLATE_BY_ID = (
	payload: DELETE_EMAIL_TEMPLATE_PAYLOAD
): Connection => {
	return {
		method: "DELETE",
		endpoint: `/api/email-templates/${payload.templateId}?userId=${payload.userId}`,
	};
};

export default DELETE_EMAIL_TEMPLATE_BY_ID;
