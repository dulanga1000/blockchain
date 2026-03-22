import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between">
      <h1 className="text-green-400 font-bold text-lg">🔗 Blockchain</h1>

      <div className="space-x-4">
        <Link to="/" className="text-gray-300 hover:text-white">
          Home
        </Link>
        <Link to="/about" className="text-gray-300 hover:text-white">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;