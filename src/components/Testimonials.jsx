import React from "react";
import useSiteContent from "../hooks/useSiteContent";

const fallbackTestimonials = {
  label: "DEPOIMENTOS",
  title: "Quem já construiu com a TRIA.",
  items: [],
};

function getValidItems(items) {
  if (!Array.isArray(items)) return [];

  return items.filter((testimonial) => {
    return (
      testimonial &&
      (testimonial.text ||
        testimonial.name ||
        testimonial.role ||
        testimonial.organization ||
        testimonial.country)
    );
  });
}

export default function Testimonials() {
  const { data: testimonials } = useSiteContent(
    "testimonials",
    fallbackTestimonials
  );

  const items = getValidItems(testimonials.items);

  return (
    <section
      id="depoimentos"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            {testimonials.label || fallbackTestimonials.label}
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {testimonials.title || fallbackTestimonials.title}
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
            Nenhum depoimento cadastrado no momento.
          </div>
        ) : (
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {items.map((testimonial, index) => (
              <article
                key={`${testimonial.name || "depoimento"}-${index}`}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
              >
                <p className="text-xl leading-9 text-white">
                  “{testimonial.text || "Depoimento ainda não cadastrado."}”
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-semibold text-white">
                    {testimonial.name || "Nome não informado"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {testimonial.role || "Cargo"}
                    {testimonial.organization
                      ? ` | ${testimonial.organization}`
                      : ""}
                    {testimonial.country ? ` | ${testimonial.country}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}