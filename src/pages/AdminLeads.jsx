import { useEffect, useMemo, useState } from "react";
import LeadCard from "../components/LeadCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const sidebarItems = [
  {
    id: "leads",
    label: "Leads",
    description: "Contatos recebidos",
    href: "/admin/leads",
    active: true,
  },
  {
    id: "content",
    label: "Conteúdo",
    description: "CMS do site",
    href: "/admin/content",
    active: false,
  },
  {
    id: "landing",
    label: "Landing",
    description: "Ver site público",
    href: "/",
    active: false,
  },
];

const statusLabels = {
  NEW: "Novos",
  CONTACTED: "Contactados",
  IN_PROGRESS: "Em negociação",
  CONVERTED: "Convertidos",
  ARCHIVED: "Arquivados",
};

const statusFilterOptions = [
  { value: "ALL", label: "Todos os status" },
  { value: "NEW", label: "Novos" },
  { value: "CONTACTED", label: "Contactados" },
  { value: "IN_PROGRESS", label: "Em negociação" },
  { value: "CONVERTED", label: "Convertidos" },
  { value: "ARCHIVED", label: "Arquivados" },
];

const statCardStyles = {
  total: "bg-white text-black border-white",
  NEW: "bg-blue-500/10 text-blue-200 border-blue-400/20",
  CONTACTED: "bg-yellow-500/10 text-yellow-200 border-yellow-400/20",
  IN_PROGRESS: "bg-purple-500/10 text-purple-200 border-purple-400/20",
  CONVERTED: "bg-emerald-500/10 text-emerald-200 border-emerald-400/20",
  ARCHIVED: "bg-zinc-500/10 text-zinc-200 border-zinc-400/20",
};

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingLeadId, setUpdatingLeadId] = useState(null);
  const [deletingLeadId, setDeletingLeadId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const leadStats = useMemo(() => {
    const stats = {
      total: leads.length,
      NEW: 0,
      CONTACTED: 0,
      IN_PROGRESS: 0,
      CONVERTED: 0,
      ARCHIVED: 0,
    };

    leads.forEach((lead) => {
      if (stats[lead.status] !== undefined) {
        stats[lead.status] += 1;
      }
    });

    return stats;
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return leads.filter((lead) => {
      const matchesStatus =
        selectedStatus === "ALL" || lead.status === selectedStatus;

      const searchableContent = normalizeText(
        [
          lead.name,
          lead.company,
          lead.email,
          lead.phone,
          lead.service_interest,
          lead.message,
          lead.source,
          lead.status,
        ].join(" ")
      );

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [leads, searchTerm, selectedStatus]);

  const hasActiveFilters = searchTerm.trim() !== "" || selectedStatus !== "ALL";

  async function fetchLeads() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads`);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Não foi possível carregar os leads.");
        return;
      }

      const sortedLeads = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setLeads(sortedLeads);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Erro de conexão com a API. Confirme se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(leadId, newStatus) {
    setUpdatingLeadId(leadId);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads/${leadId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setErrorMessage("Não foi possível atualizar o status do lead.");
        return;
      }

      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === leadId ? data : lead))
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro de conexão ao atualizar status.");
    } finally {
      setUpdatingLeadId(null);
    }
  }

  async function handleDeleteLead(leadId) {
    const confirmed = window.confirm(
      "Tem certeza que deseja remover este lead? Essa ação não pode ser desfeita."
    );

    if (!confirmed) return;

    setDeletingLeadId(leadId);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads/${leadId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setErrorMessage("Não foi possível remover o lead.");
        return;
      }

      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro de conexão ao remover lead.");
    } finally {
      setDeletingLeadId(null);
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedStatus("ALL");
  }

  function handleLogout() {
    localStorage.removeItem("tria_admin_auth");
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    fetchLeads();
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
      <div className="fixed inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />

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
              Painel interno
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
              Administração
            </p>
          </div>

          <nav className="grid gap-2">
            {sidebarItems.map((item) => {
              const isActive = item.active;

              return (
                <a
                  key={item.id}
                  href={item.href}
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
                    {item.label.slice(0, 1)}
                  </span>

                  <span className={`${sidebarOpen ? "lg:block" : "lg:hidden"}`}>
                    <span className="block text-xs font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] ${
                        isActive ? "text-black/65" : "text-zinc-600"
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>

          <div
            className={`mt-6 rounded-xl border border-white/10 bg-black/35 p-4 ${
              sidebarOpen ? "lg:block" : "lg:hidden"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
              Resumo
            </p>

            <div className="mt-4 grid gap-3 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Total</span>
                <strong className="text-white">{leadStats.total}</strong>
              </div>

              <div className="flex items-center justify-between text-zinc-400">
                <span>Novos</span>
                <strong className="text-blue-200">{leadStats.NEW}</strong>
              </div>

              <div className="flex items-center justify-between text-zinc-400">
                <span>Convertidos</span>
                <strong className="text-emerald-200">
                  {leadStats.CONVERTED}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className={`grid gap-2 ${sidebarOpen ? "lg:block" : "lg:hidden"}`}>
            <button
              type="button"
              onClick={fetchLeads}
              className="w-full rounded-xl border border-white/10 px-3 py-3 text-left text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              Atualizar leads
            </button>

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
            <button
              type="button"
              onClick={fetchLeads}
              title="Atualizar"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xs font-bold text-zinc-400 transition hover:text-white"
            >
              ↻
            </button>

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
                      Painel interno
                    </p>
                  </div>

                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    Leads recebidos
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm text-zinc-400">
                    Acompanhe, organize e converta os contatos enviados pela
                    landing page da TRIA Company.
                  </p>

                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs text-zinc-400">
                    Mostrando{" "}
                    <span className="mx-2 font-semibold text-[#D4AF37]">
                      {filteredLeads.length}
                    </span>
                    de{" "}
                    <span className="ml-2 font-semibold text-white">
                      {leads.length}
                    </span>{" "}
                    leads
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/admin/content"
                    className="rounded-full border border-[#D4AF37]/60 px-5 py-3 text-xs font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
                  >
                    Conteúdo do site
                  </a>

                  <button
                    onClick={fetchLeads}
                    className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-zinc-200"
                  >
                    Atualizar lista
                  </button>
                </div>
              </div>

              <section className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                <div
                  className={`rounded-xl border p-4 ${statCardStyles.total}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {leadStats.total}
                  </p>
                </div>

                {Object.entries(statusLabels).map(([status, label]) => (
                  <div
                    key={status}
                    className={`rounded-xl border p-4 ${statCardStyles[status]}`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-80">
                      {label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {leadStats[status]}
                    </p>
                  </div>
                ))}
              </section>

              <section className="mt-6 rounded-xl border border-white/10 bg-black/45 p-4 backdrop-blur">
                <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_auto] xl:items-end">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                      Buscar lead
                    </label>

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Buscar por nome, empresa, e-mail, WhatsApp, serviço ou mensagem..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                      Filtrar por status
                    </label>

                    <select
                      value={selectedStatus}
                      onChange={(event) => setSelectedStatus(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4AF37]"
                    >
                      {statusFilterOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="rounded-full border border-white/15 px-5 py-3 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Limpar filtros
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    Mostrando{" "}
                    <span className="font-semibold text-white">
                      {filteredLeads.length}
                    </span>{" "}
                    de{" "}
                    <span className="font-semibold text-white">
                      {leads.length}
                    </span>{" "}
                    leads.
                  </p>

                  {hasActiveFilters && (
                    <p>
                      Filtros ativos:{" "}
                      <span className="text-zinc-300">
                        {selectedStatus !== "ALL"
                          ? statusLabels[selectedStatus] || selectedStatus
                          : "Todos os status"}
                        {searchTerm.trim() ? ` • Busca: "${searchTerm}"` : ""}
                      </span>
                    </p>
                  )}
                </div>
              </section>
            </header>

            {errorMessage && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-200 backdrop-blur">
                {errorMessage}
              </div>
            )}

            {loading ? (
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/85 p-6 text-sm text-zinc-400 backdrop-blur-xl">
                Carregando leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/85 p-6 text-sm text-zinc-400 backdrop-blur-xl">
                Nenhum lead encontrado com os filtros aplicados.
              </div>
            ) : (
              <section className="mt-6 grid gap-4 pb-12">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    updating={updatingLeadId === lead.id}
                    deleting={deletingLeadId === lead.id}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteLead}
                  />
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}