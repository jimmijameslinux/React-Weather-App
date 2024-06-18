const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current } = weatherData;
  const {
    last_updated,
    temp_c,
    temp_f,
    condition,
    wind_mph,
    wind_kph,
    humidity,
    feelslike_c,
    feelslike_f,
    pressure_mb,
    precip_mm,
    uv,
    gust_mph,
    gust_kph,
  } = current;

  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <p>Last Updated: {last_updated}</p>
      <div className="weather-condition">
        <img src={condition.icon} alt={condition.text} />
        <span>{condition.text}</span>
      </div>
      <div className="weather-details">
        <p>Temperature: {temp_c}°C / {temp_f}°F</p>
        <p>Feels Like: {feelslike_c}°C / {feelslike_f}°F</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind_mph} mph / {wind_kph} kph</p>
        <p>Pressure: {pressure_mb} mb</p>
        <p>Precipitation: {precip_mm} mm</p>
        <p>UV Index: {uv}</p>
        <p>Gust: {gust_mph} mph / {gust_kph} kph</p>
      </div>
    </div>
  );
};

export default WeatherCard;
