"use client";

import { useState } from "react";
import Link from "next/link";
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

  // Array com os serviços disponíveis
  const servicos = [
    { titulo: "Lavanderia", href: "/agendamento", ativo: true },
    { titulo: "Academia", href: "#", ativo: false },
    { titulo: "Co-Working", href: "#", ativo: false },
    { titulo: "Salão de Festas", href: "#", ativo: false },
    { titulo: "Churrasqueira", href: "#", ativo: false },
    { titulo: "Quadra", href: "#", ativo: false },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu de Serviços</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50" sideOffset={8}>
        <DropdownMenuLabel className="text-sm">
          Serviços do Condomínio
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {servicos.map((servico) =>
          servico.ativo ? (
            <Link
              href={servico.href}
              key={servico.titulo}
              onClick={() => setOpen(false)}
            >
              <DropdownMenuItem className="cursor-pointer text-primary font-medium">
                {servico.titulo}
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem
              key={servico.titulo}
              className="opacity-70 cursor-not-allowed"
              disabled
            >
              {servico.titulo}
              <span className="text-[10px] ml-2 text-muted-foreground">
                (em breve)
              </span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
