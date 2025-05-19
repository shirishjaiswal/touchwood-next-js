import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { registerSchema } from "@/lib/validations/register";
import REGISTER, {
	REGISTER_PAYLOAD_TYPE,
} from "@/utils/endpoints/external/account/register";
import GET_USER_ACCOUNT_BY_EMAIL from "@/utils/endpoints/external/user/get-by-email";
import { hashPassword } from "@/lib/validations/hashPassword";
import GET_ALL_ACCOUNT_ROLES from "@/utils/endpoints/external/account-role/get-all";

export async function POST(request: Request) {
	try {
		// Get form data
		const formData = await request.formData();
		const body = Object.fromEntries(formData.entries());

		// Validate data based on request type
		const parsedData = registerSchema.safeParse(body);

		if (!parsedData.success) {
			const errorMessage = parsedData.error.errors
				.map((e) => e.message)
				.join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		// Handle registration
		const {
			"first-name": firstName,
			"last-name": lastName,
			email,
			password,
			"confirm-password": confirmPassword,
		} = parsedData.data as {
			"first-name": string;
			"last-name": string;
			email: string;
			password: string;
			"confirm-password": string;
		};

		if (password !== confirmPassword) {
			return NextResponse.json(
				{ error: "Passwords do not match" },
				{ status: 400 }
			);
		}

		// Check if email already exists
		const existingUser = await serverApiRequest({
			connection: GET_USER_ACCOUNT_BY_EMAIL(email),
		});

		if (existingUser?.data) {
			return NextResponse.json(
				{ error: "Email already registered" },
				{ status: 409 }
			);
		}

		const hashedPassword = await hashPassword(password);

		const { data: roles } = await serverApiRequest({
			connection: GET_ALL_ACCOUNT_ROLES(),
		});

		const userRole = roles.find(
			(role: { value: string }) => role.value.toLowerCase() === "user"
		);

		console.log(userRole);
		const securedBody: REGISTER_PAYLOAD_TYPE = {
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountRoles: [userRole],
		};

		const apiResponse = await serverApiRequest({
			connection: REGISTER(securedBody),
		});

		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: "Registration failed" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Registration successful! Verification email sent." },
			{ status: 201 }
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
