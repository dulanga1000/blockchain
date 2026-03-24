import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto mt-4 md:mt-8 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-[1.5fr_1fr] p-4 md:p-6 relative">
      
      <style>
        {`
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes drawLine {
            0% { width: 0; opacity: 0; }
            100% { width: 100%; opacity: 1; }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(6, 182, 212, 0.2); }
            50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6); }
          }
          @keyframes levitate {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes shootData {
            0% { left: 0%; opacity: 0; transform: scale(0.5) translateY(-50%); }
            10% { opacity: 1; transform: scale(1.2) translateY(-50%); }
            90% { opacity: 1; transform: scale(1.2) translateY(-50%); }
            100% { left: 95%; opacity: 0; transform: scale(0.5) translateY(-50%); }
          }
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes spinSlow {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          
          .anim-block-1 { animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, levitate 4s ease-in-out infinite 0.6s; opacity: 0; }
          .anim-line-1 { animation: drawLine 0.5s ease-out forwards; animation-delay: 0.5s; width: 0; opacity: 0; }
          .anim-data-1 { animation: shootData 2s infinite ease-in-out; animation-delay: 1.5s; opacity: 0; }
          
          .anim-block-2 { animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, levitate 4s ease-in-out infinite 1.2s; animation-delay: 1.0s; opacity: 0; }
          .anim-line-2 { animation: drawLine 0.5s ease-out forwards; animation-delay: 1.5s; width: 0; opacity: 0; }
          .anim-data-2 { animation: shootData 2s infinite ease-in-out; animation-delay: 2.5s; opacity: 0; }
          
          .anim-block-3 { animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, levitate 4s ease-in-out infinite 1.8s; animation-delay: 2.0s; opacity: 0; }
          
          .glow-pulse { animation: pulseGlow 3s infinite; }
          
          .fade-up-1 { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-delay: 0.2s; }
          .fade-up-2 { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-delay: 0.4s; }
          .fade-up-3 { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-delay: 0.6s; }
          .fade-up-4 { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-delay: 0.8s; }

          .bg-spin-1 { animation: spinSlow 20s linear infinite; }
          .bg-spin-2 { animation: spinSlow 25s linear infinite reverse; }
        `}
      </style>

      <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl shadow-cyan-900/10 relative overflow-hidden flex flex-col justify-between">
        <div className="bg-spin-1 absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 origin-center"></div>
        <div className="bg-spin-2 absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3 origin-center"></div>
        
        <div className="flex items-center justify-center py-10 md:py-16 mb-4 relative z-10">
          <div className="flex items-center w-full max-w-lg justify-center">
            
            <div className="anim-block-1 glow-pulse z-10 flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0 transition-transform hover:scale-110">
              <span className="text-[9px] md:text-xs font-black text-cyan-400 tracking-widest mb-1 drop-shadow-md">GENESIS</span>
              <span className="text-2xl md:text-4xl filter drop-shadow-lg">📦</span>
            </div>

            <div className="flex-1 flex items-center justify-center px-1 md:px-2 h-4 relative">
              <div className="anim-line-1 h-1.5 md:h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] relative overflow-visible">
                <div className="anim-data-1 absolute top-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_15px_2px_white] z-20"></div>
              </div>
            </div>

            <div className="anim-block-2 glow-pulse z-10 flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0 transition-transform hover:scale-110">
              <span className="text-[9px] md:text-xs font-black text-blue-400 tracking-widest mb-1 drop-shadow-md">BLOCK 2</span>
              <span className="text-2xl md:text-4xl filter drop-shadow-lg">📦</span>
            </div>

            <div className="flex-1 flex items-center justify-center px-1 md:px-2 h-4 relative">
              <div className="anim-line-2 h-1.5 md:h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] relative overflow-visible">
                <div className="anim-data-2 absolute top-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_15px_2px_white] z-20"></div>
              </div>
            </div>

            <div className="anim-block-3 glow-pulse z-10 flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-indigo-500 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] shrink-0 transition-transform hover:scale-110">
              <span className="text-[9px] md:text-xs font-black text-indigo-400 tracking-widest mb-1 drop-shadow-md">BLOCK 3</span>
              <span className="text-2xl md:text-4xl filter drop-shadow-lg">📦</span>
            </div>

          </div>
        </div>

        <div className="relative z-20 fade-up-1">
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">CipherChain Core</h1>
          <p className="text-slate-500 mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
            Interact with your decentralized cryptographic network. The backend processes all ECDSA generation, SHA-256 hashing, and peer-to-peer block verification.
          </p>

          <Link to="/wallet" className="inline-flex w-full sm:w-auto rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.03] hover:shadow-blue-500/50 active:scale-95 items-center justify-center gap-3">
            <span className="text-xl">🔑</span> Initialize Node Identity
          </Link>
        </div>
      </div>

      <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-sm flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px]"></div>
        
        <h2 className="fade-up-1 text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <span className="text-2xl">🧭</span> Quick Modules
        </h2>
        
        <div className="grid gap-4 md:gap-5 relative z-10">
          <Link to="/wallet" className="fade-up-2 group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 md:px-6 md:py-6 font-bold text-slate-700 transition-all hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-cyan-600 text-base">
            <div className="flex items-center gap-4">
              <span className="bg-slate-100 p-3 rounded-xl group-hover:bg-cyan-50 group-hover:scale-110 transition-all text-xl">🔑</span>
              <span>Cryptographic Wallet</span>
            </div>
            <span className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-2 transition-transform text-xl">➔</span>
          </Link>
          
          <Link to="/transaction" className="fade-up-3 group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 md:px-6 md:py-6 font-bold text-slate-700 transition-all hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:text-blue-600 text-base">
            <div className="flex items-center gap-4">
              <span className="bg-slate-100 p-3 rounded-xl group-hover:bg-blue-50 group-hover:scale-110 transition-all text-xl">💸</span>
              <span>Submit Transaction</span>
            </div>
            <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-transform text-xl">➔</span>
          </Link>
          
          <Link to="/blockchain" className="fade-up-4 group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 md:px-6 md:py-6 font-bold text-slate-700 transition-all hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 hover:text-indigo-600 text-base">
            <div className="flex items-center gap-4">
              <span className="bg-slate-100 p-3 rounded-xl group-hover:bg-indigo-50 group-hover:scale-110 transition-all text-xl">⛓️</span>
              <span>Blockchain Explorer</span>
            </div>
            <span className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-2 transition-transform text-xl">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}