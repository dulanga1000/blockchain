import { useState, useEffect } from "react";
import { createWallet, loginUser, getWallets, getTransactionHistory, type WalletResponse, type TransactionHistory } from "../api/api";

export default function Wallet() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState(""); 
  
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [history, setHistory] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState<WalletResponse | null>(null);

  useEffect(() => {
    loadWallets();
    const stored = localStorage.getItem("authUser");
    if (stored) {
      const user = JSON.parse(stored);
      setAuthUser(user);
      loadHistory(user.public_key); 
    }
  }, []);

  const loadWallets = async () => {
    try {
      const data = await getWallets();
      setWallets(data);
    } catch (error) { 
      console.error("Failed to fetch wallets"); 
    }
  };

  const loadHistory = async (publicKey: string) => {
    try {
      const data = await getTransactionHistory(publicKey);
      setHistory(data);
    } catch (error) { 
      console.error("Failed to fetch history"); 
    }
  };

  const saveAuth = (user: WalletResponse) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
    loadHistory(user.public_key); 
    window.dispatchEvent(new Event("authChange")); 
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setHistory([]); 
    window.dispatchEvent(new Event("authChange"));
    alert("You have been securely logged out.");
  };

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) return alert("Enter username and password.");
    setLoading(true);
    try {
      const user = await createWallet(username, password);
      saveAuth(user);
      setUsername(""); 
      setPassword("");
      await loadWallets(); 
      alert("Registration successful! 10,000 Coins Airdropped.");
    } catch (error: any) { 
      alert("Error: " + error.message); 
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!loginUsername.trim() || !loginPassword.trim()) return alert("Enter username and password.");
    setLoading(true);
    try {
      const user = await loginUser(loginUsername, loginPassword);
      saveAuth(user);
      setLoginUsername(""); 
      setLoginPassword("");
      await loadWallets(); 
    } catch (error: any) { 
      alert("Error: " + error.message); 
    }
    setLoading(false);
  };

  const getIdentity = (pubKey: string) => {
    if (pubKey === "SYSTEM") return "SYSTEM (Airdrop)";
    if (authUser && pubKey === authUser.public_key) return "You";
    const user = wallets.find(w => w.public_key === pubKey);
    return user ? user.username : "Unknown Address";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-2 md:mt-6 animate-fade-in">
      {!authUser ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-10">
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">Create Node Identity</h2>
            <p className="text-slate-500 text-xs md:text-sm mb-6">Set a password to secure your new private key.</p>
            <input type="text" placeholder="Choose username..." value={username} onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-300 w-full mb-3 text-slate-900 font-bold outline-none text-sm md:text-base" />
            <input type="password" placeholder="Create a password..." value={password} onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-300 w-full mb-4 text-slate-900 font-bold outline-none text-sm md:text-base" />
            <button onClick={handleRegister} disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition text-sm md:text-base">
              {loading ? "Generating Keys..." : "Register & Get 10k Coins"}
            </button>
          </div>

          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-800">
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">Login to Wallet</h2>
            <p className="text-slate-400 text-xs md:text-sm mb-6">Enter your password to unlock your private key locally.</p>
            <input type="text" placeholder="Enter username..." value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 text-white w-full mb-3 font-bold outline-none text-sm md:text-base" />
            <input type="password" placeholder="Enter password..." value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 text-white w-full mb-4 font-bold outline-none text-sm md:text-base" />
            <button onClick={handleLogin} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition text-sm md:text-base">
              {loading ? "Authenticating..." : "Unlock Wallet"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl mb-8 md:mb-10 border border-blue-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                <span>🛡️</span> My Dashboard
              </h2>
              <button onClick={handleLogout} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 md:py-3 px-6 rounded-lg md:rounded-xl shadow-lg transition-all text-sm md:text-base">
                Log Out System
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center lg:text-left flex flex-col justify-center">
                <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] md:text-xs mb-2">Welcome back, {authUser.username}</h3>
                <p className="text-4xl md:text-5xl font-extrabold text-white">{authUser.balance.toLocaleString()} <span className="text-lg md:text-2xl text-slate-400">Coins</span></p>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Public Key (Address)</span>
                  <p className="text-[10px] md:text-xs font-mono text-cyan-200 truncate bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 mt-1">{authUser.public_key}</p>
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] md:text-xs font-bold text-red-400 uppercase tracking-widest">Private Key (Secret)</span>
                  <p className="text-[10px] md:text-xs font-mono text-red-300 truncate bg-red-900/20 p-3 md:p-4 rounded-xl border border-red-900/50 mt-1">{authUser.private_key}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>📜</span> Transfer History
            </h3>
            
            {history.length === 0 ? (
              <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500 text-sm md:text-base">No transactions found for your account.</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {history.map((tx, i) => {
                  const isSender = tx.sender === authUser.public_key;
                  return (
                    <div key={i} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
                        <div className={`shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl ${isSender ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {isSender ? '↗' : '↙'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-800 text-sm md:text-lg truncate">
                            {isSender ? `Sent to ${getIdentity(tx.receiver)}` : `Received from ${getIdentity(tx.sender)}`}
                          </p>
                          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                            <span className={tx.status === 'Confirmed' ? 'text-emerald-600 font-semibold' : 'text-amber-500 font-semibold'}>{tx.status}</span>
                            {tx.block_index && <span className="hidden sm:inline"> • Mined in Block #{tx.block_index}</span>}
                          </p>
                        </div>
                      </div>
                      <div className={`self-end md:self-auto font-extrabold text-lg md:text-2xl ${isSender ? 'text-slate-800' : 'text-emerald-600'}`}>
                        {isSender ? '-' : '+'}{tx.amount} <span className="text-sm md:text-base font-bold text-slate-400">Coins</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 mt-8 md:mt-12"><span>🌍</span> Public Network Directory</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {wallets.map((wallet, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-800 font-bold text-lg md:text-xl">
                  {wallet.username.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-bold text-base md:text-lg text-slate-800 truncate">{wallet.username}</h4>
              </div>
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Public Key</span>
              <p className="text-[10px] md:text-xs font-mono text-slate-500 truncate bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100 mt-1">{wallet.public_key}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}