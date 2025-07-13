import { Routes, Route } from "react-router-dom";
import ForexRates from "./pages/ForexRates";
import Tasks from "./pages/Tasks";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        <Route path="/" element={<ForexRates />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
