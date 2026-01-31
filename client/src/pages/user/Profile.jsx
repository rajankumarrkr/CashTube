import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserHistory, updateUpi } from "../../services/userService";
import {
  User,
  CreditCard,
  Landmark,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingUpi, setUpdatingUpi] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, historyRes] = await Promise.all([
        getUserProfile(),
        getUserHistory()
      ]);

      if (profileRes.data.success) {
        setProfile(profileRes.data.user);
        setUpiId(profileRes.data.user.upiId || "");
      }

      if (historyRes.data.success) {
        setHistory(historyRes.data.history);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUpi = async () => {
    if (!upiId) return toast.error("Please enter a valid UPI ID");
    try {
      setUpdatingUpi(true);
      const res = await updateUpi(upiId);
      if (res.data.success) {
        toast.success("UPI settings updated!");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to update UPI settings");
    } finally {
      setUpdatingUpi(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-28 min-h-screen bg-slate-50 font-sans">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 px-6 pt-16 pb-28 rounded-b-[3.5rem] relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40 shadow-xl p-1 mb-4">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-blue-800">
                <User size={40} strokeWidth={2.5} />
              </div>
            </div>
            <div className="absolute bottom-4 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-blue-700 flex items-center justify-center">
              <ShieldCheck size={10} className="text-white" />
            </div>
          </div>

          <h1 className="text-white text-2xl font-black tracking-tight mb-1 uppercase tracking-wider">
            {profile?.mobile ? `+91 ${profile.mobile.slice(0, 3)}***${profile.mobile.slice(-2)}` : "CashTuber"}
          </h1>
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <p className="text-blue-50 text-[10px] font-bold uppercase tracking-[0.2em]">User ID: {profile?._id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16 space-y-6 relative z-10">
        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-50/50 border border-slate-50 flex justify-between items-center group active:scale-95 transition-transform cursor-pointer" onClick={() => navigate("/wallet")}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Balance</p>
              <h2 className="text-3xl font-black text-slate-800">₹{profile?.walletBalance?.toLocaleString()}</h2>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
            <ChevronRight size={20} />
          </div>
        </div>

        {/* Action Grid/Sections */}
        <div className="grid grid-cols-1 gap-6">
          {/* Payment Settings */}
          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-widest">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Landmark size={16} /></div>
              Payment Settings
            </h3>
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@okaxis)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Smartphone size={20} />
                </div>
              </div>
              <button
                onClick={handleUpdateUpi}
                disabled={updatingUpi}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updatingUpi ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Update Withdrawal Bank</>
                )}
              </button>
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-7 pb-4 flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Clock size={16} /></div>
                Recent Activity
              </h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">See All</button>
            </div>

            <div className="px-2 pb-4 space-y-1">
              {history.length > 0 ? history.slice(0, 5).map((item, idx) => (
                <div key={idx} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors rounded-[1.5rem] mx-2">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${item.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                      {item.type === 'income' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                        {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${item.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {item.type === 'income' ? '+' : '-'}₹{item.amount}
                    </p>
                    <p className={`text-[9px] font-black uppercase tracking-tighter ${item.status === 'pending' ? 'text-amber-500' : 'text-slate-300'
                      }`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock size={24} className="text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No activity yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Settings / Extra */}
          <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="p-4 flex items-center gap-4 text-slate-600 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"><Settings size={20} /></div>
              <p className="text-sm font-bold flex-1">Settings & Privacy</p>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-5 rounded-[2rem] font-black text-red-600 bg-red-50/50 hover:bg-red-50 flex items-center justify-center gap-3 transition-all active:scale-[0.98] border border-red-100/50"
        >
          <LogOut size={22} strokeWidth={2.5} />
          <span>SIGN OUT OF ACCOUNT</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

