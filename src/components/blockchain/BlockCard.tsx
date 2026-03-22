import type { Block } from "../../types/block";

interface Props {
  block: Block;
}

function BlockCard({ block }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
      <h2 className="text-green-400 font-bold">Block {block.index}</h2>

      <p className="text-sm mt-2">
        <span className="text-gray-400">Transactions:</span>{" "}
        {block.transactions.join(", ")}
      </p>

      <p className="text-xs mt-2 break-all">
        <span className="text-gray-400">Hash:</span> {block.hash}
      </p>

      <p className="text-xs break-all">
        <span className="text-gray-400">Prev:</span> {block.prev_hash}
      </p>
    </div>
  );
}

export default BlockCard;