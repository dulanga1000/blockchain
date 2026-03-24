import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto mt-4 md:mt-8 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-[1.5fr_1fr] p-4 md:p-6">
      <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">Node Control Center</h1>
        <p className="text-slate-500 mb-6 md:mb-8 text-sm md:text-lg leading-relaxed">
          Interact with your decentralized cryptographic network. The backend handles all ECDSA generation, SHA-256 hashing, and block verification.
        </p>

        <Link to="/wallet" className="inline-flex w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 items-center justify-center gap-2">
          <span>🔑</span> Get Started: Create Identity
        </Link>
      </div>

      <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
          <span>🧭</span> Quick Modules
        </h2>
        <div className="grid gap-3">
          <Link to="/wallet" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600 text-sm md:text-base">
            <span>🔑 Cryptographic Wallet</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
          <Link to="/transaction" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600 text-sm md:text-base">
            <span>💸 Submit Transaction</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
          <Link to="/blockchain" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:shadow-md hover:text-blue-600 text-sm md:text-base">
            <span>⛓️ Blockchain Explorer</span>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}