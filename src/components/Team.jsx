import React from "react";
import useSiteContent, { resolveMediaUrl } from "../hooks/useSiteContent";

const fallbackTeam = {
  label: "QUEM CONSTRÓI",
  title: "Pessoas que pensam antes de executar.",
  description:
    "A TRIA é uma empresa de pessoas com formação densa, experiência real e compromisso com o longo prazo das organizações que atendemos.",
  items: [
    {
      name: "Tomás Camba",
      role: "Fundador e CEO",
      location: "São Paulo / Luanda",
      image: "/images/ceo-tria.png",
      bio: "Filósofo, pastor, escritor e estrategista. Mestre em Artes e Cultura pela Universidade Presbiteriana Mackenzie. Especializações em Economia pelo Instituto Mises Brasil e Inovação Centrada no Ser Humano pela Hyper Island. Colunista do Jornal de Angola. Prêmio Pontes do Atlântico 2025. Constrói infraestrutura intelectual para organizações em Angola e no Brasil há mais de uma década.",
    },
  ],
};

function getValidItems(items) {
  if (!Array.isArray(items)) return [];

  return items.filter((person) => {
    return (
      person &&
      (person.name ||
        person.role ||
        person.location ||
        person.image ||
        person.bio)
    );
  });
}

export default function Team() {
  const { data: team, loading } = useSiteContent("team", fallbackTeam);
  const members = getValidItems(team.items);

  return (
    <section id="time" className="bg-[#0A0A0A] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            {team.label || fallbackTeam.label}
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {team.title || fallbackTeam.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            {team.description || fallbackTeam.description}
          </p>
        </div>

        {loading ? (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
            Carregando equipe...
          </div>
        ) : members.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
            Nenhum membro cadastrado no momento.
          </div>
        ) : (
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {members.map((person, index) => {
              const imageUrl = resolveMediaUrl(person.image);

              return (
                <article
                  key={`${person.name || "membro"}-${index}`}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:border-[#D4AF37]/40"
                >
                  <div className="relative h-80 overflow-hidden bg-zinc-900">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={person.name || "Membro da TRIA"}
                        className="h-full w-full object-cover object-center grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-950">
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-700">
                          Sem foto
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white">
                      {person.name || "Nome não informado"}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                      {person.role || "Cargo não informado"}
                      {person.location ? ` — ${person.location}` : ""}
                    </p>

                    <p className="mt-6 text-base leading-8 text-zinc-400">
                      {person.bio || "Bio ainda não cadastrada."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}