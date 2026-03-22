import type { Block } from "../../types/block";

function BlockchainVisualizer({chain}:{chain:Block[]}) {
  return (
    <div className="flex overflow-x-auto gap-6 p-4">
      {chain.map((b,i)=>(
        <div key={i} className="flex items-center">
          <div className="bg-gray-800 p-4 rounded-xl w-56">
            <h2 className="text-green-400">Block {b.index}</h2>
            <p className="text-xs break-all">
              {b.hash.slice(0,15)}...
            </p>
          </div>
          {i!==chain.length-1 && <span className="mx-2 text-xl">➡️</span>}
        </div>
      ))}
    </div>
  );
}
export default BlockchainVisualizer;