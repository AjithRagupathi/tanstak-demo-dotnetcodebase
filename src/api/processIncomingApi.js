const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  getWires: async () => getJson("/api/wires"),
  getFindurs: async () => getJson("/api/findurs"),

  wireException: async (wire) => {
    try {
      return await postJson("/api/wires/exception", wire);
    } catch (err) {
      console.error("wireException error:", err);
      throw err;
    }
  },

  findurException: async (findur) => {
    try {
      return await postJson("/api/findurs/exception", findur);
    } catch (err) {
      console.error("findurException error:", err);
      throw err;
    }
  },

  moveToOutgoing: async (findur) => {
    try {
      return await postJson("/api/findurs/move-outgoing", findur);
    } catch (err) {
      console.error("moveToOutgoing error:", err);
      throw err;
    }
  },

  submitMatching: async (wires, findurs) => {
    try {
      return await postJson("/api/matching/submit", { wires, findurs });
    } catch (err) {
      console.error("submitMatching error:", err);
      throw err;
    }
  },
};
