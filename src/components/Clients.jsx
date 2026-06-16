import React from "react";
import useSiteContent, { resolveMediaUrl } from "../hooks/useSiteContent";

const fallbackClients = {
  label: "CLIENTES E ORGANIZAÇÕES",
  title: "Organizações que confiam na TRIA.",
  description:
    "A TRIA trabalha com empresas, instituições e organizações que precisam estruturar conhecimento, comunicar com autoridade e construir soluções de longo prazo.",
  items: [],
};

function getValidItems(items) {
  if (!Array.isArray(items)) return [];

  return items.filter((client) => {
    return (
      client &&
      (client.name ||
        client.sector ||
        client.country ||
        client.logo ||
        client.description)
    );
  });
}

export default function Clients() {
  const { data: clients } = useSiteContent("clients", fallbackClients);
  const items = getValidItems(clients.items);

  return (
    <section
      id="clientes"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              {clients.label || fallbackClients.label}
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              {clients.title || fallbackClients.title}
            </h2>
          </div>

          <p className="text-lg leading-8 text-zinc-300">
            {clients.description || fallbackClients.description}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
            Nenhuma organização cadastrada no momento.
          </div>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((client, index) => {
              const logoUrl = resolveMediaUrl(client.logo);

              return (
                <article
                  key={`${client.name || "cliente"}-${index}`}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.06]"
                >
                  <div className="flex h-24 items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-6">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={client.name || "Cliente TRIA"}
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
                      {client.name || "Cliente não informado"}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                      {client.sector || "Setor"}
                      {client.country ? ` — ${client.country}` : ""}
                    </p>

                    <p className="mt-6 text-base leading-8 text-zinc-400">
                      {client.description || "Descrição ainda não cadastrada."}
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