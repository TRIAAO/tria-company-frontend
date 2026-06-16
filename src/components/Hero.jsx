import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      {/* Imagem/Banner de fundo */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-tria.png"
          alt="TRIA Company - Infraestrutura intelectual"
          className="h-full w-full object-cover opacity-70"
        />

        {/* Camadas mais leves para deixar o banner aparecer melhor */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

        {/* Luz dourada extra no lado direito */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(212,175,55,0.18),transparent_34%)]" />
      </div>

      {/* Efeito premium dourado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />

      {/* Grid discreto */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 lg:px-8">
        <div className="max-w-5xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-black/35 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] backdrop-blur">
            Conhecimento · Estratégia · Infraestrutura
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
            Construímos a infraestrutura intelectual de organizações que não
            podem falhar.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-100 md:text-xl">
            A TRIA estrutura conhecimento, estratégia e tecnologia para
            instituições que precisam de solidez, não de soluções descartáveis.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(212,175,55,0.28)] transition hover:bg-white"
            >
              Fale com a TRIA
            </a>

            <a
              href="#metodo"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Conheça o nosso método
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}