"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu de Serviços</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[90vw] sm:w-80 z-50 max-h-[80vh] overflow-y-auto"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-sm">
          Serviços do Condomínio
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 grid gap-2">
          {/* Card Lavanderia */}
          <Link href="/agendamento" onClick={() => setOpen(false)}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="p-3">
                <CardTitle className="text-primary text-sm">
                  Lavanderia
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                  Agende horários para utilizar as máquinas de lavar e secar
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Cards para Academia */}
          <Card className="opacity-70 cursor-not-allowed">
            <CardHeader className="p-3">
              <CardTitle className="text-primary text-sm">Academia</CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                Página em desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card para Co-Working */}
          <Card className="opacity-70 cursor-not-allowed">
            <CardHeader className="p-3">
              <CardTitle className="text-primary text-sm">Co-Working</CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                Página em desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card para Salão de Festas */}
          <Card className="opacity-70 cursor-not-allowed">
            <CardHeader className="p-3">
              <CardTitle className="text-primary text-sm">
                Salão de Festas
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                Página em desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card para Churrasqueira */}
          <Card className="opacity-70 cursor-not-allowed">
            <CardHeader className="p-3">
              <CardTitle className="text-primary text-sm">
                Churrasqueira
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                Página em desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card para Quadra */}
          <Card className="opacity-70 cursor-not-allowed">
            <CardHeader className="p-3">
              <CardTitle className="text-primary text-sm">Quadra</CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                Página em desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
