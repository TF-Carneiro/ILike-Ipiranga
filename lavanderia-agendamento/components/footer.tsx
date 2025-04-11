import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-2 sm:py-4 mt-auto text-muted-foreground border-t border-border">
      <div className="container mx-auto text-center text-[10px] xs:text-xs sm:text-sm px-2">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} I Like Ipiranga. Sistema de
          Gerenciamento.
        </p>
        <Link
          href="https://github.com/TF-Carneiro"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          By TF-Carneiro
        </Link>
      </div>
    </footer>
  );
}
