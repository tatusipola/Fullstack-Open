import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //read data from server and set initial persons state
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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

  //event handler for submitting add new person form
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
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Add new contact</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} filter={filter} />
          )}
      </ul>
    </div>
  )
}

//component to display the form for adding new contacts
const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

//component to create filter field
const Filter = (props) => {
  return (
    <div>
      filter by name <input
      value={props.filter}
      onChange={props.handleFilterChange}
      />
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