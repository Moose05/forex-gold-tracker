import { useState, useEffect } from "react";
import { fetchRates } from "../services/forexAPI";
import useInterval from "../hooks/useInterval";

function ForexRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getRates = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    const data = await fetchRates();
    if (data) {
      setRates(data);
      setLastUpdated(new Date().toLocaleTimeString());
    }

    isManual ? setRefreshing(false) : setLoading(false);
  };

  useEffect(() => {
    getRates();
  }, []);

  useInterval(() => {
    getRates();
  }, 10000);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Forex & Gold Tracker</h1>
        <button
          onClick={() => getRates(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          {refreshing ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "🔄 Refresh Rates"
          )}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">Last updated: {lastUpdated}</p>

      {loading ? (
        <p>Loading exchange rates...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(rates).map(([currency, rate]) => (
            <div
              key={currency}
              className="bg-white p-4 rounded shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{currency}/USD</h2>
              <p className="text-xl">{rate.toFixed(4)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForexRates;
