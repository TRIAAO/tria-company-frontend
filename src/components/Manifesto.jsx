import React from "react";

export default function Manifesto() {
  return (
    <section className="bg-[#0A0A0A] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8 md:p-14">
          <p className="text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl">
            “O que distingue organizações que duram não é o que elas fazem — é
            o que elas sabem, como organizam esse saber e como o transmitem.
            Isso é infraestrutura intelectual. É o que construímos.”
          </p>

          <div className="mt-10">
            <p className="font-semibold text-white">Tomás Camba</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
              Fundador da TRIA Company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}