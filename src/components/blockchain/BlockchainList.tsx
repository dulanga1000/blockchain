import type { Block } from "../../types/block";
import BlockCard from "./BlockCard";

function BlockchainList({
  chain,
  loading,
}: {
  chain: Block[];
  loading: boolean;
}) {
  if (loading) {
    return <p className="text-center">Loading blockchain...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {chain.map((block) => (
        <BlockCard key={block.index} block={block} />
      ))}
    </div>
  );
}

export default BlockchainList;