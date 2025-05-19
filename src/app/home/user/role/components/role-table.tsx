"use client";

import { useState } from "react";
import DataTable from "@/app/home/configuration/email-template/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

type RoleData = {
  id: number;
  value: string;
};

export default function RoleTable() {
  const [data, setData] = useState<RoleData[]>([
    { id: 1, value: "Admin" },
    { id: 2, value: "User" },
    { id: 3, value: "Organization" },
  ]);

  const columns: ColumnDef<RoleData, unknown>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ row }) => <span>{row.original.value}</span>,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              const rowData = row.original;
              alert(`Editing: ID=${rowData.id}, Value=${rowData.value}`);
            }}
            className="px-3 py-1 bg-secondary-500 text-white rounded hover:bg-secondary-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              const newData = data.filter((_, idx) => idx !== row.index);
              setData(newData);
            }}
            className="px-3 py-1 bg-danger text-white rounded hover:bg-danger-800 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
