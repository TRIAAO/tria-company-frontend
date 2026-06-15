const statusOptions = [
  { value: "NEW", label: "Novo" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "IN_PROGRESS", label: "Em negociação" },
  { value: "CONVERTED", label: "Convertido" },
  { value: "ARCHIVED", label: "Arquivado" },
];

const statusStyles = {
  NEW: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  CONTACTED: "bg-yellow-500/15 text-yellow-300 border-yellow-400/20",
  IN_PROGRESS: "bg-purple-500/15 text-purple-300 border-purple-400/20",
  CONVERTED: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  ARCHIVED: "bg-zinc-500/15 text-zinc-300 border-zinc-400/20",
};

function formatDate(dateValue) {
  if (!dateValue) return "Data não disponível";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

function cleanPhone(phone) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

export default function LeadCard({
  lead,
  onStatusChange,
  onDelete,
  updating,
  deleting,
}) {
  const phoneNumber = cleanPhone(lead.phone);

  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        `Olá ${lead.name}, tudo bem? Recebemos seu contato pela landing page da TRIA Company e gostaríamos de conversar melhor sobre sua necessidade.`
      )}`
    : "";

  const emailUrl = lead.email
    ? `mailto:${lead.email}?subject=${encodeURIComponent(
        "Contato recebido - TRIA Company"
      )}&body=${encodeURIComponent(
        `Olá ${lead.name}, tudo bem?\n\nRecebemos seu contato pela landing page da TRIA Company.\n\nGostaríamos de entender melhor sua necessidade e conversar sobre o projeto.\n\nAtenciosamente,\nTRIA Company`
      )}`
    : "";

  return (
    <article className="rounded-[2rem] border border-white/10 bg-zinc-900/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${statusStyles[lead.status] || "bg-zinc-500/15 text-zinc-300 border-zinc-400/20"}`}
          >
            {lead.status}
          </span>

          <h3 className="mt-5 text-2xl font-semibold text-white md:text-3xl">
            {lead.name}
          </h3>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
            {lead.company || "Empresa não informada"}
          </p>
        </div>

        <div className="text-sm text-zinc-400">
          Recebido em {formatDate(lead.created_at)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            E-mail
          </p>
          <p className="mt-2 break-all font-medium text-white">{lead.email}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            WhatsApp
          </p>
          <p className="mt-2 font-medium text-white">
            {lead.phone || "Não informado"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Serviço de interesse
          </p>
          <p className="mt-2 font-medium text-white">
            {lead.service_interest || "Não informado"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Origem
          </p>
          <p className="mt-2 font-medium text-white">
            {lead.source || "Não informado"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Mensagem
        </p>
        <p className="mt-3 leading-relaxed text-zinc-300">
          {lead.message || "Sem mensagem"}
        </p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
        <div>
          <label className="text-sm font-medium text-zinc-300">
            Atualizar status
          </label>

          <select
            value={lead.status}
            disabled={updating}
            onChange={(event) => onStatusChange(lead.id, event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 md:max-w-xs"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          {phoneNumber && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              WhatsApp
            </a>
          )}

          {lead.email && (
            <a
              href={emailUrl}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              E-mail
            </a>
          )}

          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete(lead.id)}
            className="rounded-full border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Removendo..." : "Remover"}
          </button>
        </div>
      </div>
    </article>
  );
}