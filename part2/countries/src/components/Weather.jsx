import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY

  useEffect(() => {
    if (!capital) return;

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  if (!weather) {
    return null;
  }

  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='weather icon' width='80px' />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </>
  )
}

export default Weather