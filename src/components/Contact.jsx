import React, { useState } from "react";
import useSiteContent from "../hooks/useSiteContent";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const DEFAULT_SERVICE_INTEREST = "Contato institucional via landing page";

const fallbackContact = {
  label: "CONTATO",
  title: "A próxima grande decisão começa com uma conversa.",
  description:
    "Se a sua organização precisa estruturar o que sabe, comunicar com autoridade ou construir uma plataforma de educação e conhecimento de longo prazo — fale com a TRIA.",
  highlight:
    "Infraestrutura intelectual para organizações que constroem para durar.",
};

const initialFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service_interest: DEFAULT_SERVICE_INTEREST,
  message: "",
  source: "landing_page",
};

export default function Contact() {
  const { data: contact } = useSiteContent("contact", fallbackContact);

  const [formData, setFormData] = useState(initialFormData);
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function buildPayload() {
    return {
      name: String(formData.name || "").trim(),
      company: String(formData.company || "").trim(),
      email: String(formData.email || "").trim(),
      phone: String(formData.phone || "").trim(),
      service_interest:
        String(formData.service_interest || "").trim() ||
        DEFAULT_SERVICE_INTEREST,
      message: String(formData.message || "").trim(),
      source: "landing_page",
    };
  }

  function getApiErrorMessage(data) {
    if (Array.isArray(data?.detail)) {
      const firstError = data.detail[0];

      if (firstError?.loc && firstError?.msg) {
        return `Campo inválido: ${firstError.loc.join(".")} — ${firstError.msg}`;
      }
    }

    if (typeof data?.detail === "string") {
      return data.detail;
    }

    return "Não foi possível enviar sua mensagem. Tente novamente.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = buildPayload();

    if (!payload.name || !payload.email || !payload.message) {
      setErrorMessage("Preencha nome, e-mail e mensagem antes de enviar.");
      return;
    }

    setSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao enviar lead:", data);
        setErrorMessage(getApiErrorMessage(data));
        return;
      }

      setSuccessMessage(
        "Mensagem enviada com sucesso. A TRIA entrará em contato."
      );

      setFormData(initialFormData);
    } catch (error) {
      console.error("Erro de conexão ao enviar lead:", error);
      setErrorMessage("Erro de conexão. Confirme sua internet e tente novamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contato"
      className="bg-[#050505] px-6 py-28 text-white lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            {contact.label || fallbackContact.label}
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            {contact.title || fallbackContact.title}
          </h2>

          <div className="mt-10 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
            <p className="text-2xl font-medium leading-snug text-white">
              {contact.highlight || fallbackContact.highlight}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Nome
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Seu nome"
                required
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Organização
              </label>

              <input
                type="text"
                value={formData.company}
                onChange={(event) => updateField("company", event.target.value)}
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
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="seuemail@empresa.com"
                required
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Telefone
              </label>

              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+244 / +55"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Mensagem
            </label>

            <textarea
              rows="6"
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Conte brevemente sobre o desafio da sua organização."
              required
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
            />
          </div>

          {successMessage && (
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-8 w-full rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Fale com a TRIA"}
          </button>
        </form>
      </div>
    </section>
  );
}