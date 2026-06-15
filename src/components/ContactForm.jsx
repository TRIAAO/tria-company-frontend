import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service_interest: "Landing Page",
    message: "",
    source: "tria_landing_page",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setErrorMessage("Não foi possível enviar sua mensagem. Verifique os dados e tente novamente.");
        return;
      }

      setSuccessMessage("Mensagem enviada com sucesso. A TRIA entrará em contato em breve.");

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service_interest: "Landing Page",
        message: "",
        source: "tria_landing_page",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro de conexão com a API. Confirme se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="bg-white px-6 py-32 text-black">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Contato
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Vamos construir algo relevante?
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            Envie uma mensagem para a TRIA Company. Conte rapidamente sobre sua
            ideia, necessidade ou projeto. Nossa equipe irá retornar com uma
            orientação inicial.
          </p>

          <div className="mt-10 rounded-[2rem] bg-black p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Atendimento
            </p>

            <p className="mt-5 text-2xl font-semibold">
              TRIA Company
            </p>

            <p className="mt-4 text-zinc-400">
              Tecnologia, estratégia e execução para empresas que querem crescer.
            </p>

            <a
              href="https://wa.me/244923000000?text=Olá%20TRIA%20Company,%20gostaria%20de%20falar%20sobre%20um%20projeto."
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-zinc-100 p-6 md:p-8">
          <div className="grid gap-5">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Empresa</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
                placeholder="Nome da empresa"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
                  placeholder="email@empresa.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
                  placeholder="+244 923 000 000"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Serviço de interesse</label>
              <select
                name="service_interest"
                value={formData.service_interest}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                <option value="Sistema Web">Sistema Web</option>
                <option value="Automação">Automação</option>
                <option value="Consultoria Digital">Consultoria Digital</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={5}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-4 outline-none transition focus:border-black"
                placeholder="Conte rapidamente sobre o projeto..."
              />
            </div>

            {successMessage && (
              <div className="rounded-2xl bg-green-100 px-4 py-3 text-sm text-green-800">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-800">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}