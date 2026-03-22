import { useEffect,useState } from "react";
import { getChain, mine, createWallet, getWallets } from "../services/api";
import BlockchainVisualizer from "../components/blockchain/BlockchainVisualizer";
import TransactionForm from "../components/blockchain/TransactionForm";

function Home() {
  const [chain,setChain]=useState([]);
  const [wallets,setWallets]=useState<any>({});

  const load=async()=>{
    const c=await getChain();
    setChain(c.data);
    const w=await getWallets();
    setWallets(w.data);
  };

  useEffect(()=>{load()},[]);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Blockchain Dashboard</h1>

      <button onClick={()=>createWallet().then(load)}
        className="bg-blue-500 px-3 py-1">
        Create Wallet
      </button>

      <button onClick={()=>mine("miner").then(load)}
        className="bg-green-500 px-3 py-1 ml-2">
        Mine
      </button>

      <TransactionForm />

      <pre>{JSON.stringify(wallets,null,2)}</pre>

      <BlockchainVisualizer chain={chain}/>
    </div>
  );
}
export default Home;