import React from "react";

const Filter = ({ filterName, handleFilterName }) => {
  return (
    <div style={{ textAlign: "right" }}>
      filter shown with <input value={filterName} onChange={handleFilterName} />
    </div>
  );
};

export default Filter;
