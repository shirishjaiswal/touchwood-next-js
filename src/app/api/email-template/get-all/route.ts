import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_EMAIL_TEMPLATE from "@/utils/endpoints/external/email-templates/get-all";
import { NextResponse } from "next/server";

// GET /api/config-emails
export async function GET() {
	try {
		const fetchResponse = await serverApiRequest({
			connection: GET_ALL_EMAIL_TEMPLATE(),
		});

		if (!fetchResponse?.data) {
			return NextResponse.json(
				{ error: "Failed to fetch email templates" },
				{ status: 400 }
			);
		}

		return NextResponse.json(fetchResponse.data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "An unexpected server error occurred";

		console.error("Error fetching email templates:", errorMessage);

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
