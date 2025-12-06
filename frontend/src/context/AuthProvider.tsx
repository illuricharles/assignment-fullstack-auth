// src/context/AuthProvider.tsx
import React, {  useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";
import { api } from "../lib/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser(jwt: string) {
    try {
      const res = await api.get("http://localhost:3000/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (res.data?.ok) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  const login = async (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("accessToken", jwt);
    await fetchUser(jwt);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    async function initAuth() {
        const saved = localStorage.getItem("accessToken");
        if (!saved) {
        setLoading(false);
        return;
        }

        setToken(saved);

        try {
        const res = await api.get("http://localhost:3000/api/v1/auth/me", {
            headers: { Authorization: `Bearer ${saved}` },
        });

        if (res.data?.ok) {
            setUser(res.data.user);
        } else {
            logout();
        }
        } catch (err) {
            console.log(err)
            logout();
        }

        setLoading(false);
    }

    initAuth();
}, []);



  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

