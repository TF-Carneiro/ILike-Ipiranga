"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MenuCards() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar o menu quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Array com os serviços disponíveis
  const servicos = [
    { titulo: "Lavanderia", href: "/agendamento", ativo: true },
    { titulo: "Academia", href: "#", ativo: false },
    { titulo: "Co-Working", href: "#", ativo: false },
    { titulo: "Salão de Festas", href: "#", ativo: false },
    { titulo: "Churrasqueira", href: "#", ativo: false },
    { titulo: "Quadra", href: "#", ativo: false },
  ];

  const handleSelectService = (href: string) => {
    if (href === "#") return;

    setOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 10);
  };

  return (
    <div ref={menuRef}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Menu de Serviços</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 z-[999]"
          sideOffset={8}
        >
          <DropdownMenuLabel className="text-sm">
            Serviços do Condomínio
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {servicos.map((servico) =>
            servico.ativo ? (
              <DropdownMenuItem
                key={servico.titulo}
                className="cursor-pointer text-primary font-medium"
                onClick={() => handleSelectService(servico.href)}
              >
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                {servico.titulo}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={servico.titulo}
                className="opacity-70 cursor-not-allowed"
                disabled
              >
                <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                {servico.titulo}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
