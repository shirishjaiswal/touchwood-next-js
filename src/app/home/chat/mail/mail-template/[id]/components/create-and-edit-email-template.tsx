"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import { Edit } from "@/components/ui/icons";
import SaveIcon from "@/components/ui/icons/action/save";
import AccessModifier from "@/lib/types/access-modifier";
import FieldInput from "@/components/ui/input/field-input";
import ClickButton from "@/components/ui/button/click-button";
import { inputStyles } from "@/app/auth/login/components/form-container";
import EmailEditor from "@/app/home/chat/mail/mail-template/[id]/components/email-editor";
import EmailCodeViewer from "@/app/home/chat/mail/mail-template/[id]/components/email-code-viewer";

export type EmailTemplate = {
	id: number;
	label: string;
	subject: string;
	body: string;
	userId: number;
	accessModifierId: number;
};

interface EmailTemplateProps {
	emailTemplate: EmailTemplate | null;
	accessModifiers: AccessModifier[];
}

const CreateOrEditEmailTemplate = ({
	emailTemplate,
	accessModifiers,
}: EmailTemplateProps) => {
	const [emailBody, setEmailBody] = useState<string>(emailTemplate?.body || "");
	const [viewedEmailBody, setViewedEmailBody] = useState<string>(emailTemplate?.body || "");
	const [templateLabel, setTemplateLabel] = useState<string>(emailTemplate?.label || "");
	const [currentView, setCurrentView] = useState<"code" | "view">("code");
	const [emailSubject, setEmailSubject] = useState<string>(emailTemplate?.subject || "");
	const [accessModifierId, setAccessModifierId] = useState<number>(
		emailTemplate?.accessModifierId || accessModifiers?.find((mod) => mod.value === "Private")?.id || 0
	);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (emailTemplate) {
			setEmailBody(emailTemplate.body);
			setViewedEmailBody(emailTemplate.body);
			setEmailSubject(emailTemplate.subject);
			setTemplateLabel(emailTemplate.label);
			setIsEditMode(false);
		} else {
			setIsEditMode(true);
		}
	}, [emailTemplate]);

	const handleEmailBodyChange = (newBody: string) => setEmailBody(newBody);
	const handleSubjectChange = (newSubject: string) => setEmailSubject(newSubject);
	const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => setTemplateLabel(e.target.value);

	const toggleEditMode = () => setIsEditMode((prev) => !prev);

	const handleRunTemplate = () => {
		setCurrentView("view");
		setViewedEmailBody(emailBody);
	};

	const validateFields = (): boolean => {
		if (!templateLabel) {
			toast.error("Template label is required");
			setIsEditMode(true);
			return false;
		}
		if (!emailSubject) {
			toast.error("Email subject is required");
			return false;
		}
		if (!emailBody) {
			toast.error("Email body is required");
			return false;
		}
		return true;
	};

	const handleUpdateTemplate = async () => {
		if (!emailTemplate?.id || !validateFields()) return;

		try {
			await axios.put(
				"/api/email-template/update",
				{
					id: emailTemplate.id,
					label: templateLabel,
					subject: emailSubject,
					body: emailBody,
					accessModifierId,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			toast.success("Email template updated successfully");
			router.push("/home/configuration/email-template");
		} catch {
			toast.error("Failed to update email template");
		}
	};

	const handleCreateTemplate = async () => {
		if (!validateFields()) return;

		try {
			await axios.post(
				"/api/email-template/create",
				{
					label: templateLabel,
					subject: emailSubject,
					body: emailBody,
					accessModifierId,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			toast.success("Email template created successfully");
			router.push("/home/configuration/email-template");
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSaveTemplate = () => {
		if (emailTemplate?.id) handleUpdateTemplate();
		else handleCreateTemplate();
	};

	return (
		<div className="w-full px-2 py-2 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					{isEditMode ? (
						<FieldInput
							data-testid="template-label"
							id="template-label"
							type="text"
							value={templateLabel}
							onChange={handleLabelChange}
							placeholder="Template Label"
							required
							name="template-label"
							aria-label="template-label"
							mainContainerStyles="max-w-xs"
							inputStyles={inputStyles}
						/>
					) : (
						<h1 className="font-bold text-2xl uppercase">{templateLabel}</h1>
					)}
					<ClickButton
						id="label-edit-button"
						onClick={toggleEditMode}
						variant="none"
						size="none"
					>
						{isEditMode ? <SaveIcon /> : <Edit />}
					</ClickButton>
				</div>
				<ClickButton
					id="save-email-template"
					variant="shadow-default"
					size="md"
					className="w-auto"
					onClick={handleSaveTemplate}
					disabled={isSubmitting}
				>
					<div className="flex gap-2 items-center">
						<SaveIcon />
						<span>{isSubmitting ? "Saving..." : "Save"}</span>
					</div>
				</ClickButton>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<EmailEditor
					emailBody={emailBody}
					emailSubject={emailSubject}
					handleRun={handleRunTemplate}
					handleSubjectChange={handleSubjectChange}
					handleBodyChange={handleEmailBodyChange}
					currentView={currentView}
					accessModifierId={accessModifierId}
					setAccessModifierId={setAccessModifierId}
					accessModifiers={accessModifiers}
				/>
				<EmailCodeViewer
					emailBody={viewedEmailBody}
					currentView={currentView}
					setCurrentView={setCurrentView}
				/>
			</div>
		</div>
	);
};

export default CreateOrEditEmailTemplate;
