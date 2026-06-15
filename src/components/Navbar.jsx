export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#home" className="text-lg font-semibold tracking-tight text-white">
          TRIA Company
        </a>

        <nav className="hidden items-center gap-7 text-sm text-zinc-300 lg:flex">
          <a href="#about" className="transition hover:text-white">
            Sobre
          </a>

          <a href="#services" className="transition hover:text-white">
            Atuação
          </a>

          <a href="#method" className="transition hover:text-white">
            Método
          </a>

          <a href="#partners" className="transition hover:text-white">
            Parceiros
          </a>

          <a href="#testimonials" className="transition hover:text-white">
            Depoimentos
          </a>

          <a href="#contact" className="transition hover:text-white">
            Contato
          </a>
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
        >
          Fale conosco
        </a>
      </div>
    </header>
  );
}