import { NextResponse } from "next/server";
import konsole from "@/utils/logging/konsole";
import serverApiRequest from "@/utils/api/server-api-request";
import { passwordSchema } from "@/lib/validations/password";
import { hashPassword } from "@/lib/validations/hashPassword";
import PASSWORD_RESET, { PASSWORD_RESET_PAYLOAD_TYPE } from "@/utils/endpoints/external/account/password-reset";

export async function POST(
	request: Request,
) {
	try {
		const requestUrl = new URL(request.url);
		const rawToken = requestUrl.searchParams.get("token");
		const token = rawToken ? encodeURIComponent(rawToken) : null;
		const body = await request.json();
		const parsedData = passwordSchema.safeParse(body.password);

		if (!parsedData.success) {
			const errorMessage = parsedData.error.errors
				.map((e) => e.message)
				.join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}
		if (body.password !== body.confirmPassword) {
			return NextResponse.json(
				{ error: "Passwords do not match" },
				{ status: 400 }
			)
		}
		
		if(!token) {
			return NextResponse.json(
				{ error: "Invalid Url" },
				{ status: 400 }
			)
		}
		const hashedPassword = await hashPassword(body.password as string);
		const hashedConfirmPassword = await hashPassword(
			body.confirmPassword as string
		);

		const payload: PASSWORD_RESET_PAYLOAD_TYPE = {
			password: hashedPassword,
			confirmPassword: hashedConfirmPassword,
			token,
		}

		const passwordResetResponse = await serverApiRequest({
			connection: PASSWORD_RESET(payload),
		});

		if (!passwordResetResponse?.data) {
			return NextResponse.redirect(
				new URL(
					`/auth/login?error=${encodeURIComponent("Error updating account")}`,
					request.url
				)
			);
		}

		return NextResponse.redirect(
			new URL(
				`/auth/login?success=${encodeURIComponent("Password reset successfully")}`,
				request.url
			)
		);
	} catch (error) {
		konsole.error("Register API Error:", error);
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.redirect(
			new URL(
				`/auth/register?error=${encodeURIComponent(errorMessage)}`,
				request.url
			)
		);
	}
}
