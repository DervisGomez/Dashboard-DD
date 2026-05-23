"use client";

import {
  createContext,
  useContext,
} from "react";

import { AuthUser }
  from "@/types/auth";

interface AuthContextProps {
  user: AuthUser | null;

  loading: boolean;

  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextProps | null>(
    null
  );

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}