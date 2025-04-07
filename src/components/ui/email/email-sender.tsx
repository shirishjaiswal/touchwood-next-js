"use client";
import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import { Run, Send } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatableDropdown, {
	CreatableDropdownOnChangeEvent,
} from "@/components/ui/dropdown/creatable-dropdown";
import AiHelpBox from "@/components/ui/ai/ai-help-box";
import { ReactSelectOption } from "@/components/ui/dropdown/types";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import Link from "next/link";

export type EmailTemplateType = {
	id: number;
	label: string;
	subject: string;
	body: string;
	accessModifierId: number;
};

interface EmailSenderProps {
	privateTokenPresent: boolean;
	emailTemplate: EmailTemplateType | null;
}

function EmailSender({ privateTokenPresent, emailTemplate }: EmailSenderProps) {
	const router = useRouter();
	const [emailBody, setEmailBody] = useState<string>(
		emailTemplate?.body || ""
	);
	const [emailtext, setEmailtext] = useState(
		emailTemplate?.body || ""
	);
	const [showView, setShowView] = useState<"code" | "view">("code");
	const [mailSubject, setMailSubject] = useState(emailTemplate?.subject || "");
	const [isSending, setSending] = useState(false);
	const [recipientsList, setRecipientsList] = useState<ReactSelectOption[]>([]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isUserEmailConfigured] =
		useState(privateTokenPresent);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const newTemplate = emailTemplate?.body || "";
		const newSubject = emailTemplate?.subject || "";
		setEmailBody(newTemplate);
		setEmailtext(newTemplate);
		setMailSubject(newSubject);
	}, [emailTemplate, isUserEmailConfigured]);

	const handleErrors = (): { [key: string]: string } => {
		const errors: { [key: string]: string } = {};
		if (recipientsList.length === 0)
			errors.recipients = "Please select recipients";
		else delete errors.recipients;
		if (emailBody === "") errors.emailBody = "Please enter email body";
		else delete errors.body;
		if (mailSubject === "") errors.subject = "Please enter email subject";
		else delete errors.subject;
		return errors;
	};
	const handleSend = async () => {
		setSending(true);
		const errors = handleErrors();
		if (Object.keys(errors).length > 0) {
			setErrors(errors);
			setSending(false);
			return;
		}

		try {
			const response = await axios.post("/api/email", {
				subject: mailSubject,
				recipients: recipientsList.map((r) => r.value),
				mailBody: emailBody,
			});
			if (response.status === 200) {
				setSending(false);
				router.back();
			}
		} catch (error) {
			setSending(false);
			console.error("Error sending email:", error);
		}
	};
	const handleRun = () => {
		setShowView("view");
		setEmailtext(emailBody);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setEmailBody(newValue);
	};

	const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMailSubject(e.target.value);
	};

	if (!isUserEmailConfigured) {
		return (
			<ModalBox
				title="Email Not Configured"
				subtitle="Before sending emails, you need to configure your email settings. Click the button below to proceed to the setup page, where you can follow the steps to complete the configuration."
				isOpen
				onClose={() => {
					router.push("/home/account/email-config");
				}}
			>
				<div className="flex justify-end">
					<Link
						id="update-email"
						className="bg-secondary text-white font-semibold rounded-md hover:bg-primary p-3"
						href={`/home/account/email-config`}
						title="Configure Now"
						autoFocus
					>
						Configure Now
					</Link>
				</div>
			</ModalBox>
		);
	} else
		return (
			<div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200">
				<div className=" px-2 m-1 items-center w-full flex justify-end">
					<ClickButton
						id="send-email"
						type="submit"
						variant="shadow-default"
						size="md"
						className="md:w-fit flex"
						title="Send Email"
						disabled={isSending}
						onClick={handleSend}
						autoFocus
					>
						<div className="flex gap-4">
							<p>{isSending ? "Sending..." : "Send"}</p>
							<Send />
						</div>
					</ClickButton>
				</div>
				<div className="w-full bg-gray-50 min-h-[calc(100vh-180px)]">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden p-4 gap-6 h-full">
						<div
							className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
								showView === "code" ? "" : "hidden md:flex"
							} flex-1`}
						>
							<div className="p-2 border-b border-gray-200">
								<div className="flex justify-between items-center">
									<h2 className="text-lg font-semibold text-gray-800">
										Email Editor
									</h2>
									<ClickButton
										id="run-template"
										variant="none"
										size="none"
										title="Run template"
										onClick={handleRun}
									>
										<Run className="w-8 h-6 rounded-4xl bg-primary" />
									</ClickButton>
								</div>
							</div>
							<div className="flex flex-col flex-1 gap-4 p-4">
								<CreatableDropdown
									id="label"
									name="label"
									aria-label="label"
									data-testid="label"
									label="Recipients"
									options={recipientsList}
									required
									onChange={function (
										event: CreatableDropdownOnChangeEvent
									): void {
										setRecipientsList(event.target.value);
									}}
									onCreateOption={function (
										event: CreatableDropdownOnChangeEvent
									): void {
										setRecipientsList(event.target.value);
									}}
									errorMessage={errors.recipients}
								/>
								<FieldInput
									id="email-subject"
									name="email-subject"
									aria-label="email-subject"
									data-testid="email-subject"
									label="Email Subject"
									type="text"
									required
									inputStyles={inputStyles}
									value={mailSubject}
									onChange={handleSubjectChange}
									errorMessage={errors.emailSubject}
								/>
								<label className="text-base font-semibold text-neutral-700">
									Email Template
								</label>
								<div className="relative">
									<textarea
										value={emailBody}
										required
										rows={20}
										onChange={handleChange}
										className={`w-full h-max border-none resize-none font-mono text-sm text-gray-700 bg-gray-50 rounded-md p-3 focus:outline-none ${inputStyles}`}
										spellCheck="false"
										placeholder="Edit your email template here..."
									/>
									{errors.emailTemplate &&
										-(
											<div
												id="error-message"
												className={`text-rose-700 text-sm font-medium`}
											>
												{errors.emailTemplate}
											</div>
										)}
									<AiHelpBox
										data={emailBody}
										updateData={setEmailBody}
										setLoading={setIsLoading}
									/>
								</div>
							</div>
						</div>
						<div
							className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
								showView === "code" ? "hidden md:flex" : ""
							} min-h-0 flex-1`}
						>
							<div className="p-2 md:py-2 border-b border-gray-200">
								<div className="flex justify-between items-center">
									<h2 className="text-lg font-semibold text-gray-800">
										Email Preview
									</h2>
									<ClickButton
										id="run-template"
										variant="outline-default"
										size="xs"
										onClick={() => setShowView("code")}
										className="block md:hidden"
									>
										Show Code
									</ClickButton>
								</div>
							</div>
							<div className="flex-1 p-4 min-h-[calc(100vh-34vh)]">
								<iframe
									srcDoc={emailtext}
									className="w-full h-full border border-gray-200 rounded-md bg-white"
									title="Email Preview"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default EmailSender;
