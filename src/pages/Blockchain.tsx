import { useEffect, useState } from "react";
import { getChain, mineBlock } from "../api/api";
import type { ChainBlock, Transaction } from "../api/api";

export default function Blockchain() {
  const [chain, setChain] = useState<ChainBlock[]>([]);
  const [mining, setMining] = useState(false);

  const fetchChain = async () => {
    try {
      const data = await getChain();
      setChain(data.chain);
    } catch (error) {
      console.error("Failed to fetch chain", error);
    }
  };

  useEffect(() => {
    fetchChain();
  }, []);

  const handleMine = async () => {
    setMining(true);
    try {
      await mineBlock();
      await fetchChain(); 
    } catch (error) {
      alert("Error mining block.");
    }
    setMining(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Network Ledger</h1>
          <p className="text-slate-500 mt-1">Live visualization of cryptographically secured blocks.</p>
        </div>
        
        <button 
          onClick={handleMine} 
          disabled={mining}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mining ? "⛏️ Processing Cryptography..." : "⛏️ Mine Pending Transactions"}
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        {chain.map((block: ChainBlock, index: number) => (
          <div key={block.index} className="w-full flex flex-col items-center">
            
            {/* The Block Card */}
            <div className="w-full bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-200 transition-transform hover:-translate-y-1 duration-300">
              {/* Block Header */}
              <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BLOCK {block.index}
                  </span>
                  {block.index === 1 && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                      GENESIS BLOCK
                    </span>
                  )}
                </div>
                <span className="text-slate-400 text-xs font-mono">
                  Proof: {block.proof}
                </span>
              </div>

              {/* Block Hashes */}
              <div className="p-5 bg-slate-50 border-b border-slate-100">
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Hash</span>
                  <p className="text-sm font-mono text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100 break-all mt-1">
                    {block.hash}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Previous Hash</span>
                  <p className="text-sm font-mono text-slate-500 bg-slate-100 p-2 rounded border border-slate-200 break-all mt-1">
                    {block.previous_hash}
                  </p>
                </div>
              </div>
              
              {/* Transactions Area */}
              <div className="p-5">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span>Ledger Entries</span>
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{block.transactions.length}</span>
                </h3>
                
                {block.transactions.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm text-slate-400 italic">No transactions securely recorded in this block.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {block.transactions.map((tx: Transaction, i: number) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase">Sender</p>
                          <p className="text-sm font-mono truncate text-slate-700">{tx.sender}</p>
                        </div>
                        <div className="hidden md:block text-slate-300">➔</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase">Receiver</p>
                          <p className="text-sm font-mono truncate text-slate-700">{tx.receiver}</p>
                        </div>
                        <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-center shrink-0">
                          <p className="text-xs font-bold text-green-600 uppercase">Amount</p>
                          <p className="font-bold text-green-700">{tx.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Visual Chain Connector (Do not show after the last block) */}
            {index < chain.length - 1 && (
              <div className="py-2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-gradient-to-b from-slate-300 to-blue-400 rounded-t-full"></div>
                <div className="w-4 h-4 border-b-2 border-r-2 border-blue-400 transform rotate-45 translate-y-[-6px]"></div>
                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-400 to-slate-300 rounded-b-full translate-y-[-10px]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}