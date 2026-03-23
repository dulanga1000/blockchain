import { useEffect, useState } from "react";
import { getChain, validateChain, checkBalance } from "../api/api";
import type { ChainBlock, Transaction } from "../api/api";

export default function Blockchain() {
  const [chain, setChain] = useState<ChainBlock[]>([]);
  const [loading, setLoading] = useState(false);
  
  // States for new features
  const [validationStatus, setValidationStatus] = useState<{message: string, valid: boolean} | null>(null);
  const [addressToCheck, setAddressToCheck] = useState("");
  const [balanceResult, setBalanceResult] = useState<number | null>(null);

  const fetchChain = async () => {
    setLoading(true);
    try {
      const data = await getChain();
      setChain(data.chain);
    } catch (error) {
      console.error("Failed to fetch chain", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChain();
  }, []);

  const handleValidate = async () => {
    try {
      const result = await validateChain();
      setValidationStatus(result);
      setTimeout(() => setValidationStatus(null), 5000); // Clear after 5s
    } catch (error) {
      alert("Error contacting node for validation.");
    }
  };

  const handleCheckBalance = async () => {
    if (!addressToCheck) return;
    try {
      const result = await checkBalance(addressToCheck);
      setBalanceResult(result.balance);
    } catch (error) {
      alert("Error checking balance.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      
      {/* 🚀 EXPLORER DASHBOARD TOOLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Validation Tool */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span>🛡️</span> Chain Integrity Checker
          </h2>
          <p className="text-slate-500 text-sm mb-4">Cryptographically verify that previous block hashes and proofs have not been tampered with.</p>
          
          <button 
            onClick={handleValidate}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm"
          >
            Run Integrity Scan
          </button>
          
          {validationStatus && (
            <div className={`mt-4 p-3 rounded-lg border text-sm font-bold text-center ${validationStatus.valid ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {validationStatus.valid ? "✅ " : "❌ "} {validationStatus.message}
            </div>
          )}
        </div>

        {/* Balance Checker Tool */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span>💰</span> Public Balance Checker
          </h2>
          <p className="text-slate-500 text-sm mb-4">Query the ledger to calculate the live balance of any public key.</p>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Paste Public Key here..." 
              value={addressToCheck}
              onChange={(e) => setAddressToCheck(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-sm"
            />
            <button 
              onClick={handleCheckBalance}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl transition-all"
            >
              Check
            </button>
          </div>
          
          {balanceResult !== null && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-1">Live Balance</span>
              <span className="text-xl font-extrabold text-blue-800">{balanceResult.toLocaleString()} Coins</span>
            </div>
          )}
        </div>
      </div>

      {/* ⛓️ BLOCKCHAIN LEDGER TITLE & REFRESH */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 text-white">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>⛓️</span> Live Network Ledger
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Showing {chain.length} confirmed blocks in the chain.</p>
        </div>
        
        <button 
          onClick={fetchChain} 
          disabled={loading}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "🔄 Syncing Node..." : "🔄 Refresh Blockchain"}
        </button>
      </div>
      
      {/* BLOCK RENDERER */}
      <div className="flex flex-col items-center">
        {chain.map((block: ChainBlock, index: number) => (
          <div key={block.index} className="w-full flex flex-col items-center">
            <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200">
              <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BLOCK {block.index}
                  </span>
                </div>
                <span className="text-slate-500 text-xs font-mono">
                  Proof: {block.proof}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Block Hash (SHA-256)</span>
                  <p className="text-xs font-mono text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100 break-all mt-1">
                    {block.hash}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Previous Block Hash</span>
                  <p className="text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded border border-slate-200 break-all mt-1">
                    {block.previous_hash}
                  </p>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-slate-700 text-sm mb-3">Recorded Transactions ({block.transactions.length})</h3>
                {block.transactions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded">No transactions in this block.</p>
                ) : (
                  <div className="space-y-2">
                    {block.transactions.map((tx: Transaction, i: number) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Sender</p>
                          <p className="text-xs font-mono truncate text-slate-600">{tx.sender}</p>
                        </div>
                        <div className="hidden md:block text-slate-300">➔</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Receiver</p>
                          <p className="text-xs font-mono truncate text-slate-600">{tx.receiver}</p>
                        </div>
                        <div className="bg-green-50 px-3 py-1 rounded border border-green-100 text-center shrink-0">
                          <p className="text-[10px] font-bold text-green-600 uppercase">Amount</p>
                          <p className="text-sm font-bold text-green-700">{tx.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {index < chain.length - 1 && (
              <div className="py-2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-slate-300 rounded-t-full"></div>
                <div className="w-4 h-4 border-b-2 border-r-2 border-slate-400 transform rotate-45 translate-y-[-6px]"></div>
                <div className="w-1.5 h-6 bg-slate-300 rounded-b-full translate-y-[-10px]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}