import axios from "axios";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import WeatherDisplay from "./WeatherDisplay";

const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "caf2ebe3b95c4c59be655137232108";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(city);
    try {
      const response = await getWeatherData(city);
      console.log(response);
      setCity("");
      setWeatherData(response);
    } catch (error) {
      console.error("Error getting weather data:", error);
    }
  };
  
  const getWeatherData = async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
      const data = response.data; 
      return data;
    } catch (error) {
      console.error("Error getting weather data:", error); 
      throw error;
    }
  };
  

  return (
    <>
      <div className="max-h-screen h-screen p-[4rem] flex flex-col items-center">
        <h2 className="text-[2.4rem] text-[#5d87ff] font-bold">
          Weather Application
        </h2>
        <div className="mt-[1.5rem]">
          <form
            className="flex items-center gap-[.8rem]"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                id="city"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-[1rem] text-[1.2rem] border border-[#0000001a] rounded-md focus:border-[#5d87ff] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="hover:cursor-pointer p-[.6rem] rounded-full transition-all ease-in-out"
            >
              <IoSearch className="text-[2.4rem] text-[#5d87ff]" />
            </button>
          </form>
        </div>
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </>
  );
};

export default Home;
