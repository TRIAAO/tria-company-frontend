const services = [
  {
    title: "Landing Pages",
    description:
      "Páginas comerciais modernas, rápidas e orientadas para conversão de clientes.",
  },
  {
    title: "Desenvolvimento Web",
    description:
      "Sites institucionais, portais e aplicações web com visual profissional e boa estrutura técnica.",
  },
  {
    title: "Sistemas e Plataformas",
    description:
      "Soluções sob medida para gestão, atendimento, vendas, reservas, candidaturas e operações internas.",
  },
  {
    title: "Automação e Integrações",
    description:
      "Integrações com APIs, formulários, notificações, pagamentos e processos digitais.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-zinc-100 px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            O que fazemos
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Soluções digitais para negócios em movimento.
          </h2>
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