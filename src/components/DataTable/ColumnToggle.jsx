import React from "react";

export default function ColumnToggle({ table }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>Show / Hide Columns:</strong>
      <br />

      {table
        .getAllLeafColumns()
        .filter((col) => col.id !== "select")
        .map((column) => (
          <label key={column.id} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.columnDef.header}
          </label>
        ))}
    </div>
  );
}
