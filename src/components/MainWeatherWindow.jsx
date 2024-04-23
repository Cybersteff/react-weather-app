import React from "react";
import "./MainWeatherWindow.css";
import defaultIcon from "../images/01d.svg"; // Import default icon
import { IMAGES } from "../images/image";

const MainWeatherWindow = ({ city, data, children }) => {
  const Title = !city ? <h1 className="title">Weather Forecast</h1> : null;

  return (
    <div className="main">
      <div className="inner-main">
        {Title}
        {data && <IMAGES code={data.icon} />}
        <div
          className="today"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        >
          <span>Today</span>
          <h1>{city}</h1>
          <p>Temperature: {data ? Math.round(data.temp - 273.15) : 0} °C</p>
          <p>{data ? data.weather_desc.toLowerCase() : ""}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainWeatherWindow;
