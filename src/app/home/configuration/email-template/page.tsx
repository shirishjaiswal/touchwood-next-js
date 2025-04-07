"use client";
import React, { useEffect, useState } from "react";
import { Add } from "@/components/ui/icons";
import EmailTable, { EmailTableData } from "./components/email-table";
import Link from "next/link";
import axios from "axios";

export default function Page({ params }: { params: { slug: string } }) {
	const title = params.slug;
	const [templates, setTemplates] = useState<EmailTableData[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					"/api/email-template/get-all-id-label"
				);
				setTemplates(response.data);
			} catch (error) {
				console.error("Error fetching templates:", error);
			}
		})();
	}, []);

	return (
		<>
			<div className="sticky top-16 bg-white pb-2 px-2 gap-4">
				<h1 className="font-bold text-2xl uppercase mb-2">
					{title + " Configuration"}
				</h1>
				<div className="flex justify-end">
					<Link
						href={`/home/configuration/email-template/add-email-template`}
						id="add-email-template"
						className="md:w-fit flex gap-4"
					>
						<div className="flex gap-4 bg-primary p-3 rounded-lg text-white">
							<Add /> <p>Add Email Template</p>
						</div>
					</Link>
				</div>
			</div>
			<div className="p-2 mt-2">
				<EmailTable dataSet={templates} />
			</div>
		</>
	);
}
