export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#home"
          className="text-lg font-semibold tracking-tight text-white"
        >
          TRIA Company
        </a>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
          <a href="#sobre" className="transition hover:text-white">
            Sobre
          </a>

          <a href="#areas" className="transition hover:text-white">
            Atuação
          </a>

          <a href="#metodo" className="transition hover:text-white">
            Método
          </a>

          <a href="#mercados" className="transition hover:text-white">
            Onde atuamos
          </a>

          <a href="#time" className="transition hover:text-white">
            Time
          </a>

          <a href="#clientes" className="transition hover:text-white">
            Clientes
          </a>

          <a href="#depoimentos" className="transition hover:text-white">
            Depoimentos
          </a>

          <a href="#contato" className="transition hover:text-white">
            Contato
          </a>
        </nav>

        <a
          href="#contato"
          className="rounded-full border border-[#D4AF37] px-5 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
        >
          Fale com a TRIA
        </a>
      </div>
    </header>
  );
}