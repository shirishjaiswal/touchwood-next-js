import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_EMAILS_TEMPLATE_ID_LABEL from "@/utils/endpoints/external/email-templates/get-all-id-labels";

export async function GET() {
	try {
		const response = await serverApiRequest({
			connection: GET_ALL_EMAILS_TEMPLATE_ID_LABEL(),
		});

		if (!response?.data) {
			return NextResponse.json(
				{ error: "No email templates found or failed to fetch data" },
				{ status: 400 }
			);
		}

		return NextResponse.json(response.data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "An unexpected server error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
