import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { emailSchema } from "@/lib/validations/email";
import REQUEST_EMAIL_VERIFICATION from "@/utils/endpoints/external/account/request-email-verification";

export async function POST(request: Request) {
	try {
		// Get form data
		const body = await request.json();
		const verifyAccount = body.email;

		// Validate data based on request type
		const parsedData = emailSchema.safeParse(verifyAccount);

		if (!parsedData.success) {
			const errorMessage = parsedData.error.errors
				.map((e) => e.message)
				.join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const email = verifyAccount as string;
		const apiResponseGetAccount = await serverApiRequest({
			connection: REQUEST_EMAIL_VERIFICATION(email),
		});

		if (!apiResponseGetAccount?.data) {
			return NextResponse.json({ error: "Email not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Verification email sent!" },
			{ status: 200 }
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
