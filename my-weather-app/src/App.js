import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New York');
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }
      //const response = await axios.get(`http://localhost:8080/weather?location=${location}`);
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching the weather data');
      console.error('Error fetching the weather data', error);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather(location);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather ? (
        <div>
          <p>Location: {weather.location.name}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;
