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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28">
        <div className="max-w-5xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-amber-300/80">
            Conhecimento • Tecnologia • Estratégia
          </p>

          <h1 className="max-w-6xl text-4xl font-semibold leading-[1.02] tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
            A TRIA Company estrutura conhecimento, tecnologia e estratégia para
            transformar ideias em soluções digitais, educacionais e corporativas
            de alto impacto.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-200 drop-shadow md:text-xl">
            Criamos experiências, plataformas e estratégias que conectam
            pessoas, organizações e oportunidades através da inovação, da
            educação e da execução orientada a resultados.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold text-black shadow-2xl transition hover:bg-zinc-200"
            >
              Fale com a TRIA
            </a>

            <a
              href="#services"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-4 text-center text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/15"
            >
              Conheça nossa atuação
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-4 border-t border-white/15 pt-8 text-sm text-zinc-300 md:grid-cols-3">
          <p>Estruturação de conhecimento</p>
          <p>Soluções digitais e educacionais</p>
          <p>Estratégia corporativa de impacto</p>
        </div>
      </div>
    </section>
  );
}