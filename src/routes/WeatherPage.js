import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './WeatherPage.css';

const FetchWeatherData = async (query, setWeatherData) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    setWeatherData(data);
  } catch (error) {
    setError(error.message);
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const WeatherPage = () => {
  const { cityname } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    FetchWeatherData(cityname, setWeatherData);
  }, [cityname]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="weather-page">
      {weatherData && (
        <>
          <h1>Weather Details for {cityname}</h1>
        <div className="weather-details">
          <p>Temperature: {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</p>
          <div className="weather-condition">
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <span>{weatherData.current.condition.text}</span>
          </div>
          <p>Feels Like: {weatherData.current.feelslike_c}°C / {weatherData.current.feelslike_f}°F</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_mph} mph / {weatherData.current.wind_kph} kph</p>
          <p>Pressure: {weatherData.current.pressure_mb} mb</p>
          <p>Precipitation: {weatherData.current.precip_mm} mm</p>
          <p>UV Index: {weatherData.current.uv}</p>
          <p>Gust: {weatherData.current.gust_mph} mph / {weatherData.current.gust_kph} kph</p>
        </div>
        </>
      )}
      <button onClick={handleGoBack} className="go-back-button">Go Back</button>
    </div>
  );
};
