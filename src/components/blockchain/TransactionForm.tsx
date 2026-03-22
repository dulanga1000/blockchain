import { useState } from "react";

interface Props {
  onAdd: (data: string) => void;
}

function TransactionForm({ onAdd }: Props) {
  const [data, setData] = useState("");

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        placeholder="Enter transaction"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button
        onClick={() => {
          if (!data) return;
          onAdd(data);
          setData("");
        }}
        className="mt-3 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Add Block
      </button>
    </div>
  );
}

export default TransactionForm;