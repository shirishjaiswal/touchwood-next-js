import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import CREATE_USER_EMAIL_SECURE_TOKEN, {
	CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD,
} from "@/utils/endpoints/external/email-secure-token/create";
import { getUserId } from "@/lib/session/session";

export async function POST(request: Request) {
	try {
		let body;
		try {
			body = await request.json();
		} catch {
			return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
		}

		const privateToken = body.privateToken as string;
		if (!privateToken) {
			return NextResponse.json(
				{ error: "Private token is required" },
				{ status: 400 }
			);
		}

		const userId = await getUserId();
		if (!userId || typeof userId !== "number") {
			return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
		}

		const payload: CREATE_USER_EMAIL_SECURE_TOKEN_PAYLOAD = {
			emailPassword: privateToken,
			userId,
		};

		const apiResponse = await serverApiRequest({
			connection: CREATE_USER_EMAIL_SECURE_TOKEN(payload),
		});

		if (apiResponse?.error) {
			return NextResponse.json(
				{ error: apiResponse.error ?? "Failed to create secure token" },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ data: "Secure token created successfully" },
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
