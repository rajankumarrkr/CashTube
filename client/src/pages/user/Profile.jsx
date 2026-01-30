import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    // 🔹 Basic info (temporary localStorage-based)
    const token = localStorage.getItem("userToken");
    setUserId(token ? token.slice(0, 10) + "..." : "N/A");

    const wallet = JSON.parse(localStorage.getItem("wallet")) || 0;
    setTotalIncome(wallet);

    // 🔹 Dummy history (next phase backend se aayega)
    setIncomeHistory([
      { date: "Today", amount: 5 },
    ]);

    setWithdrawals([
      // example structure
      // { date: "2026-01-28", amount: 100, status: "Approved" }
    ]);

    const savedUpi = localStorage.getItem("upiId");
    if (savedUpi) setUpiId(savedUpi);
  }, []);

  const saveUpi = () => {
    if (!upiId) return;
    localStorage.setItem("upiId", upiId);
    alert("UPI details saved");
  };

  const handleLogout = () => {
    logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="pb-16 min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      {/* User Info */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Total Income:</strong> ₹{totalIncome}</p>
      </div>

      {/* Income History */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Income History</h2>
        {incomeHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No income yet</p>
        ) : (
          incomeHistory.map((i, idx) => (
            <p key={idx} className="text-sm">
              {i.date} — ₹{i.amount}
            </p>
          ))
        )}
      </div>

      {/* Withdrawal History */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Withdrawal History</h2>
        {withdrawals.length === 0 ? (
          <p className="text-sm text-gray-500">No withdrawals yet</p>
        ) : (
          withdrawals.map((w, idx) => (
            <p key={idx} className="text-sm">
              {w.date} — ₹{w.amount} ({w.status})
            </p>
          ))
        )}
      </div>

      {/* Bank / UPI Details */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Bank / UPI Details</h2>
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={saveUpi}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save UPI
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded"
      >
        Logout
      </button>

      <BottomNav />
    </div>
  );
};

export default Profile;
