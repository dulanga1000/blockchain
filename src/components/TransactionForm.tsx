import { useState } from "react";
import { API } from "../api/api"; 

export default function TransactionForm() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTransaction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/add_transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender, receiver, amount: Number(amount), private_key: privateKey, 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Transaction signed and added to the Mempool!");
        setSender(""); setReceiver(""); setAmount(""); setPrivateKey("");
      } else {
        alert("❌ Cryptographic Error: " + data.error);
      }
    } catch (error) {
      alert("Network error occurred connecting to node.");
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 font-mono shadow-sm transition-all";

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl shadow-slate-200/50 p-8 rounded-3xl border border-slate-100">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-extrabold text-slate-800">Initiate Transfer</h2>
        <p className="text-slate-500 text-sm mt-1">Submit a transaction to be cryptographically verified by the node.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Sender Public Key</label>
          <input placeholder="Enter sender address..." value={sender} className={inputClass} onChange={(e) => setSender(e.target.value)} />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Receiver Public Key</label>
          <input placeholder="Enter recipient address..." value={receiver} className={inputClass} onChange={(e) => setReceiver(e.target.value)} />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Amount to Transfer</label>
          <input placeholder="0.00" type="number" value={amount} className={inputClass} onChange={(e) => setAmount(e.target.value)} />
        </div>
        
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 mt-6 shadow-inner">
          <label className="block mb-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">Digital Signature Authorization</label>
          <p className="text-xs text-slate-400 mb-3">Your private key is used to generate an ECDSA signature.</p>
          <input placeholder="Enter Sender Private Key..." type="password" value={privateKey} 
            className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3 font-mono" 
            onChange={(e) => setPrivateKey(e.target.value)} 
          />
        </div>

        <button
          onClick={submitTransaction}
          disabled={loading || !sender || !receiver || !amount || !privateKey}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all text-lg"
        >
          {loading ? "Verifying Signature..." : "Sign & Broadcast Transaction"}
        </button>
      </div>
    </div>
  );
}