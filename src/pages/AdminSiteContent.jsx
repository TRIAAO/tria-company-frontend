import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const officialTeamContent = {
  label: "QUEM CONSTRÓI",
  title: "Pessoas que pensam antes de executar.",
  description:
    "A TRIA é uma empresa de pessoas com formação densa, experiência real e compromisso com o longo prazo das organizações que atendemos.",
  items: [
    {
      name: "Tomás Camba",
      role: "Fundador e CEO",
      location: "São Paulo / Luanda",
      image: "/images/ceo-tria.png",
      bio: "Filósofo, escritor e estrategista. Mestre em Artes e Cultura pela Universidade Presbiteriana Mackenzie. Especializações em Economia pelo Instituto Mises Brasil e Inovação Centrada no Ser Humano pela Hyper Island. Empreendedor serial, fundou a Editora Quitanda no Brasil e cofundou a GESP em Angola. Prêmio Pontes do Atlântico 2025. Constrói infraestrutura intelectual para organizações em Angola e no Brasil há mais de uma década.",
    },
    {
      name: "Gustavo Ipolito Jr.",
      role: "Diretor de Novos Negócios",
      location: "Brasil",
      image: "/images/Gustavo_Ipolito.jpg",
      bio: "Empreendedor e founder/CEO da GoldStreet Venture Capital. Graduado em Sistemas de Informação, com MBA Executivo em Gestão Empresarial pela FGV-SP. Construiu carreira em multinacionais como IBM, Xerox, Siemens Business Services e Williams Lea, grupo DHL, antes de liderar a fusão que criou o maior print center da América Latina e o 5º maior do mundo. Eleito um dos Top Ten Mentors da InvesteSP, atua hoje como conselheiro e mentor de empresários em crescimento exponencial.",
    },
    {
      name: "Wilson Dos Santos Kahango Dala",
      role: "Tech Engineer",
      location: "São Paulo / Luanda",
      image: "/images/wilson-dala.png",
      bio: "Engenheiro de software com mais de uma década construindo infraestrutura digital robusta — do frontend ao deploy, passando por DevOps, cloud e bancos de dados. Passou por Riachuelo, Azimute Med, Linx/Stone e ZRFA antes de chegar à TRIA, onde sustenta tecnicamente as plataformas institucionais e os sistemas de longo prazo da empresa. Formado em Gestão Financeira Empresarial, com pós em Gestão Bancária e MBA em Gestão de Pessoas.",
    },
  ],
};

function resolveAdminMediaUrl(url) {
  if (!url) return "";

  const cleanUrl = String(url).trim();
  const apiBaseUrl = API_URL.replace("/api/v1", "");

  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("/uploads")) {
    return `${apiBaseUrl}${cleanUrl}`;
  }

  if (cleanUrl.startsWith("uploads")) {
    return `${apiBaseUrl}/${cleanUrl}`;
  }

  if (cleanUrl.startsWith("/images")) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("images")) {
    return `/${cleanUrl}`;
  }

  return cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`;
}

const tabs = [
  { id: "hero", label: "Hero", description: "Banner principal" },
  { id: "about", label: "Sobre", description: "Texto institucional" },
  { id: "services", label: "Serviços", description: "Cabeçalho da atuação" },
  { id: "method", label: "Método", description: "Método Construtor" },
  { id: "markets", label: "Mercados", description: "Angola e Brasil" },
  { id: "team", label: "Time", description: "Quem constrói" },
  { id: "clients", label: "Clientes", description: "Empresas e organizações" },
  { id: "testimonials", label: "Depoimentos", description: "Prova social" },
  { id: "manifesto", label: "Manifesto", description: "Citação institucional" },
  { id: "contact", label: "Contato", description: "Formulário e chamada" },
];

const emptyContent = {
  hero: {
    supertag: "",
    headline: "",
    subheadline: "",
    primaryCta: "",
    secondaryCta: "",
    backgroundImage: "",
  },
  about: {
    label: "",
    title: "",
    paragraphs: [],
    highlight: "",
  },
  services: {
    label: "",
    title: "",
    description: "",
  },
  method: {
    label: "",
    title: "",
    description: "",
    items: [],
    quote: "",
  },
  markets: {
    label: "",
    title: "",
    description: "",
    items: [],
  },
  team: clone(officialTeamContent),
  clients: {
    label: "",
    title: "",
    description: "",
    items: [],
  },
  testimonials: {
    label: "",
    title: "",
    items: [],
  },
  manifesto: {
    quote: "",
    author: "",
    role: "",
  },
  contact: {
    label: "",
    title: "",
    description: "",
    highlight: "",
    services: [],
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getByPath(object, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc === undefined || acc === null) return "";
    return acc[key];
  }, object);
}

function setByPath(object, path, value) {
  const keys = path.split(".");
  const next = clone(object);
  let current = next;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
      return;
    }

    if (!current[key]) {
      current[key] = {};
    }

    current = current[key];
  });

  return next;
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  textarea = false,
  rows = 4,
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>

      {textarea ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/45 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#D4AF37]"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/45 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#D4AF37]"
        />
      )}
    </label>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-zinc-950/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  );
}

function UploadField({ label, value, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const url = await onUpload(file);
      onChange(url);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  const previewUrl = resolveAdminMediaUrl(value);

  return (
    <div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>

      <div className="mt-2 grid gap-3 rounded-xl border border-white/10 bg-black/35 p-3 md:grid-cols-[1fr_auto] md:items-center">
        <input
          type="text"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/uploads/site/imagem.png"
          className="w-full rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#D4AF37]"
        />

        <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#D4AF37]/50 px-5 py-3 text-xs font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black">
          {uploading ? "Enviando..." : "Enviar imagem"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {previewUrl && (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <img
            src={previewUrl}
            alt={label}
            className="max-h-60 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

function ArrayEditor({
  title,
  items,
  onChange,
  createItem,
  renderItem,
  addLabel = "Adicionar item",
}) {
  function updateItem(index, nextItem) {
    const nextItems = [...(items || [])];
    nextItems[index] = nextItem;
    onChange(nextItems);
  }

  function removeItem(index) {
    const confirmed = window.confirm("Deseja remover este item?");
    if (!confirmed) return;

    onChange((items || []).filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-4">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
        <h3 className="text-base font-semibold text-white">{title}</h3>

        <button
          type="button"
          onClick={() => onChange([...(items || []), createItem()])}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
        >
          {addLabel}
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {(items || []).map((item, index) => (
          <div
            key={index}
            className="rounded-[1.25rem] border border-white/10 bg-zinc-950/80 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Item {index + 1}
              </p>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-full border border-red-500/30 px-3 py-2 text-[11px] font-semibold text-red-200 transition hover:bg-red-500/10"
              >
                Remover
              </button>
            </div>

            {renderItem(item, (nextItem) => updateItem(index, nextItem), index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminSiteContent() {
  const [activeTab, setActiveTab] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [content, setContent] = useState(emptyContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeTabInfo = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTab) || tabs[0];
  }, [activeTab]);

  async function fetchContent() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/site-content`);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Não foi possível carregar o conteúdo do site.");
        return;
      }

      setContent({
        ...clone(emptyContent),
        ...(data.content || {}),
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Erro de conexão com a API. Confirme se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/site-content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setErrorMessage("Não foi possível salvar o conteúdo.");
        return;
      }

      setContent({
        ...clone(emptyContent),
        ...(data.content || {}),
      });

      setMessage("Conteúdo salvo com sucesso.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro de conexão ao salvar conteúdo.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/site-content/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      setErrorMessage("Não foi possível enviar a imagem.");
      throw new Error("Upload failed");
    }

    setMessage("Imagem enviada com sucesso.");
    return data.url;
  }

  function update(path, value) {
    setContent((previous) => setByPath(previous, path, value));
  }

  function value(path) {
    return getByPath(content, path);
  }

  function handleSelectTab(tabId) {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("tria_admin_auth");
    window.location.href = "/admin/login";
  }

  function loadOfficialTeam() {
    const confirmed = window.confirm(
      "Deseja carregar o time oficial da TRIA? Isso vai substituir os membros atuais da aba Time antes de salvar."
    );

    if (!confirmed) return;

    update("team", clone(officialTeamContent));
    setMessage(
      "Time oficial carregado. Clique em Salvar alterações para gravar no CMS."
    );
    setErrorMessage("");
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{
        backgroundImage: "url('/images/hero-tria.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="fixed inset-0 bg-black/85" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black" />

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu lateral"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 flex flex-col border-r border-white/10 bg-zinc-950/95 shadow-[30px_0_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "lg:w-64" : "lg:w-20"
        } ${
          mobileSidebarOpen
            ? "w-72 translate-x-0"
            : "w-72 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className={`${sidebarOpen ? "lg:block" : "lg:hidden"}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              TRIA
            </p>
            <h2 className="mt-1 text-base font-semibold text-white">
              Central CMS
            </h2>
          </div>

          <div
            className={`hidden h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-sm font-black text-[#D4AF37] ${
              sidebarOpen ? "lg:hidden" : "lg:flex"
            }`}
          >
            T
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((previous) => !previous)}
            className="hidden rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] lg:block"
          >
            {sidebarOpen ? "←" : "→"}
          </button>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className={`${sidebarOpen ? "lg:block" : "lg:hidden"} mb-3 px-2`}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              Abas do site
            </p>
          </div>

          <nav className="grid gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-[#D4AF37]/50 bg-[#D4AF37] text-black"
                      : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                      isActive
                        ? "bg-black text-[#D4AF37]"
                        : "bg-black/60 text-zinc-500 group-hover:text-[#D4AF37]"
                    }`}
                  >
                    {tab.label.slice(0, 1)}
                  </span>

                  <span className={`${sidebarOpen ? "lg:block" : "lg:hidden"}`}>
                    <span className="block text-xs font-semibold">
                      {tab.label}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] ${
                        isActive ? "text-black/65" : "text-zinc-600"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className={`grid gap-2 ${sidebarOpen ? "lg:block" : "lg:hidden"}`}>
            <a
              href="/admin/leads"
              className="block rounded-xl border border-white/10 px-3 py-3 text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              Ver leads
            </a>

            <a
              href="/"
              className="mt-2 block rounded-xl border border-white/10 px-3 py-3 text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              Ver landing
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 w-full rounded-xl border border-red-500/20 px-3 py-3 text-left text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
            >
              Sair
            </button>
          </div>

          <div
            className={`hidden gap-2 ${sidebarOpen ? "lg:hidden" : "lg:grid"}`}
          >
            <a
              href="/admin/leads"
              title="Leads"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xs font-bold text-zinc-400 transition hover:text-white"
            >
              L
            </a>

            <a
              href="/"
              title="Landing"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xs font-bold text-zinc-400 transition hover:text-white"
            >
              ↗
            </a>

            <button
              type="button"
              title="Sair"
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 text-xs font-bold text-red-200 transition hover:bg-red-500/10"
            >
              S
            </button>
          </div>
        </div>
      </aside>

      <div
        className={`relative z-10 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <div className="px-4 py-4 md:px-6 lg:px-7">
          <div className="mx-auto max-w-6xl">
            <header className="rounded-[1.5rem] border border-white/10 bg-zinc-950/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileSidebarOpen(true)}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] lg:hidden"
                    >
                      Menu
                    </button>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                      Central de Conteúdo TRIA
                    </p>
                  </div>

                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    Conteúdo do site
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm text-zinc-400">
                    Edite textos, imagens, time, clientes, depoimentos e blocos
                    institucionais da landing page da TRIA.
                  </p>

                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs text-zinc-400">
                    Aba atual:{" "}
                    <span className="ml-2 font-semibold text-[#D4AF37]">
                      {activeTabInfo.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={fetchContent}
                    className="rounded-full border border-white/15 px-5 py-3 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
                  >
                    Recarregar
                  </button>

                  <button
                    onClick={saveContent}
                    disabled={saving || loading}
                    className="rounded-full bg-[#D4AF37] px-5 py-3 text-xs font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Salvando..." : "Salvar alterações"}
                  </button>
                </div>
              </div>
            </header>

            {message && (
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-200 backdrop-blur">
                {message}
              </div>
            )}

            {errorMessage && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-200 backdrop-blur">
                {errorMessage}
              </div>
            )}

            {loading ? (
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/85 p-6 text-sm text-zinc-400 backdrop-blur-xl">
                Carregando conteúdo...
              </div>
            ) : (
              <div className="mt-6 pb-12">
                {activeTab === "hero" && (
                  <SectionCard
                    title="Hero"
                    description="Conteúdo principal do primeiro bloco da landing page."
                  >
                    <Field
                      label="Supertag"
                      value={value("hero.supertag")}
                      onChange={(nextValue) =>
                        update("hero.supertag", nextValue)
                      }
                    />

                    <Field
                      label="Headline"
                      value={value("hero.headline")}
                      onChange={(nextValue) =>
                        update("hero.headline", nextValue)
                      }
                      textarea
                      rows={3}
                    />

                    <Field
                      label="Subheadline"
                      value={value("hero.subheadline")}
                      onChange={(nextValue) =>
                        update("hero.subheadline", nextValue)
                      }
                      textarea
                      rows={3}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="CTA Primário"
                        value={value("hero.primaryCta")}
                        onChange={(nextValue) =>
                          update("hero.primaryCta", nextValue)
                        }
                      />

                      <Field
                        label="CTA Secundário"
                        value={value("hero.secondaryCta")}
                        onChange={(nextValue) =>
                          update("hero.secondaryCta", nextValue)
                        }
                      />
                    </div>

                    <UploadField
                      label="Imagem de fundo do Hero"
                      value={value("hero.backgroundImage")}
                      onChange={(nextValue) =>
                        update("hero.backgroundImage", nextValue)
                      }
                      onUpload={uploadImage}
                    />
                  </SectionCard>
                )}

                {activeTab === "about" && (
                  <SectionCard
                    title="Sobre a TRIA"
                    description="Texto institucional que explica a origem e o posicionamento da TRIA."
                  >
                    <Field
                      label="Label"
                      value={value("about.label")}
                      onChange={(nextValue) => update("about.label", nextValue)}
                    />

                    <Field
                      label="Título"
                      value={value("about.title")}
                      onChange={(nextValue) => update("about.title", nextValue)}
                      textarea
                      rows={3}
                    />

                    <ArrayEditor
                      title="Parágrafos"
                      items={value("about.paragraphs") || []}
                      onChange={(items) => update("about.paragraphs", items)}
                      createItem={() => ""}
                      addLabel="Adicionar parágrafo"
                      renderItem={(item, onChange) => (
                        <Field
                          label="Texto do parágrafo"
                          value={item}
                          onChange={onChange}
                          textarea
                          rows={4}
                        />
                      )}
                    />

                    <Field
                      label="Destaque"
                      value={value("about.highlight")}
                      onChange={(nextValue) =>
                        update("about.highlight", nextValue)
                      }
                      textarea
                      rows={3}
                    />
                  </SectionCard>
                )}

                {activeTab === "services" && (
                  <SectionCard
                    title="Cabeçalho da seção Serviços"
                    description="Controla o texto principal da seção de áreas de atuação."
                  >
                    <Field
                      label="Label"
                      value={value("services.label")}
                      onChange={(nextValue) =>
                        update("services.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("services.title")}
                      onChange={(nextValue) =>
                        update("services.title", nextValue)
                      }
                      textarea
                      rows={2}
                    />

                    <Field
                      label="Descrição"
                      value={value("services.description")}
                      onChange={(nextValue) =>
                        update("services.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-4 text-sm leading-7 text-zinc-300">
                      Os cards dos serviços ficam em endpoint próprio:
                      <strong className="text-white"> /api/v1/services</strong>.
                      Esta aba controla apenas o cabeçalho da seção.
                    </div>
                  </SectionCard>
                )}

                {activeTab === "method" && (
                  <SectionCard
                    title="Método TRIA"
                    description="Cinco atos do Método Construtor."
                  >
                    <Field
                      label="Label"
                      value={value("method.label")}
                      onChange={(nextValue) =>
                        update("method.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("method.title")}
                      onChange={(nextValue) =>
                        update("method.title", nextValue)
                      }
                      textarea
                      rows={3}
                    />

                    <Field
                      label="Descrição"
                      value={value("method.description")}
                      onChange={(nextValue) =>
                        update("method.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <ArrayEditor
                      title="Atos do método"
                      items={value("method.items") || []}
                      onChange={(items) => update("method.items", items)}
                      createItem={() => ({
                        number: "",
                        title: "",
                        description: "",
                      })}
                      renderItem={(item, onChange) => (
                        <div className="grid gap-4">
                          <Field
                            label="Número"
                            value={item.number}
                            onChange={(nextValue) =>
                              onChange({ ...item, number: nextValue })
                            }
                          />

                          <Field
                            label="Título"
                            value={item.title}
                            onChange={(nextValue) =>
                              onChange({ ...item, title: nextValue })
                            }
                          />

                          <Field
                            label="Descrição"
                            value={item.description}
                            onChange={(nextValue) =>
                              onChange({ ...item, description: nextValue })
                            }
                            textarea
                            rows={4}
                          />
                        </div>
                      )}
                    />

                    <Field
                      label="Citação"
                      value={value("method.quote")}
                      onChange={(nextValue) => update("method.quote", nextValue)}
                      textarea
                      rows={3}
                    />
                  </SectionCard>
                )}

                {activeTab === "markets" && (
                  <SectionCard
                    title="Onde atuamos"
                    description="Mercados estratégicos da TRIA."
                  >
                    <Field
                      label="Label"
                      value={value("markets.label")}
                      onChange={(nextValue) =>
                        update("markets.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("markets.title")}
                      onChange={(nextValue) =>
                        update("markets.title", nextValue)
                      }
                      textarea
                      rows={2}
                    />

                    <Field
                      label="Descrição"
                      value={value("markets.description")}
                      onChange={(nextValue) =>
                        update("markets.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <ArrayEditor
                      title="Mercados"
                      items={value("markets.items") || []}
                      onChange={(items) => update("markets.items", items)}
                      createItem={() => ({
                        number: "",
                        title: "",
                        description: "",
                      })}
                      renderItem={(item, onChange) => (
                        <div className="grid gap-4">
                          <Field
                            label="Número"
                            value={item.number}
                            onChange={(nextValue) =>
                              onChange({ ...item, number: nextValue })
                            }
                          />

                          <Field
                            label="Título"
                            value={item.title}
                            onChange={(nextValue) =>
                              onChange({ ...item, title: nextValue })
                            }
                          />

                          <Field
                            label="Descrição"
                            value={item.description}
                            onChange={(nextValue) =>
                              onChange({ ...item, description: nextValue })
                            }
                            textarea
                            rows={4}
                          />
                        </div>
                      )}
                    />
                  </SectionCard>
                )}

                {activeTab === "team" && (
                  <SectionCard
                    title="Time"
                    description="Membros da equipe e suas apresentações institucionais."
                  >
                    <Field
                      label="Label"
                      value={value("team.label")}
                      onChange={(nextValue) => update("team.label", nextValue)}
                    />

                    <Field
                      label="Título"
                      value={value("team.title")}
                      onChange={(nextValue) => update("team.title", nextValue)}
                      textarea
                      rows={2}
                    />

                    <Field
                      label="Descrição"
                      value={value("team.description")}
                      onChange={(nextValue) =>
                        update("team.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Time oficial da TRIA
                          </p>

                          <p className="mt-1 text-sm leading-6 text-zinc-400">
                            Preenche automaticamente Tomás Camba, Gustavo
                            Ipolito Jr. e Wilson Dos Santos Kahango Dala com
                            cargos, bios e imagens oficiais.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={loadOfficialTeam}
                          className="rounded-full bg-[#D4AF37] px-5 py-3 text-xs font-semibold text-black transition hover:bg-white"
                        >
                          Carregar time oficial
                        </button>
                      </div>
                    </div>

                    <ArrayEditor
                      title="Membros"
                      items={value("team.items") || []}
                      onChange={(items) => update("team.items", items)}
                      createItem={() => ({
                        name: "",
                        role: "",
                        location: "",
                        image: "",
                        bio: "",
                      })}
                      renderItem={(item, onChange) => (
                        <div className="grid gap-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            <Field
                              label="Nome"
                              value={item.name}
                              onChange={(nextValue) =>
                                onChange({ ...item, name: nextValue })
                              }
                            />

                            <Field
                              label="Cargo"
                              value={item.role}
                              onChange={(nextValue) =>
                                onChange({ ...item, role: nextValue })
                              }
                            />

                            <Field
                              label="Localização"
                              value={item.location}
                              onChange={(nextValue) =>
                                onChange({ ...item, location: nextValue })
                              }
                            />
                          </div>

                          <UploadField
                            label="Foto"
                            value={item.image}
                            onChange={(nextValue) =>
                              onChange({ ...item, image: nextValue })
                            }
                            onUpload={uploadImage}
                          />

                          <Field
                            label="Bio"
                            value={item.bio}
                            onChange={(nextValue) =>
                              onChange({ ...item, bio: nextValue })
                            }
                            textarea
                            rows={5}
                          />
                        </div>
                      )}
                    />
                  </SectionCard>
                )}

                {activeTab === "clients" && (
                  <SectionCard
                    title="Clientes e organizações"
                    description="Empresas, instituições e organizações atendidas ou parceiras."
                  >
                    <Field
                      label="Label"
                      value={value("clients.label")}
                      onChange={(nextValue) =>
                        update("clients.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("clients.title")}
                      onChange={(nextValue) =>
                        update("clients.title", nextValue)
                      }
                      textarea
                      rows={2}
                    />

                    <Field
                      label="Descrição"
                      value={value("clients.description")}
                      onChange={(nextValue) =>
                        update("clients.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <ArrayEditor
                      title="Clientes"
                      items={value("clients.items") || []}
                      onChange={(items) => update("clients.items", items)}
                      createItem={() => ({
                        name: "",
                        sector: "",
                        country: "",
                        logo: "",
                        description: "",
                      })}
                      renderItem={(item, onChange) => (
                        <div className="grid gap-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            <Field
                              label="Nome"
                              value={item.name}
                              onChange={(nextValue) =>
                                onChange({ ...item, name: nextValue })
                              }
                            />

                            <Field
                              label="Setor"
                              value={item.sector}
                              onChange={(nextValue) =>
                                onChange({ ...item, sector: nextValue })
                              }
                            />

                            <Field
                              label="País"
                              value={item.country}
                              onChange={(nextValue) =>
                                onChange({ ...item, country: nextValue })
                              }
                            />
                          </div>

                          <UploadField
                            label="Logo"
                            value={item.logo}
                            onChange={(nextValue) =>
                              onChange({ ...item, logo: nextValue })
                            }
                            onUpload={uploadImage}
                          />

                          <Field
                            label="Descrição"
                            value={item.description}
                            onChange={(nextValue) =>
                              onChange({ ...item, description: nextValue })
                            }
                            textarea
                            rows={4}
                          />
                        </div>
                      )}
                    />
                  </SectionCard>
                )}

                {activeTab === "testimonials" && (
                  <SectionCard
                    title="Depoimentos"
                    description="Depoimentos assinados por nome, cargo, organização e país."
                  >
                    <Field
                      label="Label"
                      value={value("testimonials.label")}
                      onChange={(nextValue) =>
                        update("testimonials.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("testimonials.title")}
                      onChange={(nextValue) =>
                        update("testimonials.title", nextValue)
                      }
                      textarea
                      rows={2}
                    />

                    <ArrayEditor
                      title="Depoimentos"
                      items={value("testimonials.items") || []}
                      onChange={(items) => update("testimonials.items", items)}
                      createItem={() => ({
                        text: "",
                        name: "",
                        role: "",
                        organization: "",
                        country: "",
                      })}
                      renderItem={(item, onChange) => (
                        <div className="grid gap-4">
                          <Field
                            label="Texto"
                            value={item.text}
                            onChange={(nextValue) =>
                              onChange({ ...item, text: nextValue })
                            }
                            textarea
                            rows={5}
                          />

                          <div className="grid gap-4 md:grid-cols-4">
                            <Field
                              label="Nome completo"
                              value={item.name}
                              onChange={(nextValue) =>
                                onChange({ ...item, name: nextValue })
                              }
                            />

                            <Field
                              label="Cargo"
                              value={item.role}
                              onChange={(nextValue) =>
                                onChange({ ...item, role: nextValue })
                              }
                            />

                            <Field
                              label="Organização"
                              value={item.organization}
                              onChange={(nextValue) =>
                                onChange({
                                  ...item,
                                  organization: nextValue,
                                })
                              }
                            />

                            <Field
                              label="País"
                              value={item.country}
                              onChange={(nextValue) =>
                                onChange({ ...item, country: nextValue })
                              }
                            />
                          </div>
                        </div>
                      )}
                    />
                  </SectionCard>
                )}

                {activeTab === "manifesto" && (
                  <SectionCard
                    title="Manifesto"
                    description="Citação institucional da TRIA."
                  >
                    <Field
                      label="Citação"
                      value={value("manifesto.quote")}
                      onChange={(nextValue) =>
                        update("manifesto.quote", nextValue)
                      }
                      textarea
                      rows={6}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Autor"
                        value={value("manifesto.author")}
                        onChange={(nextValue) =>
                          update("manifesto.author", nextValue)
                        }
                      />

                      <Field
                        label="Cargo"
                        value={value("manifesto.role")}
                        onChange={(nextValue) =>
                          update("manifesto.role", nextValue)
                        }
                      />
                    </div>
                  </SectionCard>
                )}

                {activeTab === "contact" && (
                  <SectionCard
                    title="Contato"
                    description="Texto da seção de contato e opções do formulário."
                  >
                    <Field
                      label="Label"
                      value={value("contact.label")}
                      onChange={(nextValue) =>
                        update("contact.label", nextValue)
                      }
                    />

                    <Field
                      label="Título"
                      value={value("contact.title")}
                      onChange={(nextValue) =>
                        update("contact.title", nextValue)
                      }
                      textarea
                      rows={2}
                    />

                    <Field
                      label="Descrição"
                      value={value("contact.description")}
                      onChange={(nextValue) =>
                        update("contact.description", nextValue)
                      }
                      textarea
                      rows={4}
                    />

                    <Field
                      label="Bloco de destaque"
                      value={value("contact.highlight")}
                      onChange={(nextValue) =>
                        update("contact.highlight", nextValue)
                      }
                      textarea
                      rows={3}
                    />

                    <ArrayEditor
                      title="Serviços de interesse no formulário"
                      items={value("contact.services") || []}
                      onChange={(items) => update("contact.services", items)}
                      createItem={() => ""}
                      addLabel="Adicionar opção"
                      renderItem={(item, onChange) => (
                        <Field label="Opção" value={item} onChange={onChange} />
                      )}
                    />
                  </SectionCard>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}