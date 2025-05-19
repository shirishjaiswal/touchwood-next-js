import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_USER_EMAIL_SECURE_TOKEN from "@/utils/endpoints/external/email-secure-token/get";
import { getUserId } from "@/lib/session/session";

export async function GET() {
	try {
		const userId = await getUserId();
		if (typeof userId !== "number" || isNaN(userId)) {
			return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
		}

		// Perform login request
		const apiResponse = await serverApiRequest({
			connection: GET_USER_EMAIL_SECURE_TOKEN(userId),
		});

		if (apiResponse?.error) {
			return NextResponse.json(
				{ error: apiResponse.error || "Failed to Fetch secure token" },
				{ status: 500 }
			);
		}

		return NextResponse.json(apiResponse.data);
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{ status: 500 }
		);
	}
}
