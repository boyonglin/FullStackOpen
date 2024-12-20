import { useState, useEffect } from 'react'
import './App.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [Message, setMessage] = useState(null)

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

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
            handleMessage(`Information of '${newName}' has already been removed from server`)
          })
      }
    } else {

      const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(person => person.id))
          : 0
        return maxId + 1
      }

      const phonebookObject = {
        id: generateId().toString(),
        name: newName,
        number: newNumber
      }

      phonebookService.create(phonebookObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          resetForm()
          handleMessage(`Phonebook added person '${newName}'`)
        })
        .catch(() => {
          handleMessage(`Error adding person '${newName}'`)
        })
    }
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
      <Notification message={Message} />
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
      <Persons persons={filterPersons} setPersons={setPersons} handleMessage={handleMessage} />
    </div>
  )
}

export default App
