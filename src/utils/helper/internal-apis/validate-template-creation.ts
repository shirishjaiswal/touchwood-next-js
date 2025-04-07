import { getUserRoles } from "@/lib/session/session";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/access-modifier/get-all";
import GET_ALL_ROLES from "@/utils/endpoints/external/role/get-all";

async function fetchAccessModifiers() {
	const response = await serverApiRequest({
		connection: GET_ALL_ACCESS_MODIFIERS(),
	});
	return response.data;
}

async function fetchAllRoles() {
	const response = await serverApiRequest({
		connection: GET_ALL_ROLES(),
	});
	return response.data;
}

async function getHighestPriorityUserRole() {
	const userRoles = await getUserRoles();
	const allRoles = await fetchAllRoles();

	const matchedRoles = allRoles.filter((role: { value: string; }) =>
		userRoles.includes(role.value)
	);

	if (matchedRoles.length === 0) {
		return null;
	}

	return matchedRoles.reduce(
		(max: { priority: number }, role: { priority: number }) =>
			role.priority > max.priority ? role : max
	);
}

// Main validation function for email template creation
async function validateEmailTemplateCreationPermission(accessModifierId: number) {
	const highestPriorityRole = await getHighestPriorityUserRole();
	const accessModifiers = await fetchAccessModifiers();

	if (
		highestPriorityRole.id !==
		accessModifiers.find((item: { id: number; }) => item.id === accessModifierId)?.role.id
	)
		return false;
	else return true;
}

export default validateEmailTemplateCreationPermission;
