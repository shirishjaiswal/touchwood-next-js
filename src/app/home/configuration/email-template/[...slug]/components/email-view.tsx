"use client";
import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import { Edit } from "@/components/ui/icons";
import Save from "@/components/ui/icons/action/save";
import FieldInput from "@/components/ui/input/field-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type EmailTemplateType = {
	id: number;
	label: string;
	subject: string;
	body: string;
};

interface EmailHtmlViewProps {
	emailTemplate: EmailTemplateType | null;
}

function EmailHtmlView({ emailTemplate }: EmailHtmlViewProps) {
	const router = useRouter();
	const [emailHtml, setEmailHtml] = useState<string>(
		emailTemplate?.body || ""
	);
	const [emailtext, setEmailtext] = useState(
		emailTemplate?.body || ""
	);
	const [label, setLabel] = useState(emailTemplate?.label || "");
	const [showView, setShowView] = useState<"code" | "view">("code");
	const [mailSubject, setMailSubject] = useState(emailTemplate?.subject || "");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		const newTemplate = emailTemplate?.body || "";
		const newSubject = emailTemplate?.subject || "";
		setEmailHtml(newTemplate);
		setEmailtext(newTemplate);
		setMailSubject(newSubject);
		setLabel(emailTemplate?.label || "Edit Label");
	}, [emailTemplate]);

	const handleRun = () => {
		setShowView("view");
		setEmailtext(emailHtml);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setEmailHtml(newValue);
	};

	const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMailSubject(e.target.value);
	};

	const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabel(e.target.value);
	};
	
	const handleUpdate = async () => {
		if (!emailTemplate?.id) return;

		setIsSubmitting(true);

		try {
			await axios.put(
				"/api/email-template/update",
				{
					id: emailTemplate.id,
					label: emailTemplate.label,
					subject: mailSubject,
					body: emailHtml,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			toast.success("Email template updated successfully");
			router.push("/home/configuration/email-template");
		} catch {
			toast.error("Failed to update email template");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleAddNewTemplate = async () => {
		setIsSubmitting(true);
		try {
			await axios.post(
				"/api/email-template/create",
				{
					label: label,
					subject: mailSubject,
					emailTemplate: emailHtml,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success("Email template created successfully");
			router.push("/home/configuration/email-template");
		} catch {
			toast.error("Failed to create email template");
			toast.error("Duplicate label name cannot be present");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (emailTemplate?.id) handleUpdate();
		else handleAddNewTemplate();
	};

	return (
		<form
			className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200"
			onSubmit={handleSave}
		>
			<div className="sticky top-32 grid grid-cols-2 px-4 items-center">
				<div className="flex gap-4">
					{isEditMode ? (
						<FieldInput
							id="template-label"
							type="text"
							value={label}
							onChange={handleLabelChange}
							placeholder="Template Label"
							name={"template-label"}
							aria-label={"template-label"}
							data-testid={"template-label"}
							mainContainerStyles="max-w-fit"
							inputStyles={inputStyles}
						/>
					) : (
						<h1 className="font-bold text-2xl uppercase">
							{label || "New Template"}
						</h1>
					)}
					<ClickButton
						id="label-edit-button"
						onClick={() => setIsEditMode(!isEditMode)}
						variant="none"
						size="none"
					>
						{isEditMode ? <Save /> : <Edit />}
					</ClickButton>
				</div>
				<div className="flex justify-end">
					<ClickButton
						id="update-email"
						type="submit"
						variant="shadow-default"
						size="md"
						className="md:w-fit flex"
						disabled={isSubmitting}
					>
						<div className="flex gap-4">
							<Save />
							<p>{isSubmitting ? "Saving..." : "Save"}</p>
						</div>
					</ClickButton>
				</div>
			</div>
			<div className="w-full bg-gray-50 min-h-[calc(100vh-180px)]">
				<div className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden p-4 gap-6 h-full">
					<div
						className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
							showView === "code" ? "" : "hidden md:flex"
						} min-h-0 flex-1`}
					>
						<div className="p-4 border-b border-gray-200">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-semibold text-gray-800">
									Email Editor
								</h2>
								<ClickButton
									id="run-template"
									variant="outline-default"
									size="xs"
									onClick={handleRun}
								>
									Run Template
								</ClickButton>
							</div>
						</div>
						<div className="flex flex-col flex-1 gap-4 p-4">
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
							/>
							<label className="text-base font-semibold text-neutral-700">
								Email Template
							</label>
							<textarea
								value={emailHtml}
								required
								rows={20}
								onChange={handleChange}
								className="w-full h-max border-none resize-none font-mono text-sm text-gray-700 bg-gray-50 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								spellCheck="false"
								placeholder="Edit your email template here..."
							/>
						</div>
					</div>
					<div
						className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
							showView === "code" ? "hidden md:flex" : ""
						} min-h-0 flex-1`}
					>
						<div className="p-4 md:py-6 border-b border-gray-200">
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
						<div className="flex-1 p-4 min-h-0">
							<iframe
								srcDoc={emailtext}
								className="w-full h-full border border-gray-200 rounded-md bg-white"
								title="Email Preview"
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default EmailHtmlView;
