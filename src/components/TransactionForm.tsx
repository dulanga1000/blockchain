import { useState, useEffect } from "react";
import { API, getWallets, type WalletResponse } from "../api/api"; 
import { Link } from "react-router-dom";

export default function TransactionForm() {
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [authUser, setAuthUser] = useState<WalletResponse | null>(null);
  const [receiverUsername, setReceiverUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWallets().then(setWallets).catch(console.error);
    const stored = localStorage.getItem("authUser");
    if (stored) setAuthUser(JSON.parse(stored));
  }, []);

  if (!authUser) {
    return (
      <div className="max-w-xl mx-auto mt-10 md:mt-20 bg-white shadow-xl p-6 md:p-10 rounded-2xl md:rounded-3xl text-center border border-slate-200 m-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">Authentication Required</h2>
        <p className="text-sm md:text-base text-slate-500 mb-6">You must unlock your wallet locally to sign transactions.</p>
        <Link to="/wallet" className="inline-block w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg">Go to Login</Link>
      </div>
    );
  }

  const receiverWallet = wallets.find(w => w.username === receiverUsername);

  const submitTransaction = async () => {
    if (!receiverWallet) return alert("Select a valid receiver.");
    if (receiverWallet.username === authUser.username) return alert("You cannot send money to yourself.");

    setLoading(true);
    try {
      const response = await fetch(`${API}/add_transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: authUser.public_key,
          receiver: receiverWallet.public_key,
          amount: Number(amount),
          private_key: authUser.private_key, 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Transaction signed using your Private Key and added to Mempool!");
        setAmount(""); setReceiverUsername("");
        const updatedAuth = {...authUser, balance: authUser.balance - Number(amount)};
        localStorage.setItem("authUser", JSON.stringify(updatedAuth));
        setAuthUser(updatedAuth);
      } else alert("❌ Error: " + data.error);
    } catch (error) { alert("Network error."); }
    setLoading(false);
  };

  const inputClass = "w-full bg-white border-2 border-slate-200 text-slate-900 text-sm rounded-lg focus:border-blue-500 block p-3 font-semibold transition-all";

  return (
    <div className="max-w-xl mx-auto mt-6 md:mt-10 bg-white shadow-2xl p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 m-4">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">Transfer Funds</h2>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-white gap-3">
        <div>
          <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">Sender</p>
          <p className="font-bold text-sm md:text-base">{authUser.username}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">Available Balance</p>
          <p className="text-emerald-400 font-bold text-sm md:text-base">{authUser.balance.toLocaleString()} Coins</p>
        </div>
      </div>

      <datalist id="user-list">
        {wallets.filter(w => w.username !== authUser.username).map(w => <option key={w.username} value={w.username} />)}
      </datalist>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Receiver (Search User)</label>
          <input list="user-list" placeholder="Type username..." value={receiverUsername} onChange={(e) => setReceiverUsername(e.target.value)} className={inputClass} />
          {receiverWallet && <div className="mt-2 text-[10px] text-slate-400 font-mono truncate">Key: {receiverWallet.public_key}</div>}
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Amount</label>
          <input placeholder="0.00" type="number" value={amount} className={inputClass} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <button onClick={submitTransaction} disabled={loading || !receiverWallet || !amount || Number(amount) <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition-all text-base md:text-lg disabled:opacity-50 mt-4">
          {loading ? "Signing..." : "Sign & Broadcast"}
        </button>
      </div>
    </div>
  );
}