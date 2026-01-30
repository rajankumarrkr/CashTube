import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

const Wallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("wallet");

    if (stored && !isNaN(JSON.parse(stored))) {
      setBalance(JSON.parse(stored));
    } else {
      setBalance(0);
    }
  }, []);

  return (
    <div className="pb-16 min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">My Wallet</h1>

      <div className="bg-white p-6 rounded shadow text-center">
        <p className="text-gray-500 mb-2">Available Balance</p>
        <h2 className="text-3xl font-bold text-green-600">
          ₹{balance}
        </h2>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Minimum withdrawal: ₹100 <br />
        Withdrawal charge: ₹15
      </p>

      <BottomNav />
    </div>
  );
};

export default Wallet;
