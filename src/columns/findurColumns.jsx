// import { createColumnHelper } from "@tanstack/react-table";
// import React from "react";

// const columnHelper = createColumnHelper();

// export const findurColumns = [
//   // Checkbox column
//   columnHelper.display({
//     id: "select",
//     header: ({ table }) => (
//       <input
//         type="checkbox"
//         checked={table.getIsAllRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         type="checkbox"
//         checked={row.getIsSelected()}
//         onChange={row.getToggleSelectedHandler()}
//       />
//     ),
//   }),

//   columnHelper.accessor("tradeId", {
//     header: "Trade ID",
//   }),

//   columnHelper.accessor("dollars", {
//     header: "Dollars",
//   }),

//   columnHelper.accessor("aba", {
//     header: "ABA Number",
//   }),

//   columnHelper.accessor("dealRef", {
//     header: "Deal Ref",
//   }),

//   columnHelper.accessor("insType", {
//     header: "INS Type",
//   }),
// ];
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

const ch = createColumnHelper();

export const findurColumns = (onAction) => [
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

  ch.accessor("findurId", { header: "Findur ID" }),
  ch.accessor("amount", { header: "Amount" }),

  ch.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <>
        <button onClick={() => onAction("exception", row.original)}>
          Exception
        </button>
        <button onClick={() => onAction("move", row.original)}>
          Move To Outgoing
        </button>
      </>
    ),
  }),
];
