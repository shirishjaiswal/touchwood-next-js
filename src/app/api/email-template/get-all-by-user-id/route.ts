import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_EMAIL_TEMPLATE_BY_USER_ID from "@/utils/endpoints/external/email-template/get-by-user-id";
import { getUserId } from "@/lib/session/session";

export async function GET(request: Request) {
	try {
		const userId = await getUserId();
		if (!userId) {
			return NextResponse.json({ error: "User ID not found" }, { status: 400 });
		}

		const { searchParams } = new URL(request.url);
		const accessModifierId = Number(searchParams.get("accessModifierId"));
		const page = Number(searchParams.get("page")) || 0;
		const size = Number(searchParams.get("size")) || 10;

		if (isNaN(accessModifierId)) {
			return NextResponse.json(
				{ error: "Invalid or missing accessModifierId" },
				{ status: 400 }
			);
		}

		const fetchResponse = await serverApiRequest({
			connection: GET_ALL_EMAIL_TEMPLATE_BY_USER_ID(
				userId,
				accessModifierId,
				page,
				size
			),
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
				: "An unknown server error occurred";
		console.error("Error in GET /config-emails/id-label:", errorMessage);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
