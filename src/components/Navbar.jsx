import { useEffect, useState } from "react";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Atuação" },
  { href: "#metodo", label: "Método" },
  { href: "#mercados", label: "Onde atuamos" },
  { href: "#time", label: "Time" },
  { href: "#clientes", label: "Clientes" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-6 lg:py-5">
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="text-base font-semibold tracking-tight text-white lg:text-lg"
          >
            TRIA Company
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contato"
              className="rounded-full border border-[#D4AF37] px-5 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              Fale com a TRIA
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37] lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 block h-[2px] w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[17px] block h-[2px] w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-[82%] max-w-sm border-l border-white/10 bg-[#050505] text-white shadow-[0_0_80px_rgba(0,0,0,0.75)] transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              TRIA
            </p>
            <p className="mt-1 text-lg font-semibold">Menu</p>
          </div>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4 py-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-zinc-200 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-5">
          <a
            href="#contato"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            Fale com a TRIA
          </a>

          <p className="mt-5 text-center text-xs leading-6 text-zinc-600">
            Infraestrutura intelectual para organizações que constroem para
            durar.
          </p>
        </div>
      </aside>
    </>
  );
}