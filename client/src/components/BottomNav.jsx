import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Share2, User } from "lucide-react";

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/refer", icon: Share2, label: "Refer" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "text-slate-500 hover:bg-slate-50"
                }`}
            >
              <Icon size={20} className={isActive ? "mb-0.5" : "mb-1"} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? "block" : "block text-slate-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
