import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";

import { Loading } from "../components/Loading";

export function AppRoutes() {
  const { session, isLoading } = useAuth();

  function renderRoutes() {
    if (!session) {
      return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
}
