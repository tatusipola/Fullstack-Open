import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //event handlers to control input fields
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //event handler for onSubmit
  const addPerson = (event) => {
    event.preventDefault()
    if (nameTaken(persons, newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter by name <input
        value={filter}
        onChange={handleFilterChange}
        />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} filter={filter} />
          )}
      </ul>
    </div>
  )
}

//component to display a person, applying name filter
const Person = ({person, filter}) => {
  if (!filter) {
    return (
      <li>{person.name} {person.number}</li>
      )
  } else {
    if (person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
      return (
        <li>{person.name} {person.number}</li>
        )
    }
  }
  
}

//function to check if name exists in persons array
const nameTaken = (persons, newName) => {
  const names = persons.map(person => person.name)
  return (
    names.includes(newName)
  )
}



export default App