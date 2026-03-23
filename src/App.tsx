import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Blockchain from "./pages/Blockchain";
import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-white via-slate-50 to-blue-50 text-slate-900">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/blockchain" element={<Blockchain />} />
            <Route path="/transaction" element={<TransactionForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;