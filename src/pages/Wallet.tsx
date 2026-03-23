import { useState, useEffect } from "react";
import { createWallet, getWallets, type WalletResponse } from "../api/api";

export default function Wallet() {
  const [username, setUsername] = useState("");
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    try {
      const data = await getWallets();
      setWallets(data);
    } catch (error) {
      console.error("Failed to fetch wallets");
    }
  };

  const generateWallet = async () => {
    if (!username.trim()) {
      alert("Please enter a username first.");
      return;
    }
    
    setLoading(true);
    try {
      await createWallet(username);
      setUsername(""); 
      await loadWallets(); 
    } catch (error: any) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
        <div className="bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Register Network Identity</h2>
          <p className="text-slate-400 text-sm">Generate a secure key pair. All new users receive a 10,000 coin airdrop!</p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            {/* ✅ FIXED: Explicitly set bg-white and text-slate-900 for visibility */}
            <input 
              type="text" 
              placeholder="Enter a username..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none w-full font-semibold"
            />
            <button 
              onClick={generateWallet} 
              disabled={loading || !username}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Generating..." : "Create Keys"}
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>📖</span> Network Directory & Balances
      </h3>
      
      {wallets.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400">No users registered yet. Create one above!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {wallets.map((wallet, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {wallet.username.charAt(0).toUpperCase()}
                  </div>
                  <h4 className="font-bold text-lg text-slate-800">{wallet.username}</h4>
                </div>
                {/* ✅ DISPLAY DYNAMIC BALANCE */}
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold">
                  {wallet.balance.toLocaleString()} Coins
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Public Key</span>
                  <p className="text-xs font-mono text-slate-600 truncate bg-slate-50 p-1.5 rounded border border-slate-100">{wallet.public_key}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}