import React from "react";

const serviceOptions = [
  "Educação Corporativa e Universidade Institucional",
  "Estratégia e Comunicação Institucional",
  "Projeto Editorial ou Publicação de Alto Padrão",
  "Plataforma Digital Institucional",
  "Outro projeto estratégico",
];

export default function Contact() {
  return (
    <section id="contato" className="bg-[#050505] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            Contato
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            A próxima grande decisão começa com uma conversa.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Se a sua organização precisa estruturar o que sabe, comunicar com
            autoridade ou construir uma plataforma de educação e conhecimento de
            longo prazo — fale com a TRIA.
          </p>

          <div className="mt-10 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
            <p className="text-2xl font-medium leading-snug text-white">
              Infraestrutura intelectual para organizações que constroem para
              durar.
            </p>
          </div>
        </div>

        <form className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Organização
              </label>
              <input
                type="text"
                placeholder="Nome da organização"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seuemail@empresa.com"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Telefone
              </label>
              <input
                type="tel"
                placeholder="+244 / +55"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Serviço de interesse
            </label>
            <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-[#D4AF37]">
              <option value="">Selecione uma opção</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-black">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Mensagem
            </label>
            <textarea
              rows="6"
              placeholder="Conte brevemente sobre o desafio da sua organização."
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white"
          >
            Fale com a TRIA
          </button>
        </form>
      </div>
    </section>
  );
}