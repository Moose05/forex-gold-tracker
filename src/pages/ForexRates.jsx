import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const ForexRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD,NZD,CHF"
      );
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.error?.info || "Failed to fetch rates");
      }
      setRates(data.rates || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initially and auto-refresh every 10s
  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filtering
  const filteredRates = Object.entries(rates).filter(([symbol]) =>
    symbol.includes(searchTerm.toUpperCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  const paginatedRates = filteredRates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">💱 Forex Rates (USD Base)</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search currency (e.g. EUR, JPY)"
          className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="primary" onClick={fetchRates}>
          🔄 Refresh Rates
        </Button>
      </div>

      {loading && <p className="text-blue-500 text-center">⏳ Loading rates...</p>}
      {error && <p className="text-red-500 text-center">❌ {error}</p>}

      {!loading && !error && paginatedRates.length === 0 && (
        <p className="text-gray-500 text-center">No currencies matched your search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paginatedRates.map(([symbol, rate]) => (
          <Card key={symbol} title={symbol}>
            <p className="text-xl font-semibold">{rate}</p>
          </Card>
        ))}
      </div>

      {!loading && !error && paginatedRates.length > 0 && (
        <div className="flex justify-center mt-6 items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </Button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForexRates;
