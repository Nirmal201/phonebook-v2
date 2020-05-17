import React from "react";
const Success = ({ success }) => {
  if (success === null || success === "") {
    return null;
  }

  return <div className="success">{success}</div>;
};

export default Success;
