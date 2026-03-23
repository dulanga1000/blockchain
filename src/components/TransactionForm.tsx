import { useState } from "react";
import { API } from "../api/api"; 

export default function TransactionForm() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const submitTransaction = async () => {
    try {
      const response = await fetch(`${API}/add_transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          receiver,
          amount: Number(amount),
          private_key: privateKey, 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Success: " + data.message);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Network error occurred while connecting to the backend.");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Send Secure Transaction</h2>

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
      
      <input
        placeholder="Sender Private Key (Required for Signature)"
        type="password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPrivateKey(e.target.value)}
      />

      <button
        onClick={submitTransaction}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Sign & Send Transaction
      </button>
    </div>
  );
}