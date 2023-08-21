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
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error getting weather data:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="max-h-screen h-screen p-[4rem] flex flex-col items-center justify-center bg-[#5d87ff]">
        <div className="border border-[#5d87ff] bg-white rounded-md w-[50%] h-[50%] p-[1rem] flex flex-col items-center justify-center shadow-2xl">
          <h2 className="text-[2.4rem] text-[#5d87ff] font-bold">
            Weather Application
          </h2>
          <div className="mt-[.8rem]">
            <form
              className="flex items-center border border-[#5d87ff] rounded-full"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="text"
                  id="city"
                  placeholder="Search for a City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-[1.5rem] text-[1.2rem] border-r rounded-full rounded-r-none focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="hover:cursor-pointer p-[.6rem] rounded-full rounded-l-none border border-[#5d87ff] bg-[#5d87ff] hover:bg-[#5075db]"
              >
                <IoSearch className="text-[2.4rem] text-white" />
              </button>
            </form>
          </div>
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
      </div>
    </>
  );
};

export default Home;
