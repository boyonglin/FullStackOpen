import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Weather from './components/Weather'
import Country from './components/Country'

const Countries = ({ countries, handleClick }) => {
  if (countries === null) {
    return <div>Loading...</div>
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name.common} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {country.name.common} <button onClick={handleClick}>show</button>
          </div>
        )}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    const capital = country.capital[0]

    return (
      <div>
        <Country country={country} />
        <Weather capital={capital} />
      </div>
    )
  } else {
    return <div>No matches</div>
  }
}

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = filter === ''
    ? countries
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  const showCountry = (event) => {
    const countryName = event.target.previousSibling.wholeText.trim();
    setFilter(countryName)
  }

  return (
    <>
      <div style={{ paddingBottom: '1rem' }}>
        Find countries <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <Countries countries={countriesToShow} handleClick={showCountry} />
    </>
  )
}

export default App
