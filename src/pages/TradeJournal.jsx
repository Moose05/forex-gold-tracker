import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import useLocalStorage from "../hooks/useLocalStrorage";

function TradeJournal() {
  const [trades,setTrades] = useLocalStorage("trades",[]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ pair: "", entry: "", exit: "", notes: "" });

  const addTrade = () => {
    if (!form.pair || !form.entry || !form.exit) return;
    const newTrade = {
      id: Date.now(),
      ...form,
      result: "pending",
    };
    setTrades([newTrade, ...trades]);
    setForm({ pair: "", entry: "", exit: "", notes: "" });
  };

  const setResult = (id, result) => {
    setTrades((prev) =>
      prev.map((trade) => (trade.id === id ? { ...trade, result } : trade))
    );
  };

  const filteredTrades = trades.filter((trade) =>
    filter === "all" ? true : trade.result === filter
  );

  const totalWins = trades.filter((t) => t.result === "win").length;
  const totalLosses = trades.filter((t) => t.result === "loss").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📒 Trade Journal</h1>

      {/* Trade Form */}
      <Card title="Add New Trade">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Pair (e.g. EUR/USD)"
            className="border p-2 rounded"
            value={form.pair}
            onChange={(e) => setForm({ ...form, pair: e.target.value })}
          />
          <input
            type="text"
            placeholder="Entry Price"
            className="border p-2 rounded"
            value={form.entry}
            onChange={(e) => setForm({ ...form, entry: e.target.value })}
          />
          <input
            type="text"
            placeholder="Exit Price"
            className="border p-2 rounded"
            value={form.exit}
            onChange={(e) => setForm({ ...form, exit: e.target.value })}
          />
          <input
            type="text"
            placeholder="Notes"
            className="border p-2 rounded"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <Button onClick={addTrade} className="mt-4">➕ Add Trade</Button>
      </Card>

      {/* Filters */}
      <div className="flex gap-2">
        <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "win" ? "primary" : "secondary"} onClick={() => setFilter("win")}>Wins</Button>
        <Button variant={filter === "loss" ? "primary" : "secondary"} onClick={() => setFilter("loss")}>Losses</Button>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-700">
        Total Trades: {trades.length} | ✅ Wins: {totalWins} | ❌ Losses: {totalLosses}
      </div>

      {/* Trade List */}
      <div className="grid gap-4">
        {filteredTrades.map((trade) => (
          <Card key={trade.id} title={`${trade.pair}`}>
            <p>Entry: {trade.entry}</p>
            <p>Exit: {trade.exit}</p>
            <p>Notes: {trade.notes}</p>
            <p>
              Result:{" "}
              {trade.result === "pending" ? (
                <span className="italic text-gray-500">Pending</span>
              ) : trade.result === "win" ? (
                <span className="text-green-600 font-semibold">Win ✅</span>
              ) : (
                <span className="text-red-600 font-semibold">Loss ❌</span>
              )}
            </p>

            {trade.result === "pending" && (
              <div className="mt-2 flex gap-2">
                <Button variant="primary" onClick={() => setResult(trade.id, "win")}>
                  Mark Win
                </Button>
                <Button variant="danger" onClick={() => setResult(trade.id, "loss")}>
                  Mark Loss
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TradeJournal;
