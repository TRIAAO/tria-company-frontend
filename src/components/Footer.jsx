export default function Footer() {
  return (
    <footer className="bg-black px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} TRIA Company. Todos os direitos reservados.
        </p>

        <p>
          Desenvolvido pela TRIA Company e por Wilson Dala Ndembuza.
        </p>
      </div>
    </footer>
  );
}