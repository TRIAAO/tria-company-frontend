export default function Footer() {
  return (
    <footer className="bg-black px-6 py-14 text-white lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              TRIA Company
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">
              Infraestrutura intelectual para organizações que constroem para
              durar.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Contacto
              </p>

              <div className="mt-5 space-y-4 text-sm text-zinc-400">
                <a
                  href="mailto:geral@triacompany.com"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <span className="text-[#D4AF37]">✉</span>
                  <span>geral@triacompany.com</span>
                </a>

                <a
                  href="tel:+244916429651"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <span className="text-[#D4AF37]">✆</span>
                  <span>+244 916 429 651</span>
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Angola
              </p>

              <address className="mt-5 not-italic text-sm leading-7 text-zinc-400">
                Rua José Pereira do Nascimento, 23-A
                <br />
                Maianga, Luanda, Angola
              </address>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Brasil
              </p>

              <address className="mt-5 not-italic text-sm leading-7 text-zinc-400">
                Av. Manuel Bandeira 360
                <br />
                Vila Leopoldina - 05317-020
                <br />
                São Paulo - SP - Brasil
              </address>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} TRIA Company. Todos os direitos
            reservados.
          </p>

          <p>Desenvolvido pela TRIA Company.</p>
        </div>
      </div>
    </footer>
  );
}