import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Blockchain from "./pages/Blockchain";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/blockchain" element={<Blockchain />} />
      </Routes>
    </Router>
  );
}

export default App;