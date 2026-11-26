
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [authUser, setAuthUser] = useState(() => {
    try {
      const user = localStorage.getItem("Users");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Authentication storage error:", error);
      localStorage.removeItem("Users");
      return null;
    }
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
