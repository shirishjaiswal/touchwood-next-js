import { getUserId } from "@/lib/session/session";
import { checkAndValidateText } from "@/lib/validations/text";
import serverApiRequest from "@/utils/api/server-api-request";
import UPDATE_EMAIL_TEMPLATE, {
	UPDATE_EMAIL_TEMPLATE_PAYLOAD,
} from "@/utils/endpoints/external/email-templates/update";
import validateEmailTemplateCreationPermission from "@/utils/helper/internal-apis/validate-template-creation";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const requestBody = await request.json();

		const {
			id: templateId,
			label: templateLabel,
			subject: templateSubject,
			body: templateBody,
			accessModifierId,
		} = requestBody;

		const isLabelValid = checkAndValidateText(templateLabel);
		const isSubjectValid = checkAndValidateText(templateSubject);
		const isBodyValid = checkAndValidateText(templateBody);

		if (
			!templateId ||
			!isLabelValid ||
			!isSubjectValid ||
			!isBodyValid ||
			!accessModifierId
		) {
			return NextResponse.json(
				{ error: "Invalid input fields" },
				{ status: 400 }
			);
		}

		const currentUserId = await getUserId();

		const hasPermissionToUpdate =
			await validateEmailTemplateCreationPermission(accessModifierId);
		if (!hasPermissionToUpdate) {
			return NextResponse.json(
				{
					error:
						"You are not authorized to update an email template with this access level",
				},
				{ status: 403 }
			);
		}

		const updatePayload: UPDATE_EMAIL_TEMPLATE_PAYLOAD = {
			id: templateId,
			label: templateLabel,
			subject: templateSubject,
			body: templateBody,
			userId: currentUserId,
			accessModifierId,
		};

		const updateResponse = await serverApiRequest({
			connection: UPDATE_EMAIL_TEMPLATE(updatePayload),
		});

		if (!updateResponse?.data) {
			return NextResponse.json(
				{ error: "Email template not found or update failed" },
				{ status: 404 }
			);
		}

		return NextResponse.json(updateResponse.data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
