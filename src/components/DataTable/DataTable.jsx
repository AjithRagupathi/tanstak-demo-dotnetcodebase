// import React, { useEffect, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";
// import ColumnToggle from "./ColumnToggle";

// export default function DataTable({ data, columns, onSelectionChange }) {
//   const [rowSelection, setRowSelection] = useState({});
//   const [columnVisibility, setColumnVisibility] = useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       rowSelection,
//       columnVisibility,
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   // Notify parent about selected rows
//   useEffect(() => {
//     if (onSelectionChange) {
//       onSelectionChange(table.getSelectedRowModel().rows);
//     }
//   }, [rowSelection]);

//   return (
//     <>
//       <ColumnToggle table={table} />

//       <table border="1" cellPadding="8" cellSpacing="0" width="100%">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder ? null : header.column.columnDef.header}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {cell.column.columnDef.cell
//                     ? cell.column.columnDef.cell(cell.getContext())
//                     : cell.getValue()}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function DataTable({ data, columns, onSelectionChange }) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  React.useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((r) => r.original);
    onSelectionChange(selectedRows);
  }, [rowSelection]);

  return (
    <table border="1" width="100%">
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th key={h.id}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
