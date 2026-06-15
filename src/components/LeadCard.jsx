const statusOptions = [
  { value: "NEW", label: "Novo" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "IN_PROGRESS", label: "Em negociação" },
  { value: "CONVERTED", label: "Convertido" },
  { value: "ARCHIVED", label: "Arquivado" },
];

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
        `Olá ${lead.name}, tudo bem? Recebemos seu contato pela landing page da TRIA Company e gostaríamos de entender melhor sua necessidade.`
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
    <article className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {lead.status}
          </span>

          <h3 className="mt-5 text-2xl font-semibold text-black">
            {lead.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {lead.company || "Empresa não informada"}
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          Recebido em {formatDate(lead.created_at)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
        <div>
          <p className="text-zinc-400">E-mail</p>
          <p className="font-medium text-black">{lead.email}</p>
        </div>

        <div>
          <p className="text-zinc-400">WhatsApp</p>
          <p className="font-medium text-black">
            {lead.phone || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Serviço de interesse</p>
          <p className="font-medium text-black">
            {lead.service_interest || "Não informado"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Origem</p>
          <p className="font-medium text-black">
            {lead.source || "Não informado"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-100 p-5">
        <p className="text-sm text-zinc-400">Mensagem</p>
        <p className="mt-2 leading-relaxed text-zinc-700">{lead.message}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label className="text-sm font-medium text-zinc-700">
            Atualizar status
          </label>

          <select
            value={lead.status}
            disabled={updating}
            onChange={(event) => onStatusChange(lead.id, event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black md:max-w-xs"
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
              className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              WhatsApp
            </a>
          )}

          {lead.email && (
            <a
              href={emailUrl}
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              E-mail
            </a>
          )}

          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete(lead.id)}
            className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:border-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Removendo..." : "Remover"}
          </button>
        </div>
      </div>
    </article>
  );
}