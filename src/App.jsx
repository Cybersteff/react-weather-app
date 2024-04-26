import React, { useState, useEffect, useRef } from "react";
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
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);

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
            <span className="moon-icon">
              <svg
                className="icon"
                width="12"
                height="12"
                aria-hidden="true"
                aria-label=""
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {
                  <svg
                    class="icon"
                    width="12"
                    height="12"
                    fill="currentColor"
                    aria-hidden="true"
                    aria-label=""
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m24 13.081c-0.2102 2.2744-1.0638 4.4419-2.4609 6.249-1.3971 1.807-3.28 3.1787-5.4282 3.9547-2.1483 0.776-4.4731 0.9241-6.7025 0.427-2.2294-0.4971-4.2711-1.6189-5.8862-3.234-1.6151-1.6151-2.7369-3.6568-3.2339-5.8862s-0.349-4.5542 0.42698-6.7025c0.77597-2.1483 2.1477-4.0311 3.9547-5.4282 1.807-1.3971 3.9746-2.2507 6.249-2.4609-1.3316 1.8015-1.9724 4.0211-1.8058 6.2552 0.1666 2.234 1.1295 4.334 2.7136 5.9181s3.6841 2.547 5.9181 2.7136c2.2341 0.1666 4.4537-0.4742 6.2552-1.8058z" />
                  </svg>
                }
              </svg>
            </span>
          ) : (
            <span className="sun-icon">
              <svg
                className="icon"
                width="12"
                height="12"
                aria-hidden="true"
                aria-label=""
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {
                  <svg
                    enableBackground="new 0 0 32 32"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Layer_2" />
                    <g id="Layer_3" />
                    <g id="Layer_4" />
                    <g id="Layer_5" />
                    <g id="Layer_6" />
                    <g id="Layer_7" />
                    <g id="Layer_8" />
                    <g id="Layer_9" />
                    <g id="Layer_10" />
                    <g id="Layer_11" />
                    <g id="Layer_12" />
                    <g id="Layer_13" />
                    <g id="Layer_14" />
                    <g id="Layer_15" />
                    <g id="Layer_16" />
                    <g id="Layer_17" />
                    <g id="Layer_18" />
                    <g id="Layer_19" />
                    <g id="Layer_20" />
                    <g id="Layer_21">
                      <g>
                        <path
                          d="M26,16c0,5.5-4.5,10-10,10S6,21.5,6,16S10.5,6,16,6S26,10.5,26,16z"
                          fill="#FFC10A"
                        />
                      </g>
                      <g>
                        <path
                          d="M16,1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1V2C17,1.4,16.6,1,16,1z"
                          fill="#F44236"
                        />
                        <path
                          d="M16,27c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C17,27.4,16.6,27,16,27z"
                          fill="#F44236"
                        />
                        <path
                          d="M30,15h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1S30.6,15,30,15z"
                          fill="#F44236"
                        />
                        <path
                          d="M4,15H2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1S4.6,15,4,15z"
                          fill="#F44236"
                        />
                        <path
                          d="M25.2,5.4l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4    c0.4-0.4,0.4-1,0-1.4S25.6,5,25.2,5.4z"
                          fill="#F44236"
                        />
                        <path
                          d="M6.8,23.8l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4    c0.4-0.4,0.4-1,0-1.4S7.2,23.4,6.8,23.8z"
                          fill="#F44236"
                        />
                        <path
                          d="M6.8,5.4C6.4,5,5.8,5,5.4,5.4s-0.4,1,0,1.4l1.4,1.4C7,8.4,7.3,8.5,7.5,8.5S8,8.4,8.2,8.2    c0.4-0.4,0.4-1,0-1.4L6.8,5.4z"
                          fill="#F44236"
                        />
                        <path
                          d="M25.2,23.8c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3    c0.4-0.4,0.4-1,0-1.4L25.2,23.8z"
                          fill="#F44236"
                        />
                      </g>
                    </g>
                    <g id="Layer_22" />
                    <g id="Layer_23" />
                    <g id="Layer_24" />
                    <g id="Layer_25" />
                    <g id="Wearher" />
                  </svg>
                }
              </svg>
            </span>
          )}
        </span>
      </label>
      <header className="App-header">
        <MainWeatherWindow ref={mainRef} data={days[0]} city={city}>
          <CityInput city={city} makeApiCall={makeApiCall} />
          <ul className="weather-box-list">{weatherBoxElements}</ul>
        </MainWeatherWindow>
      </header>
    </div>
  );
};

export default App;
