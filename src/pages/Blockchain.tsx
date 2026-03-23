import { useEffect, useState } from "react";
import { getChain, validateChain, getWallets, mineBlock, type WalletResponse } from "../api/api";
import type { ChainBlock, Transaction } from "../api/api";

export default function Blockchain() {
  const [chain, setChain] = useState<ChainBlock[]>([]);
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<{message: string, valid: boolean} | null>(null);

  const fetchInitialData = async () => {
    try {
      const chainData = await getChain();
      setChain(chainData.chain);
      const walletData = await getWallets();
      setWallets(walletData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => { fetchInitialData(); }, []);

  const getIdentity = (pubKey: string) => {
    if (pubKey === "SYSTEM") return { name: "SYSTEM (Airdrop)", color: "text-amber-600" };
    const user = wallets.find(w => w.public_key === pubKey);
    return user ? { name: user.username, color: "text-blue-600" } : { name: "Unknown Address", color: "text-slate-500" };
  };

  const handleValidate = async () => {
    try {
      const result = await validateChain();
      setValidationStatus(result);
      setTimeout(() => setValidationStatus(null), 5000); 
    } catch (error) { alert("Error connecting to node."); }
  };

  // ✅ NEW: Mine function
  const handleMine = async () => {
    setLoading(true);
    try {
      await mineBlock();
      await fetchInitialData(); // Automatically refresh the chain after mining
      alert("✅ Block successfully mined and added to the ledger!");
    } catch (error) {
      alert("❌ Error mining block.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-slate-900 p-6 rounded-3xl shadow-lg text-white">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3"><span>⛓️</span> Live Network Ledger</h1>
          <p className="text-slate-400 mt-2 text-sm">Showing {chain.length} confirmed blocks. Validate integrity to ensure hashes match.</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button onClick={handleValidate} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all border border-slate-600">
            🛡️ Run Integrity Scan
          </button>
          {/* ✅ CHANGED: Mine Button replaces Refresh Button */}
          <button onClick={handleMine} disabled={loading} className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
            {loading ? "⛏️ Mining..." : "⛏️ Mine Pending Transactions"}
          </button>
        </div>
      </div>

      {validationStatus && (
        <div className={`mb-8 p-4 rounded-xl border text-center font-bold text-lg shadow-sm ${validationStatus.valid ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
           {validationStatus.valid ? "✅ " : "❌ "} {validationStatus.message}
        </div>
      )}
      
      {/* CHAIN RENDERER */}
      <div className="flex flex-col items-center">
        {chain.map((block: ChainBlock, index: number) => (
          <div key={block.index} className="w-full flex flex-col items-center">
            
            <div className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-slate-200">
              <div className="bg-slate-100 p-4 border-b-2 border-slate-200 flex justify-between items-center">
                <span className="bg-slate-800 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                  BLOCK #{block.index}
                </span>
                <span className="text-slate-500 font-mono font-bold bg-white px-3 py-1 rounded border">
                  Proof (Nonce): {block.proof}
                </span>
              </div>
              
              {/* HIGHLY VISIBLE HASH SECTION */}
              <div className="p-5 bg-slate-800 text-white grid grid-cols-1 md:grid-cols-2 gap-6 border-b-4 border-blue-500">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>🔗</span> CURRENT BLOCK HASH
                  </h4>
                  <p className="font-mono text-sm text-white break-all">{block.hash}</p>
                </div>
                
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>⬅️</span> PREVIOUS BLOCK HASH
                  </h4>
                  <p className="font-mono text-sm text-slate-300 break-all">{block.previous_hash}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-4 border-b pb-2">Recorded Transactions ({block.transactions.length})</h3>
                {block.transactions.length === 0 ? (
                  <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-dashed text-center">No transactions recorded in this block.</p>
                ) : (
                  <div className="space-y-4">
                    {block.transactions.map((tx: Transaction, i: number) => {
                      const sender = getIdentity(tx.sender);
                      const receiver = getIdentity(tx.receiver);
                      return (
                        <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Sender</p>
                            <p className={`font-bold text-lg ${sender.color}`}>{sender.name}</p>
                            <p className="text-[11px] font-mono truncate text-slate-400 mt-1">{tx.sender}</p>
                          </div>
                          <div className="hidden md:block text-slate-300 font-bold text-3xl">➔</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Receiver</p>
                            <p className={`font-bold text-lg ${receiver.color}`}>{receiver.name}</p>
                            <p className="text-[11px] font-mono truncate text-slate-400 mt-1">{tx.receiver}</p>
                          </div>
                          <div className="bg-green-100 px-6 py-3 rounded-xl border border-green-200 text-center shrink-0 shadow-inner">
                            <p className="text-[11px] font-bold text-green-700 uppercase mb-1">Transfer Amount</p>
                            <p className="text-2xl font-extrabold text-green-800">{tx.amount}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            
            {/* Visual Chain Connector */}
            {index < chain.length - 1 && (
              <div className="py-3 flex flex-col items-center">
                <div className="w-2 h-8 bg-blue-500 rounded-t-full shadow-lg"></div>
                <div className="w-5 h-5 border-b-4 border-r-4 border-blue-500 transform rotate-45 shadow-sm"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}