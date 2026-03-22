import { useEffect, useState } from "react";
import TransactionForm from "./components/blockchain/TransactionForm";
import BlockchainList from "./components/blockchain/BlockchainList";
import { addBlock, getChain, validateChain } from "./services/api";
import type { Block } from "./types/block";

function App() {
  const [chain, setChain] = useState<Block[]>([]);
  const [valid, setValid] = useState(true);

  const loadData = async () => {
    const res = await getChain();
    setChain(res.data);

    const val = await validateChain();
    setValid(val.data.valid);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (data: string) => {
    await addBlock(data);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
        🔗 Blockchain App
      </h1>

      <div className="max-w-xl mx-auto">
        <TransactionForm onAdd={handleAdd} />

        <div className="mt-6">
          <h2 className="text-xl mb-2">Blockchain</h2>
          <BlockchainList chain={chain} />
        </div>

        <div className="mt-4 text-center">
          {valid ? (
            <p className="text-green-400 font-bold">
              Blockchain is VALID ✅
            </p>
          ) : (
            <p className="text-red-400 font-bold">
              Blockchain is INVALID ❌
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;