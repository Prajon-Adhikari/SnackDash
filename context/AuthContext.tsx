"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface AuthType {
  user: User | null;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Auto-load user from token on page reload
  useEffect(() => {
    const token = localStorage.getItem("login_token");

    if (!token) {
      setLoading(false);
      router.push("/login");
      return;
    }
    console.log(token);

    axiosInstance
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Auth error:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loadings...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
