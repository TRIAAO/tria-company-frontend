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
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white"
      style={{
        backgroundImage: "url('/images/hero-tria.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950/90 p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
          TRIA Company
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          Acesso interno
        </h1>

        <p className="mt-4 text-zinc-400">
          Entre com a senha de administrador para acessar o painel da TRIA.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="text-sm font-medium text-zinc-300">Senha</label>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
            placeholder="Digite a senha"
          />

          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#D4AF37] px-6 py-4 font-semibold text-black transition hover:bg-white"
          >
            Entrar no painel
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-zinc-500 transition hover:text-white"
        >
          Voltar para landing
        </a>
      </div>
    </main>
  );
}