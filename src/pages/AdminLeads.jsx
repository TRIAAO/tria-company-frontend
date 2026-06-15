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

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingLeadId, setUpdatingLeadId] = useState(null);
    const [deletingLeadId, setDeletingLeadId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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

            setLeads(data);
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro de conexão com a API. Confirme se o backend está rodando.");
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

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <main className="min-h-screen bg-zinc-100 px-6 py-10 text-black">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-col gap-6 border-b border-zinc-300 pb-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <a
                            href="/"
                            className="text-sm font-medium text-zinc-500 transition hover:text-black"
                        >
                            ← Voltar para landing
                        </a>

                        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                            Painel interno
                        </p>

                        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                            Leads recebidos
                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-600">
                            Área simples para acompanhar os contatos enviados pela landing page
                            da TRIA Company.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={fetchLeads}
                            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                        >
                            Atualizar lista
                        </button>

                        <button
                            onClick={() => {
                                localStorage.removeItem("tria_admin_auth");
                                window.location.href = "/admin/login";
                            }}
                            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
                        >
                            Sair
                        </button>
                    </div>
                </header>

                <section className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-3xl bg-black p-5 text-white">
                        <p className="text-sm text-zinc-400">Total</p>
                        <p className="mt-2 text-3xl font-semibold">{leadStats.total}</p>
                    </div>

                    {Object.entries(statusLabels).map(([status, label]) => (
                        <div key={status} className="rounded-3xl bg-white p-5 shadow-sm">
                            <p className="text-sm text-zinc-500">{label}</p>
                            <p className="mt-2 text-3xl font-semibold text-black">
                                {leadStats[status]}
                            </p>
                        </div>
                    ))}
                </section>

                {errorMessage && (
                    <div className="mt-8 rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">
                        {errorMessage}
                    </div>
                )}

                {loading ? (
                    <div className="mt-12 rounded-[2rem] bg-white p-8 text-zinc-500">
                        Carregando leads...
                    </div>
                ) : leads.length === 0 ? (
                    <div className="mt-12 rounded-[2rem] bg-white p-8 text-zinc-500">
                        Nenhum lead recebido ainda.
                    </div>
                ) : (
                    <section className="mt-12 grid gap-6">
                        {leads.map((lead) => (
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