import React from "react";

const steps = [
  {
    number: "01",
    title: "Escuta",
    description:
      "Mapeamos o contexto, a cultura, os objetivos e os desafios reais da organização. Não começamos com soluções. Começamos com perguntas certas.",
  },
  {
    number: "02",
    title: "Arquitetura",
    description:
      "Organizamos o que foi escutado em uma estrutura estratégica: prioridades, fluxos, narrativa, mapa de conhecimento e plano de execução.",
  },
  {
    number: "03",
    title: "Construção",
    description:
      "Executamos com o time da TRIA e com os parceiros internos da organização. Entregamos com qualidade, não com velocidade.",
  },
  {
    number: "04",
    title: "Instalação",
    description:
      "Implantamos o que foi construído dentro da cultura e dos processos da organização — com formação, suporte e acompanhamento.",
  },
  {
    number: "05",
    title: "Tutela",
    description:
      "Permanecemos como parceiros estratégicos. Acompanhamos a evolução, ajustamos o que precisa ser ajustado, e garantimos que a infraestrutura funcione no longo prazo.",
  },
];

export default function Method() {
  return (
    <section id="metodo" className="bg-[#0A0A0A] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              Método TRIA
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              O Método Construtor: um método para organizações que constroem
              para durar.
            </h2>
          </div>

          <p className="text-lg leading-8 text-zinc-300">
            Não trabalhamos com entregas isoladas. Trabalhamos com ciclos
            completos de engajamento institucional, cinco atos que transformam a
            intenção em infraestrutura.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {steps.map((step) => (
            <article
              key={step.number}
              className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-[#D4AF37]/50 md:grid-cols-[120px_1fr]"
            >
              <div className="text-4xl font-semibold text-[#D4AF37]">
                {step.number}
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-400">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
          <p className="text-2xl font-medium leading-snug text-white md:text-3xl">
            “Construímos infraestrutura — não entregamos projetos e saímos.”
          </p>
        </div>
      </div>
    </section>
  );
}