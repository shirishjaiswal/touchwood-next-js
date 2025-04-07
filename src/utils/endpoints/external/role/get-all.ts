import { Connection } from "@/utils/api/types";

const GET_ALL_ROLES = (): Connection => {
	return {
		method: "GET",
		endpoint: "/api/roles",
	};
};

export default GET_ALL_ROLES;
