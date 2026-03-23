import { useState, useEffect } from "react";
import { createWallet, getWallets, type WalletResponse } from "../api/api";

export default function Wallet() {
  const [username, setUsername] = useState("");
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all existing wallets when the page loads
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
      setUsername(""); // clear input
      await loadWallets(); // Refresh the list
    } catch (error: any) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 animate-fade-in">
      {/* Registration Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
        <div className="bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Register Network Identity</h2>
          <p className="text-slate-400 text-sm">Generate a secure SECP256k1 key pair linked to a username.</p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter a username (e.g., Alice)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-cyan-500 w-full text-slate-800"
            />
            <button 
              onClick={generateWallet} 
              disabled={loading || !username}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/30 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Generating..." : "Create Keys"}
            </button>
          </div>
        </div>
      </div>

      {/* Directory of Wallets */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>📖</span> Network Directory
      </h3>
      
      {wallets.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400">No users registered yet. Create one above!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {wallets.map((wallet, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                  {wallet.username.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-bold text-lg text-slate-800">{wallet.username}</h4>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Public Key</span>
                  <p className="text-xs font-mono text-slate-600 truncate bg-slate-50 p-1.5 rounded">{wallet.public_key}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Private Key</span>
                  <p className="text-xs font-mono text-red-600 truncate bg-red-50 p-1.5 rounded">{wallet.private_key}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}