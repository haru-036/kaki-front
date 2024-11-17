"use client";
import api from "@/lib/axios";
import { getToken, removeToken } from "@/lib/token";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  updateUser: (userData: React.SetStateAction<User | null>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
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
  }, [isLoading]);

  const login = () => {
    setIsLoading(true);
  };

  const updateUser = (userData: React.SetStateAction<User | null>) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    removeToken();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="font-semibold text-xl text-center py-10">Loading...</div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
