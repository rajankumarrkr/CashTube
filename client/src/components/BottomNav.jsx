import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex-1 text-center py-2 ${
      pathname === path ? "text-blue-600 font-bold" : "text-gray-500"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex">
      <Link to="/" className={linkClass("/")}>Home</Link>
      <Link to="/wallet" className={linkClass("/wallet")}>Wallet</Link>
      <Link to="/refer" className={linkClass("/refer")}>Refer</Link>
      <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
    </div>
  );
};

export default BottomNav;
