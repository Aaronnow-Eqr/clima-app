import { Link } from 'react-router-dom'
import { useTheme } from './ThemeContext'

export default function Layout({ children }) {
  const { dark, toggle } = useTheme()

  // definir clases base
  const wrapper = `${dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen transition-colors`
  const headerBg = dark ? 'bg-gray-800' : 'bg-white'

  return (
    <div className={wrapper}>
      <header className={`p-4 flex justify-between items-center ${headerBg} shadow`}>
        <Link to="/" className="text-xl">ClimaApp</Link>
        <button onClick={toggle} className="px-3 py-1 border rounded">
          {dark ? '🌞 Claro' : '🌙 Oscuro'}
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}