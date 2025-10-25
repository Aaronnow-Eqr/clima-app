import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../services/Weather'

export default function WeatherPage() {
  const { city } = useParams()
  const [data, setData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const current = await fetchCurrentWeather(city)
        setData(current)
        const fc = await fetchForecast(current.coord.lat, current.coord.lon)
        setForecast(fc)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [city])

  if (error) return (
    <div className="text-center">
      <p>{error}</p>
      <Link to="/" className="text-blue-500 underline">Volver</Link>
    </div>
  )

  if (!data || !forecast) return (
    <p className="text-center">Cargando...</p>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/" className="text-blue-500 underline">← Nueva búsqueda</Link>
      <section className="p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl mb-2">{data.name}, {data.sys.country}</h2>
        <p>Temperatura actual: {data.main.temp}°C</p>
        <p>Sensación térmica: {data.main.feels_like}°C</p>
        <p>Humedad: {data.main.humidity}%</p>
        <p>Viento: {data.wind.speed} m/s</p>
        <p>Descripción: {data.weather[0].description}</p>
      </section>
      <section>
        <h3 className="text-xl mb-2">Pronóstico diario</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {forecast.daily.slice(1, 6).map((d,i) => (
            <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded">
              <p>{new Date(d.dt * 1000).toLocaleDateString()}</p>
              <p>Min: {d.temp.min}°C</p>
              <p>Max: {d.temp.max}°C</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}