import React from "react";
import Inputs from "./Inputs";
import Notification from "./Notification";
import Success from "./Success";

const Form = ({
  submit,
  name,
  changeName,
  number,
  changePhone,
  message,
  success,
}) => {
  console.log(message);

  return (
    <div className="form">
      <h2>Add New Name</h2>
      <Success success={success} />
      <form onSubmit={submit}>
        <Inputs
          label="Name : "
          fortoid="name"
          boxName="nameBox"
          value={name}
          onChange={changeName}
        />
        <br />
        <br />
        <Inputs
          label="Phone Number :"
          fortoid="number"
          boxName="numberBox"
          value={number}
          onChange={changePhone}
        />
        <hr />
        <button type="submit">Add</button>
      </form>
      <Notification message={message} />
    </div>
  );
};

export default Form;
