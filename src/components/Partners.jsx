const partners = [
  "Grupo Sonae",
  "Educação",
  "Tecnologia",
  "Consultoria",
  "Inovação",
  "Projetos Corporativos",
];

const stats = [
  {
    value: "147+",
    label: "Projetos estruturados",
  },
  {
    value: "12M+",
    label: "Impacto estimado",
  },
  {
    value: "98%",
    label: "Foco em satisfação",
  },
  {
    value: "40%",
    label: "Eficiência em processos",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Parceiros e impacto
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Experiência aplicada em projetos, organizações e iniciativas de alto valor.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            A TRIA atua em diferentes contextos, conectando conhecimento,
            tecnologia e estratégia para apoiar empresas, instituições e
            projetos que precisam evoluir com clareza e consistência.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-4xl font-semibold text-white">{stat.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] border border-white/10 bg-zinc-950 p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
                Ecossistema TRIA
              </p>

              <h3 className="mt-4 text-2xl font-semibold md:text-3xl">
                Marcas, setores e organizações conectadas à nossa atuação.
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-500">
              Os nomes e segmentos abaixo representam a base de prova social da
              TRIA. A lista final deve ser validada com o cliente antes da
              publicação oficial.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex min-h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}