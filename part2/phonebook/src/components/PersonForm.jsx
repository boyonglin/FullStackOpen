import React from "react";

const PersonForm = ({
  addPhonebook,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addPhonebook}>
      <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
