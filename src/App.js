import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Success from "./components/Success";

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
              }, 5000);
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
    // if (confirm === true) {
    //   axios
    //     .delete(`${api}/${person.id}`)
    //     .then((e) => {
    //const api = "/api/persons";

    // DELETE http://localhost:3001/api/persons/5e9fcc850519cd0017851915

    //sab kuch yahan karna hai..App

    //       setErrorMessage(
    //         `Information of "${person.name}" has been removed from contact list.`
    //       );
    //       setTimeout(() => {
    //         setErrorMessage(null);
    //       }, 5000);
    //       const newPerson = persons.filter((p) => p.id !== person.id);
    //       setPersons(newPerson);
    //     })
    //     .catch((err) => {
    //       console.log("my error on deletion failed, ", err);
    //     });
    // }

    if (confirm === true) {
      axios
        .delete(`${api}/${person.id}`)
        .then((t) => alert(t.status))
        .catch((e) =>
          setErrorMessage(
            `Information of "${person.name}" has already been removed from phonebook.`
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
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Success success={successMessage} />
      Filter shown with name :-{" "}
      <input value={filterName} onChange={handleFilter} />
      <hr />
      <h2>Add New Name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleInput} />
          <br />
          <br />
          Phone number: <input value={phoneNumber} onChange={handlePhone} />
        </div>
        <hr />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map((person) => (
        <div key={person.id}>
          <p className="p-map">
            {person.name} - {person.number}
          </p>
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default App;
