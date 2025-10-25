import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);}, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className="flex justify-between items-center p-4 shadow">
        <h1 className="text-2xl font-bold">🌤️ Clima-App</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition">{darkMode ? "☀️ Claro" : "🌙 Oscuro"}</button>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
