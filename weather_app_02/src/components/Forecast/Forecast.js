import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {
  function getForecast(e) {
    // Don't submit the form!
    e.preventDefault();
    if (city.length === 0) {
      return setError(true);
    }

    // clear state in preparation for new data
    setError(false);
    setResponseObj({});

    setLoading(true);

    // The city-input will need to be URI encoded before we put it in our URL string
    const uriEncodedCity = encodeURIComponent(city);

    // weather data fetch function will go here
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
        if (response.cod !== 200) {
          throw new Error();
        }

        setResponseObj(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }

  // Send in the hooks!
  let [city, setCity] = useState('');
  let [unit, setUnit] = useState('imperial');
  // We expect the future value to be a JSON object, so we are setting the starting value to an empty object.
  let [responseObj, setResponseObj] = useState({});

  // Error handling:
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  return (
    // JSX code will go here
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Which city?"
          maxLength="50"
          className={classes.textInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === 'imperial'}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === 'metric'}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Celsius
        </label>

        <p>
          <button className={classes.Button} type="submit">
            Get Forecast
          </button>
        </p>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
    </div>
  );
};

export default Forecast;
