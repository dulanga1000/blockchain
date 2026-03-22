import { useEffect, useState } from "react";
import { getChain } from "../api/api";

export default function Blockchain() {
  const [chain, setChain] = useState<any[]>([]);

  useEffect(() => {
    getChain().then(setChain);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Blockchain</h2>
      {chain.map((block, i) => (
        <div key={i} className="border p-2 my-2">
          <p>Block #{block.index}</p>
          <p>Hash: {block.previous_hash}</p>
        </div>
      ))}
    </div>
  );
}