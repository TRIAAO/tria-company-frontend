const services = [
  {
    title: "Conhecimento e Educação",
    description:
      "Estruturamos conteúdos, programas e experiências educacionais para capacitar pessoas, equipas e organizações.",
  },
  {
    title: "Tecnologia e Soluções Digitais",
    description:
      "Criamos páginas, plataformas, sistemas e ferramentas digitais que apoiam operações, comunicação e crescimento.",
  },
  {
    title: "Estratégia Corporativa",
    description:
      "Apoiamos empresas na organização de ideias, posicionamento, processos e iniciativas orientadas a resultado.",
  },
  {
    title: "Projetos de Alto Impacto",
    description:
      "Transformamos desafios em projetos claros, executáveis e preparados para gerar valor em ambientes digitais, educacionais e corporativos.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-zinc-100 px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Áreas de atuação
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Estruturamos ideias para que elas se tornem soluções relevantes.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600">
            A TRIA conecta conhecimento, tecnologia e estratégia para apoiar
            empresas, instituições e projetos que precisam evoluir com clareza,
            presença digital e impacto.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="min-h-64 rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-sm text-zinc-400">
                0{index + 1}
              </span>

              <h3 className="mt-10 text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-4 max-w-xl leading-relaxed text-zinc-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}