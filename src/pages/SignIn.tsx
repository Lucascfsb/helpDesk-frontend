import { useActionState } from "react";
import { Link } from "react-router";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
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
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      <div className="w-full max-w-240 min-h-140 bg-gray-500 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block bg-linear-to-br from-blue-dark via-blue-base to-blue-light p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-blue-light/30 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-6 sm:p-10 flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-8">
            <img src="/favicon.svg" alt="HelpDesk Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-100">HelpDesk</span>
          </div>

          <div className="w-full max-w-sm space-y-6">
            <div className="border border-gray-400 rounded-xl p-6 bg-gray-500">
              <h1 className="text-lg font-bold text-gray-100">
                Acesse o portal
              </h1>
              <p className="text-xs text-gray-300 mt-1 mb-6">
                Entre usando seu e-mail e senha cadastrados
              </p>

              <form action={formAction} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xxs font-bold uppercase text-gray-200 mb-1"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@mail.com"
                    required
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-blue-base focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xxs font-bold uppercase text-gray-200 mb-1"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    required
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-blue-base focus:outline-none transition-colors"
                  />
                </div>

                {state?.message && (
                  <p className="text-xs font-medium text-feedback-danger text-center mt-2">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 bg-gray-100 text-gray-500 py-3 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </form>
            </div>

            <div className="border border-gray-400 rounded-xl p-6 bg-gray-500">
              <h2 className="text-sm font-bold text-gray-100">
                Ainda não tem uma conta?
              </h2>
              <p className="text-xs text-gray-300 mt-1 mb-4">
                Cadastre agora mesmo
              </p>

              <Link
                to="/signup"
                className="block w-full text-center bg-gray-400 text-gray-200 py-3 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors"
              >
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
