import { useEffect, useState } from "react";
import { getChain, type ChainBlock } from "../api/api";

export default function Blockchain() {
  const [blocks, setBlocks] = useState<ChainBlock[]>([]);
  const [loading, setLoading] = useState(false);

  const loadChain = async () => {
    setLoading(true);
    const data = await getChain();
    setBlocks(data.chain || []);
    setLoading(false);
  };

  useEffect(() => {
    loadChain();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <h1 className="text-3xl font-bold text-center mb-10">
        ⛓️ Blockchain Explorer
      </h1>

      <div className="text-center mb-6">
        <button
          onClick={loadChain}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Refreshing..." : "Refresh Chain"}
        </button>
      </div>

      <div className="flex flex-col items-center gap-10">

        {blocks.map((block, index) => {

          const isValid =
            index === 0 ||
            block.previous_hash === blocks[index - 1].hash;

          return (
            <div key={index} className="flex flex-col items-center">

              {/* BLOCK */}
              <div
                className={`w-[420px] p-6 rounded-2xl shadow-xl border backdrop-blur-md
                ${isValid ? "border-green-500" : "border-red-500"}
                bg-white/10 transition hover:scale-105`}
              >

                <h2 className="text-lg font-bold text-indigo-400 mb-2">
                  Block #{block.index}
                </h2>

                <p className="text-xs text-gray-400 mb-3">
                  {new Date(block.timestamp * 1000).toLocaleString()}
                </p>

                {/* PREVIOUS HASH */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400">Previous Hash</p>
                  <p className="text-xs break-all text-red-400">
                    {block.previous_hash}
                  </p>
                </div>

                {/* CURRENT HASH */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400">Current Hash</p>
                  <p className="text-xs break-all text-green-400">
                    {block.hash}
                  </p>
                </div>

                {/* TRANSACTIONS */}
                <div className="mt-4">
                  <p className="text-yellow-400 font-semibold mb-2">
                    Transactions
                  </p>

                  {block.transactions.length === 0 ? (
                    <p className="text-gray-500 text-xs">
                      No Transactions
                    </p>
                  ) : (
                    block.transactions.map((tx, i) => (
                      <div
                        key={i}
                        className="bg-black/40 border border-gray-700 p-2 rounded mb-2 text-xs"
                      >
                        <p>From: {tx.sender.slice(0, 20)}...</p>
                        <p>To: {tx.receiver.slice(0, 20)}...</p>
                        <p>Amount: {tx.amount}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* LINK */}
              {index !== blocks.length - 1 && (
                <div className="flex flex-col items-center mt-4">
                  <div className="w-1 h-12 bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 animate-bounce text-xl">
                    ↓
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}