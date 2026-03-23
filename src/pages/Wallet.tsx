import { useState } from "react";
import { createWallet } from "../api/api";
import type { WalletResponse } from "../api/api";

export default function Wallet() {
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const generateWallet = async () => {
    setLoading(true);
    try {
      // Fetching securely generated ECDSA keys from backend
      const data = await createWallet();
      setWallet(data);
    } catch (error) {
      console.error("Wallet generation failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Cryptographic Wallet</h2>
          <p className="text-slate-400 text-sm">Generate a secure SECP256k1 key pair via the backend node.</p>
          
          <button 
            onClick={generateWallet} 
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Generating via Backend..." : "Generate New Keys"}
          </button>
        </div>

        {wallet && (
          <div className="p-8 bg-slate-50 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Public Key (Address)
              </label>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner break-all font-mono text-sm text-slate-800">
                {wallet.public_key}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>Private Key (Keep Secret)</span>
                <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full">REQUIRED FOR SIGNING</span>
              </label>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-inner break-all font-mono text-sm text-red-800">
                {wallet.private_key}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}