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
      <Countries countries={countries} filter={filter} setFilter={setFilter}/>
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
const Countries = ({countries, filter, setFilter}) => {
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
          <Country key={country.name.common} country={country} setFilter={setFilter}/>)}
      </ul>
    )
  } else {
    return <p>Too many matches, specify another filter</p>
  }
  
}

//component to display many countries + button next to names
const Country = ({country, setFilter}) => {
  return (
    <li>
      {country.name.common} 
      <button onClick={() => setFilter(country.name.common)}>
        show
      </button>
    </li>
  )
}

//fetching and displaying weather data for country capital
const Weather = ({country}) => {
  const [weather, setWeather] = useState({})
  const latlng = country.capitalInfo.latlng
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
      })
  }, [latlng, api_key])

  
  if (Object.entries(weather).length !== 0) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          Temperature is {(weather.main.temp-273.15).toFixed(1)} °C <br></br>
          Wind speed is {weather.wind.speed} km/h <br></br>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather icon"/>
        </p>
      </div>
    )
  }
  
}

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
      <Weather country={country} />
    </div>
  )

}

export default App