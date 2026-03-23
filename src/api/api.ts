export const API = "https://blockchain-backend-t85y.onrender.com"; // Change to http://127.0.0.1:10000 if testing locally

// ✅ TypeScript Interfaces
export interface WalletResponse {
  public_key: string;
  private_key: string;
}

export interface Transaction {
  sender: string;
  receiver: string;
  amount: number;
}

export interface ChainBlock {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  proof: number;
  previous_hash: string;
  hash: string;
}

export interface ChainResponse {
  chain: ChainBlock[];
  length: number;
}

// ✅ API Calls
export const createWallet = async (): Promise<WalletResponse> => {
  return fetch(`${API}/create_wallet`).then(res => res.json());
};

export const mineBlock = async (): Promise<ChainBlock> => {
  return fetch(`${API}/mine`).then(res => res.json());
};

export const getChain = async (): Promise<ChainResponse> => {
  return fetch(`${API}/chain`).then(res => res.json());
};