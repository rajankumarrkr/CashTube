import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return null;

  return admin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
