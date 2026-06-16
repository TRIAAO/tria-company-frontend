import React from "react";

const clients = [
  {
    name: "Cliente / Organização",
    sector: "Setor institucional",
    country: "Angola",
    logo: "",
    description:
      "Organização atendida pela TRIA em projetos de conhecimento, estratégia, comunicação institucional ou plataformas digitais.",
  },
  {
    name: "Cliente / Organização",
    sector: "Educação / Fundação / Empresa",
    country: "Brasil",
    logo: "",
    description:
      "Instituição parceira em projetos editoriais, educacionais ou de infraestrutura intelectual.",
  },
  {
    name: "Cliente / Organização",
    sector: "Empresa privada",
    country: "Angola / Brasil",
    logo: "",
    description:
      "Empresa com atuação estratégica que construiu soluções institucionais com a TRIA.",
  },
];

export default function Clients() {
  return (
    <section
      id="clientes"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              Clientes e organizações
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Organizações que confiam na TRIA.
            </h2>
          </div>

          <p className="text-lg leading-8 text-zinc-300">
            A TRIA trabalha com empresas, instituições e organizações que
            precisam estruturar conhecimento, comunicar com autoridade e
            construir soluções de longo prazo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, index) => (
            <article
              key={`${client.name}-${index}`}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.06]"
            >
              <div className="flex h-24 items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-6">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-14 max-w-full object-contain grayscale transition duration-500 group-hover:grayscale-0"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-center text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Logo
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-white">
                  {client.name}
                </h3>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {client.sector} — {client.country}
                </p>

                <p className="mt-6 text-base leading-8 text-zinc-400">
                  {client.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}