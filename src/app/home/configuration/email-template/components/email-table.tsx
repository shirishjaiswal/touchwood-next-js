"use client";

import Link from "next/link";
import DataTable from "@/app/home/configuration/email-template/components/data-table";
import axios from "axios";
import toast from "react-hot-toast";

export type EmailTableData = {
	id: number;
	label: string;
};

interface EmailTableProps {
	dataSet: EmailTableData[];
}
export default function EmailTable({ dataSet }: EmailTableProps) {
	const handleDelete = async (id: number) => {
		const response = await axios.delete(`/api/email-template/delete/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		toast.success("Email template deleted successfully");
		if (response.status < 200 || response.status >= 300) {
			throw new Error("Failed to update email template");
		}
	};
	const columns = [
		{
			header: "ID",
			accessorKey: "id",
			cell: ({ row }: { row: { original: { id: number } } }) => (
				<span>{row.original.id}</span>
			),
		},
		{
			header: "Label",
			accessorKey: "label",
			cell: ({ row }: { row: { original: { label: string } } }) => (
				<span>{row.original.label}</span>
			),
		},
		{
			header: "Actions",
			cell: ({ row }: { row: { original: EmailTableData } }) => (
				<div className="flex gap-2">
					<Link
						href={`/home/configuration/email-template/${row.original.id}`}
						className="px-3 py-1 bg-secondary text-white rounded hover:bg-secondary-900 transition-colors"
					>
						Edit
					</Link>
					<button
						onClick={() => handleDelete(row.original.id)}
						className="px-3 py-1 bg-danger text-white rounded hover:bg-danger-900 transition-colors"
					>
						Delete
					</button>
				</div>
			),
		},
	];
	return <DataTable data={dataSet} columns={columns} />;
}
