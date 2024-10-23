import React from "react";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li style={{ textAlign: "left" }} key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
