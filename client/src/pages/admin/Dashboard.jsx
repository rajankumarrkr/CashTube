import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Welcome Card */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="font-semibold text-lg">Welcome, Admin 👋</p>
        <p className="text-sm text-gray-500">
          You are logged in as CashTube Admin
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Videos */}
        <Link
          to="/admin/videos"
          className="bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold mb-2">📹 Manage Videos</h2>
          <p className="text-sm text-gray-600">
            Add, enable or disable daily videos
          </p>
        </Link>

        {/* Withdrawals */}
        <Link
          to="/admin/withdrawals"
          className="bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold mb-2">💸 Withdrawals</h2>
          <p className="text-sm text-gray-600">
            Approve or reject user withdrawal requests
          </p>
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 text-white px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
