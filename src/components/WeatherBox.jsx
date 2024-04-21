import React from "react";
import "./WeatherBox.css";
import sunnyIcon from "../images/01d.svg"; // Import default icon if icon is not provided

const WeatherBox = ({ date, icon, temp }) => {
  const getDay = (date) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[new Date(date).getDay()];
  };

  return (
    <div className="weather-box">
      <h1>{date ? getDay(date) : ""}</h1>
      <img src={icon ? `../images/${icon}.svg` : sunnyIcon} alt="sun" />
      <span className="temp">{Math.round(temp - 273.15)}°C</span>
    </div>
  );
};

export default WeatherBox;
