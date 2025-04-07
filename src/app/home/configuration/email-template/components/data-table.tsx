"use client";

import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData, unknown>[];
}

export default function DataTable<TData>({
	data,
	columns,
}: DataTableProps<TData>) {
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([{ id: "id", desc: false }]);

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
	});

	return (
		<div className="w-full mx-auto">
			{/* Search Input */}
			<div className="mb-5">
				<input
					value={globalFilter ?? ""}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder="Search..."
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-lg shadow-md">
				<table className="w-full bg-white">
					<thead className="bg-gray-100">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 cursor-pointer"
										onClick={header.column.getToggleSortingHandler()}
									>
										<div className="flex items-center gap-2">
											{header.isPlaceholder
												? null
												: typeof header.column.columnDef.header === "function"
													? header.column.columnDef.header(header.getContext())
													: header.column.columnDef.header}
											{header.column.id === "id" && (
												<span>
													{header.column.getIsSorted() === "asc"
														? "↑"
														: header.column.getIsSorted() === "desc"
															? "↓"
															: "↕"}
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50 transition-colors">
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-4 py-3 border-b border-gray-200"
									>
										{typeof cell.column.columnDef.cell === "function"
											? cell.column.columnDef.cell({
													row,
													cell,
													column: cell.column,
													getValue: () => cell.getValue(),
													renderValue: () => cell.getValue(),
													table,
												})
											: cell.getValue()}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
				>
					Previous
				</button>
				<span className="text-sm text-gray-600">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</span>
				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
				>
					Next
				</button>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => table.setPageSize(Number(e.target.value))}
					className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{[2, 5, 10, 20].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
