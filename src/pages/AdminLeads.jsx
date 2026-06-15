import { useEffect, useMemo, useState } from "react";
import LeadCard from "../components/LeadCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

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

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white"
      style={{
        backgroundImage: "url('/images/hero-tria.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <a
                href="/"
                className="text-sm font-medium text-zinc-500 transition hover:text-white"
              >
                ← Voltar para landing
              </a>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                Painel interno
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Leads recebidos
              </h1>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Área interna da TRIA Company para acompanhar, organizar e
                converter os contatos enviados pela landing page.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchLeads}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Atualizar lista
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("tria_admin_auth");
                  window.location.href = "/admin/login";
                }}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
              >
                Sair
              </button>
            </div>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div
              className={`rounded-[1.5rem] border p-5 ${statCardStyles.total}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Total
              </p>
              <p className="mt-3 text-3xl font-semibold">{leadStats.total}</p>
            </div>

            {Object.entries(statusLabels).map(([status, label]) => (
              <div
                key={status}
                className={`rounded-[1.5rem] border p-5 ${statCardStyles[status]}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                  {label}
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {leadStats[status]}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/45 p-5 backdrop-blur">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_auto] lg:items-end">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Buscar lead
                </label>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar por nome, empresa, e-mail, WhatsApp, serviço ou mensagem..."
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/90 px-5 py-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Filtrar por status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/90 px-5 py-4 text-sm text-white outline-none transition focus:border-white/30"
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
                className="rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Limpar filtros
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Mostrando{" "}
                <span className="font-semibold text-white">
                  {filteredLeads.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-white">{leads.length}</span>{" "}
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
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200 backdrop-blur">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-zinc-950/85 p-8 text-zinc-400 backdrop-blur-xl">
            Carregando leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-zinc-950/85 p-8 text-zinc-400 backdrop-blur-xl">
            Nenhum lead encontrado com os filtros aplicados.
          </div>
        ) : (
          <section className="mt-10 grid gap-6">
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
    </main>
  );
}