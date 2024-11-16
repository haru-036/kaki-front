"use client";
import api from "@/lib/axios";
import { getToken, removeToken } from "@/lib/token";
import { User } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const res = await api.get(`userinfo`, {
          headers: { Authorization: "Bearer " + token },
        });
        const data = res.data;
        if (Object.keys(data).length === 0) {
          setUser(null);
          removeToken();
          setIsLoading(false);
          return;
        }
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // const login = (userData: SetStateAction<null>) => {
  //   setUser(userData);
  // };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  if (isLoading) {
    return (
      <div className="font-semibold text-xl text-center py-10">Loading...</div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
