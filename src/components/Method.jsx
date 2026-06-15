const steps = [
  {
    title: "Diagnóstico",
    description:
      "Entendemos o contexto, os objetivos, os públicos e os desafios que precisam ser estruturados.",
  },
  {
    title: "Estruturação",
    description:
      "Organizamos ideias, conteúdos, fluxos, prioridades e caminhos estratégicos para tornar o projeto claro e executável.",
  },
  {
    title: "Execução",
    description:
      "Transformamos a estratégia em soluções digitais, educacionais ou corporativas com atenção à experiência, qualidade e consistência.",
  },
  {
    title: "Impacto",
    description:
      "Acompanhamos a entrega com foco em resultado, melhoria contínua e geração de valor para pessoas e organizações.",
  },
];

export default function Method() {
  return (
    <section id="method" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Método TRIA
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Uma metodologia clara para transformar conhecimento em execução.
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.5rem] border border-white/10 p-6"
              >
                <div className="flex items-start gap-6">
                  <span className="text-sm text-zinc-500">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>

                    <p className="mt-3 leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] bg-white p-8 text-black md:p-12">
          <p className="max-w-5xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            “Quando conhecimento, tecnologia e estratégia caminham juntos, ideias
            deixam de ser intenção e passam a gerar impacto.”
          </p>
        </div>
      </div>
    </section>
  );
}