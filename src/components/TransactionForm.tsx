import { useState } from "react";

const API = "https://your-render-url.onrender.com";

export default function TransactionForm() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const submitTransaction = async () => {
    await fetch(`${API}/add_transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender,
        receiver,
        amount: Number(amount),
      }),
    });

    alert("Transaction Added!");
  };

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Send Transaction</h2>

      <input
        placeholder="Sender Public Key"
        className="border p-2 w-full mb-2"
        onChange={(e) => setSender(e.target.value)}
      />

      <input
        placeholder="Receiver Public Key"
        className="border p-2 w-full mb-2"
        onChange={(e) => setReceiver(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        className="border p-2 w-full mb-2"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={submitTransaction}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}