export const API = "https://blockchain-backend-t85y.onrender.com"; // Change to http://127.0.0.1:10000 if testing locally

export interface WalletResponse {
  username: string;
  public_key: string;
  private_key: string;
  balance: number; 
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

export const createWallet = async (username: string): Promise<WalletResponse> => {
  const response = await fetch(`${API}/create_wallet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const getWallets = async (): Promise<WalletResponse[]> => {
  return fetch(`${API}/wallets`).then(res => res.json());
};

export const mineBlock = async (): Promise<ChainBlock> => {
  return fetch(`${API}/mine`).then(res => res.json());
};

export const getChain = async (): Promise<ChainResponse> => {
  return fetch(`${API}/chain`).then(res => res.json());
};

// ✅ NEW API CALLS FOR EXPLORER
export const validateChain = async (): Promise<{message: string, valid: boolean}> => {
  return fetch(`${API}/validate`).then(res => res.json());
};

export const checkBalance = async (address: string): Promise<{address: string, balance: number}> => {
  return fetch(`${API}/balance/${address}`).then(res => res.json());
};