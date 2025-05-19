import { getUserEmail, getUserId } from "@/lib/session/session";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_USER_EMAIL_SECURE_TOKEN from "@/utils/endpoints/external/email-secure-token/get";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequestBody {
	recipients: string | string[];
	subject: string;
	mailBody: string;
}

export async function POST(req: Request) {
	const { recipients, subject, mailBody } =
		(await req.json()) as EmailRequestBody;

	if (!recipients || !subject || !mailBody) {
		return NextResponse.json(
			{ message: "Missing required fields" },
			{ status: 400 }
		);
	}

	const userId = await getUserId();
	const userMail = await getUserEmail();
	const apiResponse = await serverApiRequest({
		connection: GET_USER_EMAIL_SECURE_TOKEN(userId),
	});

	if (!apiResponse?.data) {
		throw new Error("Failed to Fetch secure token");
	}

	const secureToken = apiResponse.data;
	if (!secureToken) {
		throw new Error("Secure token not found");
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: userMail,
			pass: secureToken,
		},
	});

	const mailOptions = {
		from: userMail,
		sender: userMail,
		to: recipients,
		replyTo: recipients,
		subject,
		html: mailBody,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ message: "Failed to send email", error: (error as Error).message },
			{ status: 500 }
		);
	}
}
