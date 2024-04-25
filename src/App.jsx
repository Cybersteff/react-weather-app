import React, { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import "./App.css";
import MainWeatherWindow from "./components/MainWeatherWindow";
import CityInput from "./components/CityInputs";
import WeatherBox from "./components/WeatherBox";

const App = () => {
  const [city, setCity] = useState(undefined);
  const [days, setDays] = useState(new Array(5));
  const [weatherBoxElements, setWeatherBoxElements] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const updateState = (data) => {
    const city = data.city.name;
    const days = [];
    const dayIndices = getDayIndices(data);
    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }
    setCity(city);
    setDays(days);
    const WeatherBoxes = days.slice(1).map((day, index) => (
      <li key={index}>
        <WeatherBox {...day} />
      </li>
    ));
    setWeatherBoxElements(WeatherBoxes);
  };

  const makeApiCall = async (city) => {
    try {
      const apiKey = "2ee51bd454766d1a7224c6c17b161546";
      const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const apiData = await response.json();
      console.log(apiData);
      updateState(apiData); // Assuming updateState is defined and updates the component state
      return true; // Return true to indicate successful API call
    } catch (error) {
      console.error("Error fetching data:", error);
      return false; // Return false to indicate failed API call
    }
  };

  const getDayIndices = (data) => {
    let dayIndices = [];
    dayIndices.push(0);
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);
    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "15"
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  useEffect(() => {
    const WeatherBoxes = days.slice(1).map((day, index) => (
      <li key={index}>
        <WeatherBox {...day} />
      </li>
    ));
    setWeatherBoxElements(WeatherBoxes);
  }, [days]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark mode slider toggle */}
      <label className="dark-mode-toggle">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          className="slider"
        />
        <span className="slider round">
          {darkMode ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </span>
      </label>
      <header className="App-header">
        <MainWeatherWindow data={days[0]} city={city}>
          <CityInput city={city} makeApiCall={makeApiCall} />
          <ul className="weather-box-list">{weatherBoxElements}</ul>
        </MainWeatherWindow>
      </header>
    </div>
  );
};

export default App;
