import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { DarkModeContext } from "./context/DarkModeContext.jsx";

function App() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <nav className="flex justify-between items-center p-4 shadow">
        <h1 className="text-xl font-bold">🌤️ Clima App</h1>
        <button onClick={toggleDarkMode} className="px-3 py-1 rounded-lg border hover:opacity-80 transition">
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
