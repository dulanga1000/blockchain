// Export this so other components can share the base URL
export const API = "https://blockchain-backend-t85y.onrender.com"; 

export const createWallet = async () => {
  return fetch(`${API}/create_wallet`).then(res => res.json());
};

export const mineBlock = async () => {
  return fetch(`${API}/mine`).then(res => res.json());
};

export const getChain = async () => {
  return fetch(`${API}/chain`).then(res => res.json());
};