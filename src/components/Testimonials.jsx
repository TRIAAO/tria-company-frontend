import React from "react";

const testimonials = [
  {
    text: "A TRIA nos ajudou a organizar ideias complexas em uma narrativa institucional clara, forte e respeitada.",
    name: "Nome Completo",
    role: "Cargo",
    organization: "Organização",
    country: "País",
  },
  {
    text: "O trabalho foi além da entrega. Houve escuta, profundidade e uma capacidade rara de transformar conhecimento em estrutura.",
    name: "Nome Completo",
    role: "Cargo",
    organization: "Organização",
    country: "País",
  },
  {
    text: "Com a TRIA, conseguimos comunicar com mais autoridade e estruturar melhor aquilo que a nossa organização já sabia, mas ainda não tinha organizado.",
    name: "Nome Completo",
    role: "Cargo",
    organization: "Organização",
    country: "País",
  },
];

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Depoimentos
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Quem já construiu com a TRIA.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-xl leading-9 text-white">
                “{testimonial.text}”
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-semibold text-white">{testimonial.name}</p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {testimonial.role} | {testimonial.organization} |{" "}
                  {testimonial.country}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}