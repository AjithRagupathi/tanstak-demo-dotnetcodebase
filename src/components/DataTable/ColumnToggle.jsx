import React from "react";

export default function ColumnToggle({ table }) {
  const [selected, setSelected] = React.useState("");

  const hiddenColumns = table
    .getAllLeafColumns()
    .filter((col) => !col.getIsVisible() && col.id !== "select");

  const showColumn = (colId) => {
    const col = table.getAllLeafColumns().find((c) => c.id === colId);
    if (!col) return;
    if (typeof col.toggleVisibility === "function") {
      col.toggleVisibility(true);
    } else {
      const handler = col.getToggleVisibilityHandler?.();
      if (typeof handler === "function") handler({ target: { checked: true } });
    }
  };

  const handleChange = (e) => {
    const colId = e.target.value;
    if (!colId) return;
    showColumn(colId);
    // reset select
    setSelected("");
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>Hidden Columns ({hiddenColumns.length}):</strong>{" "}
      <select value={selected} onChange={handleChange}>
        <option value="">-- Show hidden column --</option>
        {hiddenColumns.map((c) => {
          const label =
            typeof c.columnDef.header === "string"
              ? c.columnDef.header
              : c.columnDef?.meta?.label || String(c.id);
          return (
            <option key={c.id} value={c.id}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
