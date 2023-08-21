import React, { useState } from "react";

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
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperature = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const temperature = isCelsius
    ? current.temp_c
    : (current.temp_c * 9) / 5 + 32;

  return (
    <div className="weather-display">
      <h2 className="text-[1.4rem]">
        <span className="text-[1.4rem] font-bold">City:</span> {location.name}
      </h2>
      <div className="weather-info">
        <p className="text-[1.4rem]">
          <span className="text-[1.4rem] font-bold">Temperature:</span>{" "}
          {temperature.toFixed(2)} {isCelsius ? "°C" : "°F"}
        </p>
        <p className="text-[1.4rem]">
          <span className="text-[1.4rem] font-bold">Weather:</span>{" "}
          {current.condition.text}
        </p>
        <img src={current.condition.icon} alt="Weather icon" />
      </div>
      <button
        onClick={toggleTemperature}
        className="mt-2 bg-[#5d87ff] hover:bg-[#5075db] text-white px-4 py-2 rounded"
      >
        Toggle Temperature
      </button>
    </div>
  );
};

export default WeatherDisplay;
