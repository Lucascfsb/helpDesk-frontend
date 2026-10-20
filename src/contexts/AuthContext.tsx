import { useState } from "react";
import { createContext, type ReactNode } from "react";
import { api } from "../services/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TECNICO" | "CLIENTE";
};

export type UserAPIResponse = {
  user: User;
  token: string;
};

type AuthContextData = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  remove: () => void;
};

const LOCAL_STORAGE_KEY = "@helpdesk";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(() => {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (user && token) {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return {
          user: JSON.parse(user),
          token,
        };
      } catch (error) {
        console.error("Erro ao recuperar sessão do localStorage:", error);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
      }
    }

    return null;
  });

  const [isLoading] = useState(false);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setSession(data);
  }

  function remove() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    delete api.defaults.headers.common["Authorization"];
    setSession(null);
    window.location.assign("/login");
  }

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
