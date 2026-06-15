const testimonials = [
  {
    quote:
      "A TRIA nos ajudou a organizar ideias, estruturar a comunicação e transformar uma necessidade interna em uma solução clara e profissional.",
    name: "Ana Rodrigues",
    role: "Gestora de Projeto",
    company: "Cliente Corporativo",
  },
  {
    quote:
      "O diferencial da TRIA está na capacidade de unir visão estratégica, conhecimento e tecnologia em entregas com impacto real.",
    name: "Direção Executiva",
    role: "Parceiro Institucional",
    company: "Organização Parceira",
  },
  {
    quote:
      "Mais do que executar, a TRIA entende o contexto do projeto e propõe caminhos que tornam a solução mais forte, funcional e preparada para crescer.",
    name: "Coordenação Operacional",
    role: "Área de Inovação",
    company: "Empresa Atendida",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Depoimentos
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              A confiança nasce quando estratégia, execução e resultado caminham juntos.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600">
              A TRIA Company trabalha lado a lado com empresas, equipas e
              instituições para transformar necessidades em projetos claros,
              consistentes e preparados para gerar impacto.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.company}`}
              className="flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8"
            >
              <p className="text-2xl font-semibold leading-tight text-black">
                “{item.quote}”
              </p>

              <div className="mt-10 border-t border-zinc-200 pt-6">
                <p className="font-semibold text-black">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{item.role}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}