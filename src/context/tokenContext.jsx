import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  fullToken: null,
  setFullToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [fullToken, setFullToken] = useState(null);

  useEffect(() => {
    const storedFullToken = localStorage.getItem("fullToken");
    if (storedFullToken) {
      setFullToken(JSON.parse(storedFullToken));
    }
  }, []); 

  return (
    <AuthContext.Provider value={{fullToken, setFullToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);