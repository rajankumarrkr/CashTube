import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { Wallet as WalletIcon, ArrowUpRight, ShieldCheck, History } from "lucide-react";

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
    <div className="pb-28 min-h-screen bg-slate-50">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8 rounded-b-[3rem] shadow-xl mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md">
            <WalletIcon size={32} />
          </div>
          <p className="text-blue-100 text-sm font-medium uppercase tracking-widest mb-1">Total Balance</p>
          <h1 className="text-5xl font-black">₹{balance.toLocaleString()}</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ArrowUpRight size={24} />
            </div>
            <span className="font-bold text-slate-700">Withdraw</span>
          </button>
          <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <History size={24} />
            </div>
            <span className="font-bold text-slate-700">History</span>
          </button>
        </div>

        {/* Requirements Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={20} />
            Withdrawal Info
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-500 font-medium">Min Withdrawal</span>
              <span className="font-bold text-slate-800">₹100</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-500 font-medium">Service Charge</span>
              <span className="font-bold text-slate-800">₹15</span>
            </div>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
          <p className="text-xs text-blue-600 leading-relaxed text-center">
            Payments are processed within 24-48 hours. Please ensure your UPI ID is correctly updated in your profile.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Wallet;
