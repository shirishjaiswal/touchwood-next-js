import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID from "@/utils/endpoints/external/email-secure-token/delete-by-user-id";
import { getUserId } from "@/lib/session/session";

export async function DELETE(request: Request) {
	try {
		const userId = await getUserId();
		if (typeof userId !== "number" || isNaN(userId)) {
			return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
		}

		const apiResponse = await serverApiRequest({
			connection: DELETE_EMAIL_SECURE_TOKEN_BY_USER_ID(userId),
		});

		if (apiResponse?.error) {
			return NextResponse.json(
				{ error: apiResponse.error || "Failed to delete secure token" },
				{ status: 500 }
			);
		}

		return NextResponse.json(apiResponse.data);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "An unknown error occurred" },
			{ status: 500 }
		);
	}
}
