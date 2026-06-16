import React from "react";

const team = [
  {
    name: "Tomás Camba",
    role: "Fundador e CEO",
    location: "São Paulo / Luanda",
    image: "/images/ceo-tria.png",
    bio: "Filósofo, pastor, escritor e estrategista. Mestre em Artes e Cultura pela Universidade Presbiteriana Mackenzie. Especializações em Economia pelo Instituto Mises Brasil e Inovação Centrada no Ser Humano pela Hyper Island. Colunista do Jornal de Angola. Prêmio Pontes do Atlântico 2025. Constrói infraestrutura intelectual para organizações em Angola e no Brasil há mais de uma década.",
  },
  {
    name: "Nome do membro em Angola",
    role: "Cargo institucional",
    location: "Luanda",
    image: "/images/team/angola.jpg",
    bio: "Profissional responsável pela articulação institucional da TRIA em Angola, conectando estratégia, relacionamento local e entendimento profundo do mercado angolano.",
  },
  {
    name: "Nome do membro no Brasil",
    role: "Cargo institucional",
    location: "São Paulo",
    image: "/images/team/brasil.jpg",
    bio: "Profissional responsável por apoiar a produção intelectual, editorial e digital da TRIA no Brasil, conectando método, design e execução estratégica.",
  },
];

export default function Team() {
  return (
    <section id="time" className="bg-[#0A0A0A] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Quem constrói
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Pessoas que pensam antes de executar.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            A TRIA é uma empresa de pessoas com formação densa, experiência real
            e compromisso com o longo prazo das organizações que atendemos.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {team.map((person) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:border-[#D4AF37]/40"
            >
              <div className="relative h-80 overflow-hidden bg-zinc-900">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover object-center grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white">
                  {person.name}
                </h3>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {person.role} — {person.location}
                </p>

                <p className="mt-6 text-base leading-8 text-zinc-400">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}