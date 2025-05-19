import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_EMAIL_TEMPLATE_BY_ID, {
	GET_EMAIL_TEMPLATE_BY_ID_PAYLOAD,
} from "@/utils/endpoints/external/email-template/get-by-id";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const emailTemplateId = Number(params.id);

		if (isNaN(emailTemplateId)) {
			return NextResponse.json(
				{ error: "Invalid email template ID" },
				{ status: 400 }
			);
		}

		const payload: GET_EMAIL_TEMPLATE_BY_ID_PAYLOAD = { id: emailTemplateId };

		const response = await serverApiRequest({
			connection: GET_EMAIL_TEMPLATE_BY_ID(payload),
		});

		if (!response?.data) {
			return NextResponse.json(
				{ error: "Email template not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(response.data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unexpected error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
