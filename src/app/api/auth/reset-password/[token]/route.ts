import { NextResponse } from "next/server";
import konsole from "@/utils/logging/konsole";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_USER_ACCOUNT_BY_EMAIL from "@/utils/endpoints/external/account-holder/get-by-email";
import { passwordSchema } from "@/lib/validations/password";
import { decryptToken } from "@/lib/token/encrypt-decrypt-token";
import UPDATE_USER_ACCOUNT from "@/utils/endpoints/external/account-holder/update";
import { REGISTER_PAYLOAD_TYPE } from "@/utils/endpoints/external/auth/register";

export async function POST(
	request: Request,
	{ params }: { params: { token: string } }
) {
	try {
		const { token } = await params;
		const decryptedToken = decryptToken(token);
		const formData = await request.formData();
		const body = Object.fromEntries(formData.entries());
		const parsedData = passwordSchema.safeParse(body.password);
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
		if (body.password !== body["confirm-password"]) {
			return NextResponse.redirect(
				new URL(
					`/auth/login?error=${encodeURIComponent("Passwords do not match")}`,
					request.url
				)
			);
		}
		const apiResponseGetAccount = await serverApiRequest({
			connection: GET_USER_ACCOUNT_BY_EMAIL(decryptedToken.email),
		});
		if (!apiResponseGetAccount?.data) {
			return NextResponse.redirect(new URL(`/auth/register`, request.url));
		}

		// const hashedPassword = await hashPassword(body.password as string);

		//TODO : Make an api to update the password in the backedn and call it
		const payload: REGISTER_PAYLOAD_TYPE = apiResponseGetAccount.data;

		const apiResponseUpdate = await serverApiRequest({
			connection: UPDATE_USER_ACCOUNT(payload),
		});

		if (!apiResponseUpdate?.data) {
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
