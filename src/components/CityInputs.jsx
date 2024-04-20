import React, { useState } from "react";
import "./CityInput.css";

const CityInput = ({ makeApiCall }) => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter a City...");

  const onKeyPressHandler = (e) => {
    const keyPressHandler = async () => {
      const eventKey = e.which ? e.which : e.keyCode;
      if (eventKey === 13) {
        if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
          setLoading(true);
          if (await makeApiCall(city)) {
            setPlaceholder("Enter a City...");
          } else {
            setPlaceholder("City was not found, try again...");
          }
        } else {
          setPlaceholder("Please enter a valid city name...");
        }
        setLoading(false);
        setCity("");
      }
    };
    keyPressHandler();
  };

  const style = {
    top: city ? "-380px" : "-20px",
    width: "600px",
    display: "inline-block",
    padding: "10px 0px 10px 30px",
    lineHeight: "120%",
    position: "relative",
    borderRadius: "20px",
    outline: "none",
    fontSize: "20px",
    transition: "all 0.5s ease-out",
  };
  return (
    <input
      className="city-input"
      style={style}
      type="text"
      placeholder={placeholder}
      onPress={onKeyPressHandler}
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  );
};

export default CityInput;
