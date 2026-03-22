import { useState } from "react";
import { sendTx } from "../../services/api";

function TransactionForm() {
  const [data,setData]=useState({sender:"",receiver:"",amount:0});

  const submit=()=>{
    sendTx(data);
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <input placeholder="Sender" onChange={e=>setData({...data,sender:e.target.value})}/>
      <input placeholder="Receiver" onChange={e=>setData({...data,receiver:e.target.value})}/>
      <input type="number" onChange={e=>setData({...data,amount:+e.target.value})}/>
      <button onClick={submit} className="bg-green-500 px-3 py-1 mt-2">
        Send
      </button>
    </div>
  );
}
export default TransactionForm;