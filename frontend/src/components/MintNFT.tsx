import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { ExternallyOwnedAccounts } from "@/shared/types";

const MintNFT: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleMint = async () => {
    setMessage("");

    if (web3Store.accounts.length === 0) {
      alert("Please connect your wallet");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: web3Store.accounts[0] }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setMessage(
        `NFT minted successfully. Transaction hash: ${data.transactionHash}`
      );
    } else {
      setMessage(`Error minting NFT: ${data.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleMint}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0"
      >
        Mint NFT
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default MintNFT;
