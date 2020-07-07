import React from "react";

const FilterList = ({ filtered, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div className="filterList">
        {filtered.map((person) => (
          <div key={person.id}>
            <p className="p-map">
              {person.name} - {person.number}
            </p>
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterList;
