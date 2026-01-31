import BottomNav from "../../components/BottomNav";
import { Copy, Share2, Users, Gift, ArrowRight } from "lucide-react";

const Refer = () => {
  const referralCode = "CT" + Math.random().toString(36).substring(7).toUpperCase();
  const shareText = `Join CashTube & earn daily rewards! Use my code: ${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="pb-28 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white px-6 pt-16 pb-24 rounded-b-[3rem] text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
          <Users size={40} />
        </div>
        <h1 className="text-3xl font-black mb-2">Refer & Earn</h1>
        <p className="text-indigo-100 opacity-90 max-w-xs mx-auto">
          Invite your friends and earn ₹5 for every successful signup!
        </p>
      </div>

      <div className="px-6 -mt-12 space-y-6">
        {/* Referral Code Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Referral Code</p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-4xl font-black text-slate-800 tracking-tighter">{referralCode}</span>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-blue-600 active:scale-90 transition-transform"
            >
              <Copy size={20} />
            </button>
          </div>
          <button
            onClick={() => navigator.share ? navigator.share({ text: shareText }) : copyToClipboard()}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Share2 size={20} />
            Share With Friends
          </button>
        </div>

        {/* Steps Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Gift className="text-indigo-600" size={20} />
            How it works
          </h3>
          <div className="space-y-6 relative">
            <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 bg-slate-50"></div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm z-10 shrink-0">1</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Share your link</p>
                <p className="text-xs text-slate-500 mt-1">Send your unique referral code to friends and family.</p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm z-10 shrink-0">2</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Friends join</p>
                <p className="text-xs text-slate-500 mt-1">They complete their first task using your code.</p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-9 h-9 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-bold text-sm z-10 shrink-0">3</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Collect reward</p>
                <p className="text-xs text-slate-500 mt-1">₹5 will be instantly credited to your wallet!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Refer;
