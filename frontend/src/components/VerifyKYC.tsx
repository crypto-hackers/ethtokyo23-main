import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { observer } from "mobx-react-lite";
import { verificationDataStore } from "@/stores/verificationDataStore";

const VerifyKYC: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setMessage("");

    if (web3Store.accounts.length === 0) {
      alert("Please connect your wallet");
      return;
    }

    const response = await fetch("/api/verifyKYC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: web3Store.accounts[0] }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      verificationDataStore.fetchData(web3Store.accounts[0]).then();
    } else {
      setMessage(`Error verifying KYC: ${data.data.error}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleVerify}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Verify
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default observer(VerifyKYC);
