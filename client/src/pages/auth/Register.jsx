import { useState } from "react";
import api, { setAuthToken } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Smartphone, Lock, UserPlus, Eye, EyeOff, Tag } from "lucide-react";

const Register = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        mobile,
        password,
        referralCode,
      });

      const token = res.data.token;
      loginUser(token);
      setAuthToken(token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Visual Header */}
      <div className="h-[25vh] bg-gradient-to-br from-indigo-600 to-blue-700 rounded-b-[4rem] flex flex-col items-center justify-center p-6 text-center shadow-xl">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 border border-white/30 -rotate-6">
          <UserPlus size={32} className="text-white rotate-6" />
        </div>
        <h1 className="text-white text-2xl font-black tracking-tighter">Create Account</h1>
        <p className="text-indigo-100 text-xs opacity-80 mt-1">Start your earning journey today</p>
      </div>

      {/* Register Form */}
      <div className="flex-1 px-8 pt-8 pb-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[13px] font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="10 digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-800"
                  required
                />
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-800"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Referral Code (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter referral code if any"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-800"
                />
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 px-1 leading-relaxed">
            By signing up, you agree to our <span className="text-blue-500 font-bold">Terms of Service</span> and <span className="text-blue-500 font-bold">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 ${loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up Now"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
