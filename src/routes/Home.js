import React, { useState, useEffect, useDeferredValue, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Home.css";
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
    } catch (error) {}
};

export function Home2() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate();

    const h1Node = useRef(null);
    // {current: 0}
    // count.current <- 0
    // count.current = count.current + 1

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchWeatherData(query, setWeatherData);
        }, 500);
        return () => clearTimeout(timeoutId);
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
                <div className="weather-box">
                    <h1>
                        {query}
                    </h1>
                    <h3>
                        {weatherData.location.region},
                        {weatherData.location.country}
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

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("city");
    const cityWeatherQuery = useQuery({
        queryKey: ["cityWeather", query],
        queryFn: async ({ queryKey }) => {
            const [, city] = queryKey;
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        enabled: Boolean(query),
        refetchInterval: 10 * 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        
    });
    const handleInputChange = () => null

    const weatherData = cityWeatherQuery.data;

    return (
      <pre>
        {JSON.stringify(cityWeatherQuery, null, 4)}
      </pre>
    )
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
                <div className="weather-box">
                    <h1>
                        {query}
                    </h1>
                    <h3>
                        {weatherData.location.region},
                        {weatherData.location.country}
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

            <a href={`/${query}`}>Go to weather page</a>
        </div>
    )
}
