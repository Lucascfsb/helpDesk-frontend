import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
// import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";
import { AuthLayout } from "../components/AuthLayout";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
