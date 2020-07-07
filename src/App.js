import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Form from "./components/Form";
import FilterBox from "./components/FilterBox";
import FilterList from "./components/FilterList";

// const api = "http://localhost:3001/persons";
const api = "/api/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(api).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = persons.some(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );
    if (newName && phoneNumber !== "") {
      if (exists) {
        let updateName = window.confirm(
          `"${newName}" is already in the list, do you want to replace old number with new number?`
        );

        if (updateName === true) {
          let updateNumber = persons.find((p) => p.name === newName);
          const updateInfo = { ...updateNumber, number: phoneNumber };
          axios
            .put(`${api}/${updateNumber.id}`, updateInfo)
            .then((response) => {
              setPersons(
                persons.map((p) =>
                  p.number !== updateNumber.number ? p : response.data
                )
              );
            });
        }
        setNewName("");
        setPhoneNumber("");
      } else {
        const newPerson = {
          name: newName,
          number: phoneNumber,
          id: persons.length + 1,
        };
        axios
          .post(api, newPerson)
          .then((response) => {
            console.log("came in catch block", response.data);
            if (response.data.name) {
              setPersons(persons.concat(response.data));
              setSuccessMessage(`Added - "${newPerson.name}"`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
            } else {
              setErrorMessage(response.data);
              setTimeout(() => {
                setErrorMessage(null);
              }, 6000);
            }
            setNewName("");
            setPhoneNumber("");
          })
          .catch((e) => console.log("came in catch block", e));
      }
    } else {
      setErrorMessage("Fields cannot be empty.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleInput = (e) => {
    setNewName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterName(e.target.value.toLowerCase());
  };

  const filtered = persons.filter((person) => {
    return person.name.toLowerCase().includes(filterName.toLowerCase());
  });

  const handleDelete = (person) => {
    const confirm = window.confirm(`Delete "${person.name}" ?`);
    if (confirm === true) {
      axios
        .delete(`${api}/${person.id}`)
        .catch((e) =>
          setErrorMessage(
            `Information of "${person.name}" has already been removed from server.`
          )
        );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      const newPerson = persons.filter((p) => p.id !== person.id);
      setPersons(newPerson);
    }
  };

  return (
    <div id="bg-img">
      <div className="main-head">
        <img className="icon" src={require("./icon/phone.svg")} alt="" />
        <h2 className="">Phonebook Web App</h2>
      </div>

      <main>
        <FilterBox filter={filterName} handleFilter={handleFilter} />
        <hr />
        <Form
          submit={handleSubmit}
          name={newName}
          changeName={handleInput}
          number={phoneNumber}
          changePhone={handlePhone}
          message={errorMessage}
          success={successMessage}
        />
        <FilterList filtered={filtered} handleDelete={handleDelete} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
