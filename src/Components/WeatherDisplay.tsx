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
    <div className="mt-[1.2rem] flex gap-[1.5rem]">
      <div className="flex flex-col gap-[.5rem]">
        <p className="text-[1.4rem]">
          <span className="text-[1.4rem] font-bold">City:</span> {location.name}
        </p>
        <p className="text-[1.4rem]">
          <span className="text-[1.4rem] font-bold">Temperature:</span>{" "}
          {temperature.toFixed(2)} {isCelsius ? "°C" : "°F"}
        </p>
        <p className="text-[1.4rem]">
          <span className="text-[1.4rem] font-bold">Weather:</span>{" "}
          {current.condition.text}
        </p>
        <button
          onClick={toggleTemperature}
          className="mt-2 bg-[#5d87ff] hover:bg-[#5075db] text-[1.2rem] text-white px-4 py-2 rounded"
        >
          Toggle Temperature
        </button>
      </div>
      <div className="">
        <img
          src={current.condition.icon}
          alt="Weather icon"
          className="h-[10rem]"
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
