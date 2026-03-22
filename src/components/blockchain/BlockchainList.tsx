import type { Block } from "../../types/block";
import BlockCard from "./BlockCard";

interface Props {
  chain: Block[];
}

function BlockchainList({ chain }: Props) {
  return (
    <div>
      {chain.map((block) => (
        <BlockCard key={block.index} block={block} />
      ))}
    </div>
  );
}

export default BlockchainList;