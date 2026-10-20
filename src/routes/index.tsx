import { BrowserRouter, Routes, Route } from "react-router";
import { SignIn } from "../pages/SignIn";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
