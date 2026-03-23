import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
      isActive 
        ? "bg-white text-blue-800 shadow-md" 
        : "text-white hover:bg-white/20 hover:shadow-sm",
    ].join(" ");

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-blue-800/50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="font-bold text-slate-900">B</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-cyan-100">
            AdvancedChain
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <NavLink to="/" className={navItemClass} end>Dashboard</NavLink>
          <NavLink to="/wallet" className={navItemClass}>Wallet</NavLink>
          <NavLink to="/transaction" className={navItemClass}>Transfer</NavLink>
          <NavLink to="/blockchain" className={navItemClass}>Explorer</NavLink>
        </div>
      </div>
    </nav>
  );
}