import React from "react";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  return (
    <div className="weather-display">
      <h2>{location.name}</h2>
      <div className="weather-info">
        <p>Temperature: {current.temp_c} °C</p>
        <p>Weather: {current.condition.text}</p>
        <img src={current.condition.icon} alt="Weather icon" />
      </div>
    </div>
  );
};

export default WeatherDisplay;
