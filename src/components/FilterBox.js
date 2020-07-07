import React from "react";

const FilterBox = ({ filter, handleFilter }) => {
  return (
    <div className="filter-box">
      <label className="search" htmlFor="filter">
        Filter with name:{" "}
        <input
          type="text"
          id="filter"
          name="filterBox"
          value={filter}
          onChange={handleFilter}
        ></input>
      </label>
    </div>
  );
};

export default FilterBox;
