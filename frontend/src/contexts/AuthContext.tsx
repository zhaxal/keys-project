import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextValue {
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (login: string, password: string) => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  loading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  refreshToken: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  login: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token !== "") {
      refreshToken().catch(() => logout());
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      axios
        .get("/user", { headers: { Authorization: token } })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("User fetch failed", error);
        });
    } else {
      setUser(null);
    }
  }, [token]);

  const register = async (login: string, password: string) => {
    try {
      const response = await axios.post("/register", { login, password });
      const { token: respToken } = response.data;
      setToken(respToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    if (token === "") {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/refresh", {
        headers: { Authorization: token },
      });
      const { token: respToken } = response.data;
      setToken(respToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Token refresh failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (login: string, password: string) => {
    try {
      const response = await axios.post("/login", { login, password });
      const { token: respToken } = response.data;
      setToken(respToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout", {}, { headers: { Authorization: token } });
      setToken("");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        refreshToken,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
