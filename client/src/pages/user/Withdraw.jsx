import { useState } from "react";
import api from "../../services/api";
import BottomNav from "../../components/BottomNav";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async () => {
    try {
      const res = await api.post("/withdrawal/request", {
        amount: Number(amount),
        upiId,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="pb-16 min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Withdraw</h1>

      <div className="bg-white p-4 rounded shadow">
        <input
          type="number"
          placeholder="Amount (min ₹100)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Request Withdrawal
        </button>

        {message && (
          <p className="text-center mt-3 text-blue-600">{message}</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Withdraw;
