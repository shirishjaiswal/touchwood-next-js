import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_EMAIL_TEMPLATE_BY_LABEL from "@/utils/endpoints/external/email-template/get-by-label";
import konsole from "@/utils/logging/konsole";

export async function GET(
	request: Request,
	{ params }: { params: { label: string } }
) {
	try {
		const { label } = params;

		if (!label || typeof label !== "string") {
			return NextResponse.json(
				{ error: "Invalid or missing email template label" },
				{ status: 400 }
			);
		}

		const response = await serverApiRequest({
			connection: GET_EMAIL_TEMPLATE_BY_LABEL({ label }),
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
			error instanceof Error ? error.message : "An unknown error occurred";

		konsole.error("GET /config-emails/label/[label] error:", errorMessage);

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
