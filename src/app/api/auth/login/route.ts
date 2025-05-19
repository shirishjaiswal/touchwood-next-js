import { NextResponse } from "next/server";
import { loginSchema } from "@/app/api/auth/validation";
import serverApiRequest from "@/utils/api/server-api-request";
import LOGIN_ENDPOINT, {
	LOGIN_PAYLOAD_TYPE,
} from "@/utils/endpoints/external/account/login";
import { createSession } from "@/lib/session/session";
import { hashPassword } from "@/lib/validations/hashPassword";

export async function POST(request: Request) {
	try {
		const requestUrl = new URL(request.url);
		const rawToken = requestUrl.searchParams.get("token");
		const token = rawToken ? encodeURIComponent(rawToken) : null;
		const body = await request.json();
		const validationResult = loginSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: validationResult.error.errors[0].message,
				},
				{
					status: 422,
					statusText: "Unprocessable Entity",
				}
			);
		}

		const { email } = validationResult.data;
		const password = body.password;
		const encryptedPassword = await hashPassword(password);
		const loginPayload: LOGIN_PAYLOAD_TYPE = {
			email,
			password: encryptedPassword,
			token,
		};

		const loginResponse = await serverApiRequest({
			connection: LOGIN_ENDPOINT(loginPayload),
		});

		if (loginResponse?.status === 403) {
			return NextResponse.json(
				{
					error: "Invalid credentials",
				},
				{
					status: 403,
					statusText: "Forbidden",
				}
			);
		}
		if (loginResponse?.status === 404) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{
					status: 404,
					statusText: "Not Found",
				}
			);
		}
		if (loginResponse?.status === 401) {
			return NextResponse.json(
				{
					error: "Email not verified",
				},
				{
					status: 401,
					statusText: "Unauthorized",
				}
			);
		}
		if (loginResponse?.error) {
			return NextResponse.json(
				{
					error: loginResponse.error,
				},
				{
					status: 401,
					statusText: "Unauthorized",
				}
			);
		}
		const {id, accountRoles} = loginResponse.data;

		const roleValues = accountRoles.map(
			(role: { id: number; value: string }) => role.value
		);

		await createSession(id, email, roleValues);

		return NextResponse.redirect(new URL("/home/dashboard", requestUrl));
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json(
			{
				error: errorMessage,
			},
			{
				status: 500,
				statusText: "Internal Server Error",
			}
		);
	}
}
