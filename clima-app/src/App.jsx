import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/ui/Layout'
import SearchPage from './components/pages/SearchPage'
import WeatherPage from './components/pages/WeatherPage'
import { ThemeProvider } from './components/ui/ThemeContext'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/weather/:city" element={<WeatherPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

