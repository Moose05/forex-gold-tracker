import { Routes, Route } from "react-router-dom";
import ForexRates from "./pages/ForexRates";
import Tasks from "./pages/TradeJournal";
import About from "./pages/About";
import Layout from "./components/Layout";
import TradeJournal from "./pages/TradeJournal";

function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ForexRates />} />
          <Route path="/Tasks" element={<TradeJournal />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
  );
}

export default App;
