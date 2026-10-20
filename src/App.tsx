import { Routes } from "./routes/index";

import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
