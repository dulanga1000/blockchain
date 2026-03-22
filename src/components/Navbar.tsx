import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Blockchain Demo</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/wallet" className="hover:text-blue-400">Wallet</Link>
        <Link to="/blockchain" className="hover:text-blue-400">Blockchain</Link>
      </div>
    </nav>
  );
}