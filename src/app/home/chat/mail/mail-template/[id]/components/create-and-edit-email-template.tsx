"use client";

import { useEffect, useState } from "react";
import EmailCodeViewer from "@/app/home/chat/mail/mail-template/[id]/components/email-code-viewer";
import EmailEditor from "@/app/home/chat/mail/mail-template/[id]/components/email-editor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import ClickButton from "@/components/ui/button/click-button";
import FieldInput from "@/components/ui/input/field-input";
import { inputStyles } from "@/app/auth/login/components/form-container";
import Save from "@/components/ui/icons/action/save";
import { Edit } from "@/components/ui/icons";
import AccessModifier from "@/lib/types/access-modifier";

export type EmailTemplateType = {
	id: number;
	label: string;
	subject: string;
	body: string;
	userId: number;
	accessModifierId: number;
};

interface CreateEmailTemplateProps {
	emailTemplate: EmailTemplateType | null;
	accessModifiers: AccessModifier[];
}

function CreateAndEditEmailTemplate({
	emailTemplate,
	accessModifiers,
}: CreateEmailTemplateProps) {
	const [emailCode, setEmailCode] = useState<string>(emailTemplate?.body || "");
	const [emailCodeForView, setEmailCodeForView] = useState(
		emailTemplate?.body || ""
	);
	const [label, setLabel] = useState<string>(emailTemplate?.label || "");
	const [showView, setShowView] = useState<"code" | "view">("code");
	const [mailSubject, setMailSubject] = useState<string>(
		emailTemplate?.subject || ""
	);
	const [accessModifierId, setAccessModifierId] = useState<number>(
		emailTemplate?.accessModifierId ||
			accessModifiers?.find(
				(accessModifier) => accessModifier.value === "Private"
			)?.id ||
			0
	);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const newTemplate = emailTemplate?.body || "";
		const newSubject = emailTemplate?.subject || "";
		setEmailCode(newTemplate);
		setEmailCodeForView(newTemplate);
		setMailSubject(newSubject);
		setLabel(emailTemplate?.label || "");
		setIsEditMode(emailTemplate?.label ? false : true);
	}, [emailTemplate]);

	const handleMailCodeChange = (data: string) => setEmailCode(data);

	const handleSubjectChange = (data: string) => setMailSubject(data);

	const handleSetLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setLabel(e.target.value);
		}
	};
	const handleRunTemplate = () => {
		setShowView("view");
		setEmailCodeForView(emailCode);
	};

	const handleValidation = () => {
		if (!label) {
			toast.error("Template label is required");
			setIsEditMode(true);
			return false;
		}
		if (!mailSubject) {
			toast.error("Email subject is required");
			return false;
		}
		if (!emailCode) {
			toast.error("Email template code is required");
			return false;
		}
		return true;
	};

	const handleUpdate = async () => {
		if (!emailTemplate?.id) return;
		if (!handleValidation()) return;
		try {
			await axios.put(
				"/api/email-template/update",
				{
					id: emailTemplate.id,
					label: emailTemplate.label,
					subject: mailSubject,
					body: emailCode,
					accessModifierId: accessModifierId,
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
		}
	};

	const handleAddNewTemplate = async () => {
		try {
			if (!handleValidation()) return;
			await axios.post(
				"/api/email-template/create",
				{
					label: label,
					subject: mailSubject,
					body: emailCode,
					accessModifierId: accessModifierId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success("Email template created successfully");
			router.push("/home/configuration/email-template");
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.error);
			}
		} finally {
			setSubmitting(false);
		}
	};

	const handleSave = () => {
		if (emailTemplate?.id) handleUpdate();
		else handleAddNewTemplate();
	};

	return (
		<div onSubmit={handleSave} className="w-full flex flex-col gap-1">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					{isEditMode ? (
						<FieldInput
							id="template-label"
							type="text"
							value={label}
							onChange={handleSetLabel}
							placeholder="Template Label"
							required
							name={"template-label"}
							aria-label={"template-label"}
							data-testid={"template-label"}
							mainContainerStyles="max-w-fit"
							inputStyles={inputStyles}
						/>
					) : (
						<h1 className="font-bold text-2xl uppercase">{label}</h1>
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
				<ClickButton
					id="update-email"
					variant="shadow-default"
					size="md"
					className="md:w-fit flex m-1"
					onClick={handleSave}
					disabled={isSubmitting}
				>
					<div className="flex gap-4">
						<Save />
						<p>{isSubmitting ? "Saving..." : "Save"}</p>
					</div>
				</ClickButton>
			</div>
			<div className="w-full bg-gray-50 min-h-[calc(100vh-180px)] grid grid-cols-1 md:grid-cols-2 gap-4">
				<EmailEditor
					emailCode={emailCode}
					mailSubject={mailSubject}
					handleRun={handleRunTemplate}
					handleSubjectChange={handleSubjectChange}
					handleMailCodeChange={handleMailCodeChange}
					showView={showView}
					accessModifierId={accessModifierId}
					setAccessModifierId={setAccessModifierId}
					accessModifiers={accessModifiers}
				/>
				<EmailCodeViewer
					emailCode={emailCodeForView}
					showView={showView}
					setShowView={setShowView}
				/>
			</div>
		</div>
	);
}
export default CreateAndEditEmailTemplate;
