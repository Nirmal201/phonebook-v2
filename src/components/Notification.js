// import React from "react";

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null;
//   }

//   return <div className="error">{message}</div>;
// };

// export default Notification;

import React from "react";

const Notification = ({ message }) => {
  if (message === null || message === "") {
    console.log("check if this case is getting executed or not");
    return null;
  }
  console.log("culprit found", message);
  return <div className="error">{message}</div>;
};

export default Notification;
