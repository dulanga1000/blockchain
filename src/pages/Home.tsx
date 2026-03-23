import { mineBlock } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const handleMine = async () => {
    const block = await mineBlock();
    alert(`✅ Block #${block.index} securely mined and added to the chain.`);
  };

  return (
    <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr] p-6">
      
      {/* Main Action Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">Node Control Center</h1>
        <p className="text-slate-500 mb-8 text-lg leading-relaxed">
          Interact with your decentralized cryptographic network. The backend handles all ECDSA generation, SHA-256 hashing, and block verification.
        </p>

        <button
          onClick={handleMine}
          className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          <span>⚙️</span> Force Mine Block
        </button>
      </div>

      {/* Navigation Shortcuts */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>🧭</span> Quick Modules
        </h2>
        <div className="grid gap-3">
          <Link to="/wallet" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600">
            <span>🔑 Cryptographic Wallet</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
          <Link to="/transaction" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600">
            <span>💸 Submit Transaction</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
          <Link to="/blockchain" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600">
            <span>⛓️ Blockchain Explorer</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}