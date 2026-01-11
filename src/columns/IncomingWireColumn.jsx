import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

const ch = createColumnHelper();

export const incomingWireColumns = (onAction) => [
  ch.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),

  ch.accessor("wireNumber", { header: "Wire Number" }),
  ch.accessor("amount", { header: "Amount" }),

  ch.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <button onClick={() => onAction("exception", row.original)}>
        Exception
      </button>
    ),
  }),
];
