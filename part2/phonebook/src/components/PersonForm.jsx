import React from 'react'

const PersonForm = ({
  handleFormSubmit,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleFormSubmit}>
        <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
