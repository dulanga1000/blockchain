import { useState } from "react";
import { createWallet } from "../api/api";

export default function Wallet() {
  const [wallet, setWallet] = useState<any>(null);

  const generateWallet = async () => {
    const data = await createWallet();
    setWallet(data);
  };

  return (
    <div className="p-6">
      <button onClick={generateWallet} className="bg-green-500 px-4 py-2 text-white">
        Create Wallet
      </button>

      {wallet && (
        <div className="mt-4">
          <p>Public Key: {wallet.public_key}</p>
          <p>Private Key: {wallet.private_key}</p>
        </div>
      )}
    </div>
  );
}