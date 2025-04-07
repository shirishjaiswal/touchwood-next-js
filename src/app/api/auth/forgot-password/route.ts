import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { emailSchema } from "@/lib/validations/email";
import GET_USER_ACCOUNT_BY_EMAIL from "@/utils/endpoints/external/account-holder/get-by-email";
import { sendPasswordResetEmail } from "@/lib/email/generate-token-send-mail";

export async function POST(request: Request) {
	const formData = await request.formData();
	const body = Object.fromEntries(formData.entries());
	const parsedData: ReturnType<typeof emailSchema.safeParse> =
		emailSchema.safeParse(body.email);
	if (!parsedData.success) {
		const errorMessage = parsedData.error.errors
			.map((e) => e.message)
			.join(", ");
		return NextResponse.redirect(
			new URL(
				`/auth/register?error=${encodeURIComponent(errorMessage)}`,
				request.url
			)
		);
	}

	const apiResponseGetAccount = await serverApiRequest({
		connection: GET_USER_ACCOUNT_BY_EMAIL(formData.get("email") as string),
	});

	if (!apiResponseGetAccount?.data) {
		return NextResponse.redirect(new URL(`/auth/register`, request.url));
	}

	sendPasswordResetEmail(
		apiResponseGetAccount.data.email,
		apiResponseGetAccount.data.firstName,
		apiResponseGetAccount.data.lastName
	);

	return NextResponse.redirect(
		new URL(
			`/auth/login?success=${encodeURIComponent("Verification email sent!")}`,
			request.url
		)
	);
}
