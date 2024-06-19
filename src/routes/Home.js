import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Home.css";

const FetchWeatherData = async (query, setWeatherData) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    setWeatherData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    FetchWeatherData(query, setWeatherData);
  }, [query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams({ city: newQuery });
  };

  const handleBoxClick = () => {
    navigate(`/${query}`);
  };

  return (
    <div className="container">
      <h1>Weather Application</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      {weatherData && searchParams.get("city") != "" && (
        <div className="weather-box" onClick={handleBoxClick}>
          <h1>{query}</h1>
          <h3>
            {weatherData.location.region},{weatherData.location.country}
          </h3>
          <div className="weather-condition">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
            <span>{weatherData.current.condition.text}</span>
          </div>
          <p>
            Temperature: <b>{weatherData.current.temp_c}°C</b>
          </p>
        </div>
      )}
    </div>
  );
}
