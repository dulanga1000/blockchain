import { mineBlock } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const handleMine = async () => {
    const block = await mineBlock();
    alert(`Block #${block.index} mined successfully.`);
  };

  return (
    <section className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold mb-2">Blockchain Dashboard</h1>
        <p className="text-slate-600 mb-6">
          Quick actions to test wallet creation, add transactions, and mine blocks.
        </p>

        <button
          onClick={handleMine}
          className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
        >
          Mine Block
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold mb-3">Shortcuts</h2>
        <div className="grid gap-2">
          <Link
            to="/wallet"
            className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
          >
            Open Wallet Page
          </Link>
          <Link
            to="/transaction"
            className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
          >
            Open Transaction Form
          </Link>
          <Link
            to="/blockchain"
            className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
          >
            Open Blockchain Explorer
          </Link>
        </div>
      </div>
    </section>
  );
}