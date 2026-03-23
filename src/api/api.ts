// Export this so other components can share the base URL
export const API = "https://blockchain-backend-t85y.onrender.com"; 

export type Transaction = {
  sender: string;
  receiver: string;
  amount: number;
};

export type ChainBlock = {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previous_hash: string;
  hash: string;
};

export type ChainResponse = {
  chain: ChainBlock[];
  length?: number;
};

export type WalletResponse = {
  public_key?: string;
  private_key?: string;
  message?: string;
  error?: string;
};

export const createWallet = async (): Promise<WalletResponse> => {
  return fetch(`${API}/create_wallet`).then(res => res.json());
};

export const mineBlock = async () => {
  return fetch(`${API}/mine`).then(res => res.json());
};

export const getChain = async (): Promise<ChainResponse> => {
  return fetch(`${API}/chain`).then(res => res.json());
};