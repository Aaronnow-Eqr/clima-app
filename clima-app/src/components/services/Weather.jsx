const API_KEY = process.env.REACT_APP_WEATHER_KEY

export async function fetchCurrentWeather(city) {
  const q = encodeURIComponent(city.trim())
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${API_KEY}`

  console.log('👉 fetchCurrentWeather URL:', url)
  const res = await fetch(url)
  const data = await res.json()
  console.log('🔔 status:', res.status, 'data:', data)

  if (!res.ok) {
    throw new Error(data.message || 'Ubicación no encontrada')
  }
  return data
}