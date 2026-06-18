import React from "react";

export default function About() {
  return (
    <section id="sobre" className="bg-[#0A0A0A] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Sobre a TRIA
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            O que uma organização pensa determina o que ela constrói.
          </h2>
        </div>

        <div className="space-y-7 text-lg leading-9 text-zinc-300">
          <p>
            A TRIA nasce da convicção de que o activo mais estratégico de
            qualquer instituição é a forma como ela pensa, organiza e comunica o
            próprio conhecimento.
          </p>
          <p>
            Não somos uma agência. Não somos uma consultoria convencional. Somos
            uma empresa de infraestrutura intelectual: estruturamos o que as
            organizações sabem, para que possam executar com consistência,
            comunicar com autoridade e crescer com solidez.
          </p>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-2xl font-medium leading-snug text-white">
              Não somos uma agência. Somos ecossistema de infraestrutura
              intelectual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}