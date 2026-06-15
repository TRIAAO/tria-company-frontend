export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 text-black">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Sobre a TRIA
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Uma empresa de tecnologia focada em clareza, execução e resultado.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600">
            A TRIA Company atua no desenvolvimento de soluções digitais para
            empresas que precisam sair da ideia e chegar a um produto funcional,
            elegante e preparado para o mercado.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600">
            Nosso trabalho combina estratégia, design, tecnologia e visão de
            negócio para entregar páginas, sistemas, integrações e plataformas
            com identidade forte e experiência profissional.
          </p>

          <div className="mt-10 rounded-[2rem] bg-black p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
              Liderança
            </p>

            <h3 className="mt-4 text-2xl font-semibold">
              Tomas Camba
            </h3>

            <p className="mt-1 text-sm uppercase tracking-[0.25em] text-zinc-500">
              CEO
            </p>

            <p className="mt-5 leading-relaxed text-zinc-300">
              À frente da TRIA Company, lidera a construção de soluções digitais
              com visão estratégica, foco em qualidade e compromisso com
              resultados reais para empresas em crescimento.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 shadow-2xl">
            <img
              src="/images/ceo-tria.png"
              alt="Tomas Camba, CEO da TRIA Company"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
                CEO
              </p>

              <h3 className="mt-2 text-3xl font-semibold">
                Tomas Camba
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}