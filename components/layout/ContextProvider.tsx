"use client";
import { ReactNode } from "react";
import { AuthProvider } from "../AuthProvider";

function ContextProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ContextProvider;
