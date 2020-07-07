import React from "react";

const Inputs = ({ label, fortoid, boxName, value, onChange }) => {
  return (
    <>
      <label htmlFor={fortoid}>{label}</label>
      <input
        type="text"
        id={fortoid}
        name={boxName}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
};

export default Inputs;
