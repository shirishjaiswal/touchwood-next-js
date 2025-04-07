import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { emailSchema } from "@/lib/validations/email";
import GET_USER_ACCOUNT_BY_EMAIL from "@/utils/endpoints/external/account-holder/get-by-email";
import { sendVerificationEmail } from "@/lib/email/generate-token-send-mail";

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

		// Handle email verification request
		const email = verifyAccount as string;
		const apiResponseGetAccount = await serverApiRequest({
			connection: GET_USER_ACCOUNT_BY_EMAIL(email),
		});

		if (!apiResponseGetAccount?.data) {
			return NextResponse.json({ error: "Email not found" }, { status: 404 });
		}

		await sendVerificationEmail(
			apiResponseGetAccount.data.email,
			apiResponseGetAccount.data.firstName,
			apiResponseGetAccount.data.lastName
		);

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
