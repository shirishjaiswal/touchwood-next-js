import { Connection } from "@/utils/api/types";
import { PrefixEndpoint } from "@/utils/endpoints/external/index";

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
		endpoint: `${PrefixEndpoint.EMAIL_TEMPLATE}`,
		payload: payload,
	};
};

export default CREATE_EMAIL_TEMPLATE;
