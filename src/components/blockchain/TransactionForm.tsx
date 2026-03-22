import { useState } from "react";

interface Props {
  onAdd: (data: string) => void;
}

function TransactionForm({ onAdd }: Props) {
  const [data, setData] = useState("");

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>

      <input
        className="w-full p-2 rounded bg-gray-700 text-white outline-none"
        placeholder="e.g. A sends 100 to B"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button
        onClick={() => {
          if (!data) return;
          onAdd(data);
          setData("");
        }}
        className="mt-3 w-full bg-green-500 py-2 rounded hover:bg-green-600 transition"
      >
        Add Block
      </button>
    </div>
  );
}

export default TransactionForm;