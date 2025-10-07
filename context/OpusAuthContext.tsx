"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface OpusAuthContextType {
  opusToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  ready: boolean;
}

const OpusAuthContext = createContext<OpusAuthContextType | undefined>(undefined);

export const OpusAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [opusToken, setOpusToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("opusToken");
    if (token) setOpusToken(token);
    setReady(true); // hydration complete
  }, []);

  const login = (token: string) => {
    localStorage.setItem("opusToken", token);
    setOpusToken(token);
  };

  const logout = () => {
    localStorage.removeItem("opusToken");
    setOpusToken(null);
  };

  return (
    <OpusAuthContext.Provider value={{ opusToken, login, logout, ready }}>
      {children}
    </OpusAuthContext.Provider>
  );
};

export const useOpusAuth = () => {
  const context = useContext(OpusAuthContext);
  if (!context) throw new Error("useOpusAuth must be used within OpusAuthProvider");
  return context;
};
