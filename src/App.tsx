import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import TransactionForm from "./components/blockchain/TransactionForm";
import BlockchainList from "./components/blockchain/BlockchainList";
import { addBlock, getChain, validateChain } from "./services/api";
import type { Block } from "./types/block";
import toast from "react-hot-toast";

function App() {
  const [chain, setChain] = useState<Block[]>([]);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getChain();
      setChain(res.data);

      const val = await validateChain();
      setValid(val.data.valid);
    } catch (err) {
      toast.error("Failed to load blockchain");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (data: string) => {
    try {
      await addBlock(data);
      toast.success("Block added!");
      loadData();
    } catch {
      toast.error("Error adding block");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <TransactionForm onAdd={handleAdd} />

        <div className="mt-6">
          <BlockchainList chain={chain} loading={loading} />
        </div>

        <div className="mt-6 text-center">
          {valid ? (
            <p className="text-green-400 font-bold">
              ✅ Blockchain is VALID
            </p>
          ) : (
            <p className="text-red-400 font-bold">
              ❌ Blockchain is INVALID
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;