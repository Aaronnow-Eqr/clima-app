import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [city, setCity] = useState('')
  const nav = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (city.trim()) nav(`/weather/${city.trim()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Escribe una ciudad"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Buscar Clima
      </button>
    </form>
  )
}