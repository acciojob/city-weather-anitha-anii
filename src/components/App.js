import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  function handleSearchUpdate(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    let key = "87e4d8152db8377e68f0144c06dbc0e3";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let weatherData = {
          cityname: data.name,
          temperature:((data.main.temp - 273.15) * 9/5 + 32).toFixed(2),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };
        setWeatherData(weatherData);
        setSearch("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        type="search"
        value={search}
        onChange={handleSearchUpdate}
        className="search"
      />
      {weatherData && (
        <div className="weather">
          <div>{weatherData.cityname}</div>
          <h1>{weatherData.temperature} °F</h1>
          <p>{weatherData.description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default App;


