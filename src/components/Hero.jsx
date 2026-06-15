export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{
        backgroundImage: "url('/images/hero-tria.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-amber-300/80">
            Tecnologia • Estratégia • Execução
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
            Construímos soluções digitais para empresas que querem crescer.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-200 drop-shadow md:text-xl">
            A TRIA Company transforma ideias em produtos digitais modernos,
            seguros e preparados para gerar resultado real.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold text-black shadow-2xl transition hover:bg-zinc-200"
            >
              Começar um projeto
            </a>

            <a
              href="#services"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-4 text-center text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/15"
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-4 border-t border-white/15 pt-8 text-sm text-zinc-300 md:grid-cols-3">
          <p>Landing pages premium</p>
          <p>Sistemas web e plataformas</p>
          <p>Automação e consultoria digital</p>
        </div>
      </div>
    </section>
  );
}