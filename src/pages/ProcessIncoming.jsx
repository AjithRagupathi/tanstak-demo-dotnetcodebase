import React from "react";
import DataTable from "../components/DataTable/DataTable";
import { incomingWireColumns } from "../columns/IncomingWireColumn";
import { findurColumns } from "../columns/findurColumns";
import { api } from "../api/processIncomingApi";

export default function ProcessIncoming() {
  const [incomingWires, setIncomingWires] = React.useState([]);
  const [findurItems, setFindurItems] = React.useState([]);
  const [selectedWires, setSelectedWires] = React.useState([]);
  const [selectedFindurs, setSelectedFindurs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Load initial data
  React.useEffect(() => {
    loadData();
  }, []);

  // Separate function to reload data (stable)
  const loadData = React.useCallback(async () => {
    try {
      const [wires, findurs] = await Promise.all([
        api.getWires(),
        api.getFindurs(),
      ]);
      setIncomingWires(wires);
      setFindurItems(findurs);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  }, []);

  const handleWireAction = React.useCallback(
    async (action, wire) => {
      try {
        setLoading(true);
        if (action === "exception") {
          // Send exception to backend
          await api.wireException(wire);

          // Re-fetch updated data from backend
          await loadData();

          alert(
            `Wire ${wire.wireNumber} exception recorded and removed from list`
          );
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  const handleFindurAction = React.useCallback(
    async (action, findur) => {
      try {
        setLoading(true);
        if (action === "exception") {
          // Send exception to backend
          await api.findurException(findur);

          // Re-fetch updated data from backend
          await loadData();

          alert(
            `Findur ${findur.findurId} exception recorded and removed from list`
          );
        }
        if (action === "move") {
          // Send move to backend
          await api.moveToOutgoing(findur);

          // Re-fetch updated data from backend
          await loadData();

          alert(
            `Findur ${findur.findurId} moved to outgoing and removed from list`
          );
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  // Sum function to calculate total amount
  const sum = (items) => items.reduce((s, it) => s + (it.amount || 0), 0);

  const handleSubmit = async () => {
    if (selectedWires.length === 0 || selectedFindurs.length === 0) {
      alert("Must select at least one wire and one Findur transaction");
      return;
    }

    // Basic validation: totals must equal
    const totalWires = sum(selectedWires);
    const totalFindurs = sum(selectedFindurs);
    if (totalWires !== totalFindurs) {
      alert(
        `Amounts do not match: wires total ${totalWires} vs findurs total ${totalFindurs}`
      );
      return;
    }

    // Optionally additional checks here (ABA matching, count limits, etc.)
    try {
      setLoading(true);
      await api.submitMatching(selectedWires, selectedFindurs);

      // Re-fetch updated data
      await loadData();

      // Clear selections
      setSelectedWires([]);
      setSelectedFindurs([]);
      alert("Matched successfully");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Memoize columns so they don't get recreated on each render
  const incomingCols = React.useMemo(
    () => incomingWireColumns(handleWireAction),
    [handleWireAction]
  );

  const findurCols = React.useMemo(
    () => findurColumns(handleFindurAction),
    [handleFindurAction]
  );

  return (
    <>
      <h2>Incoming Wires ({incomingWires.length})</h2>
      <DataTable
        data={incomingWires}
        columns={incomingCols}
        onSelectionChange={setSelectedWires}
      />

      <h2>Findur Items ({findurItems.length})</h2>
      <DataTable
        data={findurItems}
        columns={findurCols}
        onSelectionChange={setSelectedFindurs}
      />

      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
    </>
  );
}
