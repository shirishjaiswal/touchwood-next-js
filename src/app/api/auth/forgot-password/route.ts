import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { emailSchema } from "@/lib/validations/email";
import REQUEST_RESET_PASSWORD from "@/utils/endpoints/external/account/request-reset-password";

export async function POST(request: Request) {
	const formData = await request.formData();
	const body = Object.fromEntries(formData.entries());
	const parsedData: ReturnType<typeof emailSchema.safeParse> =
		emailSchema.safeParse(body.email);
	if (!parsedData.success) {
		const errorMessage = parsedData.error.errors
			.map((e) => e.message)
			.join(", ");
		return NextResponse.json(
			{ error: errorMessage },
			{ status: 400 }
		);
	}

	const apiResponseGetAccount = await serverApiRequest({
		connection: REQUEST_RESET_PASSWORD(body.email as string),
	});

	if (!apiResponseGetAccount?.data) {
		return NextResponse.redirect(new URL(`/auth/register`, request.url));
	}

	return NextResponse.redirect(
		new URL(
			`/auth/login?success=${encodeURIComponent("Verification email sent!")}`,
			request.url
		)
	);
}
