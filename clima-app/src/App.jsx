import { useState, useEffect } from "react";
import { link, Outlet } from "react-router-dom";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkmode);
  }, [darkmode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className="flex justify-between items-center p-4 shadow">
        <h1 className="text-2xl font-bold">Clima App</h1>

        <div className="flex justify-between items-center p-4 shadow">
          <Link to="/" className="hover:underline">Inicio</Link>
          <button
            onClick={() => setDarkmode(!darkmode)}
            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition">{darkMode ? "☀️ Claro" : "🌙 Oscuro"}</button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;