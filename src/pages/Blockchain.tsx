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
    if (pubKey === "NETWORK_GENESIS") return { name: "NETWORK GENESIS", color: "text-fuchsia-500" };
    const user = wallets.find(w => w.public_key === pubKey);
    return user ? { name: user.username, color: "text-blue-600" } : { name: "Unknown Address", color: "text-slate-500" };
  };

  const handleValidate = async () => {
    try {
      const result = await validateChain();
      setValidationStatus(result);
      setTimeout(() => setValidationStatus(null), 5000); 
    } catch (error) { 
      alert("Error connecting to node."); 
    }
  };

  const handleMine = async () => {
    setLoading(true);
    try {
      await mineBlock();
      await fetchInitialData(); 
      alert("✅ Block successfully mined and added to the ledger!");
    } catch (error) { 
      alert("❌ Error mining block."); 
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 bg-slate-900 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-lg text-white gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3"><span>⛓️</span> Live Network Ledger</h1>
          <p className="text-slate-400 mt-2 text-xs md:text-sm">Showing {chain.length} confirmed blocks. Validate integrity to ensure hashes match.</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <button onClick={handleValidate} className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all border border-slate-600 text-sm">
            🛡️ Integrity Scan
          </button>
          <button onClick={handleMine} disabled={loading} className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all text-sm">
            {loading ? "⛏️ Mining..." : "⛏️ Mine Pending"}
          </button>
        </div>
      </div>

      {validationStatus && (
        <div className={`mb-6 p-4 rounded-xl border text-center font-bold text-sm md:text-lg shadow-sm ${validationStatus.valid ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
           {validationStatus.valid ? "✅ " : "❌ "} {validationStatus.message}
        </div>
      )}
      
      <div className="flex flex-col items-center">
        {chain.map((block: ChainBlock, index: number) => (
          <div key={block.index} className="w-full flex flex-col items-center">
            <div className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-slate-200">
              <div className="bg-slate-100 p-3 md:p-4 border-b-2 border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="bg-slate-800 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                  BLOCK #{block.index}
                </span>
                <span className="text-slate-500 font-mono font-bold bg-white px-3 py-1 rounded border text-xs">
                  Proof: {block.proof}
                </span>
              </div>
              
              <div className="p-4 md:p-5 bg-slate-800 text-white grid grid-cols-1 md:grid-cols-2 gap-4 border-b-4 border-blue-500">
                <div className="bg-slate-900 p-3 md:p-4 rounded-xl border border-slate-700 overflow-x-auto">
                  <h4 className="text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>🔗</span> CURRENT HASH
                  </h4>
                  <p className="font-mono text-xs text-white break-all">{block.hash}</p>
                </div>
                
                <div className="bg-slate-900 p-3 md:p-4 rounded-xl border border-slate-700 overflow-x-auto">
                  <h4 className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>⬅️</span> PREVIOUS HASH
                  </h4>
                  <p className="font-mono text-xs text-slate-300 break-all">{block.previous_hash}</p>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-slate-800 text-sm md:text-lg mb-4 border-b pb-2">Transactions ({block.transactions.length})</h3>
                {block.transactions.length === 0 ? (
                  <p className="text-xs md:text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-dashed text-center">No transactions recorded.</p>
                ) : (
                  <div className="space-y-4">
                    {block.transactions.map((tx: Transaction, i: number) => {
                      const sender = getIdentity(tx.sender);
                      const receiver = getIdentity(tx.receiver);
                      return (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                          <div className="flex-1 min-w-0 text-center md:text-left bg-white p-3 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none border md:border-none">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sender</p>
                            <p className={`font-bold text-sm md:text-lg ${sender.color}`}>{sender.name}</p>
                            <p className="text-[10px] font-mono truncate text-slate-400 mt-1">{tx.sender}</p>
                          </div>
                          
                          <div className="hidden md:block text-slate-300 font-bold text-2xl">➔</div>
                          <div className="block md:hidden text-slate-300 font-bold text-lg text-center my-1">⬇️</div>
                          
                          <div className="flex-1 min-w-0 text-center md:text-left bg-white p-3 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none border md:border-none">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Receiver</p>
                            <p className={`font-bold text-sm md:text-lg ${receiver.color}`}>{receiver.name}</p>
                            <p className="text-[10px] font-mono truncate text-slate-400 mt-1">{tx.receiver}</p>
                          </div>
                          
                          <div className="bg-green-100 mt-2 md:mt-0 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-green-200 text-center shrink-0 shadow-inner">
                            <p className="text-[10px] font-bold text-green-700 uppercase mb-1">Amount</p>
                            <p className="text-xl md:text-2xl font-extrabold text-green-800">{tx.amount}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            
            {index < chain.length - 1 && (
              <div className="py-2 md:py-3 flex flex-col items-center">
                <div className="w-1.5 md:w-2 h-6 md:h-8 bg-blue-500 rounded-t-full shadow-lg"></div>
                <div className="w-4 md:w-5 h-4 md:h-5 border-b-4 border-r-4 border-blue-500 transform rotate-45 shadow-sm"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}