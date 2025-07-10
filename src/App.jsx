import { useEffect, useState } from "react";
import { fetchRates } from "./services/forexAPI";
import useInterval from "./hooks/useInterval";


function App() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const getRates = async (isManual =false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

      console.log("Fetching rates")
      const data = await fetchRates();
      // add as checking 
      console.log("data recieved ",data);
      setRates(data);
      setLastUpdated(new Date().toLocaleDateString());
      if (isManual) setRefreshing(false);
      else setLoading(false);
  };
    

    useEffect(() =>{
      getRates();
    },[]);

    useInterval(()=> {
      console.log("Auto-refreshiing rates... ");
      getRates();
    }, 5000);

{!rates || Object.keys(rates).length === 0 ? (
  <p>Unable to load exchange rates.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.entries(rates).map(([currency, rate]) => (
      <div key={currency} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">{currency}/USD</h2>
        <p className="text-xl">{rate.toFixed(4)}</p>
      </div>
    ))}
  </div>
)}

   
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Foreign Exchange Tracker</h1>
      
      <div className="flex items-center justify-between mb-4">
       
        <p className="text-sm text-grey-600">
          Last updated: {lastUpdated || "Loading..."}
        </p>

        <button onClick={() => getRates(true)} 
          className="bg-blue-600 text -white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          
          {refreshing ? (
            <svg 
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              >
              <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
              />

            </svg>
          ) : (
          "Refresh Rates"
          )} 
        </button>
      </div>

      {loading ? (
        <p> Loading Exchange Rates...</p>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(rates).map(([currency, rate]) => (
            <div key={currency}
              className="bg-white p-4 rounded shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold">{currency}/USD</h2>
              <p className="text-xl">{rate.toFixed(4)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;