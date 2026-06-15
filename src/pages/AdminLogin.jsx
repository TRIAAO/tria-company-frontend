import { useState } from "react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "tria123";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setErrorMessage("Senha inválida. Tente novamente.");
      return;
    }

    localStorage.setItem("tria_admin_auth", "true");
    window.location.href = "/admin/leads";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-8 text-black shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          TRIA Company
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          Acesso interno
        </h1>

        <p className="mt-4 text-zinc-600">
          Entre com a senha de administrador para visualizar os leads recebidos.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="text-sm font-medium">Senha</label>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-4 outline-none transition focus:border-black"
            placeholder="Digite a senha"
          />

          {errorMessage && (
            <div className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-800">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-zinc-800"
          >
            Entrar no painel
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-zinc-500 transition hover:text-black"
        >
          Voltar para landing
        </a>
      </div>
    </main>
  );
}