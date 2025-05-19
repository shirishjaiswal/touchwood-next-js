import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import CREATE_EMAIL_TEMPLATE, {
	CREATE_EMAIL_TEMPLATE_PAYLOAD,
} from "@/utils/endpoints/external/email-template/create";
import { getUserId } from "@/lib/session/session";
import { checkAndValidateText } from "@/lib/validations/text";
import validateEmailTemplateWritePermission from "@/utils/helper/internal-apis/validate-template-creation";

export async function POST(request: Request) {
	try {
		const requestBody = await request.json();

		const { label, subject, body, accessModifierId } = requestBody;

		const isLabelValid = checkAndValidateText(label);
		const isSubjectValid = checkAndValidateText(subject);
		const isBodyValid = checkAndValidateText(body);

		if (!isLabelValid || !isSubjectValid || !isBodyValid) {
			return NextResponse.json(
				{ error: "Invalid input fields" },
				{ status: 400 }
			);
		}

		const currentUserId = await getUserId();

		const hasPermissionToCreate =
			await validateEmailTemplateWritePermission(accessModifierId);
		if (!hasPermissionToCreate) {
			return NextResponse.json(
				{
					error:
						"You are not authorized to create an email template with this access level",
				},
				{ status: 403 }
			);
		}

		const newEmailTemplatePayload: CREATE_EMAIL_TEMPLATE_PAYLOAD = {
			id: undefined,
			label,
			subject,
			body,
			userId: currentUserId,
			accessModifierId,
		};

		const creationResponse = await serverApiRequest({
			connection: CREATE_EMAIL_TEMPLATE(newEmailTemplatePayload),
		});

		if (!creationResponse?.data) {
			return NextResponse.json(
				{ error: "Email template creation failed" },
				{ status: 500 }
			);
		}

		return NextResponse.json(creationResponse.data, { status: 201 });
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "An unexpected server error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
