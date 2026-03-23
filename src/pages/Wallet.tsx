import { useState } from "react";
import { createWallet, type WalletResponse } from "../api/api";

export default function Wallet() {
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const generateWallet = async () => {
    setLoading(true);
    const data = await createWallet();
    setWallet(data);
    setLoading(false);
  };

  return (
    <section className="max-w-3xl mx-auto grid gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold mb-2">Wallet</h1>
        <p className="text-slate-600 mb-4">Uses backend /create_wallet response exactly. If your backend returns keys, they appear below.</p>

        <button
          onClick={generateWallet}
          disabled={loading}
          className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Generating..." : "Generate Wallet"}
        </button>
      </div>

      {wallet && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold mb-3">Wallet Response</h2>

          {wallet.public_key && wallet.private_key ? (
            <div className="grid gap-3">
              <div>
                <p className="font-semibold mb-1">Public Key</p>
                <p className="break-all rounded-md bg-slate-100 p-2 font-mono text-xs text-slate-800">{wallet.public_key}</p>
              </div>

              <div>
                <p className="font-semibold mb-1 text-red-700">Private Key (keep secure)</p>
                <p className="break-all rounded-md bg-red-50 p-2 font-mono text-xs text-red-800">{wallet.private_key}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
              {wallet.message || wallet.error || "Wallet endpoint responded without keys."}
            </div>
          )}
        </div>
      )}
    </section>
  );
}