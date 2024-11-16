"use client";
import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, []);

  return !user && <div>{children}</div>;
};

export default AuthLayout;
