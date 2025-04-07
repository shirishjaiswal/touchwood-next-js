import { Connection } from "@/utils/api/types";

export type CREATE_EMAIL_TEMPLATE_PAYLOAD = {
  id?: number;
	label: string;
	subject: string;
	body: string;
	userId: number;
	accessModifierId: number;
};

const CREATE_EMAIL_TEMPLATE = (
	payload: CREATE_EMAIL_TEMPLATE_PAYLOAD
): Connection => {
	return {
		method: "POST",
		endpoint: "/api/email-templates",
		payload: payload,
	};
};

export default CREATE_EMAIL_TEMPLATE;
