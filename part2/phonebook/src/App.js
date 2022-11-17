import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({status: null, message: null})

  //read data from server and set initial persons state
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (nameTaken(persons, newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace number with new one?`)) {
        const pers = persons.filter(person => person.name === newName)
        personService
          .update(pers[0].id, nameObject)
          .then(newpers => {
            setPersons(persons.map(person => person.id !== pers[0].id ? person : newpers))
            setMessage({status: 'nonerror', message: `${newName} number updated`})
            setTimeout(() => {setMessage({status:null, message:null})}, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage({status: 'error', message: `${newName} has been removed from server`})
            setTimeout(() => {setMessage({status:null, message:null})}, 5000)
            setPersons(persons.filter(p => p.id !== pers[0].id))
          })
      }
      
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({status: 'nonerror', message: `${newName} added`})
          setTimeout(() => {setMessage({status:null, message:null})}, 5000)
          setNewName('')
          setNewNumber('')
        })    
    }
  }

  const removePerson = (id) => {
    if (window.confirm('Delete contact?')) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} status={message.status} />
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
          <Person key={person.name} person={person} filter={filter} removePerson={removePerson} />
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
const Person = ({person, filter, removePerson}) => {
  if (!filter) {
    return (
      <li>
        {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
      </li>
      )
  } else {
    if (person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
      return (
        <li>
          {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
        </li>
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


//display messages
const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  if (status === 'nonerror') {
    return (
      <div className="nonerror">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
}



export default App