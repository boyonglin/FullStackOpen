import { useState, useEffect } from 'react'
import './App.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      const confirmReplace = window.confirm(`'${newName}' is already added to phonebook, replace the old number with a new one?`)

      if (confirmReplace) {
        const changedPerson = { ...existingPerson, number: newNumber }
        const existingPersonId = existingPerson.id

        phonebookService.update(existingPersonId, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => person.id !== existingPersonId ? person : returnedPerson))
            resetForm()
          })
          .catch(() => {
            alert(`Error updating person: ${error.message}`)
          })
      }
    } else {
      const phonebookObject = {
        id: (persons.length + 1).toString(),
        name: newName,
        number: newNumber
      }

      phonebookService.create(phonebookObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          resetForm()
        })
        .catch(() => {
          alert(`Error adding person: ${error.message}`)
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const filterPersons =
    filterName.trim() === ''
      ? persons
      : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>Add a new</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} setPersons={setPersons} />
    </div>
  )
}

export default App
