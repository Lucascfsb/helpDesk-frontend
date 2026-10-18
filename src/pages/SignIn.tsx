import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").trim(),
});

export function SignIn() {}
