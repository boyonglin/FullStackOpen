import React from 'react'

const Country = ({ country }) => {
  const capital = country.capital[0]

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages:</h2>
      <div style={{ textAlign: 'center' }}>
        <ul style={{ textAlign: 'left', display: 'inline-block', paddingLeft: '0', listStylePosition: 'inside' }}>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
      </div>
      <img src={country.flags.png} alt='flag' width='100px' />
    </>
  )
}

export default Country