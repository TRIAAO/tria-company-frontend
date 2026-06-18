import React from "react";
import useSiteContent, { resolveMediaUrl } from "../hooks/useSiteContent";

const defaultPartners = [
  {
    name: "Blessed Home",
    logo: "/images/web_800x300/blessed-home-web.png",
  },
  {
    name: "Sociedade Mineira de Catoca",
    logo: "/images/web_800x300/catoca-web.png",
  },
  {
    name: "Editora Quitanda",
    logo: "/images/web_800x300/editora-quitanda-web.png",
  },
  {
    name: "Grupo Brazon",
    logo: "/images/web_800x300/grupo-brazon-web.png",
  },
  {
    name: "Universidade Metropolitana de Angola",
    logo: "/images/web_800x300/imetro-web.png",
  },
];

const fallbackClients = {
  label: "CLIENTES E ORGANIZAÇÕES",
  title: "Organizações que confiam na TRIA.",
  description:
    "A TRIA trabalha com empresas, instituições e organizações que precisam estruturar conhecimento, comunicar com autoridade e construir soluções de longo prazo.",
  items: defaultPartners,
};

function getValidItems(items) {
  if (!Array.isArray(items)) return [];

  return items.filter((client) => {
    return client && (client.name || client.logo);
  });
}

export default function Clients() {
  const { data: clients } = useSiteContent("clients", fallbackClients);

  const cmsItems = getValidItems(clients.items);
  const items = cmsItems.length > 0 ? cmsItems : defaultPartners;

  return (
    <section
      id="clientes"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              {clients.label || fallbackClients.label}
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              {clients.title || fallbackClients.title}
            </h2>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-zinc-300">
            {clients.description || fallbackClients.description}
          </p>
        </div>

        <div className="mt-16 border-y border-white/10 py-12">
          <div className="grid items-center gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((client, index) => {
              const logoUrl = resolveMediaUrl(client.logo);

              return (
                <div
                  key={`${client.name || "cliente"}-${index}`}
                 className="group flex min-h-[118px] items-center justify-center rounded-3xl border border-white/10 bg-[#D8D8D2] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-[#E3E3DD] hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]"
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={client.name || "Parceiro TRIA"}
                      className="max-h-20 max-w-[190px] object-contain transition duration-500 group-hover:scale-[1.04]"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-center text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      {client.name || "Parceiro"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}