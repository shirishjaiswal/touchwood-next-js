import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import IS_USER_EMAIL_SECURE_TOKEN_PRESENT from "@/utils/endpoints/external/email-secure-token/is-present";
import { getUserId } from "@/lib/session/session";

export async function GET() {
	try {
		const userId = await getUserId();

		const apiResponse = await serverApiRequest({
			connection: IS_USER_EMAIL_SECURE_TOKEN_PRESENT(userId),
		});
		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: apiResponse.error || "Failed to Fetch secure token" },
				{ status: 404 }
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
