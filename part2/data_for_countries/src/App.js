import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  //read data from server
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

//component to create filter field
const Filter = (props) => {
  return (
    <div>
      find countries <input
      value={props.filter}
      onChange={props.handleFilterChange}
      />
    </div>
  )
}

//component to filter and display countries
const Countries = ({countries, filter}) => {
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  if (filtered.length === 1) {
    return(
      <SingleCountry country={filtered[0]} />
    )
  } else if (filtered.length <= 10) {
    return (
      <ul>
        {filtered.map(country =>
          <Country key={country.name.common} country={country} />)}
      </ul>
    )
  } else {
    return <p>Too many matches, specify another filter</p>
  }
  
}

//component to display many countries
const Country = ({country}) => <li>{country.name.common}</li>

//component to display more data from single country
const SingleCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital: {country.capital}<br></br>
        area: {country.area}
      </p>
      <h2>languages:</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) =>
          <li key={key}>
            {value}
          </li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag of the country"/>
    </div>
  )

}

export default App