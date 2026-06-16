import React from "react";

const markets = [
  {
    number: "01",
    title: "Angola — Luanda",
    description:
      "Atendemos grandes empresas privadas, instituições financeiras, grupos empresariais e órgãos públicos angolanos que precisam estruturar conhecimento, capacitar lideranças e comunicar com autoridade. Nosso acesso direto a decisores seniores torna possível o que consultorias externas levam anos para alcançar.",
  },
  {
    number: "02",
    title: "Brasil — São Paulo",
    description:
      "Atuamos com empresas, fundações, editoras e instituições educacionais que buscam estrutura intelectual e presença editorial consistente. São Paulo é nossa base operacional e o centro da nossa produção intelectual.",
  },
];

export default function Markets() {
  return (
    <section id="mercados" className="bg-[#050505] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Onde atuamos
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Angola e Brasil. Dois mercados. Uma infraestrutura.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            A TRIA opera entre dois dos mercados mais estratégicos do Atlântico
            Sul — com equipe, presença e relacionamentos em ambos.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {markets.map((market) => (
            <article
              key={market.number}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
            >
              <span className="text-sm font-bold tracking-[0.3em] text-[#D4AF37]">
                {market.number}
              </span>

              <h3 className="mt-8 text-3xl font-semibold text-white">
                {market.title}
              </h3>

              <p className="mt-6 text-base leading-8 text-zinc-400">
                {market.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}