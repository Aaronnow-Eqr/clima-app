import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <nav className="flex justify-between items-center p-4 shadow">
        <h1 className="text-xl font-bold">🌤️ Clima App</h1>
        <button onClick={toggleDarkMode} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition">{darkMode ? "☀️ Claro" : "🌙 Oscuro"}</button>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
