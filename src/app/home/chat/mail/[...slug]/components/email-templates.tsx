"use client";

import ClickButton from "@/components/ui/button/click-button";
import { Delete, Edit, Send } from "@/components/ui/icons";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Badge, { BadgeColor } from "@/components/ui/badge/badge";
import AccessModifier from "@/lib/types/access-modifier";
import { useAuth } from "@/utils/context/AuthContext";

export type EmailTemplate = {
	id: number;
	label: string;
	subject: string;
	body: string;
	userId: number;
	accessModifierId: number;
};

export type Page = {
	size: number;
	number: number;
	totalElements: number;
	totalPages: number;
};

export type EmailTemplatesProps = {
	content: EmailTemplate[];
	page: Page;
	accessModifiers: AccessModifier[];
};

function EmailTemplates({ content, accessModifiers }: EmailTemplatesProps) {
	const router = useRouter();
	const { user } = useAuth();

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`/api/email-template/delete/${id}`);
			router.refresh();
		} catch (error) {
			console.error("Failed to delete:", error);
		}
	};

	const getAccessColor = (value?: string): string => {
		switch (value) {
			case "Public":
				return "blue";
			case "Private":
				return "red";
			case "Protected":
				return "green";
			case "Default":
				return "gray";
			default:
				return "gray";
		}
	};

	return (
		<div className="w-full mx-auto px-6 py-8 bg-white">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{content.map((template) => {
					const modifier = accessModifiers.find(
						(accessModifier) => accessModifier.id === template.accessModifierId
					);

					return (
						<div
							key={template.id}
							className="border border-gray-300 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
						>
							<div className="relative flex justify-between items-center mb-1">
								<div className="text-lg font-medium text-gray-900 flex items-center gap-4">
									<span className="truncate">{template.label}</span>
									<Badge
										label={modifier?.value}
										size="xs"
										color={getAccessColor(modifier?.value) as BadgeColor}
										variant="primary"
									/>
								</div>
								<div className="flex items-center gap-4">
									<Link
										href={`/home/chat/mail/compose-mail/${template.id}`}
										id={`email-template-${template.id}`}
										title="Send Email"
										onClick={(e) => {
											e.stopPropagation();
										}}
									>
										<Send className="w-6 h-6 text-gray-60 bg-primary rounded-full p-1" />
									</Link>

									{user &&
										template.userId == (user.userId as unknown as number) && (
											<>
												<Link
													href={`/home/chat/mail/mail-template/${template.id}`}
													id={`edit-email-template-${template.id}`}
													title="Edit template"
													onClick={(e) => {
														e.stopPropagation();
													}}
												>
													<Edit className="w-6 h-6 text-gray-60 bg-accent rounded-full p-1" />
												</Link>
												<ClickButton
													id={`delete-email-template-${template.id}`}
													variant="none"
													size="none"
													title="Delete template"
													onClick={handleDelete.bind(null, template.id)}
												>
													<Delete className="w-6 h-6 text-gray-60 bg-danger rounded-full p-1" />
												</ClickButton>
											</>
										)}
								</div>
							</div>

							<div className="relative w-full h-64 overflow-hidden rounded-md border border-gray-200">
								<Link href={`/home/chat/mail/compose-mail/${template.id}`}>
									<iframe
										srcDoc={template.body}
										className="w-full h-full bg-white pointer-events-none"
										style={{ border: "none" }}
										sandbox=""
										tabIndex={-1}
									/>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default EmailTemplates;
