import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WeatherPage.css";
import { useQuery } from "@tanstack/react-query";

const fetchWeatherData = async (query, setWeatherData) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }
        const data = await response.json();
        setWeatherData(data);
    } catch (error) {
        setError(error.message);
        console.error("There was a problem with the fetch operation:", error);
    }
};

export const WeatherPage = () => {
    const { cityname } = useParams();
    const query = cityname;
    const navigate = useNavigate();
    const cityWeatherQuery = useQuery({
        queryKey: ["cityWeather", query],
        queryFn: async ({ queryKey }) => {
            const [, city] = queryKey;
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        enabled: Boolean(query),
    });
    const handleInputChange = () => null;

    const weatherData = cityWeatherQuery.data;
    const handleGoBack = () => {
        navigate("/?city=" + cityname );
    };

    return (
        <div className="weather-page">
            {weatherData && (
                <>
                    <h1>Weather Details for {cityname}</h1>
                    <br />
                    <br />
                    <div className="weather-details">
                        <div className="weather-condition">
                            <img
                                src={weatherData.current.condition.icon}
                                alt={weatherData.current.condition.text}
                            />
                            <span>{weatherData.current.condition.text}</span>
                        </div>
                        <p className="temp">
                            Temperature: {weatherData.current.temp_c}°C /{" "}
                            {weatherData.current.temp_f}°F
                        </p>
                        <p className="feels-like">
                            Feels Like: {weatherData.current.feelslike_c}°C /{" "}
                            {weatherData.current.feelslike_f}°F
                        </p>
                        <p className="humidity">
                            Humidity: {weatherData.current.humidity}%
                        </p>
                        <p className="wind">
                            Wind: {weatherData.current.wind_mph} mph /{" "}
                            {weatherData.current.wind_kph} kph
                        </p>
                        <p className="pressure">
                            Pressure: {weatherData.current.pressure_mb} mb
                        </p>
                        <p className="precipitation">
                            Precipitation: {weatherData.current.precip_mm} mm
                        </p>
                        <p className="uv">UV Index: {weatherData.current.uv}</p>
                        <p className="gust">
                            Gust: {weatherData.current.gust_mph} mph /{" "}
                            {weatherData.current.gust_kph} kph
                        </p>
                    </div>
                </>
            )}
            <button onClick={handleGoBack} className="go-back-button">
                Go Back
            </button>
        </div>
    );
};
