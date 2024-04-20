import React from "react";
import "./WeatherBox.css";

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
      <img
        src="{icon ? require(../images/${icon}.svg):require('../images/01d.svg')}"
        alt="sun"
      />
      <span className="temp"> {Math.round(temp - 273.15)}°C</span>
    </div>
  );
};

export default WeatherBox;
