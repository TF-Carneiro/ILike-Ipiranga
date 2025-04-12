import { CalendarioAgendamento } from "@/components/calendario-agendamento";
import { NovoAgendamentoButton } from "@/components/novo-agendamento-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgendamentoPage() {
  return (
    <div className="container mx-auto py-2 sm:py-4 px-2 sm:px-4 flex-1">
      <div className="flex flex-col gap-2 sm:gap-4 max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[10px] sm:text-sm h-7 sm:h-9 px-2 sm:px-3"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-base xs:text-lg sm:text-2xl font-bold text-foreground">
              Reservas
            </h1>
          </div>
          <div className="flex items-center">
            <NovoAgendamentoButton />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-1 xs:p-2 sm:p-4 md:p-6">
            <CalendarioAgendamento />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-2 xs:p-3 sm:p-4 text-[10px] xs:text-xs sm:text-sm text-card-foreground">
          <h3 className="font-medium text-primary mb-1 sm:mb-2">
            Informações:
          </h3>
          <ul className="space-y-0.5 sm:space-y-1 list-disc pl-3 xs:pl-4 sm:pl-5 text-muted-foreground">
            <li>Horário de funcionamento: 08:00h às 18:00h todos os dias.</li>
            <li>Cada agendamento tem duração máxima de 1 hora.</li>
            <li>
              Agendamentos podem ser feitos com até 5 dias de antecedência.
            </li>
            <li>Em caso de dúvidas, entre em contato com a administração.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
