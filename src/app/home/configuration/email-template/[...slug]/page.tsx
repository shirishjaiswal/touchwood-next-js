"use client";
import React, { useEffect, useState } from "react";
import EmailHtmlView, {
	EmailTemplateType,
} from "@/app/home/configuration/email-template/[...slug]/components/email-view";
import { usePathname } from "next/navigation";
import axios from "axios";

function Page() {
	const pathname = usePathname();
	const id = pathname.split("/")[4];
	const [templates, setTemplates] = useState<EmailTemplateType | null>(null);

	useEffect(() => {
		if (id === "add-email-template") return;
		(async () => {
			const response = await axios.get(`/api/email-template/get-by-id/${id}`);
			setTemplates(response.data);
		})();
	}, [id]);

	return (
		<div className="flex flex-col h-full px-2">
			<div className="sticky top-20 pb-2 px-2 gap-4 z-10">
				<h1 className="font-bold text-2xl uppercase mb-2">
					{"Email Configuration"}
				</h1>
			</div>
			<EmailHtmlView emailTemplate={templates} />
		</div>
	);
}

export default Page;
