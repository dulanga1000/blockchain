import { useState, useEffect } from "react";
import { API, getWallets, type WalletResponse } from "../api/api"; 

export default function TransactionForm() {
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  
  // Store the typed usernames
  const [senderUsername, setSenderUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWallets().then(setWallets).catch(console.error);
  }, []);

  // Find the full wallet objects based on what is typed in the search box
  const senderWallet = wallets.find(w => w.username === senderUsername);
  const receiverWallet = wallets.find(w => w.username === receiverUsername);

  const submitTransaction = async () => {
    if (!senderWallet || !receiverWallet) {
      alert("Please ensure both Sender and Receiver are valid network users.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/add_transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: senderWallet.public_key,
          receiver: receiverWallet.public_key,
          amount: Number(amount),
          private_key: senderWallet.private_key, 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Transaction signed and added to the Mempool!");
        setAmount("");
        // Refresh wallets to show new (pending) balances
        getWallets().then(setWallets).catch(console.error);
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      alert("Network error occurred connecting to node.");
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 font-semibold shadow-sm transition-all";

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl shadow-slate-200/50 p-8 rounded-3xl border border-slate-100">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-extrabold text-slate-800">Initiate Transfer</h2>
        <p className="text-slate-500 text-sm mt-1">Search for users to create a signed transaction.</p>
      </div>

      {/* Hidden Data List for the search feature */}
      <datalist id="user-list">
        {wallets.map(w => (
          <option key={w.username} value={w.username} />
        ))}
      </datalist>

      <div className="space-y-6">
        {/* SENDER SEARCH */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Sender (Search or Select)</label>
          <input 
            list="user-list"
            placeholder="Type sender username..."
            value={senderUsername}
            onChange={(e) => setSenderUsername(e.target.value)}
            className={inputClass}
          />
          {senderWallet ? (
            <div className="mt-2 text-sm text-emerald-600 font-bold">
              Current Balance: {senderWallet.balance.toLocaleString()} Coins
            </div>
          ) : senderUsername && (
            <div className="mt-2 text-sm text-red-500">User not found</div>
          )}
        </div>

        {/* RECEIVER SEARCH */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Receiver (Search or Select)</label>
          <input 
            list="user-list"
            placeholder="Type receiver username..."
            value={receiverUsername}
            onChange={(e) => setReceiverUsername(e.target.value)}
            className={inputClass}
          />
          {receiverWallet && (
            <div className="mt-2 text-xs text-slate-500 font-mono truncate">
              Key: {receiverWallet.public_key}
            </div>
          )}
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Amount to Transfer</label>
          <input 
            placeholder="0.00" 
            type="number" 
            value={amount} 
            className={inputClass} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        
        <button
          onClick={submitTransaction}
          disabled={loading || !senderWallet || !receiverWallet || !amount}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all text-lg"
        >
          {loading ? "Processing..." : "Sign & Broadcast Transaction"}
        </button>
      </div>
    </div>
  );
}