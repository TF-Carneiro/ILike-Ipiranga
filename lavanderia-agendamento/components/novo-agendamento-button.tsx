"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NovoAgendamentoDialog } from "./novo-agendamento-dialog";

export function NovoAgendamentoButton() {
  const [dialogAberto, setDialogAberto] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogAberto(true)}
        className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap h-7 sm:h-9 text-[10px] sm:text-sm px-2 sm:px-3"
        size="sm"
      >
        <Plus className="mr-0.5 sm:mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden xs:inline">Novo Agendamento</span>
        <span className="xs:hidden">Agendar</span>
      </Button>
      <NovoAgendamentoDialog
        aberto={dialogAberto}
        onOpenChange={setDialogAberto}
      />
    </>
  );
}
