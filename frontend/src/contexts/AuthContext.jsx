
import  { createContext, useState, useEffect, useContext  } from "react";



const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    // Check local storage for existing auth on app load
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth({
          isAuthenticated: parsedAuth.isAuthenticated || false,
          role: parsedAuth.role || null,
          username: parsedAuth.username || null,
          email: parsedAuth.email || null,
        });
      } catch (error) {
        // Invalid stored auth, reset to defaults
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = (username , email , role="user" , token) => {
    const authData = {
      isAuthenticated: true,
      role,
      username,
      email
    };

    // Update state and store in localStorage
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
    localStorage.setItem("token", token);
    
  };

  const logout = () => {
    // Clear state and remove from localStorage
    setAuth({
      isAuthenticated: false,
      role: null,
      username: null,
      email: null,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
