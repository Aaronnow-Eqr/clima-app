import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext.jsx";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "6e126e4d024fbd0367a121cf5a4ce377";

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
      if (!res.ok) throw new Error("Ciudad no encontrada");
      const data = await res.json();
      setWeather(data);
      setError("");
    } 
    catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`flex flex-col items-center mt-10 px-4 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900" }`}>
      <form onSubmit={fetchWeather} className="flex flex-col gap-4 mb-6 w-full max-w-md">
        <div className="flex gap-2">
          <input type="text" placeholder="Busca una ciudad..." value={city} onChange={(e) => setCity(e.target.value)} className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300 ${ darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}/>
          <button type="submit" className={`px-4 py-2 rounded-lg transition ${ darkMode ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white" }`}>Buscar</button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className={`p-6 rounded-2xl shadow-lg w-full max-w-sm transition-colors duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900" }`}>
          <div className={`flex items-center justify-between mb-4 p-4 rounded-2xl transition-colors duration-300 ${ darkMode ? "bg-gray-700" : "bg-gray-200" }`}>
            <h2 className="text-2xl font-bold">
              {weather.name}, {weather.sys.country}
            </h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icono clima" className="w-24 h-24"/>
          </div>

          <p className="capitalize text-lg mb-2 text-center">
            {weather.weather[0].description}
          </p>
          <p className="text-4xl font-semibold mb-4 text-center">
            {Math.round(weather.main.temp)}°C
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span>🌡️</span>
              <p>Sensación: {Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="flex items-center gap-2">
              <span>💧</span>
              <p>Humedad: {weather.main.humidity}%</p>
            </div>
            <div className="flex items-center gap-2">
              <span>🌬️</span>
              <p>Viento: {(weather.wind.speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="flex items-center gap-2">
              <span>⛅</span>
              <p>Nubosidad: {weather.clouds.all}%</p>
            </div>
            <div className="flex items-center gap-2">
              <span>🌧️</span>
              <p>
                Lluvia:{" "}
                {weather.rain ? (weather.rain["1h"] ?? weather.rain["3h"]) + " mm" : "0 mm"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>🔭</span>
              <p>Visibilidad: {weather.visibility / 1000} km</p>
            </div>
            <div className="flex items-center gap-2">
              <span>🌅</span>
              <p>Salida: {formatTime(weather.sys.sunrise)}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>🌇</span>
              <p>Puesta: {formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;


39.50