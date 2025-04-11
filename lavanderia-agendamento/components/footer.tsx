import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-2 sm:py-4 mt-auto text-muted-foreground border-t border-border">
      <div className="container mx-auto text-center text-[10px] xs:text-xs sm:text-sm px-2">
        <p>
          &copy; {new Date().getFullYear()} I Like Ipiranga. Todos os direitos
          reservados.
        </p>
        <p className="mt-0.5 sm:mt-1 flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link
            href="/documentacao-usuario"
            className="hover:text-primary transition-colors"
          >
            Manual do Usuário
          </Link>
          <span className="hidden xs:inline">|</span>
          <Link
            href="/documentacao-admin"
            className="hover:text-primary transition-colors"
          >
            Manual do Administrador
          </Link>
        </p>
      </div>
    </footer>
  );
}
