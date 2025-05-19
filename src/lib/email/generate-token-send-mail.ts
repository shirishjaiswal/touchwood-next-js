import serverApiRequest from "@/utils/api/server-api-request";
import GET_EMAIL_TEMPLATE_BY_LABEL from "@/utils/endpoints/external/email-template/get-by-label";
import {
	addLinkToTemplate,
	addUserNameToTemplate,
} from "@/lib/email/add-link-to-template";
import { sendEmail } from "@/lib/email/send-email";
import GENERATE_NEW_TOKEN from "@/utils/endpoints/external/token/generate-new";
import GET_USER_EMAIL_SECURE_TOKEN from "@/utils/endpoints/external/email-secure-token/get";
import { getUserEmail, getUserId } from "../session/session";

function sendMailViaTouchwood(to: string, subject: string, template: string) {
	const { from, pass } = getTouchwoodEmailConfig();
	return sendMail(from, to, subject, template, pass);
}

function getTouchwoodEmailConfig() {
	const { EMAIL_USER, EMAIL_PASS } = process.env;
	if (!EMAIL_USER || !EMAIL_PASS) {
		throw new Error("Missing required environment variables");
	}
	return {
		from: process.env.EMAIL_USER as string,
		pass: process.env.EMAIL_PASS as string,
	};
}
async function sendMail(
	from: string,
	to: string,
	subject: string,
	template: string,
	pass: string
) {
	try {
		await sendEmail({
			from,
			to,
			subject,
			template,
			pass,
		});
	} catch (error) {
		console.error(`Failed to send email to ${to}:`, error);
	}
}

async function generateTemplate(
	email: string,
	firstName: string,
	lastName: string,
	emailTemplate: string,
	templateType: string
) {
	try {
		const apiResponseToken = await serverApiRequest({
			connection: GENERATE_NEW_TOKEN({ email }),
		});

		if (!apiResponseToken?.data) {
			throw new Error("Failed to generate token");
		}

		const token = apiResponseToken.data;
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

		const link =
			templateType === "account-verification"
				? `${baseUrl}/auth/login?token=${token}`
				: `${baseUrl}/auth/reset-password/${token}`;

		const template = addLinkToTemplate(emailTemplate, link);
		return addUserNameToTemplate(template, `${firstName} ${lastName}`);
	} catch (error) {
		console.error(`Error generating template for ${email}:`, error);
		return "";
	}
}

export async function sendEmailViaUser(
	to: string | string[],
	subject: string,
	template: string
) {
	try {
		const userId = await getUserId();
		const userMail = await getUserEmail();
		const apiResponse = await serverApiRequest({
			connection: GET_USER_EMAIL_SECURE_TOKEN(userId),
		});

		if (!apiResponse?.data) {
			throw new Error("Failed to Fetch secure token");
		}

		const { secureToken } = apiResponse.data;
		if (!secureToken) {
			throw new Error("Secure token not found");
		}

		sendEmail({ from: userMail, to, subject, template, pass: secureToken });
	} catch (error) {
		console.error(`Failed to send email to ${to}:`, error);
	}
}

async function sendEmailByType(
	email: string,
	firstName: string,
	lastName: string,
	templateLabel: string,
	templateType: string
) {
	try {
		const apiResponseEmail = await serverApiRequest({
			connection: GET_EMAIL_TEMPLATE_BY_LABEL({ label: templateLabel }),
		});

		if (!apiResponseEmail?.data) {
			throw new Error(`Email template '${templateLabel}' not found`);
		}

		const { emailTemplate, subject } = apiResponseEmail.data;
		const template = await generateTemplate(
			email,
			firstName,
			lastName,
			emailTemplate,
			templateType
		);

		if (template) {
			await sendMailViaTouchwood(email, subject, template);
		}
	} catch (error) {
		console.error(`Failed to send ${templateLabel} email to ${email}:`, error);
	}
}

async function sendVerificationEmail(
	email: string,
	firstName: string,
	lastName: string
) {
	return sendEmailByType(
		email,
		firstName,
		lastName,
		"Account Verification",
		"account-verification"
	);
}

async function sendPasswordResetEmail(
	email: string,
	firstName: string,
	lastName: string
) {
	return sendEmailByType(
		email,
		firstName,
		lastName,
		"Forgot Password",
		"reset-password"
	);
}

export { sendVerificationEmail, sendPasswordResetEmail };
