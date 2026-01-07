export const api = {
  wireException: (wire) => console.log("Wire exception:", wire),

  findurException: (findur) => console.log("Findur exception:", findur),

  moveToOutgoing: (findur) => console.log("Move to outgoing:", findur),

  submitMatching: (wires, findurs) => console.log("MATCHING", wires, findurs),
};
