import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-3 py-2 rounded-lg text-sm font-semibold transition",
      isActive ? "bg-white text-blue-700" : "text-white/95 hover:bg-white/20",
    ].join(" ");

  return (
    <nav className="bg-linear-to-r from-blue-700 to-cyan-700 text-white shadow-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Blockchain Demo</h1>

        <div className="flex flex-wrap gap-2">
          <NavLink to="/" className={navItemClass} end>
            Home
          </NavLink>
          <NavLink to="/wallet" className={navItemClass}>
            Wallet
          </NavLink>
          <NavLink to="/transaction" className={navItemClass}>
            Transaction
          </NavLink>
          <NavLink to="/blockchain" className={navItemClass}>
            Explorer
          </NavLink>
        </div>
      </div>
    </nav>
  );
}