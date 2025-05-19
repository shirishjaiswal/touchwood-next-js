"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import axios from "axios";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/context/AuthContext";
import AccessModifier from "@/lib/types/access-modifier";
import { Delete, Edit, Send } from "@/components/ui/icons";
import ActionPopup from "@/components/ui/button/action-popup";
import ClickButton from "@/components/ui/button/click-button";
import Badge, { BadgeColor } from "@/components/ui/badge/badge";
import { setScreenLoading } from "@/hooks/use-screen-loading";

const EmailTemplateIframe = dynamic(() => import("@/app/home/chat/mail/[...slug]/components/email-template-iframe"), {
	ssr: false,
});

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

function EmailTemplates({ content, accessModifiers }: EmailTemplatesProps) {
	const router = useRouter();
	const { user } = useAuth();
	const [isClient, setClient] = useState(false);
	const [userId] = useState<number | null>(user?.userId ? +user.userId : null);

	useEffect(() => {
		setClient(true);
	}, []);

	const handleDelete = async (id: number) => {
		setScreenLoading(true);
		try {
			await axios.delete(`/api/email-template/delete/${id}`);
			router.refresh();
		} catch (error) {
		} finally {
			setScreenLoading(false);
		}
	};

	return (
		<div className="w-full px-2 py-2 md:px-2 bg-white ">
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{content.map((template) => {
					const modifier = accessModifiers.find(
						(accessModifier) => accessModifier.id === template.accessModifierId
					);
					return (
						<div
							key={template.id}
							className={clsx(
								"rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-shadow",
								"hover:shadow-md"
							)}
						>
							<div className="mb-3 flex flex-wrap items-center justify-between gap-2 lg:flex-row">
								<div className="flex items-center gap-2 text-base font-semibold text-gray-800 lg:text-lg">
									<span className="truncate max-w-[12rem]">{template.label}</span>
									<Badge
										label={modifier?.value}
										size="xs"
										color={getAccessColor(modifier?.value) as BadgeColor}
										variant="primary"
									/>
								</div>

								<div className="flex items-center gap-2">
									<Link
										href={`/home/chat/mail/compose-mail/${template.id}`}
										title="Send Email"
										onClick={(e) => e.stopPropagation()}
									>
										<Send
											className={clsx(
												"w-6 h-6 p-1 rounded-full",
												"text-gray-600 bg-primary"
											)}
										/>
									</Link>

									{isClient && userId === template.userId && (
										<>
											<Link
												href={`/home/chat/mail/mail-template/${template.id}`}
												title="Edit template"
												onClick={(e) => e.stopPropagation()}
											>
												<Edit
													className={clsx(
														"w-6 h-6 p-1 rounded-full",
														"text-gray-600 bg-accent"
													)}
												/>
											</Link>
											<ActionPopup
												title="Delete template"
												subtitle="Are you sure you want to delete this template?"
												onConfirmText="Delete"
												onConfirmVarient="Secondary"
												onConfirm={() => handleDelete(template.id)}
											>
												<ClickButton
													id="delete-email-template"
													variant="none"
													size="none"
												>
													<Delete
														className={clsx(
															"w-6 h-6 p-1 rounded-full",
															"text-gray-600 bg-danger"
														)}
													/>
												</ClickButton>
											</ActionPopup>
										</>
									)}
								</div>
							</div>
							<div
								className={clsx(
									"relative w-full overflow-hidden rounded-md border border-gray-200",
									"h-48 sm:h-56 lg:h-64"
								)}
							>
								<Link href={`/home/chat/mail/compose-mail/${template.id}`}>
									<EmailTemplateIframe body={template.body} />
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
