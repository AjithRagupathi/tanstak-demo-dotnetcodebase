// import React, { useEffect, useState } from "react";
// import DataTable from "../components/DataTable/DataTable";
// import { findurColumns } from "../columns/findurColumns";
// import { incomingWireColumns } from "../columns/incomingWireColumns";
// import { findurMockData } from "./mockData";

// export default function ProcessIncoming() {
//   const [incomingWires, setIncomingWires] = useState([]);
//   const [findurItems, setFindurItems] = useState([]);

//   const [selectedWires, setSelectedWires] = useState([]);
//   const [selectedFindur, setSelectedFindur] = useState([]);

//   useEffect(() => {
//     // Using mock data for now
//     setFindurItems(findurMockData);
//   }, []);

//   const submitMatch = () => {
//     if (selectedRows.length === 0) {
//       alert("Please select at least one row");
//       return;
//     }

//     const selectedIds = selectedRows.map((row) => row.original.tradeId);

//     alert("Selected Trade IDs:\n" + selectedIds.join(", "));
//   };

//   return (
//     <>
//       <h2>Incoming Wires</h2>

//       <DataTable
//         data={incomingWires}
//         columns={incomingWireColumns}
//         onSelectionChange={setSelectedWires}
//       />

//       <h2>Findur Items</h2>

//       <DataTable
//         data={findurItems}
//         columns={findurColumns}
//         onSelectionChange={setSelectedFindur}
//       />

//       <button onClick={submitMatch}>Match Selected</button>
//     </>
//   );
// }
import React from "react";
import DataTable from "../components/DataTable/DataTable";
import { incomingWireColumns } from "../columns/IncomingWireColumn";
import { findurColumns } from "../columns/findurColumns";
import { api } from "../api/processInomingApi";

export default function ProcessIncoming() {
  const [selectedWires, setSelectedWires] = React.useState([]);
  const [selectedFindurs, setSelectedFindurs] = React.useState([]);

  const incomingWires = [
    { id: 1, wireNumber: "W001", amount: 1000 },
    { id: 2, wireNumber: "W002", amount: 2000 },
  ];

  const findurItems = [
    { id: 1, findurId: "F001", amount: 1000 },
    { id: 2, findurId: "F002", amount: 2000 },
  ];

  const handleWireAction = (action, wire) => {
    if (action === "exception") {
      api.wireException(wire);
    }
  };

  const handleFindurAction = (action, findur) => {
    if (action === "exception") api.findurException(findur);
    if (action === "move") api.moveToOutgoing(findur);
  };

  const handleSubmit = () => {
    if (selectedWires.length === 0 || selectedFindurs.length === 0) {
      alert("Must select at least one wire and one Findur transaction");
      return;
    }

    api.submitMatching(selectedWires, selectedFindurs);
    alert("Matched successfully");
  };

  return (
    <>
      <h2>Incoming Wires</h2>
      <DataTable
        data={incomingWires}
        columns={incomingWireColumns(handleWireAction)}
        onSelectionChange={setSelectedWires}
      />

      <h2>Findur Items</h2>
      <DataTable
        data={findurItems}
        columns={findurColumns(handleFindurAction)}
        onSelectionChange={setSelectedFindurs}
      />

      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
