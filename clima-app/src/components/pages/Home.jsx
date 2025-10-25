import { useState } from "react";

function Home({ darkMode }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "6e126e4d024fbd0367a121cf5a4ce377"

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

  return (
    <div className="flex flex-col items-center mt-10">
      <form onSubmit={fetchWeather} className="flex gap-2 mb-6 w-full max-w-md">
        <input type="text" placeholder="Busca una ciudad..." value={city} onChange={(e) => setCity(e.target.value)} className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring focus:ring-blue-300 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}/>
        <button type="submit" className={`px-4 py-2 rounded-lg transition ${darkMode ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Buscar</button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className={`p-6 rounded-2xl shadow-lg text-center w-64 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icono clima" className="mx-auto"/>
          <p className="text-4xl font-semibold">{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

export default Home;
