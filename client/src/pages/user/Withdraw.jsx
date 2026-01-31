import { useState, useEffect } from "react";
import api from "../../services/api";
import BottomNav from "../../components/BottomNav";
import { Landmark, Smartphone, AlertCircle, CheckCircle2 } from "lucide-react";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");
    if (savedWallet) {
      setWalletBalance(JSON.parse(savedWallet));
    }
  }, []);

  const handleWithdraw = async () => {
    if (!amount || Number(amount) < 100) {
      setMessage("Minimum withdrawal is ₹100");
      return;
    }
    if (!upiId) {
      setMessage("Please enter a valid UPI ID");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/withdrawal/request", {
        amount: Number(amount),
        upiId,
      });
      setMessage(res.data.message);
      // Optional: Update wallet balance locally if backend doesn't return it
    } catch (err) {
      console.error("Withdraw error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-28 min-h-screen bg-slate-50 font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-b-[2.5rem] shadow-lg mb-8">
        <h1 className="text-3xl font-black mb-2">Withdraw Funds</h1>
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div>
            <p className="text-blue-100 text-xs uppercase font-bold tracking-wider">Available For Withdrawal</p>
            <p className="text-2xl font-black">₹{walletBalance}</p>
          </div>
          <Landmark size={32} className="text-blue-200 opacity-50" />
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Form Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Withdraw Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Min ₹100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">UPI ID</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="name@okaxis"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700"
                />
                <Smartphone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${message.includes("Minimum") || message.includes("wrong") ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                {message.includes("wrong") ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                {message}
              </div>
            )}

            <button
              onClick={handleWithdraw}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 ${loading
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-green-100"
                }`}
            >
              {loading ? "Processing..." : "Confirm Withdrawal"}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 ml-1 italic">Important Notes:</h3>
          <ul className="space-y-3 text-xs text-slate-500 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1 shrink-0"></span>
              Withdrawals are processed every day between 10 AM to 6 PM.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1 shrink-0"></span>
              Minimum withdrawal amount is ₹100.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1 shrink-0"></span>
              ₹15 processing fee is applicable per transaction.
            </li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Withdraw;
