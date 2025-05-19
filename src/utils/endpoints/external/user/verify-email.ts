import { Connection } from "@/utils/api/types";
import { LOGIN_PAYLOAD_TYPE } from "../account/login";

const VERIFY_EMAIL = (payload: LOGIN_PAYLOAD_TYPE): Connection => {
	return {
		method: "PUT",
		endpoint: "/api/users/verify-email",
		payload: payload,
	};
};

export default VERIFY_EMAIL;
