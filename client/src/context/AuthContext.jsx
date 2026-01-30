import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../services/api"; // 🔥 IMPORTANT

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      setUser({ token: userToken });
      setAuthToken(userToken); // 🔥 THIS FIXES USER API CALLS
    }

    if (adminToken) {
      setAdmin({ token: adminToken });
      setAuthToken(adminToken); // 🔥 ADMIN APIs
    }

    setLoading(false);
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("userToken", token);
    setUser({ token });
    setAuthToken(token); // 🔥 MUST
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setAuthToken(null);
  };

  const loginAdmin = (token) => {
    localStorage.setItem("adminToken", token);
    setAdmin({ token });
    setAuthToken(token); // 🔥 MUST
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
