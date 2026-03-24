import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("authUser");
      if (stored) setAuthUser(JSON.parse(stored));
      else setAuthUser(null);
    };
    checkUser();
    window.addEventListener("authChange", checkUser);
    return () => window.removeEventListener("authChange", checkUser);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          localStorage.removeItem("authUser");
          setAuthUser(null);
          window.dispatchEvent(new Event("authChange"));
          alert("Session expired due to 15 minutes of inactivity. Please log in again.");
          navigate("/wallet");
        }
      }, 900000); 
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("authChange"));
    setIsMobileMenuOpen(false);
    navigate("/wallet");
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
      isActive ? "bg-white text-blue-800 shadow-md" : "text-white hover:bg-white/20 hover:shadow-sm",
    ].join(" ");

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-blue-800/50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="font-bold text-slate-900">B</span>
          </div>
          <h1 className="text-lg md:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-cyan-100">
            AdvancedChain
          </h1>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navItemClass} end>Dashboard</NavLink>
          <NavLink to="/wallet" className={navItemClass}>Wallet Auth</NavLink>
          <NavLink to="/transaction" className={navItemClass}>Transfer</NavLink>
          <NavLink to="/blockchain" className={navItemClass}>Explorer</NavLink>
          
          {authUser && (
            <div className="ml-4 flex items-center gap-3 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
              <span className="text-sm font-bold text-emerald-400">👤 {authUser.username}</span>
              <button onClick={handleLogout} className="text-xs text-slate-300 hover:text-red-400 font-bold transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navItemClass} end>Dashboard</NavLink>
          <NavLink to="/wallet" onClick={() => setIsMobileMenuOpen(false)} className={navItemClass}>Wallet Auth</NavLink>
          <NavLink to="/transaction" onClick={() => setIsMobileMenuOpen(false)} className={navItemClass}>Transfer</NavLink>
          <NavLink to="/blockchain" onClick={() => setIsMobileMenuOpen(false)} className={navItemClass}>Explorer</NavLink>
          
          {authUser && (
            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-400">👤 {authUser.username}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-md transition">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}