import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import ColumnToggle from "./ColumnToggle";

export default function DataTable({ data, columns, onSelectionChange }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, sorting, columnVisibility },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  React.useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((r) => r.original);
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange]);

  return (
    <>
      <ColumnToggle table={table} />
      <table border="1" width="100%">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => {
                const col = h.column;
                const canHide = col.id !== "select";
                const isVisible = col.getIsVisible();
                const hideColumn = () => {
                  if (!canHide) return;
                  if (typeof col.toggleVisibility === "function") {
                    col.toggleVisibility(false);
                  } else {
                    const handler = col.getToggleVisibilityHandler?.();
                    if (typeof handler === "function")
                      handler({ target: { checked: false } });
                  }
                };

                return (
                  <th
                    key={h.id}
                    onClick={h.column.getToggleSortingHandler()}
                    style={{
                      cursor: h.column.getCanSort() ? "pointer" : "default",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {canHide && isVisible ? (
                        <button
                          type="button"
                          onClick={(ev) => {
                            // prevent header sort click when clicking the '-' control
                            ev.stopPropagation();
                            hideColumn();
                          }}
                          aria-label={`Hide column ${String(col.id)}`}
                          style={{
                            cursor: "pointer",
                            color: "#b00",
                            fontWeight: "bold",
                            paddingRight: 6,
                            background: "transparent",
                            border: "none",
                          }}
                          title="Hide column"
                        >
                          -
                        </button>
                      ) : (
                        // preserve spacing for alignment
                        <span style={{ width: 10, display: "inline-block" }} />
                      )}

                      <div
                        style={{ display: "inline-flex", alignItems: "center" }}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        <span style={{ marginLeft: 6 }}>
                          {h.column.getIsSorted()
                            ? h.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </th>
                );
              })}
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
    </>
  );
}
