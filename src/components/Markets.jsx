import React from "react";

export default function Markets() {
  return (
    <section
      id="mercados"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Onde atuamos
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Angola e Brasil. Dois mercados. Uma infraestrutura.
          </h2>

          <div className="mt-8 max-w-4xl space-y-7 text-lg leading-9 text-zinc-300">
            <p>
              A TRIA opera entre dois dos mercados mais estratégicos do
              Atlântico Sul — com equipe, presença e relacionamentos em ambos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}