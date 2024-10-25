import React from 'react'
import phonebookService from '../services/phonebook'

const Persons = ({ persons, setPersons }) => {

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <table style={{ textAlign: 'left', borderSpacing: '1rem' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
          <th style={{ textAlign: 'center' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={() => handleDelete(person.id, person.name)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Persons
