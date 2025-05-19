import { getUserRoles } from "@/lib/session/session";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/data-access-modifier/get-all";

async function fetchAccessModifiers() {
	const response = await serverApiRequest({
		connection: GET_ALL_ACCESS_MODIFIERS(),
	});
	return response.data;
}

// Main validation function for email template creation
async function validateEmailTemplateWritePermission(accessModifierId: number) {
	const userRoles = await getUserRoles();
	const isAdmin = userRoles.some((role) => role === "Admin");

	if (isAdmin) return true;

	const accessModifiers = await fetchAccessModifiers();

	const accessModifier = accessModifiers.find(
		(modifier: { id: number }) => modifier.id === accessModifierId
	);
	return (
		accessModifier?.value === "Public" || accessModifier?.value === "Private"
	);
}

export default validateEmailTemplateWritePermission;
