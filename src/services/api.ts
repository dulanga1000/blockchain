import axios from "axios";

const API = "https://blockchain-backend-t85y.onrender.com";

export const getChain = () => axios.get(`${API}/chain`);
export const mine = (miner:string)=>axios.post(`${API}/mine`,{miner});
export const createWallet = ()=>axios.post(`${API}/wallet`);
export const getWallets = ()=>axios.get(`${API}/wallets`);
export const sendTx = (data:any)=>axios.post(`${API}/transaction`,data);