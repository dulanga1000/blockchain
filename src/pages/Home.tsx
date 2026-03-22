import { mineBlock } from "../api/api";

export default function Home() {
  const handleMine = async () => {
    const data = await mineBlock();
    console.log(data);
    alert("Block Mined!");
  };

  return (
    <div className="p-6">
      <button
        onClick={handleMine}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mine Block
      </button>
    </div>
  );
}