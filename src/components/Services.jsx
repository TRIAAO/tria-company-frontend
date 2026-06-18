import React from "react";

const services = [
  {
    number: "01",
    title: "Educação e Gestão do Conhecimento",
    description:
      "Estruturamos programas de educação corporativa, universidades institucionais e sistemas de gestão do conhecimento para organizações que precisam capacitar pessoas com consistência, não com treinamentos pontuais.",
  },
  {
    number: "02",
    title: "Estratégia e Comunicação Institucional",
    description:
      "Ajudamos líderes e organizações a organizar o que pensam, e a comunicar isso com autoridade. Isso inclui posicionamento estratégico, narrativa institucional, publicações de alto padrão e projetos editoriais que constroem legado. Atuamos em grandes relatórios de impacto a livros corporativos trilíngues.",
  },
  {
    number: "03",
    title: "Tecnologia e Plataformas Digitais",
    description:
      "Desenvolvemos plataformas, sistemas e presença digital que sustentam operações educacionais e institucionais de longo prazo, não landing pages avulsas. A tecnologia na TRIA serve a uma estratégia, não a substitui.",
  },
];

export default function Services() {
  return (
    <section
      id="areas"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Áreas de atuação
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Três frentes. Uma lógica única.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            A TRIA atua em três dimensões que, juntas, formam a infraestrutura
            intelectual de uma organização: o que ela sabe, como ela opera e
            como ela se comunica.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] px-10 py-9 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.06]"
            >
              <span className="text-sm font-bold tracking-[0.3em] text-[#D4AF37]">
                {service.number}
              </span>

              <h3 className="mt-8 min-h-[64px] text-2xl font-semibold leading-tight text-white">
                {service.title}
              </h3>

              <p
                lang="pt-BR"
                className="mt-7 w-full break-words text-justify text-[15px] leading-7 tracking-normal text-zinc-400 [hyphens:auto] [text-align-last:left] [text-justify:inter-word]"
              >
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}