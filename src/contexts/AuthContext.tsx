import { useState, useEffect, createContext, type ReactNode } from "react";
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
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setSession(null);
    window.location.assign("/login");
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setSession({
        user: JSON.parse(user),
        token,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
