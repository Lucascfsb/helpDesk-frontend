import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").trim(),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null);
  const auth = useAuth();

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/sessions", data);
      auth.save(response.data);
    } catch (error) {
      console.error(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return {
          message:
            error.response?.data?.message || "Erro ao conectar com o servidor.",
        };
      }

      return {
        message:
          "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
      };
    }
  }

  return (
    <div className="w-full max-w-100 flex flex-col gap-6">
      {/* Bloco 1: SignIn Card (Largura 400px, Padding 28px, Borda e Raio idênticos ao Figma) */}
      <div className="w-full bg-white border border-gray-500 rounded-[10px] p-7 flex flex-col gap-10">
        {/* Title */}
        <div className="flex flex-col gap-0.5 w-full">
          <h2 className="text-[20px] font-bold text-gray-200 leading-[140%]">
            Acesse o portal
          </h2>
          <p className="text-[12px] font-normal text-gray-300 leading-[140%]">
            Entre usando seu e-mail e senha cadastrados
          </p>
        </div>

        {/* Form Fields */}
        <form action={formAction} className="w-full flex flex-col gap-4">
          <Input
            name="email"
            required
            legend="E-mail"
            type="email"
            placeholder="exemplo@mail.com"
          />
          <Input
            name="password"
            required
            legend="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          <p className="text-sm font-medium text-feedback-danger text-center">
            {state?.message}
          </p>

          {/* Botão Entrar (#1E2024 com border-radius de 5px igual ao Figma) */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-10 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-[14px] rounded-[5px] mt-2 flex items-center justify-center"
          >
            Entrar
          </Button>
        </form>
      </div>

      {/* Bloco 2: Create account Card (Largura 400px, Altura fixa/flexível, Padding 28px) */}
      <div className="w-full bg-white border border-gray-500 rounded-[10px] p-7 flex flex-col gap-6">
        <div className="flex flex-col gap-0.5 w-full">
          <h3 className="text-[16px] font-bold text-gray-200 leading-[140%]">
            Ainda não tem uma conta?
          </h3>
          <p className="text-[12px] font-normal text-gray-300 leading-[140%]">
            Cadastre agora mesmo
          </p>
        </div>

        <a
          href="/signup"
          className="w-full h-10 bg-gray-500 hover:bg-gray-400 text-gray-200 font-bold text-[14px] rounded-[5px] flex items-center justify-center transition ease-linear"
        >
          Criar conta
        </a>
      </div>
    </div>
  );
}
